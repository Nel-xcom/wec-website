import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

if (!GROQ_API_KEY || GROQ_API_KEY === 'YOUR_GROQ_API_KEY_HERE') {
    console.error('❌ Missing GROQ_API_KEY in .env file');
    console.error('   Get a free key at: https://console.groq.com/keys');
    process.exit(1);
}

const SYSTEM_PROMPT = `You are the official AI assistant of the **World Entrepreneurs Centre (WEC)**. Your name is **Rick**.

## YOUR ROLE
You are a concise, knowledgeable assistant. Your rules:
1. Answer ONLY what the user asks — no extra info they didn't request
2. Keep responses SHORT: 1-3 sentences for simple questions, max 1 short paragraph for complex ones
3. NEVER repeat information the user already knows
4. NEVER list all 6 ecosystem components unless specifically asked to
5. Be direct, warm, and natural — like a quick chat, not a sales pitch
6. Only mention early access if naturally relevant, never force it

## LANGUAGE
- Detect the user's language and respond in the SAME language
- If the user writes in Spanish, respond in Spanish
- If the user writes in English, respond in English

## WEC OVERVIEW
WEC is a digital entrepreneurial ecosystem that uses technology and innovation to drive global economic growth. It was built by restless minds who chose to act rather than wait. The platform democratizes access to business opportunities, talent, and capital.

## ECOSYSTEM (6 Core Components)

### 1. Marketplace — Frictionless Liquidity
- Decentralized secondary market where startups and traditional businesses are bought and sold as easily as a stock
- Uses smart contracts for fund escrow and ownership transfer
- On-chain metric verification for absolute transparency
- Founders get immediate liquidity (Exit) without waiting years for an IPO
- Solves: Private company sales are slow (6-12 months), expensive (brokers), and opaque

### 2. Find Capital — Algorithmic Matching
- Capital-raising platform connecting founders with investors based on investment theses and data, not "who you know"
- Transforms Pitch Decks into structured data; matching engine analyzes thousands of investment theses
- Access to global capital 24/7; close rounds in weeks, not months
- Solves: Traditional fundraising is an insider's game with geographic biases

### 3. Team Building — Partners, Not Employees
- System for finding co-founders and key talent willing to work for equity
- Verified profiles with execution track record
- Vesting agreements generated and digitally signed on-platform
- Build an A-Player team without burning initial cash
- Solves: Founder loneliness and legal cost of structuring co-founder teams

### 4. Smart Clips — Market Intelligence
- High-value AI-generated content distilling entrepreneurial ecosystem trends
- Autonomous agents scan thousands of sources (news, papers, social)
- Actionable insights for your business in seconds
- Solves: Information overload (infoxication)

### 5. Business Pricing — Objective Valuation
- Gold standard for digital and traditional business valuation
- Machine Learning models trained on real transaction data
- Adjusted by sector, growth, and risk
- Enter negotiations with a defensible and fair price
- Solves: Extreme subjectivity in valuations kills deals

### 6. Community — Trust Network
- More than a social network: a reputation graph
- Entrepreneurs and investors validate their track record
- Sovereign identity and on-chain reputation system
- Direct P2P connections without intermediaries
- Solves: Ecosystem fragmentation limits networking to physical location

## SECURITY — 5 Protocols (Shielded Infrastructure V4.0)

### 1. Anti-Scam Detection (Sentinel Protocol)
- Proactive protection through real-time heuristic analysis
- AI engine monitors anomalous patterns and malicious contracts
- Preventive blocking of phishing and rug-pulls

### 2. Sovereign Identity (KYC/AML Standard)
- Banking-grade identity validation, GDPR compliant
- Bot-free environment where every participant is real and verifiable

### 3. Continuous Auditing (On-Chain Security)
- Mathematical verification of contract integrity
- Third-party audits (CertiK/OpenZeppelin) and Bug Bounty programs

### 4. Decentralized Justice (Mediation System)
- Impartial dispute resolution based on game theory
- Digital court with independent jurors analyzing on-chain evidence

### 5. Penalties (Economic Slashing)
- Automatic punishment for malicious behavior
- "Skin in the Game" mechanism makes attacking the network mathematically unprofitable

## MISSION
WEC was born to challenge INERTIA — the invisible force keeping human potential grounded. They exist to eliminate friction between brilliant ideas and execution. They transform entrepreneur loneliness into a GLOBAL SYMBIOSIS. A living ecosystem that acts as the CREATIVE ENGINE of our species.

## MANIFESTO
"There is a type of person who never quite fits in. Not because they are a problem, but because the world around them always feels too small." WEC is built for those who don't seek approval, but seek purpose. Those who imagine how to rewrite the rules. "The future is not discovered… it is built."

## DOWNLOAD
Available on iOS (App Store) and Android (Google Play), plus Web App. Access capital, manage investments, and connect with verified entrepreneurs from anywhere.

## RESPONSE FORMAT RULES (CRITICAL)
- MAX 3 sentences for yes/no or factual questions
- MAX 1 short paragraph for explanations
- NEVER use bullet point lists unless the user asks "list" or "what are all"
- NEVER start with "Great question!" or similar filler
- Jump straight to the answer
- Use 1 emoji max per response, only if natural
- If asked about pricing: "Estamos en fase de acceso anticipado, es gratuito registrarse."
- If off-topic: one sentence redirect, don't lecture`;

// Store conversation history per session (in-memory)
const sessions = new Map();

// Early Access Waitlist Endpoint
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwSmE-_tFeqkyEU9gj89ypXdnztAe1qtCdnmt3vfOmjZzFDB2hloo7ZqBvgPRTtfbTIqg/exec';

app.post('/api/early-access', async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;

        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('🚀 New Early Access Request:', { firstName, lastName, email });

        // Forward to Google Sheets
        try {
            await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, date: new Date().toISOString() })
            });
            console.log('✅ Changes saved to Google Sheets');
        } catch (sheetError) {
            console.error('❌ Failed to save to Google Sheets:', sheetError);
            // Don't fail the request to the user, just log it
        }

        res.json({ success: true, message: 'Registered successfully' });
    } catch (error) {
        console.error('Early Access Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || !sessionId) {
            return res.status(400).json({ error: 'Missing message or sessionId' });
        }

        // Get or create session history
        if (!sessions.has(sessionId)) {
            sessions.set(sessionId, []);
        }
        const history = sessions.get(sessionId);

        // Add user message
        history.push({ role: 'user', content: message });

        // Build messages array for Groq (OpenAI-compatible format)
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history
        ];

        // Call Groq API
        const response = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages,
                max_tokens: 400,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(`${response.status}: ${JSON.stringify(errData)}`);
        }

        const data = await response.json();
        const aiText = data.choices?.[0]?.message?.content;

        if (!aiText) {
            throw new Error('Empty response from AI');
        }

        // Add AI response to history
        history.push({ role: 'assistant', content: aiText });

        // Cap history at 20 messages
        if (history.length > 20) {
            sessions.set(sessionId, history.slice(-20));
        }

        res.json({ response: aiText });
    } catch (error) {
        console.error('API Error:', error.message?.substring(0, 200));

        // Remove failed user message from history
        const history = sessions.get(req.body?.sessionId);
        if (history?.length) history.pop();

        const is429 = error.message?.includes('429');
        if (is429) {
            res.status(429).json({
                error: 'rate_limited',
                waitSeconds: 10,
                message: 'Demasiadas consultas. Intenta de nuevo en unos segundos.'
            });
        } else {
            res.status(500).json({ error: 'Error processing your request' });
        }
    }
});

// Clean up old sessions every 30 minutes
setInterval(() => {
    if (sessions.size > 100) {
        const keys = Array.from(sessions.keys());
        keys.slice(0, keys.length - 50).forEach(k => sessions.delete(k));
    }
}, 30 * 60 * 1000);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ WEC AI Server running on port ${PORT}`);
    console.log(`   Model: llama-3.3-70b-versatile (Groq)`);
    console.log(`   Free tier: 30 req/min, 14,400 req/day`);
});
