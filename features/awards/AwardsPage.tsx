import React from 'react';
import type { Award, ColumnDefinition } from '../../types';
import { useQuery } from '../../hooks/useQuery';
import { fetchAwards } from '../../services/mockApi';
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

const AwardsPage: React.FC = () => {
    const { data: awards, loading } = useQuery(fetchAwards);
    const pagination = usePagination(awards || [], 10);

    const columns: ColumnDefinition<Award>[] = [
        { key: 'name', header: 'Award Name' },
        { key: 'recipient', header: 'Recipient' },
        { key: 'recipe', header: 'Recipe' },
        {
            key: 'generatedAt',
            header: 'Generated At',
            cell: (item) => new Date(item.generatedAt).toLocaleString(),
        },
        {
            key: 'imageUrl',
            header: 'Image',
            cell: (item) => <img src={item.imageUrl} alt={item.name} className="h-10 w-10 rounded-full" />,
        }
    ];

    // Fix: Add explicit return type to ensure type safety for action items.
    const getActionItems = (award: Award): ActionItem[] => [
        { label: 'Regenerate Image', icon: 'external-link', onClick: () => alert(`Regenerating image for ${award.name}`), roles: ['ROLE_ADMIN'] },
        { label: 'Re-run Recipe', icon: 'edit', onClick: () => alert(`Re-running recipe ${award.recipe}`), roles: ['ROLE_SUPER_ADMIN'] },
    ];

    return (
        <Card title="Awards">
            <Table>
                <TableHead columns={columns} />
                <TableBody isEmpty={!loading && awards?.length === 0} colSpan={columns.length + 1}>
                    {loading ? (
                        <tr><td colSpan={columns.length + 1} className="text-center p-4">Loading awards...</td></tr>
                    ) : (
                        pagination.paginatedData.map(award => (
                            <TableRow key={award.id}>
                                {columns.map(col => (
                                    <TableCell key={String(col.key)} isPrimary={col.key === 'name'}>
                                        {col.cell ? col.cell(award) : award[col.key as keyof Award]?.toString()}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <ActionMenu items={getActionItems(award)} />
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

export default AwardsPage;