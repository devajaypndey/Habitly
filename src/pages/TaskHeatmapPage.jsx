/* eslint-disable react-hooks/rules-of-hooks */
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useState, useEffect } from "react";
import { editTask, deleteTask } from "@/features/tasks/taskSlice";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Pencil,
  Trash2,
  Check,
  X,
  Flame,
  Trophy,
} from "lucide-react";

const TaskHeatmapPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((t) => t.id === Number(id)),
  );

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!task) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center notion-animate-in">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg font-medium mb-1">Task not found</p>
          <p className="notion-caption mb-4">This habit may have been deleted.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="notion-clickable px-4 py-2 text-sm font-medium"
            style={{ color: "var(--notion-blue)" }}
          >
            ← Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const uniqueDates = [...new Set(task.activity)].sort();

  let longestStreak = 0;
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

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Current streak
  const todayISO = formatLocalDate(new Date());
  let currentStreak = 0;

  if (uniqueDates.includes(todayISO)) {
    currentStreak = 1;
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);
    while (uniqueDates.includes(formatLocalDate(checkDate))) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  // Month details
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();

  // Calendar cells
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(year, month, day);
    const isoDate = formatLocalDate(dateObj);
    calendarDays.push(isoDate);
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(year, month + 1, 1);
    if (
      nextMonth.getFullYear() > today.getFullYear() ||
      (nextMonth.getFullYear() === today.getFullYear() &&
        nextMonth.getMonth() > today.getMonth())
    ) {
      return;
    }
    setCurrentMonth(nextMonth);
  };

  const isFutureDate = (date) => date > todayISO;
  const isToday = (date) => date === todayISO;

  // Editing state
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    dispatch(editTask({ id: task.id, title: editText }));
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigate("/dashboard");
  };

  // Priority label
  const priorityLabel =
    task.priority === "positive"
      ? "Positive"
      : task.priority === "negative"
      ? "Negative"
      : "Neutral";

  const priorityTagClass =
    task.priority === "positive"
      ? "notion-tag-green"
      : task.priority === "negative"
      ? "notion-tag-red"
      : "notion-tag-blue";

  return (
    <div className="min-h-screen bg-background">
      {/* ══════ TOPBAR ══════ */}
      <div className={`notion-topbar ${scrolled ? "scrolled" : ""}`}>
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <button
            onClick={() => navigate(-1)}
            className="notion-icon-btn"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="notion-emoji-icon">🌿</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 rotate-0" />
          <span
            className="text-sm text-muted-foreground hover:text-foreground cursor-pointer truncate"
            onClick={() => navigate("/dashboard")}
          >
            Habitly
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium truncate">{task.title}</span>
        </div>
      </div>

      {/* ══════ COVER ══════ */}
      <div className="w-full h-28" style={{
        background: task.priority === "positive"
          ? "linear-gradient(135deg, #D4E6D9 0%, #E8F4F8 100%)"
          : task.priority === "negative"
          ? "linear-gradient(135deg, #F0D4D4 0%, #F4E8E8 100%)"
          : "linear-gradient(135deg, #D4E0F0 0%, #E8EDF4 100%)",
      }}>
        <div className="dark:hidden" />
      </div>

      {/* ══════ PAGE CONTENT ══════ */}
      <div className="notion-page pb-24 notion-animate-in">
        {/* Page Icon */}
        <div className="notion-page-icon select-none">📅</div>

        {/* Title (editable) */}
        {editing ? (
          <div className="flex items-center gap-2 mb-4">
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="notion-inline-input text-[32px] font-bold flex-1 p-1!"
              style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button onClick={handleSave} className="notion-icon-btn" style={{ color: "var(--notion-green)" }}>
              <Check className="w-4 h-4" />
            </button>
            <button onClick={() => setEditing(false)} className="notion-icon-btn">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <h1 className="notion-title text-[32px] mb-1 group">
            {task.title}
            <button
              onClick={() => setEditing(true)}
              className="inline-flex ml-2 opacity-0 group-hover:opacity-60 transition-opacity"
            >
              <Pencil className="w-4 h-4 text-muted-foreground" />
            </button>
          </h1>
        )}

        {/* Properties */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground w-24 shrink-0">Type</span>
            <span className={`notion-tag ${priorityTagClass}`}>{priorityLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground w-24 shrink-0">Created</span>
            <span className="text-foreground">
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground w-24 shrink-0">Completions</span>
            <span className="text-foreground">{task.activity.length}</span>
          </div>
        </div>

        {/* ══════ DIVIDER ══════ */}
        <div className="notion-divider mb-6" />

        {/* ══════ CALENDAR HEATMAP ══════ */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="notion-icon-btn"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <h2 className="notion-heading text-base">
              {currentMonth.toLocaleString("default", { month: "long" })} {year}
            </h2>

            <button
              onClick={goToNextMonth}
              className="notion-icon-btn"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-center text-[11px] font-medium text-muted-foreground py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={index} />;
              }

              const future = isFutureDate(date);
              const todayCell = isToday(date);
              const count = task.activity.filter((d) => d === date).length;

              // Notion-style green intensity
              let bg = "bg-secondary";
              let textColor = "text-muted-foreground";

              if (count === 1) {
                bg = "";
                textColor = "text-foreground";
              }
              if (count === 2) {
                bg = "";
                textColor = "text-white";
              }
              if (count >= 3) {
                bg = "";
                textColor = "text-white";
              }

              const greenBg =
                count === 1
                  ? "rgba(77, 171, 154, 0.3)"
                  : count === 2
                  ? "rgba(77, 171, 154, 0.55)"
                  : count >= 3
                  ? "rgba(77, 171, 154, 0.85)"
                  : undefined;

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center
                    rounded text-xs font-medium transition-all
                    ${bg} ${textColor}
                    ${future ? "opacity-30" : ""}
                    ${todayCell ? "ring-2 ring-offset-1" : ""}
                  `}
                  style={{
                    ...(greenBg && { background: greenBg }),
                    ...(todayCell && { 
                      '--tw-ring-color': 'var(--notion-blue)',
                      '--tw-ring-offset-color': 'var(--background)',
                    }),
                  }}
                >
                  {new Date(date + 'T00:00:00').getDate()}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════ STREAKS ══════ */}
        {task.activity.length > 0 && (
          <>
            <div className="notion-divider mb-6" />
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-md bg-secondary/60">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4" style={{ color: "var(--notion-orange)" }} />
                  <span className="text-2xl font-semibold">{currentStreak}</span>
                </div>
                <p className="notion-caption text-xs">Current Streak</p>
              </div>

              <div className="p-4 rounded-md bg-secondary/60">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4" style={{ color: "var(--notion-yellow)" }} />
                  <span className="text-2xl font-semibold">{longestStreak}</span>
                </div>
                <p className="notion-caption text-xs">Longest Streak</p>
              </div>
            </div>
          </>
        )}

        {/* Encouragement for empty */}
        {task.activity.length === 0 && (
          <div className="notion-callout mb-8">
            <span className="text-lg">💡</span>
            <p className="notion-caption">
              Start today to begin your streak. Complete this habit from the dashboard.
            </p>
          </div>
        )}

        {/* ══════ DANGER ZONE ══════ */}
        <div className="notion-divider mb-6" />
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Actions
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                         border border-border hover:bg-accent transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                         transition-colors hover:bg-(--notion-red-bg)"
              style={{ color: "var(--notion-red)" }}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHeatmapPage;
