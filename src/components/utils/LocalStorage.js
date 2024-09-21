const LOCAL_STORAGE_KEY = "calendarHabitData";

export const saveToLocalStorage = (data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error("Error loading data from localStorage", error);
    return null;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing data from localStorage:", error);
  }
};

export const updateLocalStorage = (updateFunction) => {
  try {
    const currentData = loadFromLocalStorage() || {
      habits: [],
      completedHabits: {},
    };
    const updatedData = updateFunction(currentData);
    saveToLocalStorage(updatedData); // Sử dụng hàm saveToLocalStorage để lưu dữ liệu
  } catch (error) {
    console.error("Error updating localStorage", error);
  }
};
