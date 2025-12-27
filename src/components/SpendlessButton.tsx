import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@/src/hooks/useTheme";

type SpendlessButtonProps = Omit<PressableProps, "disabled" | "children"> & {
    label: string;
    disabled?: boolean;
    loading?: boolean;
    iconName?: React.ComponentProps<typeof Ionicons>["name"];
    style?: StyleProp<ViewStyle>;
};

export default function SpendlessButton(
    {
        label,
        disabled = false,
        loading = false,
        iconName,
        style,
        onPress,
        ...props
    }: SpendlessButtonProps
) {
    const {theme} = useTheme();

    const bgEnabled = theme.colors.primary;
    const bgDisabled = `${theme.colors.onSurface}14`; // ~8% opacity
    const pressedOpacity = 0.85;

    const contentColor = disabled
        ? `${theme.colors.onSurface}61` // ~38%
        : (theme.colors.onPrimary ?? "#fff");

    return (
        <Pressable
            {...props}
            onPress={disabled || loading ? undefined : onPress}
            disabled={disabled}
            style={({pressed}) => [
                styles.root,
                {backgroundColor: bgEnabled},

                // pressed only depends on disabled (not loading)
                !disabled && pressed && {opacity: pressedOpacity},

                // disabled style only when disabled
                disabled && {backgroundColor: bgDisabled},

                style,
            ]}
        >
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="small" color={contentColor}/>
                ) : (
                    <>
                        <Text style={[styles.label, {color: contentColor}, theme.typography.titleMedium]}>{label}</Text>
                        {iconName ? (
                            <Ionicons name={iconName} size={16} color={contentColor}/>
                        ) : null}
                    </>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingVertical: 16,
        borderRadius: 16,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        minHeight: 20,
    },
    label: {
        fontSize: 16,
    },
});
