import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {useTheme} from "@/src/hooks/useTheme";

type PinCombinationProps = {
    pin?: string;
    count?: number;
    dotSize?: number;
    containerStyle?: StyleProp<ViewStyle>;
};

function PinCombination({pin = "", count = 5, dotSize = 18, containerStyle}: PinCombinationProps) {
    const {theme} = useTheme();
    const filledColor = theme.colors.primary;
    const notFilledColor = `${theme.colors.onBackground}14`;
    const dotStyle = (isFilled: boolean) => {
        return [
            styles.dot,
            {
                backgroundColor: isFilled ? filledColor : notFilledColor,
                width: dotSize,
                height: dotSize,
            }
        ]
    };

    return (
        <View style={[containerStyle, styles.root]}>
            {
                pin.toString()
                    .padEnd(count, "-")
                    .slice(0, count)
                    .split("")
                    .map(char => char !== "-")
                    .map(isFilled => dotStyle(isFilled))
                    .map((style, index) => <PinCombination.Dot key={index} style={style}></PinCombination.Dot>)
            }
        </View>
    );
}

PinCombination.Dot = function Dot({style}: { style: StyleProp<ViewStyle> }) {
    return <View style={style}></View>;
}

export default PinCombination;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: "space-between",
        gap: 10,
    },
    dot: {
        borderRadius: 999,
    },
});
