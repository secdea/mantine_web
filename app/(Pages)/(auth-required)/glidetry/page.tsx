"use client";

import { ColorSchemeToggle } from "@/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/components/Welcome/Welcome";
import * as React from "react";
import DataEditor, { GridCellKind, Item } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";

export default function HomePage() {

  // Define how many columns and rows
  const columns = React.useMemo(
    () => [
      { title: "ID", id: "id" },
      { title: "Name", id: "name" },
      { title: "Age", id: "age" },
    ],
    []
  );

  const getCellContent = React.useCallback((cell: Item) => {
    const [col, row] = cell;
    switch (col) {
      case 0:
        return { kind: GridCellKind.Text, data: `${row + 1}`, displayData: `${row + 1}` };
      case 1:
        return { kind: GridCellKind.Text, data: `User ${row + 1}`, displayData: `User ${row + 1}` };
      case 2:
        return { kind: GridCellKind.Number, data: 20 + row, displayData: `${20 + row}` };
      default:
        return { kind: GridCellKind.Text, data: "", displayData: "" };
    }
  }, []);

  return (
    <>
      <h1>Sample of Glide Data Grid</h1>

      <div style={{ height: "400px", width: "100%" }}>
        <DataEditor
          columns={columns}
          getCellContent={getCellContent}
          rows={50}
        />
      </div>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}


