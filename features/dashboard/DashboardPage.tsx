
import React from 'react';
import SummaryCard from '../../components/cards/SummaryCard';
import Card from '../../components/cards/Card';
import { useQuery } from '../../hooks/useQuery';
import { fetchSummaries, fetchAdminLogs } from '../../services/mockApi';
import type { AdminLog } from '../../types';

const DashboardPage: React.FC = () => {
    const { data: summaries, loading: summariesLoading } = useQuery(fetchSummaries);
    const { data: logs, loading: logsLoading } = useQuery(fetchAdminLogs);

    const SkeletonCard = () => (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2"></div>
        </div>
    );
    
    const LogItem: React.FC<{ log: AdminLog }> = ({ log }) => (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                        {log.admin} <span className="text-gray-400">{log.action}</span> {log.target}
                    </p>
                </div>
                <div className="inline-flex items-center text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                </div>
            </div>
        </li>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {summariesLoading || !summaries ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <SummaryCard title="Total Users" value={summaries.totalUsers} icon="users" />
                        <SummaryCard title="Active Bans" value={summaries.activeBans} icon="ban" iconBgColor="bg-red-600" />
                        <SummaryCard title="Fixtures This Week" value={summaries.fixturesThisWeek} icon="fixtures" />
                        <SummaryCard title="Awards Generated" value={summaries.awardsGenerated} icon="awards" />
                    </>
                )}
            </div>
            
            <Card title="Admin Logs">
                {logsLoading ? (
                     <div className="text-center p-4">Loading logs...</div>
                ) : (
                    <ul className="divide-y divide-gray-700">
                        {logs?.map(log => <LogItem key={log.id} log={log} />)}
                    </ul>
                )}
            </Card>
        </div>
    );
};

export default DashboardPage;
