import React, { createContext, useContext, useMemo } from "react";
import { lightTheme, AppTheme, ThemeMode } from "./theme";

type ThemeContextValue = {
    theme: AppTheme;
    mode: ThemeMode;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

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

