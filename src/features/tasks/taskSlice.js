import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  tasks: [],
  filter: "all",
  searchTerm: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, priority } = action.payload;

      state.tasks.push({
        id: Date.now(),
        title,
        priority: priority || "medium",
        createdAt: new Date().toISOString(),
        activity: [], 
      });
    },

    // Log activity for today
    toggleTask: (state, action) => {
      const task = state.tasks.find(
        (t) => t.id === action.payload
      );

      if (!task) return;

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const alreadyLogged = task.activity.includes(today);

      if (alreadyLogged) {
        // remove today's activity (undo)
        task.activity = task.activity.filter(
          (date) => date !== today
        );
      } else {
        task.activity.push(today);
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (t) => t.id !== action.payload
      );
    },

    editTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.title = title;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
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
  setFilter,
  setSearchTerm,
} = taskSlice.actions;

export default taskSlice.reducer;