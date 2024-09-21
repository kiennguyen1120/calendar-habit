import React from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";

const HabitTracker = ({ habits, onAddHabit, onEditHabit, onDeleteHabit }) => (
  <div className="w-full md:w-64 bg-gray-800 text-white p-4 rounded-lg">
    <h3 className="text-lg sm:text-xl font-bold mb-4">Habit Tracker</h3>
    <div className="space-y-4">
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`text-xl sm:text-2xl rounded p-1 ${habit.color}`}
              role="img"
              aria-label={habit.name}
            >
              {habit.icon}
            </span>
            <span className="font-medium text-sm sm:text-base">
              {habit.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEditHabit(habit)}
              className="text-blue-400 hover:text-blue-300 focus:outline-none"
              aria-label={`Edit ${habit.name}`}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDeleteHabit(habit.id)}
              className="text-red-500 hover:text-red-400 focus:outline-none"
              aria-label={`Delete ${habit.name}`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
    <button
      onClick={onAddHabit}
      className="mt-4 sm:mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 sm:py-2.5 px-4 rounded transition duration-300 flex items-center justify-center text-sm sm:text-base"
      aria-label="Add new habit"
    >
      <FaPlusCircle className="mr-2" /> Add Habit
    </button>
  </div>
);
export default HabitTracker;
