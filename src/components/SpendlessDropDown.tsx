import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform, StyleProp, ViewStyle,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {useTheme} from "@/src/hooks/useTheme";

export type SpendlessDropdownOptionItem = {
    value: string;
    label: string;
};

interface DropDownProps {
    data: SpendlessDropdownOptionItem[];
    onChange: (item: SpendlessDropdownOptionItem) => void;
    placeholder: string;
    style?: StyleProp<ViewStyle>;
}

export default function SpendlessDropdown({ data, onChange, placeholder, style }: DropDownProps) {
    const {theme} = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState("");

    const buttonRef = useRef<View>(null);

    // position + size of dropdown (in screen coords)
    const [dropdownTop, setDropdownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);
    const [dropdownWidth, setDropdownWidth] = useState(0);

    // Select first option by default
    useEffect(() => {
        if (!value && data.length > 0) {
            setValue(data[0].label);
            onChange(data[0]);
        }
    }, [data, value, onChange]);

    const openDropdown = useCallback(() => {
        // Measure button in WINDOW (screen) coordinates
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownLeft(x);
            setDropdownWidth(width);

            const offset = Platform.OS === "android" ? 2 : 6;
            setDropdownTop(y + height + offset);

            setExpanded(true);
        });
    }, []);

    const closeDropdown = useCallback(() => setExpanded(false), []);

    const onSelect = useCallback(
        (item: SpendlessDropdownOptionItem) => {
            onChange(item);
            setValue(item.label);
            closeDropdown();
        },
        [onChange, closeDropdown]
    );

    return (
        <>
            <View style={[styles.currentValueContainer, style]} ref={buttonRef}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={openDropdown}>
                    <Text style={[styles.text, theme.typography.bodyMedium]}>{value || placeholder}</Text>
                    <Ionicons name={expanded ? "caret-up-sharp" : "caret-down-outline"} size={18} />
                </TouchableOpacity>
            </View>

            <Modal visible={expanded} transparent animationType="fade">
                {/* Tap outside to close */}
                <TouchableWithoutFeedback onPress={closeDropdown}>
                    <View style={styles.backdrop}>
                        {/* Stop taps inside the dropdown from closing it */}
                        <TouchableWithoutFeedback>
                            <View
                                style={[
                                    styles.options,
                                    {
                                        top: dropdownTop,
                                        left: dropdownLeft,
                                        width: dropdownWidth,
                                    },
                                ]}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.optionItem}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    currentValueContainer: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
    },
    backdrop: {
        flex: 1,
        backgroundColor: "transparent",
    },
    options: {
        position: "absolute",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        maxHeight: 250,

        // optional shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 6,
    },
    optionItem: {
        height: 40,
        justifyContent: "center",
    },
    separator: {
        height: 4,
    },
    text: {
        fontSize: 15,
        opacity: 0.8,
    },
    button: {
        height: 50,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 16,
    },
});
