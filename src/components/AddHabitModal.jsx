import React, { useState, useEffect } from "react";

const AddHabitModal = ({ onClose, onSave, editingHabit }) => {
  const [habitName, setHabitName] = useState("");
  const [habitIcon, setHabitIcon] = useState("");
  const [habitColor, setHabitColor] = useState("bg-blue-500");

  useEffect(() => {
    if (editingHabit) {
      setHabitName(editingHabit.name);
      setHabitIcon(editingHabit.icon);
      setHabitColor(editingHabit.color);
    }
  }, [editingHabit]);

  const handleSave = () => {
    if (habitName && habitIcon) {
      onSave({
        id: editingHabit ? editingHabit.id : undefined,
        name: habitName,
        icon: habitIcon,
        color: habitColor,
      });
      onClose();
    }
  };

  const iconOptions = [
    "🏋️",
    "📚",
    "🧘",
    "🏃",
    "💻",
    "🎨",
    "🎵",
    "🍎",
    "💤",
    "🚰",
    "🌱",
    "🧠",
    "🎯",
    "🧪",
    "🎸",
    "🖌️",
    "🌞",
    "🍳",
    "🌊",
    "🚴",
  ];
  const colorOptions = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
          {editingHabit ? "Edit Habit" : "Add New Habit"}
        </h3>
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Habit name"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">
            Select an icon:
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {iconOptions.map((icon, index) => (
              <button
                key={index}
                onClick={() => setHabitIcon(icon)}
                className={`text-2xl p-2 rounded ${
                  habitIcon === icon ? "bg-indigo-100" : "hover:bg-gray-100"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">
            Select a color:
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                onClick={() => setHabitColor(color)}
                className={`w-8 h-8 rounded-full ${color} ${
                  habitColor === color
                    ? "ring-2 ring-offset-2 ring-gray-400"
                    : ""
                }`}
              ></button>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium"
          >
            {editingHabit ? "Update Habit" : "Add Habit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
