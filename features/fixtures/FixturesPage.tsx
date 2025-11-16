import React from 'react';
import type { Fixture, ColumnDefinition } from '../../types';
import { useQuery } from '../../hooks/useQuery';
import { fetchFixtures } from '../../services/mockApi';
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

const FixturesPage: React.FC = () => {
    const { data: fixtures, loading } = useQuery(fetchFixtures);
    const pagination = usePagination(fixtures || [], 10);

    const columns: ColumnDefinition<Fixture>[] = [
        { key: 'stage', header: 'Stage' },
        { key: 'week', header: 'Week' },
        { key: 'teamA', header: 'Team A' },
        { key: 'teamB', header: 'Team B' },
        {
            key: 'result',
            header: 'Result',
            cell: (item) => item.status === 'completed' ? `${item.scoreA} - ${item.scoreB}` : 'TBD',
        },
        { key: 'status', header: 'Status', cell: (item) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item.status === 'completed' ? 'bg-blue-900 text-blue-300' : 
                item.status === 'scheduled' ? 'bg-yellow-900 text-yellow-300' : 
                'bg-green-900 text-green-300'
            }`}>
                {item.status}
            </span>
        )},
    ];

    // Fix: Add explicit return type to ensure type safety for action items.
    const getActionItems = (fixture: Fixture): ActionItem[] => [
        { label: 'Edit Result', icon: 'edit', onClick: () => alert(`Editing result for fixture ${fixture.id}`), roles: ['ROLE_ADMIN'] },
        { label: 'Mark as Completed', icon: 'view', onClick: () => alert(`Marking fixture ${fixture.id} as completed`), roles: ['ROLE_ADMIN'] },
        { label: 'View Details', icon: 'external-link', onClick: () => alert(`Viewing details for fixture ${fixture.id}`), roles: ['ROLE_MODERATOR'] },
    ];

    return (
        <Card title="Fixtures">
            <Table>
                <TableHead columns={columns} />
                <TableBody isEmpty={!loading && fixtures?.length === 0} colSpan={columns.length + 1}>
                    {loading ? (
                        <tr><td colSpan={columns.length + 1} className="text-center p-4">Loading fixtures...</td></tr>
                    ) : (
                        pagination.paginatedData.map(fixture => (
                            <TableRow key={fixture.id}>
                                {columns.map(col => (
                                    <TableCell key={String(col.key)} isPrimary={['teamA', 'teamB'].includes(String(col.key))}>
                                        {col.cell ? col.cell(fixture) : fixture[col.key as keyof Fixture]?.toString()}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <ActionMenu items={getActionItems(fixture)} />
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

export default FixturesPage;