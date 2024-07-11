import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const ipReportsArray = [
  { ip: "192.168.1.1", reports: 150 },
  { ip: "192.168.1.2", reports: 80 },
  { ip: "192.168.1.3", reports: 120 },
  { ip: "192.168.1.4", reports: 200 },
  { ip: "192.168.1.5", reports: 90 }
];

function Ipchart() {
  return (
      <BarChart
        width={500}
        height={200}
        data={ipReportsArray}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ip" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reports" fill="#8884d8" activeBar={<Rectangle fill="red" stroke="blue" />} />
      </BarChart>
  );
}

export default Ipchart
