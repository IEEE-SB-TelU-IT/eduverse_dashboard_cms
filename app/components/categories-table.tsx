'use client'

import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Copy,
  SquarePen,
  Trash,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useIsMobile } from '@/hooks/use-mobile'
import type { Category } from '@/data/categories-data'

const columns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="scale-90 md:scale-100"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="scale-90 md:scale-100"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: 'category_id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 text-xs md:text-sm md:h-10 md:px-4"
        >
          ID
          <ArrowUpDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-mono text-xs md:text-sm text-foreground font-medium">
        {row.getValue('category_id')}
      </div>
    ),
    size: 60,
  },
  {
    accessorKey: 'Category_Name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 text-xs md:text-sm md:h-10 md:px-4 justify-start"
        >
          Category Name
          <ArrowUpDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium text-xs md:text-sm text-foreground max-w-[120px] md:max-w-[200px] truncate leading-tight">
        {row.getValue('Category_Name')}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: 'slug_url',
    header: () => <div className="text-xs md:text-sm">Slug URL</div>,
    cell: ({ row }) => (
      <div className="font-mono text-xs md:text-sm text-muted-foreground max-w-[100px] md:max-w-[150px] truncate leading-tight">
        {row.getValue('slug_url')}
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 text-xs md:text-sm md:h-10 md:px-4"
        >
          Created
          <ArrowUpDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
        {new Date(row.getValue('created_at')).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: '2-digit',
        })}
      </div>
    ),
    size: 90,
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 text-xs md:text-sm md:h-10 md:px-4"
        >
          Updated
          <ArrowUpDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
        {new Date(row.getValue('updated_at')).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: '2-digit',
        })}
      </div>
    ),
    size: 90,
  },
  {
    accessorKey: 'deleted_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 text-xs md:text-sm md:h-10 md:px-4"
        >
          Status
          <ArrowUpDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const deletedAt = row.getValue('deleted_at') as string | null
      return (
        <Badge
          variant="outline"
          className={`text-xs px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 ${
            deletedAt
              ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
              : 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
          }`}
        >
          {deletedAt ? 'Deleted' : 'Active'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      const deletedAt = row.getValue(id) as string | null
      if (value === 'active') return !deletedAt
      if (value === 'deleted') return !!deletedAt
      return true
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId) as string | null
      const statusB = rowB.getValue(columnId) as string | null

      const isActiveA = !statusA
      const isActiveB = !statusB

      if (isActiveA && !isActiveB) return -1
      if (!isActiveA && isActiveB) return 1
      return 0
    },
    size: 80,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 w-7 p-0 md:h-8 md:w-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(category.category_id.toString())
              }
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SquarePen className="mr-2 h-4 w-4" />
              Edit category
            </DropdownMenuItem>
            {category.deleted_at ? (
              <DropdownMenuItem>Restore category</DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete category
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 50,
  },
]

interface CategoriesTableProps {
  data: Category[]
}

export function CategoriesTable({ data }: CategoriesTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const isMobile = useIsMobile()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        updated_at: false,
        slug_url: false,
      })
    } else {
      setColumnVisibility({})
    }
  }, [isMobile])

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-3 py-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <Input
            placeholder="Filter categories..."
            value={
              (table.getColumn('Category_Name')?.getFilterValue() as string) ??
              ''
            }
            onChange={(event) =>
              table
                .getColumn('Category_Name')
                ?.setFilterValue(event.target.value)
            }
            className="h-9 text-sm md:max-w-sm md:h-10"
          />
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 text-xs md:text-sm md:h-10 bg-transparent"
                >
                  Status{' '}
                  <ChevronDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn('deleted_at')?.setFilterValue('')
                  }
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn('deleted_at')?.setFilterValue('active')
                  }
                >
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    Active
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn('deleted_at')?.setFilterValue('deleted')
                  }
                >
                  <span className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    Deleted
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 text-xs md:text-sm md:h-10 bg-transparent"
                >
                  Columns{' '}
                  <ChevronDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id.replace('_', ' ')}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button className="h-9 text-xs md:text-sm md:h-10">
          <Plus className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-max">
            {' '}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="h-10 px-2 text-xs font-medium md:px-4 md:text-sm"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="h-12 md:h-14"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-2 py-2 md:px-4 md:py-3"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-muted-foreground text-sm"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col space-y-3 py-4 md:flex-row md:items-center md:justify-end md:space-x-2 md:space-y-0">
        <div className="text-xs text-muted-foreground md:flex-1 md:text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex justify-center space-x-2 md:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 text-xs md:h-9 md:text-sm"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 text-xs md:h-9 md:text-sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
