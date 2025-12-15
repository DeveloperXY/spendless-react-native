import {AppColors, LightAppColors} from "@/src/theme/color";
import {AppTypography, Typography} from "@/src/theme/typography";

export type AppTheme = {
    mode: "light" | "dark";
    colors: AppColors;
    typography: Typography;
};

export const lightTheme: AppTheme = {
    mode: "light",
    colors: LightAppColors,
    typography: AppTypography,
};

export const darkTheme: AppTheme = {
    ...lightTheme,
    mode: "dark"
};

export type ThemeMode = AppTheme["mode"];
