import React from 'react';

interface TableProps {
  headers: string[];
  rows: { label: string; data: (string | number)[] }[];
}

const CustomTable: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-400 w-full text-left">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-400 px-4 py-2 bg-gray-200 text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-400 px-4 py-2 font-semibold">
                {row.label}
              </td>
              {row.data.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-400 px-4 py-2 text-center"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
