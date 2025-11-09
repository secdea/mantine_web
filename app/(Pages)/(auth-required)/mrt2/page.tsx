'use client';

import React, { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, Title } from '@mantine/core';
import 'mantine-react-table/styles.css'; //import MRT styles

export default function MantineReactTableDemo() {
  // 1️⃣ Define columns
  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'firstName', header: 'First Name' },
      { accessorKey: 'lastName', header: 'Last Name' },
      { accessorKey: 'age', header: 'Age' },
    ],
    []
  );

  // 2️⃣ Define data
  const data = useMemo(
    () => [
      { id: 1, firstName: 'John', lastName: 'Doe', age: 28 },
      { id: 2, firstName: 'Jane', lastName: 'Smith', age: 34 },
      { id: 3, firstName: 'Michael', lastName: 'Johnson', age: 45 },
    ],
    []
  );

  // 3️⃣ Create the table instance
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableStickyHeader: true,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  // 4️⃣ Render table
  return (
    <Box p="md">
      <Title order={3} mb="md">
        Employee List
      </Title>
      <MantineReactTable table={table} />
    </Box>
  );
}
