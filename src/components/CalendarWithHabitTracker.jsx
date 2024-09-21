import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import HabitTracker from "./HabitTracker";
import AddHabitModal from "./AddHabitModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  updateLocalStorage,
} from "./utils/localStorage";

const CalendarWithHabitTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState({});
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const initialHabits = [
    { id: 1, name: "Exercise", icon: "🏋️", color: "bg-blue-500" },
    { id: 2, name: "Read", icon: "📚", color: "bg-green-500" },
    { id: 3, name: "Meditate", icon: "🧘", color: "bg-purple-500" },
  ];

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setHabits(savedData.habits || []);
      setCompletedHabits(savedData.completedHabits || {});
    } else {
      setHabits(initialHabits);
      saveToLocalStorage({ habits: initialHabits, completedHabits: {} });
    }
  }, []);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const addHabit = (newHabit) => {
    const habitWithId = { ...newHabit, id: uuidv4() };
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits, habitWithId];
      saveToLocalStorage({ habits: updatedHabits, completedHabits });
      return updatedHabits;
    });
  };

  const updateHabit = (updatedHabit) => {
    updateLocalStorage((currentData) => {
      const updatedHabits = (currentData.habits || []).map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit
      );
      return { ...currentData, habits: updatedHabits };
    });
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };

  const deleteHabit = (habitId) => {
    updateLocalStorage((currentData) => {
      const updatedHabits = (currentData.habits || []).filter(
        (habit) => habit.id !== habitId
      );
      return { ...currentData, habits: updatedHabits };
    });
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    );
  };

  const toggleHabit = (habitId, day) => {
    updateLocalStorage((currentData) => {
      const key = `${habitId}-${day}`;
      const newCompleted = { ...(currentData.completedHabits || {}) };
      if (newCompleted[key]) {
        delete newCompleted[key];
      } else {
        newCompleted[key] = true;
      }
      return { ...currentData, completedHabits: newCompleted };
    });
    setCompletedHabits((prev) => {
      const newCompleted = { ...prev };
      const key = `${habitId}-${day}`;
      if (newCompleted[key]) {
        delete newCompleted[key];
      } else {
        newCompleted[key] = true;
      }
      return newCompleted;
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen p-2 sm:p-4 md:p-8 flex justify-center items-center">
      <div className="flex flex-col md:flex-row">
        <div className="max-w-full md:max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex-grow mb-4 md:mb-0 md:mr-4">
          <div className="p-2 sm:p-4 md:p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <button
                onClick={prevMonth}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Previous month"
              >
                <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <button
                onClick={nextMonth}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Next month"
              >
                <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <Calendar
              currentDate={currentDate}
              habits={habits}
              completedHabits={completedHabits}
              toggleHabit={toggleHabit}
            />
          </div>
        </div>
        <HabitTracker
          habits={habits}
          onAddHabit={() => {
            setEditingHabit(null);
            setShowAddHabitModal(true);
          }}
          onEditHabit={(habit) => {
            setEditingHabit(habit);
            setShowAddHabitModal(true);
          }}
          onDeleteHabit={deleteHabit}
        />
      </div>
      {showAddHabitModal && (
        <AddHabitModal
          onClose={() => {
            setShowAddHabitModal(false);
            setEditingHabit(null);
          }}
          onSave={editingHabit ? updateHabit : addHabit}
          editingHabit={editingHabit}
        />
      )}
    </div>
  );
};

export default CalendarWithHabitTracker;
