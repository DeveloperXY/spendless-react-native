import React from "react";
import {Pressable, StyleProp, ViewStyle} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useTheme} from "@/src/hooks/useTheme";

type LogoutButtonProps = {
    onClick?: () => void;
    style?: StyleProp<ViewStyle>;
    hitSlopSize?: number;
};

export function LogoutButton({
                                 onClick,
                                 style,
                                 hitSlopSize = 10,
                                 ...pressableProps
                             }: LogoutButtonProps) {
    const {theme} = useTheme();
    return (
        <Pressable
            {...pressableProps}
            onPress={onClick}
            hitSlop={hitSlopSize}
            style={({pressed}) => [
                {
                    padding: 16,
                    borderRadius: 18,
                    opacity: pressed ? 0.6 : 1,
                },
                style,
            ]}
        >
            <Ionicons name="log-out" size={24} color={theme.colors.error}/>
        </Pressable>
    );
}
