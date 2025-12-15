import {Stack} from "expo-router";
import {ThemeProvider} from "@/src/theme/themeProvider";

export default function RootLayout() {
    return <ThemeProvider>
        <Stack/>
    </ThemeProvider>;
}
