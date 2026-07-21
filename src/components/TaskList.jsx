import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="py-10 text-sm text-center text-gray-400">No tasks found.</p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}