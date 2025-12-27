import RegisterScreen from "@/src/screens/Register";
import {useAuthStore} from "@/src/stores/authStore";
import {Redirect, router} from "expo-router";
import {useRegisterFlowStore} from "@/src/stores/authFlowStore";

export default function RegisterRoute() {
    const session = useAuthStore((s) => s.session);
    const username = useRegisterFlowStore(state => state.username);
    const setUsername = useRegisterFlowStore(state => state.setUsername);

    if (session) return <Redirect href="/(app)/home" />;

    return <RegisterScreen
        username={username}
        setUsername={setUsername}
        onNext={() => {
            if (!username) return;
            router.push("/(auth)/pin");
        }}
    />;
}
