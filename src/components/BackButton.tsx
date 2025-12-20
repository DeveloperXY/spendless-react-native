import React from 'react';
import {StyleProp, ViewStyle} from "react-native";
import {useTheme} from "@/src/hooks/useTheme";
import {IconButton} from "@/src/screens/Pin/components/IconButton";

type BackButtonProps = {
    style?: StyleProp<ViewStyle>;
    iconSize?: number;
    onPress?: () => void;
}

function BackButton({iconSize = 24, onPress, style}: BackButtonProps) {
    const {theme} = useTheme();
    return (
        <IconButton containerStyle={style}
                    icon="arrow-back"
                    iconSize={iconSize}
                    onClick={onPress}
                    iconColor={theme.colors.onSurface}/>
    );
}

export default BackButton;
