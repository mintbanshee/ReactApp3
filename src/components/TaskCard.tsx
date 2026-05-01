// src/components/TaskCard.tsx

import type { Task } from "../models/Task";
import { Link } from "react-router-dom";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
};

export default function TaskCard({ task, onDelete, onToggleComplete }: Props) {
  const categoryColors: Record<string, string> = {
  errands: "bg-info",
  chores: "bg-success",
  "school-work": "bg-primary",
  appointments: "bg-warning text-dark",
  selfcare: "bg-danger",
};
  return (
    <div className="card h-100 shadow-sm rounded-2">

      {/* 🌿 CATEGORY IMAGE */}
      <img
        src={task.imageUrl}
        className="card-img-top"
        alt={task.category}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/600x400?text=Task";
        }}
      />

      <div className={`card-body ${task.completed ? "opacity-50" : ""}`}>
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
        />
        <h5 className={`card-title ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
          {task.title}
        </h5>
      </div>
        <p className="card-text">{task.description}</p>

        <span className={`badge ${categoryColors[task.category] || "bg-dark"} rounded-pill text-capitalize`}>
          {task.category}
        </span>
      </div>

      <div className={`card-footer bg-white ${task.completed ? "opacity-50" : ""}`}>
        {task.id && (
          <>
            <Link
              to={`/edit/${task.id}`}
              className="btn btn-outline-primary w-100 mb-2"
            >
              Edit
            </Link>

            <button
              className="btn btn-outline-danger w-100"
              onClick={() => onDelete(task.id!)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}