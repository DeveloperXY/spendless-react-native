import PinScreen, {KeyPressValue} from "@/src/screens/Pin";
import {useEffect, useState} from "react";
import {useRegisterFlowStore} from "@/src/stores/authFlowStore";
import {router} from "expo-router";

export default function RegisterRoute() {

    const setFinalPin = useRegisterFlowStore(state => state.setPin);

    const [isConfirmingPin, setIsConfirmingPin] = useState(false);
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [title, setTitle] = useState("Create PIN");
    const [subTitle, setSubTitle] = useState("You will use this PIN to log into your account.");
    const [error, setError] = useState<string | undefined>(undefined);

    const pinLength = 5;

    const handlePinChange = (value: KeyPressValue) => {
        if (isConfirmingPin) {
            if (value === "delete") {
                if (pin2.length > 0) setPin2(pin2.slice(0, -1));
            } else if (value === "fingerprint") {
                // fingerprint
            } else {
                if (pin2.length < pinLength) {
                    setPin2(pin2 + value);
                }
            }
        } else {
            if (value === "delete") {
                if (pin1.length > 0) setPin1(pin1.slice(0, -1));
            } else if (value === "fingerprint") {
                // fingerprint
            } else {
                setPin1(pin1 + value);
            }
        }
    };

    useEffect(() => {
        if (pin1.length === pinLength) {
            setIsConfirmingPin(true);
            setTitle("Repeat your PIN");
            setSubTitle("Enter your PIN again");
        }
    }, [pin1]);

    useEffect(() => {
        if (pin2.length === pinLength) {
            if (pin1 !== pin2) {
                setError("PINs don't match. Try again.");
                setPin2("");
                setTimeout(() => setError(undefined), 5000);
            } else {
                setFinalPin(pin2);
                router.push("/(auth)/register_preferences");
            }
        }
    }, [pin1, pin2, setFinalPin]);

    useEffect(() => {
        console.log(pin1, pin2);
    }, [pin1, pin2]);

    return <PinScreen
        showBackBtn={true}
        title={title}
        onKeyPress={handlePinChange}
        pinLength={pinLength}
        pin={isConfirmingPin ? pin2 : pin1}
        error={error}
        subTitle={subTitle}
    />;
}
