'use client';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface NegotiationsChartProps {
  closed: number;
  middle: number;
  starting: number;
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
  percentage?: string;
}

const NegotiationsChart = ({ closed, middle, starting }: NegotiationsChartProps) => {
  const total = closed + middle + starting;

  const data: PieChartData[] = [
    { name: 'Finishing', value: closed, color: '#6366f1', percentage: (total > 0 ? ((closed / total) * 100).toFixed(0) : '0') },
    { name: 'Middle', value: middle, color: '#34d399', percentage: (total > 0 ? ((middle / total) * 100).toFixed(0) : '0') },
    { name: 'Starting', value: starting, color: '#f472b6', percentage: (total > 0 ? ((starting / total) * 100).toFixed(0) : '0') },
  ];

  const totalPercentage = total > 0 ? Math.round((closed / total) * 100) : 0;

  return (
    <div className="w-full h-80 flex items-center bg-[#202437] rounded-xl shadow-lg p-4">
      <div className="flex-shrink-0 mr-8">
        <h2 className="text-white text-lg ml-8 mt-4"><span className="font-bold">Negotiations</span></h2>
        <PieChart width={280} height={280}>
          <Pie
            data={data}
            cx={140}
            cy={140}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="flex flex-col justify-center">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center mb-2">
            <span className="text-white font-bold text-2xl mr-2">{entry.percentage}%</span>
            <span className="text-gray-400 text-sm">{entry.name}</span>
            <div className="w-4 h-4 rounded-full ml-2" style={{ backgroundColor: entry.color }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NegotiationsChart;