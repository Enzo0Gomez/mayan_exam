import Swal from "sweetalert2";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
    const handleDeleteClick = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete "${task.title}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#111827",
        });

        if (result.isConfirmed) {
            onDelete(task.id);
        }
    };
    return (
        <div
            className={`relative rounded-xl border p-4 flex flex-col gap-3 transition
        ${task.is_completed
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                }`}
        >
            {/* Status badge */}
            <span
                className={`absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full
          ${task.is_completed
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
            >
                {task.is_completed ? "Completed" : "Active"}
            </span>

            {/* Checkbox + title */}
            <div className="flex items-start gap-3 pr-16">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="w-4 h-4 mt-1 cursor-pointer accent-gray-900 shrink-0"
                />
                <div className="min-w-0">
                    <h3
                        className={`text-sm font-semibold truncate ${task.is_completed ? "line-through text-gray-400" : "text-gray-900"
                            }`}
                    >
                        {task.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                        {task.description || "Walang description"}
                    </p>
                </div>
            </div>

            {/* Footer actions */}
            <div className="flex justify-end gap-2 pt-2 mt-1 border-t border-gray-100">
                <button
                    onClick={() => onEdit(task)}
                    className="px-2 py-1 text-xs font-medium text-gray-500 transition rounded-md hover:text-gray-900 hover:bg-gray-100"
                >
                    Edit
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="px-2 py-1 text-xs font-medium text-red-500 transition rounded-md hover:text-red-700 hover:bg-red-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}