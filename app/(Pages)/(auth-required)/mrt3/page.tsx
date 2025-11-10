'use client';

import React, { useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
} from 'mantine-react-table';
import { Box, Button, Title } from '@mantine/core';

export default function MantineReactTableDemo() {
  // 🔹 Data state (editable)
  const [data, setData] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', age: 28 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 34 },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', age: 45 },
  ]);

  // 🔹 Define columns
  const columns = useMemo<MRT_ColumnDef<typeof data[0]>[]>(
    () => [
      { accessorKey: 'id', header: 'ID', enableEditing: false },
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      { accessorKey: 'age', header: 'Age', mantineEditTextInputProps: { type: 'number' } },
    ],
    []
  );

  // 🔹 Save edits
  const handleSaveCell = (cell: { row: { index: number; }; column: { id: any; }; }, value: any) => {
    setData((old) =>
      old.map((row, i) =>
        i === cell.row.index ? { ...row, [cell.column.id]: value } : row
      )
    );
  };

  // 🔹 Table setup
  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableEditing: true,
    onEditingRowSave: ({ values, row }) => {
      setData((old) =>
        old.map((r, i) => (i === row.index ? { ...r, ...values } : r))
      );
    },
    // onEditingCellSave: handleSaveCell,
    initialState: { pagination: {
      pageSize: 5,
      pageIndex: 0
    } },
  });

  // 🔹 Render
  return (
    <Box p="md">
      <Title order={3} mb="md">
        Editable Employee Table
      </Title>

      <MantineReactTable table={table} />

      <Box mt="md">
        <Button
          onClick={() => alert(JSON.stringify(data, null, 2))}
          variant="light"
        >
          Show Data in Console
        </Button>
      </Box>
    </Box>
  );
}
