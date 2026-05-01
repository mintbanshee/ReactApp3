// src/pages/EditTask.tsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getTaskById, updateTask } from "../services/taskService";
import type { Task } from "../models/Task";
import type { Category } from "../models/Category";

// component to edit an existing task 
export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    completed: false,
    userId: "",
  });

  // load task data on component mount
  useEffect(() => {
    async function loadTask() {
      if (!id) return;

      const data = await getTaskById(id);
 
      if (data) {
        setTask(data);
      }
    }
 
    loadTask();

  }, [id]);

  // hold the list of categories for the category dropdown
  const [categories, setCategories] = useState<Category[]>([]);

  // load categories on component mount
  useEffect(() => {
    async function loadCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    loadCategories();
  }, []);

  // handle input changes and update the task state
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  }

  // handle category selection from dropdown
  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;

    const selectedCategory = categories.find(
      (cat) => cat.value === selectedValue
    );

    if (!selectedCategory) return;

    // update task with selected category and its image URL
    // img URL is based on the category value
    setTask({
      ...task,
      category: selectedCategory.value,
      imageUrl: selectedCategory.imageUrl,
    });
  }

  // handle form submission
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!id) return;

    await updateTask(id, task);
    navigate("/tasks");
  }

  return (
    <div>
      <main className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <h1 className="mb-4">Edit A Task</h1>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-3 rounded-3 width-100 mx-auto" style={{ maxWidth: "650px" }}>

          <input
            className="form-control mb-3"
            name="title"
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
            required />

          <textarea
            className="form-control mb-3"
            name="description"
            placeholder="Task Description"
            value={task.description}
            onChange={handleChange} />

          <select
            className="form-control mb-3"
            name="category"
            value={task.category}
            onChange={handleCategoryChange}
            required >
            <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
          </select>
          {task.imageUrl && (
            <img id="category-image"
              src={task.imageUrl}
              alt="Selected category"
              className="img-fluid mb-3"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
          )}

          <button type="submit" className="btn btn-primary">
            Update Task
          </button>
        </form>
        </div>
      </main>
    </div>
  );
}
