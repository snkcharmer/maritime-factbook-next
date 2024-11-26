import CustomTable from "@/components/landing/CustomTable";
import { BarChart } from "@mantine/charts";

export default function Resource() {
  const headers = [" ", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  const rows = [
    { label: "GDP", data: [2, 10, 15, 10, 5, 4, 7] },
    { label: "Seaborne Trade", data: [3, 5, 7, 8, 13, 22, 0] }, 
  ];

  const chartData = headers.slice(1).map((year, index) => {
    const dataPoint: Record<string, number | string> = { year }; 
    rows.forEach((row) => {
      dataPoint[row.label] = row.data[index] || 0; 
    });
    return dataPoint;
  });

  return (
    <div className="container mx-auto px-20">
        <div className="mb-20">
          <CustomTable headers={headers} rows={rows} />
        </div>
        <div className="mt-10">
          <BarChart
            h={300}
            data={chartData}
            dataKey="year" 
            withLegend
            series={[
              { name: "GDP", color: "violet.6" },
              { name: "Seaborne Trade", color: "blue.6" },
            ]}
          />
      </div>
    </div>
  );
}
