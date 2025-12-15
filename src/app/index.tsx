import {Text, View} from "react-native";
import {useTheme} from "@/src/theme/themeProvider";

export default function Index() {
    const {theme} = useTheme();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{...theme.typography.labelSmall}}>Edit app/index.tsx to edit this screen.</Text>
        </View>
    );
}
