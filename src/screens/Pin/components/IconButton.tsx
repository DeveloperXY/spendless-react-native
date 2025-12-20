import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type IconButtonProps = Omit<PressableProps, "onPress" | "style"> & {
    icon: IoniconName;
    onClick?: () => void;
    iconColor?: string;
    iconSize?: number;
    containerStyle?: StyleProp<ViewStyle>;
    hitSlopSize?: number;
};

export function IconButton({
                               icon,
                               onClick,
                               iconColor,
                               iconSize = 24,
                               containerStyle,
                               hitSlopSize = 10,
                               disabled,
                               ...pressableProps
                           }: IconButtonProps) {
    return (
        <Pressable
            {...pressableProps}
            disabled={disabled}
            onPress={onClick}
            hitSlop={hitSlopSize}
            style={({ pressed }) => [
                {
                    padding: 10,
                    borderRadius: 999,
                    opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
                },
                containerStyle,
            ]}
            accessibilityRole="button"
        >
            <Ionicons name={icon} size={iconSize} color={iconColor} />
        </Pressable>
    );
}
