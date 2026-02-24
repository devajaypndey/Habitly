import { useAppDispatch } from "@/app/hooks";
import { toggleTask } from "@/features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CircleCheckBig, Flame } from "lucide-react";

const TaskItem = ({ task }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const doneToday = task.activity.includes(today);

  // 🔥 Mini Streak Calculation
  const uniqueDates = [...new Set(task.activity)].sort();
  let streak = 0;

  if (uniqueDates.includes(today)) {
    streak = 1;
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);

    while (
      uniqueDates.includes(
        checkDate.toISOString().split("T")[0]
      )
    ) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  // 🎨 Priority Border
  const priorityBorder =
    task.priority === "negative"
      ? "border-l-4 border-red-500"
      : task.priority === "positive"
      ? "border-l-4 border-yellow-500"
      : "border-l-4 border-gray-300";

  return (
    <Card
      className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-md ${priorityBorder} ${
        doneToday
          ? "bg-green-50/40 dark:bg-green-900/20"
          : ""
      }`}
      onClick={() => navigate(`/task/${task.id}`)}
    >
      <div className="flex items-center justify-between">
        
        {/* Left Section */}
        <div>
          <h3
            className={`text-lg font-semibold ${
              doneToday ? "text-green-600" : ""
            }`}
          >
            {task.title}
          </h3>

          {/* 🔥 Mini Streak Badge */}
          {streak > 0 && (
            <div className="flex items-center gap-1 mt-1 text-sm text-orange-500">
              <Flame className="w-4 h-4" />
              <span>{streak} day streak</span>
            </div>
          )}
        </div>

        {/* Right Section → Mark Done */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleTask(task.id));
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all
            ${
              doneToday
                ? "bg-green-500 text-white shadow-md"
                : "bg-muted hover:bg-muted/70"
            }`}
        >
          <CircleCheckBig className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
};

export default TaskItem;