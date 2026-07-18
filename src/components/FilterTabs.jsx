export default function FilterTabs({ selectedFilter, setSelectedFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedFilter(filter)}
          className={`px-4 py-1.5 text-sm rounded-lg font-medium transition ${
            selectedFilter === filter
              ? "bg-gray-900 text-white"
              : "bg-transparent text-gray-600 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}