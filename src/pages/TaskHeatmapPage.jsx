import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TaskHeatmapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === Number(id)),
  );

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  if (!task) {
    return <div className="p-6">Task not found.</div>;
  }

  const uniqueDates = [...new Set(task.activity)].sort();

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = new Date(uniqueDates[i - 1]);
    const curr = new Date(uniqueDates[i]);

    const diff = (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak);

  // Current streak calculation
  const todayISO = new Date().toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayISO = yesterday.toISOString().split("T")[0];

  if (uniqueDates.includes(todayISO)) {
    currentStreak = 1;

    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);

    while (uniqueDates.includes(checkDate.toISOString().split("T")[0])) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  } else {
    currentStreak = 0;
  }

  // Month details
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // Generate calendar cells
  const calendarDays = [];

  // Empty cells before month start
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Real days
  for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(year, month, day);
    const isoDate = dateObj.toISOString().split("T")[0];
    calendarDays.push(isoDate);
  }

  const getColor = (date) => {
    if (!date) return "";

    const count = task.activity.filter((d) => d === date).length;

    if (count === 0) return "bg-gray-200";
    if (count === 1) return "bg-green-300";
    if (count === 2) return "bg-green-500";
    return "bg-green-700";
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(year, month + 1, 1);

    // Do not allow navigating to future month
    if (
      nextMonth.getFullYear() > today.getFullYear() ||
      (nextMonth.getFullYear() === today.getFullYear() &&
        nextMonth.getMonth() > today.getMonth())
    ) {
      return;
    }

    setCurrentMonth(nextMonth);
  };

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
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={goToPreviousMonth}>
                ←
              </Button>

              <CardTitle>
                {currentMonth.toLocaleString("default", {
                  month: "long",
                })}{" "}
                {year}
              </CardTitle>

              <Button variant="outline" onClick={goToNextMonth}>
                →
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Weekday labels */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-sm text-center text-muted-foreground">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date, index) => (
                <div
                  key={index}
                  className={`h-16 flex flex-col items-center justify-center rounded-md text-sm ${
                    date ? getColor(date) : ""
                  }`}
                >
                  {date && new Date(date).getDate()}
                </div>
              ))}
            </div>

            {/* Streak Section */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {currentStreak}
                </p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-2xl font-bold text-green-700">
                  {longestStreak}
                </p>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskHeatmapPage;
