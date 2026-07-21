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
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="p-6 mx-auto bg-white border border-gray-200 shadow-sm max-w-[20em] rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">My tasks</h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition bg-gray-900 rounded-lg hover:bg-gray-800"
          >
            + Add task
          </button>
        </div>

        <SearchBar searchQuery={searchTerm} setSearchQuery={setSearchTerm} />
        <FilterTabs selectedFilter={activeFilter} setSelectedFilter={setActiveFilter} />

        {loading && (
          <p className="py-6 text-sm text-center text-gray-400">Loading tasks...</p>
        )}
        {error && (
          <p className="px-3 py-2 mt-4 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
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