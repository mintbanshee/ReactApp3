// src/services/taskService.ts

import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import type { Task } from "../models/Task";
import type { Category } from "../models/Category";

const tasksCollection = collection(db, "tasks");
const categoriesCollection = collection(db, "taskCategories");

// add a new task to firebase
export async function addTask(task: Task) {
  return await addDoc(tasksCollection, task);
}

// get all tasks from firebase to display in the UI
export async function getTasks(): Promise<Task[]> {
  const snapshot = await getDocs(tasksCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
}

// get a specific task by ID
export async function getTaskById(id: string): Promise<Task | null> {
  const taskDoc = doc(db, "tasks", id);
  const snapshot = await getDoc(taskDoc);
 
  if (!snapshot.exists()) return null;
 
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Task;
}

// get all categories from firebase
export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoriesCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];
}

// edit a task and update it in firebase
export async function updateTask(id: string, task: Task) {
  const taskDoc = doc(db, "tasks", id);
 
  return await updateDoc(taskDoc, {
    title: task.title,
    description: task.description,
    completed: task.completed,
    imageUrl: task.imageUrl,
    category: task.category,
  });
}
 
// delete a task
export async function deleteTask(id: string) {
  const taskDoc = doc(db, "tasks", id);
  return await deleteDoc(taskDoc);
}