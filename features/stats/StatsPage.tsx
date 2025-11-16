import React from 'react';
import type { Stat, ColumnDefinition } from '../../types';
import { useQuery } from '../../hooks/useQuery';
import { fetchStats } from '../../services/mockApi';
import { usePagination } from '../../hooks/usePagination';

import Card from '../../components/cards/Card';
import Table from '../../components/table/Table';
import TableHead from '../../components/table/TableHead';
import TableBody from '../../components/table/TableBody';
import TableRow from '../../components/table/TableRow';
import TableCell from '../../components/table/TableCell';
// Fix: Import ActionItem type for explicit typing.
import ActionMenu, { type ActionItem } from '../../components/actionmenu/ActionMenu';
import Pagination from '../../components/pagination/Pagination';

const StatsPage: React.FC = () => {
    const { data: stats, loading } = useQuery(fetchStats);
    const pagination = usePagination(stats || [], 15);

    const columns: ColumnDefinition<Stat>[] = [
        { key: 'player', header: 'Player' },
        { key: 'team', header: 'Team' },
        { key: 'statName', header: 'Stat' },
        { key: 'value', header: 'Value' },
        { key: 'fixtureId', header: 'Fixture ID' },
    ];

    // Fix: Add explicit return type to ensure type safety for action items.
    const getActionItems = (stat: Stat): ActionItem[] => [
        { label: 'View Player Profile', icon: 'view', onClick: () => alert(`Viewing ${stat.player}`), roles: ['ROLE_MODERATOR'] },
        { label: 'View Fixture', icon: 'external-link', onClick: () => alert(`Viewing fixture ${stat.fixtureId}`), roles: ['ROLE_MODERATOR'] },
        { label: 'Invalidate Stat', icon: 'delete', onClick: () => alert(`Invalidating stat ${stat.id}`), roles: ['ROLE_SUPER_ADMIN'], isDanger: true },
    ];

    return (
        <Card title="Player Stats">
            <Table>
                <TableHead columns={columns} />
                <TableBody isEmpty={!loading && stats?.length === 0} colSpan={columns.length + 1}>
                    {loading ? (
                        <tr><td colSpan={columns.length + 1} className="text-center p-4">Loading stats...</td></tr>
                    ) : (
                        pagination.paginatedData.map(stat => (
                            <TableRow key={stat.id}>
                                {columns.map(col => (
                                    <TableCell key={String(col.key)} isPrimary={col.key === 'player'}>
                                        {col.cell ? col.cell(stat) : stat[col.key as keyof Stat]?.toString()}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <ActionMenu items={getActionItems(stat)} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                pageSize={pagination.pageSize}
                onPageChange={pagination.goToPage}
                onPageSizeChange={pagination.setPageSize}
                canPreviousPage={pagination.currentPage > 1}
                canNextPage={pagination.currentPage < pagination.totalPages}
                onPreviousPage={pagination.prevPage}
                onNextPage={pagination.nextPage}
            />
        </Card>
    );
};

export default StatsPage;