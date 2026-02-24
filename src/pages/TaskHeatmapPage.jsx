import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TaskHeatmapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === Number(id)),
  );

  if (!task) {
    return <div className="p-6">Task not found.</div>;
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">{task.title} — Activity</h1>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Heatmap</CardTitle>
          </CardHeader>

          <CardContent>
            {(() => {
              const today = new Date();
              const days = 90;

              const generateDates = () => {
                const dates = [];
                for (let i = days - 1; i >= 0; i--) {
                  const date = new Date();
                  date.setDate(today.getDate() - i);
                  dates.push(date.toISOString().split("T")[0]);
                }
                return dates;
              };

              const dates = generateDates();

              const getIntensity = (date) => {
                const count = task.activity.filter((d) => d === date).length;

                if (count === 0) return "bg-gray-200";
                if (count === 1) return "bg-green-300";
                if (count === 2) return "bg-green-500";
                return "bg-green-700";
              };

              return (
                <div className="grid grid-rows-7 grid-flow-col gap-1">
                  {dates.map((date) => (
                    <div
                      key={date}
                      title={date}
                      className={`w-4 h-4 rounded-sm ${getIntensity(date)}`}
                    />
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskHeatmapPage;
