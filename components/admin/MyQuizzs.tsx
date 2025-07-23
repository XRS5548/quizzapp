"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LoaderThree } from "../ui/loader"
import { toast } from "sonner"

export type Quiz = {
  id: string
  title: string
  description: string
  totalQuestions: number
  createdAt: string
}

export function MyQuizzesTable() {
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([
    // {
    //   id: "quiz1",
    //   title: "React Basics",
    //   description: "Covers hooks, props, and state",
    //   totalQuestions: 10,
    //   createdAt: "2025-07-15",
    // },
  ])

  let [pageReady, setPageReady] = React.useState(false)

  // fuction fetch Quizzss 
  async function FetchQuizz() {
    setPageReady(false)
    const url = "/api/quizzes"
    const response = await fetch(url)
    let data = await response.json()

    if(response.status!=200){
      toast.error("Faild to fetch data ",{
        description:data.error,
        action:<Button variant={'default'} className={""} size={'sm'} asChild onclick={window.location.replace("/login")}>Login</Button>
      })
      return
    }

    console.log(data)
    setQuizzes(data)
    setTimeout(() => {
      setPageReady(true)

    }, 2000);
  }

  React.useEffect(function () {
    FetchQuizz()

  }, [])


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Quiz>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox 
        className={""}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
        className={""}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button className={""} size={"lg"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="text-sm">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "totalQuestions",
      header: () => <div className="text-right">Questions</div>,
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("totalQuestions")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("createdAt")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const quiz = row.original

        const handleView = () => {
          console.log("Viewing quiz:", quiz.id)
        }

        const handleEdit = () => {
          console.log("Editing quiz:", quiz.id)
        }

        const handleDelete = () => {
          setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id))
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={""} variant="outline" size="sm">
                Actions <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={""} align="end">
              <DropdownMenuLabel inset={true} className={""}>Actions</DropdownMenuLabel>
              <DropdownMenuItem inset={true} className={""} onClick={handleView}>View</DropdownMenuItem>
              <DropdownMenuItem inset={true} className={""} onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem inset={true} className={""} onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]



  const table = useReactTable({
    data: quizzes,
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

  return !pageReady ? <div className="flex min-h-screen justify-center items-center"> <LoaderThree /> </div> :

    (
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
          type="search"
            placeholder="Filter quizzes by title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"lg"} variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={""} align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table className={""}>
            <TableHeader className={""}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className={""} key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead className={""} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className={""}>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow className={""} key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className={""} key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className={""}>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No quizzes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
            className={""}
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
            className={""}
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
}
