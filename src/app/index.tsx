import { Redirect } from "expo-router";
import {useAuthStore} from "@/src/stores/authStore";

export default function Index() {
    const session = useAuthStore((s) => s.session);

    // If you're logged out, go to auth. If logged in, go to app.
    return <Redirect href={session ? "/(app)/home" : "/(auth)/register"} />;
}
