import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RefreshCw, Activity, MessageSquare, AlertTriangle, Lightbulb } from 'lucide-react';

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
            await fetch(`${getBaseUrl()}/api/analytics/analyze`, { method: 'POST' });
            await fetchData(); // Refresh
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
                    <h1 className="text-3xl font-bold mb-2">WEC Analytics</h1>
                    <p className="text-slate-400">AI-Powered Ecosystem Monitor</p>
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
                        {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
                        <Lightbulb size={18} />
                    </button>
                </div>
            </header>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card title="Traffic (All Time)" value={visits.length} icon={<Activity className="text-green-400" />} />
                <Card title="Conversations" value={chats.length} icon={<MessageSquare className="text-blue-400" />} />
                <Card title="Avg Daily Visits" value={Math.round(visits.length / (chartData.length || 1))} icon={<Activity className="text-purple-400" />} />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold mb-6">Traffic Overview (Last 7 Days)</h3>
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

                {/* AI INSIGHTS */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                        <Lightbulb size={100} />
                    </div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        Daily AI Insight
                        <span className="text-xs bg-wec-blue/20 text-wec-blue px-2 py-1 rounded-full">
                            {latestAnalysis.Fecha ? latestAnalysis.Fecha.split('T')[0] : 'No Data'}
                        </span>
                    </h3>

                    {latestAnalysis.Resumen ? (
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm text-slate-400 uppercase tracking-widest mb-2 font-bold">Summary</h4>
                                <p className="text-slate-200 leading-relaxed">{latestAnalysis.Resumen}</p>
                            </div>

                            <div>
                                <h4 className="text-sm text-red-300 uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                                    <AlertTriangle size={14} /> Confusion Points
                                </h4>
                                <p className="text-slate-300 text-sm bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                    {latestAnalysis.PuntosConfusion}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm text-green-300 uppercase tracking-widest mb-2 font-bold">Recommended Improvement</h4>
                                <p className="text-slate-300 text-sm bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                                    {latestAnalysis.MejorasIA}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                            <p>No analysis generated yet.</p>
                            <button onClick={runAnalysis} className="mt-4 text-wec-blue underline">Run Now</button>
                        </div>
                    )}
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
