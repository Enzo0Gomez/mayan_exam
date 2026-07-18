const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function getTasks(search = "", filter = "all") {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (filter && filter !== "all") params.append("status", filter);

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  return handleResponse(response);
}

export async function addTask(taskData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

export async function updateTask(id, taskData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
}

export async function toggleTaskStatus(id, isCompleted) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_completed: isCompleted }),
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return true;
}