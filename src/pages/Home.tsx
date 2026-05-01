// src/pages/Home.tsx

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container mt-5">
      <section className="row align-items-center">
        <div className="mb-2 text-center">
          <h1 className="display-4">Welcome to Task Tracker</h1>

          <p className="lead mb-4">
            Stay organized and manage your tasks effectively with our simple but efficient task tracker.<br/> 
            Create, edit, and track your tasks all in one place.
          </p>
          <div className="d-flex justify-content-center mb-4">
            <img
              src="/images/heroImg.jpg"
              alt="an image of a planner, paperclips, highlighter and other organizational tools on a desk"
              className="img-fluid"
              style={{ borderRadius: "10px", width: "800px", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)" }}
            />
          </div>

          <div className="mb-2">
            <Link to="/register" className="btn btn-outline-primary btn-lg">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}