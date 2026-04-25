"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/lib/store";
import { saveUserProgress, getUserProgress } from "@/lib/db";

export function DataSync() {
  const { user } = useAuth();
  const store = useStore();
  const initialSyncRef = useRef(false);

  // Sync FROM Firestore on login
  useEffect(() => {
    if (user && !initialSyncRef.current) {
      const fetchAndSync = async () => {
        const data = await getUserProgress(user.uid);
        if (data) {
          // Update store with cloud data
          if (data.score > store.score) {
            useStore.setState({
              score: data.score,
              hasTakenQuiz: data.hasTakenQuiz,
              checklistCompleted: data.checklistCompleted,
              hasSimulated: data.hasSimulated,
              problemsSolved: data.problemsSolved || [],
              firstTimeVoter: data.firstTimeVoter,
              selectedState: data.selectedState,
              selectedDistrict: data.selectedDistrict,
            });
          }
        }
        initialSyncRef.current = true;
      };
      fetchAndSync();
    }
  }, [user, store.score]);

  // Sync TO Firestore on change
  useEffect(() => {
    if (user && initialSyncRef.current) {
      const timer = setTimeout(() => {
        saveUserProgress(user.uid, {
          score: store.score,
          hasTakenQuiz: store.hasTakenQuiz,
          checklistCompleted: store.checklistCompleted,
          hasSimulated: store.hasSimulated,
          problemsSolved: store.problemsSolved,
          firstTimeVoter: store.firstTimeVoter,
          selectedState: store.selectedState,
          selectedDistrict: store.selectedDistrict,
        });
      }, 2000); // Debounce saves
      return () => clearTimeout(timer);
    }
  }, [user, store.score, store.hasTakenQuiz, store.checklistCompleted, store.hasSimulated, store.problemsSolved, store.firstTimeVoter, store.selectedState, store.selectedDistrict]);

  return null;
}
