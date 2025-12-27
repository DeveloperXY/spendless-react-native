import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useTheme} from "@/src/hooks/useTheme";
import PinCombination from "@/src/screens/Pin/components/PinCombination";
import BackButton from "@/src/components/BackButton";
import {Ionicons} from "@expo/vector-icons";
import {LogoutButton} from "@/src/screens/Pin/components/LogoutButton";
import ScreenHeader from "@/src/components/ScreenHeader";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type KeyboardBtnProps =
    (| { type: "text"; value: string }
        | { type: "icon"; value: IoniconName }) & {
    enabled?: boolean;
    onKeyPress: () => void;
    style?: StyleProp<ViewStyle>;
};

type KeyboardProps = {
    enabled?: boolean;
    hideFingerprint?: boolean;
    onKeyPress: (value: KeyPressValue) => void;
    style?: StyleProp<ViewStyle>
};

type ErrorFooterProps = {
    content: string;
    style?: StyleProp<ViewStyle>
};

export type KeyPressValue = "fingerprint" | "delete" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type PinScreenProps = {
    title: string;
    subTitle: string;
    pin: string;
    onKeyPress: (value: KeyPressValue) => void;
    showBackBtn?: boolean;
    showLogOutBtn?: boolean;
    error?: string;
    pinLength?: number;
};

function PinScreen({
                       showBackBtn = false,
                       showLogOutBtn = false,
                       pinLength = 5,
                       error,
                       title,
                       subTitle,
                       pin,
                       onKeyPress
                   }: PinScreenProps) {
    const {theme} = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.root}>
            <SafeAreaView style={{...styles.root, backgroundColor: theme.colors.background}}>
                <View style={styles.container}>
                    {showBackBtn && <BackButton style={styles.backBtn} onPress={() => console.log("back")}/>}
                    {showLogOutBtn &&
                        <LogoutButton style={[styles.logoutBtn, {backgroundColor: `${theme.colors.error}12`}]}
                                      onClick={() => console.log("logout")}/>}
                    <ScreenHeader title={title} subTitle={subTitle} style={{marginTop: 24}}/>
                    <PinCombination pin={pin} containerStyle={{marginTop: 48}} count={pinLength}/>
                    <PinScreen.Keyboard onKeyPress={onKeyPress}/>
                </View>
            </SafeAreaView>

            {error && <PinScreen.ErrorFooter content={error} style={{paddingBottom: insets.bottom}}/>}
        </View>
    );
}

PinScreen.Keyboard = function Header({
                                         onKeyPress,
                                         style,
                                         enabled = true,
                                         hideFingerprint = true
                                     }: KeyboardProps) {
    const rows = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
    ];

    return (
        <View style={[styles.keyboardContainer, style]}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keyboardRow}>
                    {row.map((key) => (
                        <KeyboardButton key={key} type="text" value={key} enabled={enabled}
                                        onKeyPress={() => onKeyPress(key as KeyPressValue)}/>
                    ))}
                </View>
            ))}
            <View style={styles.keyboardRow}>
                <KeyboardButton
                    type="icon"
                    value="finger-print"
                    enabled={enabled}
                    style={{opacity: hideFingerprint ? 0 : 1}}
                    onKeyPress={() => onKeyPress("fingerprint")}/>
                <KeyboardButton type="text" value="0" enabled={enabled} onKeyPress={() => onKeyPress("0")}/>
                <KeyboardButton type="icon" value="backspace" enabled={enabled}
                                onKeyPress={() => onKeyPress("delete")}/>
            </View>
        </View>
    );
};

function KeyboardButton({style, type, value, enabled, onKeyPress}: KeyboardBtnProps) {
    const {theme} = useTheme();
    return <Pressable disabled={!enabled} onPress={onKeyPress} style={({pressed}) => [
        {
            opacity: enabled ? 1 : 0.4,
        },
        style,
        styles.keyboardButton,
        {
            backgroundColor: pressed ? theme.colors.onPrimaryFixed : theme.colors.primaryFixed
        },
    ]}>
        {({pressed}) => (
            <>
                {type === "text" && (
                    <Text
                        style={[
                            theme.typography.headlineLarge,
                            {color: pressed ? theme.colors.primaryFixed : theme.colors.onPrimaryFixed},
                        ]}
                    >
                        {value}
                    </Text>
                )}

                {type === "icon" && (
                    <Ionicons
                        name={value}
                        size={36}
                        color={pressed ? theme.colors.primaryFixed : theme.colors.onPrimaryFixed}
                    />
                )}
            </>
        )}
    </Pressable>;
};

PinScreen.ErrorFooter = function ErrorFooter({style, content}: ErrorFooterProps) {
    const {theme} = useTheme();
    return <View style={[styles.errorFooterContainer, {backgroundColor: theme.colors.error, paddingTop: 16}, style]}>
        <Text style={{
            ...styles.errorFooterText, ...theme.typography.labelMedium,
            color: theme.colors.onError
        }}>{content}</Text>
    </View>;
};

export default PinScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    errorFooterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    errorFooterText: {
        textAlign: 'center',
    },
    keyboardContainer: {
        marginTop: 48,
        gap: 4,
    },
    keyboardRow: {
        flexDirection: "row",
        gap: 4,
    },
    keyboardButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    container: {
        flex: 1,
        marginTop: 24,
        paddingHorizontal: 24,
        flexDirection: 'column',
        alignItems: 'center',
    },
    backBtn: {
        alignSelf: 'flex-start',
        position: 'absolute',
        marginStart: 16
    },
    logoutBtn: {
        alignSelf: 'flex-end',
        position: 'absolute',
        marginEnd: 16
    },
});
