import React, { createContext, useContext, useMemo } from "react";
import { lightTheme, AppTheme, ThemeMode } from "./theme";

type ThemeContextValue = {
    theme: AppTheme;
    mode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const value = useMemo<ThemeContextValue>(
        () => ({
            theme: lightTheme,
            mode: "light" as const,
        }),
        []
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
