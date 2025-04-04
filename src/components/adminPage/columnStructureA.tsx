"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { CrisisDataModel, CrisisDataModelWithID } from "@/model/dataInterfaces";

export const ColumnStructureA: ColumnDef<CrisisDataModelWithID>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="text-left truncate">ID</div>,
    /* cell: (props) => (
      <TextCell columnWidth={props.column.getSize()} value={props.getValue()} />
    ),
    size: 100; */
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
  },
  {
    accessorKey: "location",
    header: () => <div className="text-left">Location</div>,
  },
  {
    accessorKey: "severity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-left">Severity</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="text-left"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
  },
  {
    accessorKey: "help",
    header: () => <div className="text-left">Help</div>,
  },
];
