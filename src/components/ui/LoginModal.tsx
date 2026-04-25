"use client";

import { m, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithGoogle, loading } = useAuth();

  const handleSignIn = async () => {
    await signInWithGoogle();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Modal */}
          <m.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md px-4"
          >
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Decorative gradient top bar */}
              <div className="h-1.5 w-full flex">
                <div className="flex-grow bg-[#FF9933]" />
                <div className="flex-grow bg-white border-y border-gray-200" />
                <div className="flex-grow bg-[#138808]" />
              </div>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-brand-500/30 mx-auto mb-4">
                    V
                  </div>
                  <h2 id="login-modal-title" className="text-2xl font-black font-display tracking-tight text-foreground">
                    Welcome to <span className="gradient-text">VoteSmart AI</span>
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    Sign in to save your progress and readiness score across devices.
                    <br />
                    <span className="font-semibold text-foreground">Completely optional</span> — you can use the app without signing in.
                  </p>
                </div>

                {/* Google Sign-In button */}
                <button
                  id="google-signin-btn"
                  onClick={handleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-2xl font-bold text-foreground hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Sign in with Google"
                >
                  {/* Google logo SVG */}
                  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Privacy note */}
                <p className="text-center text-[11px] text-muted-foreground/60 mt-5 leading-relaxed">
                  🔒 We only access your name and profile picture. No personal voting data is ever stored or shared.
                </p>

                {/* Skip button */}
                <button
                  onClick={onClose}
                  className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  aria-label="Continue without signing in"
                >
                  Continue without signing in →
                </button>
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
