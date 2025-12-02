import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar } from 'lucide-react';

interface TaskFromBackend {
  id: string;
  name: string;
  start: number; // start week
  duration: number; // weeks
  dependencies?: string[]; // ids of dependent tasks
}

interface GanttChartProps {
  plan: {
    tasks: TaskFromBackend[];
  };
}

interface Task {
  id: string;
  name: string;
  start: number;
  duration: number;
  end: number;
}

const GanttChart = ({ plan }: GanttChartProps) => {
  const tasks: Task[] = useMemo(() => {
    if (!plan?.tasks || plan.tasks.length === 0) return [];

    return plan.tasks.map(task => ({
      id: task.id,
      name: task.name.length > 35 ? task.name.substring(0, 35) + '...' : task.name,
      start: task.start,
      duration: task.duration,
      end: task.start + task.duration,
    }));
  }, [plan]);

  if (tasks.length === 0) {
    return <div className="text-center text-muted-foreground p-6">No tasks available for Gantt chart.</div>;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-neural">
          <p className="font-semibold text-sm mb-1 text-foreground">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            Week {data.start + 1} - {data.end} ({data.duration} weeks)
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (index: number) => {
    const colors = [
      'hsl(195,100%,50%)',
      'hsl(195,90%,55%)',
      'hsl(195,85%,60%)',
      'hsl(180,90%,55%)',
      'hsl(180,85%,60%)',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-neural">
        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Gantt Timeline</h3>
              <p className="text-sm text-muted-foreground">
                Tasks scheduled with durations and dependencies
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <ResponsiveContainer width="100%" height={Math.max(400, tasks.length * 50)}>
            <BarChart
              data={tasks}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,20%,20%)" opacity={0.3} />
              <XAxis
                type="number"
                domain={[0, 'dataMax']}
                label={{ value: 'Weeks', position: 'bottom', fill: 'hsl(215,15%,65%)' }}
                stroke="hsl(215,15%,65%)"
                tick={{ fill: 'hsl(215,15%,65%)' }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={200}
                stroke="hsl(215,15%,65%)"
                tick={{ fill: 'hsl(215,15%,65%)', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220,20%,20%)', opacity: 0.2 }} />
              <Bar dataKey="duration" radius={[0, 8, 8, 0]} animationDuration={800}>
                {tasks.map((task, index) => (
                  <Cell key={task.id} fill={getBarColor(index)} opacity={0.9} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary" />Task Duration
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-primary/60" />Estimated Timeline
          </div>
        </div>
        <div className="p-4 border-t border-border/30 bg-card/30 text-center text-xs text-muted-foreground">
          📊 Timeline is based on AI-generated task durations • Adjust durations as needed
        </div>
      </div>
    </div>
  );
};

export default GanttChart;


