"use client";

import React, { FC } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps {
  headers: any;
  data: any[];
  headerClass?: string;
  type?: string;
  handleRowClick?: Function;
  hoverEffect?: boolean;
}

const BasicTable: FC<TableProps> = ({
  data,
  headers,
  headerClass = "",
  handleRowClick = () => {},
  type = "",
  hoverEffect = false,
}) => {
  const defaultColumns: ColumnDef<any>[] = headers;

  const table = useReactTable({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="hide-scrollbar overflow-x-scroll">
      <table
        className={`w-full font-mainText ${
          type === "striped" ? "striped" : ""
        }`}
      >
        <thead className={headerClass}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup?.id}>
              {headerGroup?.headers?.map(header => (
                <th key={header?.id} className="text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              onClick={() => {
                let id = data.find(
                  (_, index) => index.toString() === row.id,
                )?.id;
                handleRowClick(id);
              }}
              className={
                hoverEffect
                  ? "hover:cursor-pointer hover:opacity-[0.8]"
                  : ""
              }
              key={row.id}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="text-left">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
