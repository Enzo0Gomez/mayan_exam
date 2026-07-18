// src/hooks/useTasks.js
import { useState, useEffect, useCallback } from "react";
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
} from "../services/taskService";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    // Fetch tasks tuwing magbabago ang search o filter
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTasks(searchTerm, activeFilter);
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, activeFilter]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);


    const handleSaveTask = async (taskData) => {
        try {
            if (taskData.id) {
                await updateTask(taskData.id, taskData);
            } else {
                await addTask(taskData);
            }
            await fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggle = async (id) => {
        const target = tasks.find((task) => task.id === id);
        if (!target) return;

        try {
            await toggleTaskStatus(id, !target.is_completed);
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, is_completed: !task.is_completed } : task
                )
            );
        } catch (err) {
            setError(err.message);
            Swal.fire('May problema', err.message, 'error');
        }
    };

    return {
        tasks,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
        handleSaveTask,
        handleDelete,
        handleToggle,
    };
}