import React from "react";
import DayCell from "./DayCell";

const Calendar = ({ currentDate, habits, completedHabits, toggleHabit }) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  return (
    <>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 text-xs sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div
            key={`empty-${i}`}
            className="h-16 sm:h-24 md:h-32 bg-gray-100 rounded"
          ></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateString = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday =
            new Date().toDateString() === new Date(dateString).toDateString();
          return (
            <DayCell
              key={day}
              day={day}
              dateString={dateString}
              isToday={isToday}
              habits={habits}
              completedHabits={completedHabits}
              toggleHabit={toggleHabit}
            />
          );
        })}
      </div>
    </>
  );
};
export default Calendar;
