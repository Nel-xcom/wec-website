import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RefreshCw, Activity, MessageSquare, AlertTriangle, Lightbulb } from 'lucide-react';
import logoWhite from '../assets/logos/logo-white.png';

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState(null);

    const getBaseUrl = () => {
        const url = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        return url.replace('/api/chat', '');
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${getBaseUrl()}/api/analytics/dashboard`);
            if (!res.ok) throw new Error('Failed to load data. API might be down or Script not updated.');
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const runAnalysis = async () => {
        setAnalyzing(true);
        try {
            await fetch(`${getBaseUrl()}/api/analytics/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ force: true }) // Force analysis
            });
            // Wait a bit for sheet to update
            setTimeout(() => fetchData(), 2000);
        } catch (err) {
            alert('Analysis failed');
        } finally {
            setAnalyzing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading Dashboard...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">Error: {error}</div>;

    // Process Data
    const visits = data?.Visits || [];
    const chats = data?.ChatLogs || [];
    const analyses = data?.Analysis || [];

    // Simple aggregation for charts
    // Group by Date (YYYY-MM-DD)
    const visitsByDate = visits.reduce((acc, v) => {
        const date = v.Fecha ? v.Fecha.split('T')[0] : 'Unknown';
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});
    const chartData = Object.keys(visitsByDate).map(date => ({ date, visits: visitsByDate[date] })).slice(-7);

    // Latest Analysis
    const latestAnalysis = analyses[analyses.length - 1] || {};

    return (
        <div className="min-h-screen pt-24 px-4 md:px-12 bg-[#030303] text-white">
            <header className="flex justify-between items-center mb-10">
                <div>
                    {/* 1. LOGO INSTEAD OF TITLE */}
                    <img src={logoWhite} alt="WEC Analytics" className="h-12 md:h-16 w-auto opacity-90 mb-2" />
                    <p className="text-slate-400 text-sm md:text-base ml-2">Eco-System Monitor</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchData} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                        <RefreshCw size={20} />
                    </button>
                    <button
                        onClick={runAnalysis}
                        disabled={analyzing}
                        className="px-6 py-3 bg-wec-blue/10 text-wec-blue border border-wec-blue/20 rounded-full hover:bg-wec-blue/20 transition-all flex items-center gap-2"
                    >
                        {analyzing ? 'Analyzing...' : 'Run Analysis'}
                        <Lightbulb size={18} />
                    </button>
                </div>
            </header>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card title="Traffic" value={visits.length} icon={<Activity className="text-green-400" />} />
                <Card title="Conversations" value={chats.length} icon={<MessageSquare className="text-blue-400" />} />
                <Card title="Avg Daily Visits" value={Math.round(visits.length / (chartData.length || 1))} icon={<Activity className="text-purple-400" />} />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* CHART (2/3 width) */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-6">Traffic Overview</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="date" stroke="#ffffff50" />
                                <YAxis stroke="#ffffff50" />
                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                <Line type="monotone" dataKey="visits" stroke="#D5F1FF" strokeWidth={3} dot={{ fill: '#D5F1FF' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. HOT QUESTIONS ("This are the mostly asked questions...") */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-3xl p-6 border border-orange-500/20 relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-4xl opacity-50">🔥</div>
                    <h3 className="text-lg font-bold text-orange-200 mb-1 flex items-center gap-2">
                        Hot Questions
                    </h3>
                    <p className="text-xs text-orange-400/80 mb-4 uppercase tracking-wide">Most asked about the project</p>

                    {latestAnalysis.PuntosConfusion ? (
                        <div className="space-y-3">
                            {latestAnalysis.PuntosConfusion.split(',').map((q, i) => (
                                <div key={i} className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/10 text-sm text-orange-100/90">
                                    "{q.trim()}"
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">No hot questions analyzed yet.</p>
                    )}
                </div>
            </div>

            {/* 4. SUGGESTIONS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* SUGGESTIONS */}
                <div className="bg-gradient-to-br from-wec-blue/10 to-purple-600/10 rounded-3xl p-6 border border-wec-blue/20">
                    <h3 className="text-lg font-bold text-wec-blue mb-4 flex items-center gap-2">
                        <Lightbulb size={20} /> AI Suggestions
                    </h3>
                    {latestAnalysis.MejorasIA ? (
                        <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                            {latestAnalysis.MejorasIA}
                        </p>
                    ) : (
                        <p className="text-slate-500 italic">No suggestions available.</p>
                    )}
                </div>

                {/* SUMMARY */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-slate-300 mb-4">Daily Summary</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {latestAnalysis.Resumen || 'No summary generated.'}
                    </p>
                    <p className="text-xs text-slate-600 mt-4 text-right">
                        Last Analysis: {latestAnalysis.Fecha ? new Date(latestAnalysis.Fecha).toLocaleString() : 'Never'}
                    </p>
                </div>
            </div>
        </div>
    );
}

const Card = ({ title, value, icon }) => (
    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 flex items-center justify-between">
        <div>
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">{title}</p>
            <h3 className="text-4xl font-bold text-white font-sans">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
            {icon}
        </div>
    </div>
);
