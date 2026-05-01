// src/services/authService.ts

import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Function to register a new user with email and password
export function registerUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Function to log in an existing user with email and password
export function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Function to log out the currently authenticated user
export function logoutUser() {
  return signOut(auth);
}