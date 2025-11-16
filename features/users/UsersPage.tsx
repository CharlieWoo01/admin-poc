import React, { useState, useMemo } from 'react';
import type { User, ColumnDefinition } from '../../types';
import { useQuery } from '../../hooks/useQuery';
import { fetchUsers } from '../../services/mockApi';
import { usePagination } from '../../hooks/usePagination';
import { useTableSelection } from '../../hooks/useTableSelection';

import Card from '../../components/cards/Card';
import Table from '../../components/table/Table';
import TableHead from '../../components/table/TableHead';
import TableBody from '../../components/table/TableBody';
import TableRow from '../../components/table/TableRow';
import TableCell from '../../components/table/TableCell';
import TableCheckbox from '../../components/table/TableCheckbox';
// Fix: Import ActionItem type for explicit typing.
import ActionMenu, { type ActionItem } from '../../components/actionmenu/ActionMenu';
import Pagination from '../../components/pagination/Pagination';
import FilterBar from '../../components/filters/FilterBar';
// Fix: Import ButtonAction type for explicit typing.
import ButtonBar, { type ButtonAction } from '../../components/buttonbar/ButtonBar';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/ui/Icon';

const UsersPage: React.FC = () => {
    const { data: users, loading } = useQuery(fetchUsers);
    const [filters, setFilters] = useState({ username: '', email: '', role: '' });

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter(user =>
            user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
            user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
            (filters.role === '' || user.roles.includes(filters.role as any))
        );
    }, [users, filters]);

    const pagination = usePagination(filteredUsers, 10);
    const selection = useTableSelection(pagination.paginatedData);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        pagination.reset();
    };

    const columns: ColumnDefinition<User>[] = [
        { key: 'username', header: 'User' },
        { key: 'email', header: 'Email' },
        {
            key: 'roles',
            header: 'Roles',
            cell: (item) => item.roles.length > 0 ? item.roles.join(', ') : 'N/A',
        },
        { key: 'status', header: 'Status', cell: (item) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                {item.status}
            </span>
        ) },
        {
            key: 'createdAt',
            header: 'Created At',
            cell: (item) => new Date(item.createdAt).toLocaleDateString(),
        },
    ];

    // Fix: Add explicit return type to ensure type safety for action items.
    const getActionItems = (user: User): ActionItem[] => [
        { label: 'View Profile', icon: 'view', onClick: () => alert(`Viewing ${user.username}`), roles: ['ROLE_MODERATOR'] },
        { label: 'Edit User', icon: 'edit', onClick: () => alert(`Editing ${user.username}`), roles: ['ROLE_ADMIN'] },
        { label: 'Ban User', icon: 'ban', onClick: () => alert(`Banning ${user.username}`), roles: ['ROLE_MODERATOR'], isDanger: true },
    ];
    
    // Fix: Add explicit type to ensure type safety for button actions.
    const buttonActions: ButtonAction[] = [
        { label: 'Create User', onClick: () => alert('Creating user...'), roles: ['ROLE_ADMIN'] },
        { label: 'Export CSV', onClick: () => alert('Exporting...'), roles: ['ROLE_ADMIN'] },
        { label: 'Delete Selected', onClick: () => alert(`Deleting ${selection.numSelected} users...`), roles: ['ROLE_SUPER_ADMIN'], variant: 'danger', disabled: selection.numSelected === 0 },
    ];

    return (
        <Card>
            <FilterBar>
                <Input name="username" placeholder="Search by username..." value={filters.username} onChange={handleFilterChange} icon={<Icon name="search" className="h-4 w-4 text-gray-400" />} />
                <Input name="email" placeholder="Search by email..." value={filters.email} onChange={handleFilterChange} />
                <Select name="role" value={filters.role} onChange={handleFilterChange}>
                    <option value="">All Roles</option>
                    <option value="ROLE_ADMIN">Admin</option>
                    <option value="ROLE_MODERATOR">Moderator</option>
                </Select>
            </FilterBar>

            <Table>
                <TableHead
                    columns={columns}
                    withSelect
                    onSelectAll={selection.handleSelectAll}
                    isAllSelected={selection.isAllSelected}
                    numSelected={selection.numSelected}
                    rowCount={pagination.paginatedData.length}
                />
                <TableBody isEmpty={!loading && filteredUsers.length === 0} colSpan={columns.length + 2}>
                    {loading ? (
                        <tr><td colSpan={columns.length + 2} className="text-center p-4">Loading...</td></tr>
                    ) : (
                        pagination.paginatedData.map(user => (
                            <TableRow key={user.id} isSelected={selection.selected.has(user.id)}>
                                <TableCell className="relative px-7 sm:w-12 sm:px-6">
                                    <TableCheckbox
                                        checked={selection.selected.has(user.id)}
                                        onChange={() => selection.handleSelectOne(user.id)}
                                        aria-label={`Select user ${user.username}`}
                                    />
                                </TableCell>
                                <TableCell isPrimary>{user.username}</TableCell>
                                {columns.slice(1).map(col => (
                                    <TableCell key={String(col.key)}>
                                        {col.cell ? col.cell(user) : user[col.key as keyof User]?.toString()}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <ActionMenu items={getActionItems(user)} />
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

            <ButtonBar actions={buttonActions} />
        </Card>
    );
};

export default UsersPage;