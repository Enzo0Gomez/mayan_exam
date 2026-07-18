import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import { useTasks } from "./hooks/useTasks";
import { useState } from "react";

export default function App() {
  const {
    tasks, loading, error,
    searchTerm, setSearchTerm,
    activeFilter, setActiveFilter,
    handleSaveTask, handleDelete, handleToggle,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My tasks</h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + Add task
          </button>
        </div>

        <SearchBar searchQuery={searchTerm} setSearchQuery={setSearchTerm} />
        <FilterTabs selectedFilter={activeFilter} setSelectedFilter={setActiveFilter} />

        {loading && (
          <p className="text-sm text-gray-400 text-center py-6">Loading tasks...</p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-4">
            {error}
          </p>
        )}

        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggle}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <TaskModal
            task={editingTask}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTask}
          />
        )}
      </div>
    </div>
  );
}