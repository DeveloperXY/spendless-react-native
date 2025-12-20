import PinScreen from "@/src/screens/Pin";
import {useState} from "react";

export default function RegisterRoute() {
    const [pin, setPin] = useState("");
    const [title, setTitle] = useState("Create PIN");
    const [subTitle, setSubTitle] = useState("You will use this PIN to log into your account.");
    return <PinScreen
        showBackBtn={true}
        title={title}
        pin={pin}
        subTitle={subTitle}
    />;
}
