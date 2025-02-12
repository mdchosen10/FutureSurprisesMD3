"use client";

import { useState, useEffect } from "react";
const key = "sessionId";
const prefix = "session";

const useSessionId = () => {
  const [sessionId] = useState(() => {
    // Check if the ID already exists in localStorage
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem(key);
      if (storedId) {
        return storedId; // Return the stored ID
      }
      // Generate a new unique ID
      const newId = `${prefix}-${crypto.randomUUID()}`;
      localStorage.setItem(key, newId); // Store it in localStorage
      return newId;
    }
    return null; // Return null or a default value on the server
  });

  useEffect(() => {
    // Ensure localStorage is updated if the ID changes
    if (typeof window !== "undefined") {
      localStorage.setItem(key, sessionId as string);
    }
  }, [sessionId]);

  return sessionId as string;
};

export default useSessionId;
