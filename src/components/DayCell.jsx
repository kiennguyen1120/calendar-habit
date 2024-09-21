const DayCell = ({
  day,
  dateString,
  isToday,
  habits,
  completedHabits,
  toggleHabit,
}) => (
  <div
    className={`h-${16 + habits.length * 4} sm:h-${
      24 + habits.length * 4
    } md:h-${
      32 + habits.length * 4
    } p-1 sm:p-2 border rounded transition-all duration-300 ${
      isToday ? "bg-blue-100 border-blue-300" : "bg-white hover:bg-gray-50"
    }`}
  >
    <div className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2">{day}</div>
    <div
      className={`space-y-1 overflow-y-auto max-h-${
        12 + habits.length * 4
      } sm:max-h-${20 + habits.length * 4} md:max-h-${28 + habits.length * 4}`}
    >
      {habits.map((habit) => (
        <button
          key={habit.id}
          onClick={() => toggleHabit(habit.id, dateString)}
          className={`w-full text-left text-xs p-0.5 sm:p-1 rounded transition-all duration-300 ${
            completedHabits[`${habit.id}-${dateString}`]
              ? `${habit.color} text-white`
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          aria-label={`${
            completedHabits[`${habit.id}-${dateString}`]
              ? `Mark ${habit.name} as incomplete`
              : `Mark ${habit.name} as complete`
          }`}
        >
          <span role="img" aria-label={habit.name}>
            {habit.icon}
          </span>
          <span className="ml-1 truncate">{habit.name}</span>
        </button>
      ))}
    </div>
  </div>
);
export default DayCell;
