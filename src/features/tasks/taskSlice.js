import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  tasks: [],
  filter: "all",
  sortBy: "newest",
  searchTerm: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, priority, dueDate } = action.payload;

      state.tasks.push({
        id: Date.now(),
        title,
        completed: false,
        priority: priority || "medium",
        createdAt: new Date().toISOString(),
        completedAt: null,
        dueDate: dueDate || null,
      });

      toast.success("Task added successfully!");
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload
      );

      if (task) {
        task.completed = !task.completed;
        task.completedAt = task.completed
          ? new Date().toISOString()
          : null;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );

      toast.success("Task deleted successfully!");
    },

    editTask: (state, action) => {
      const { id, title } = action.payload;

      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.title = title;
        toast.success("Task updated!");
      }
    },

    clearCompleted: (state) => {
      state.tasks = state.tasks.filter(
        (task) => !task.completed
      );
      toast.success("Completed tasks cleared!");
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  clearCompleted,
  setFilter,
  setSortBy,
  setSearchTerm,
} = taskSlice.actions;

export default taskSlice.reducer;