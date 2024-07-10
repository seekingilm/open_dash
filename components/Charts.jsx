import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const reportsArray = [
    { country: "USA", reports: 150 },
    { country: "Canada", reports: 80 },
    { country: "Germany", reports: 120 },
    { country: "Japan", reports: 200 },
    { country: "Brazil", reports: 90 }
];

function Charts() {
  return (
      <BarChart
        width={500}
        height={300}
        data={reportsArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reports" fill="#8884d8" activeBar={<Rectangle fill="red" stroke="blue" />} />
      </BarChart>
  );
}




export default Charts

