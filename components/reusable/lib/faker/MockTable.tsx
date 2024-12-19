"use client";
import { Table, ScrollArea } from "@mantine/core";

const MockTable = () => {
  const rows = Array.from({ length: 5 }, (_, i) => (
    <tr key={i}>
      <td>{`Row ${i + 1}`}</td>
      <td>{`Value ${i + 1}`}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table highlightOnHover withColumnBorders withTableBorder withRowBorders>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default MockTable;
