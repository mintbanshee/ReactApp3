// src/models/Task.ts

export type Task = {
  id?: string;
  title: string;
  category: string;
  description: string;
  completed: boolean;
  imageUrl: string;
  userId: string;
};