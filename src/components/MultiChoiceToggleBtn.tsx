import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {useTheme} from "@/src/hooks/useTheme";

type MultiChoiceToggleBtnProps = {
    options: string[],
    selectedIndex?: number,
    onOptionSelected: (index: number) => void;
    style?: StyleProp<ViewStyle>;
}

type MultiChoiceToggleBtnOptionProps = {
    selected?: boolean;
    text: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

function MultiChoiceToggleBtn({options, style, selectedIndex = 0, onOptionSelected}: MultiChoiceToggleBtnProps) {
    const {theme} = useTheme();
    return (
        <View style={[styles.container, style, {backgroundColor: `${theme.colors.primaryContainer}16`}]}>
            {
                options.map((option, index) => (
                    <MultiChoiceToggleBtn.Option key={index} selected={selectedIndex === index} text={option}
                                                 style={styles.option} onPress={() => onOptionSelected(index)}/>
                ))
            }
        </View>
    );
}

MultiChoiceToggleBtn.Option = function Option({text, selected = false, style, onPress}: MultiChoiceToggleBtnOptionProps) {
    const {theme} = useTheme();
    const backgroundColor = selected ? theme.colors.surfaceContainerLowest : "transparent";
    const textColor = selected ? theme.colors.onSurface : theme.colors.onPrimaryFixed;
    return <Pressable
        style={[style, {backgroundColor}]}
        onPress={onPress}
    >
        <View>
            <Text style={[theme.typography.titleMedium, {color: textColor}]}>{text}</Text>
        </View>
    </Pressable>;
}

export default MultiChoiceToggleBtn;

const styles = StyleSheet.create({
    container: {
        padding: 4,
        width: "100%",
        flexDirection: 'row',
        borderRadius: 16,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
    }
});
