import { create } from "zustand";

export type Session = { userId: string };

type AuthState = {
    session: Session | null;
    signIn: () => void;
    signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    session: null,

    signIn: () => set({ session: { userId: "user_123" } }),

    signOut: () => set({ session: null }),
}));
