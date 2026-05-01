// src/pages/TaskList.tsx

import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import type { Task } from "../models/Task";
import { deleteTask, getTasks, updateTask } from "../services/taskService";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";


export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const userTasks = tasks.filter((task) => task.userId === user?.uid);
  const hasCompleted = userTasks.some((task) => task.completed);

  // redirect to login if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // load tasks on component mount
  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);
  
  // delete a task and refresh the list
  async function handleDelete(id: string) {
    await deleteTask(id);

    // Refresh the task list after deletion
    const Tasks = await getTasks();
    setTasks(Tasks);
  }
  
  // toggle task completion status and update the list
  async function handleToggleComplete(task: Task) {
    if (!task.id) return;

    // Update the task's completed status
    await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    // Refresh the task list after updating
    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === task.id 
        ? { ...currentTask, completed: !currentTask.completed } 
        : currentTask)
    );
  }

  // clear all completed tasks
  async function handleClearCompleted() {
    const completedTasks = userTasks.filter((task) => task.completed);

    // Delete each completed task
    for (const task of completedTasks) {
      if (task.id) {
        await deleteTask(task.id);
      }
    }
    // Refresh the task list after deletion
    setTasks((currentTasks) => 
      currentTasks.filter((task) => !task.completed));
  }

  return (
    <main className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <h1 className="mb-4">Your Task Tracker</h1>
        <p className="lead mb-4">
          A little organization today makes tomorrow feel lighter.
        </p>

        <div className="d-flex gap-5 mb-4 justify-content-center">

          {hasCompleted && (
            <button
              className="btn btn-outline-danger"
              onClick={handleClearCompleted} >
              Clear Completed
            </button>
          )}
      
          <Link to="/add" className="btn btn-primary">
            Add Task
          </Link>
        </div>
      </div>

      
      {loading && <p>Loading tasks...</p>}

    <div className="row g-4">
      {userTasks.map((task) => (
        <div className="col-md-4" key={task.id}>
          <TaskCard
            task={task}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        </div>
       ))}
    </div>
  </main>
  );
}
