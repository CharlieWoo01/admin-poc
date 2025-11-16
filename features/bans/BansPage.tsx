import React from 'react';
import type { Ban, ColumnDefinition } from '../../types';
import { useQuery } from '../../hooks/useQuery';
import { fetchBans } from '../../services/mockApi';
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

const BansPage: React.FC = () => {
    const { data: bans, loading } = useQuery(fetchBans);
    const pagination = usePagination(bans || [], 10);

    const columns: ColumnDefinition<Ban>[] = [
        { key: 'user', header: 'Banned User' },
        { key: 'reason', header: 'Reason' },
        { key: 'bannedBy', header: 'Banned By' },
        {
            key: 'expiresAt',
            header: 'Expires At',
            cell: (item) => item.expiresAt ? new Date(item.expiresAt).toLocaleString() : 'Permanent',
        },
        {
            key: 'createdAt',
            header: 'Banned On',
            cell: (item) => new Date(item.createdAt).toLocaleDateString(),
        },
    ];

    // Fix: Add explicit return type to ensure type safety for action items.
    const getActionItems = (ban: Ban): ActionItem[] => [
        { label: 'Lift Ban', icon: 'view', onClick: () => alert(`Lifting ban for ${ban.user}`), roles: ['ROLE_ADMIN'] },
        { label: 'Extend Ban', icon: 'edit', onClick: () => alert(`Extending ban for ${ban.user}`), roles: ['ROLE_MODERATOR'] },
        { label: 'View User Profile', icon: 'external-link', onClick: () => alert(`Viewing profile for ${ban.user}`), roles: ['ROLE_MODERATOR'] },
    ];

    return (
        <Card title="User Bans">
            <Table>
                <TableHead columns={columns} />
                <TableBody isEmpty={!loading && bans?.length === 0} colSpan={columns.length + 1}>
                    {loading ? (
                        <tr><td colSpan={columns.length + 1} className="text-center p-4">Loading bans...</td></tr>
                    ) : (
                        pagination.paginatedData.map(ban => (
                            <TableRow key={ban.id}>
                                {columns.map(col => (
                                    <TableCell key={String(col.key)} isPrimary={col.key === 'user'}>
                                        {col.cell ? col.cell(ban) : ban[col.key as keyof Ban]?.toString()}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <ActionMenu items={getActionItems(ban)} />
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

export default BansPage;