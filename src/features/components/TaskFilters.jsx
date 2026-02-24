import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilter} from "@/features/tasks/taskSlice";
import { Button } from "@/components/ui/button";

const TaskFilters = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.tasks.filter);

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </Button>

        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => dispatch(setFilter("active"))}
        >
          Active
        </Button>

        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </Button>
      </div>
    </>
  );
};

export default TaskFilters;