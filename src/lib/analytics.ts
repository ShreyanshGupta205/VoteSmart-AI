"use client";

import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

/**
 * Logs a custom event to Google Analytics/Firebase
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (analytics && typeof window !== "undefined") {
    try {
      logEvent(analytics, eventName, params);
    } catch (error) {
      console.warn("Analytics log failed:", error);
    }
  }
};

/**
 * Predefined event names for the application
 */
export const APP_EVENTS = {
  CHAT_QUERY: "chat_query",
  VOTER_SIMULATION_START: "voter_simulation_start",
  VOTER_SIMULATION_COMPLETE: "voter_simulation_complete",
  READINESS_SCORE_VIEW: "readiness_score_view",
  LOGIN_SUCCESS: "login_success",
  SIGN_OUT: "sign_out",
  BOOTH_MAP_SEARCH: "booth_map_search",
  DOCUMENT_DOWNLOAD: "document_download",
};
