import { Eye } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const RadarChartComponent = ({
  title,
  data,
  cols
}: {
  title: string;
  data: any;
  cols: number;
}) => {
  return (
    <div
      className="overflow-hidden rounded border border-stone-300"
      style={{ gridColumn: `span ${cols}` }}
    >
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <Eye /> {title}
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis className="text-xs font-bold" dataKey="feature" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mobile"
              dataKey="mobile"
              stroke="#18181b"
              fill="#18181b"
              fillOpacity={0.2}
            />
            <Radar
              name="Desktop"
              dataKey="desktop"
              stroke="#5b21b6"
              fill="#5b21b6"
              fillOpacity={0.2}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
