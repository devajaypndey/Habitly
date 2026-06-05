import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilter } from "@/features/tasks/taskSlice";

const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.tasks.filter);

  const filters = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Done" },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-border">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => dispatch(setFilter(f.value))}
          className={`relative px-3 py-2 text-sm font-medium transition-colors ${
            filter === f.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {f.label}
          {/* Active indicator line */}
          {filter === f.value && (
            <span
              className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
              style={{ background: "var(--foreground)" }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;