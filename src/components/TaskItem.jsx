import Swal from "sweetalert2";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
    const handleDeleteClick = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete "${task.title}". This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#111827",
        });
        if (result.isConfirmed) onDelete(task.id);
    };

    return (
        <div className="flex items-center gap-3 py-3">
            <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => onToggleComplete(task.id)}
                className="w-4 h-4 accent-gray-900 cursor-pointer"
            />
            <div className="flex-1 min-w-0">
                <p
                    className={`text-sm font-medium truncate ${task.is_completed ? "line-through text-gray-400" : "text-gray-900"
                        }`}
                >
                    {task.title}
                </p>
                <p className="text-xs text-gray-500 truncate">{task.description}</p>
            </div>
            <button
                onClick={() => onEdit(task)}
                className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1"
            >
                Edit
            </button>
            <button
                onClick={handleDeleteClick}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1"
            >
                Delete
            </button>
        </div>
    );
}