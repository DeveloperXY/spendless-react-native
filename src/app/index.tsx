import {Text, View} from "react-native";
import {useTheme} from "@/src/hooks/useTheme";
import {Redirect} from "expo-router";

export default function Index() {
    const {theme} = useTheme();
    return <Redirect href="/auth/register"/>;
    // return (
    //     <View
    //         style={{
    //             flex: 1,
    //             justifyContent: "center",
    //             alignItems: "center",
    //         }}
    //     >
    //         <Text style={{...theme.typography.labelSmall}}>Edit app/index.tsx to edit this screen</Text>
    //     </View>
    // );
}
