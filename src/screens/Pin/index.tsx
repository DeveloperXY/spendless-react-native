import React from 'react';
import {Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import {useTheme} from "@/src/hooks/useTheme";
import PinCombination from "@/src/screens/Pin/components/PinCombination";
import BackButton from "@/src/components/BackButton";
import {Ionicons} from "@expo/vector-icons";
import {LogoutButton} from "@/src/screens/Pin/components/LogoutButton";
import pressable from "react-native-gesture-handler/src/components/Pressable";

type HeaderProps = {
    title: string;
    subTitle: string;
    style?: StyleProp<ViewStyle>
};

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type KeyboardBtnProps =
    (| { type: "text"; value: string }
        | { type: "icon"; value: IoniconName }) & {
    enabled?: boolean,
    style?: StyleProp<ViewStyle>
};

type KeyboardProps = {
    enabled?: boolean;
    hideFingerprint?: boolean;
    style?: StyleProp<ViewStyle>
};

type ErrorFooterProps = {
    content: string;
    style?: StyleProp<ViewStyle>
};

type PinScreenProps = {
    title: string;
    subTitle: string;
    pin: string;
    showBackBtn?: boolean;
    showLogOutBtn?: boolean;
    error?: string;
};

function PinScreen({showBackBtn = false, showLogOutBtn = false, error, title, subTitle, pin}: PinScreenProps) {
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
                    <PinScreen.Header title={title} subTitle={subTitle}/>
                    <PinCombination pin={pin} containerStyle={{marginTop: 48}}/>
                    <PinScreen.Keyboard/>
                </View>
            </SafeAreaView>

            {error && <PinScreen.ErrorFooter content={error} style={{paddingBottom: insets.bottom}}/>}
        </View>
    );
}

PinScreen.Header = function Header({title, subTitle, style}: HeaderProps) {
    const {theme} = useTheme();
    return <View style={[styles.headerContainer, style]}>
        <Image style={styles.appIcon} source={require("../../../assets/images/spendless-icon.png")}/>
        <Text style={{...styles.header, ...theme.typography.headlineMedium}}>{title}</Text>
        <Text style={{...styles.subheader, ...theme.typography.bodyMedium}}>{subTitle}</Text>
    </View>;
};

PinScreen.Keyboard = function Header({style, enabled = true, hideFingerprint = true}: KeyboardProps) {
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
                        <KeyboardButton key={key} type="text" value={key} enabled={enabled}/>
                    ))}
                </View>
            ))}
            <View style={styles.keyboardRow}>
                <KeyboardButton type="icon" value="finger-print" enabled={enabled}
                                style={{opacity: hideFingerprint ? 0 : 1}}/>
                <KeyboardButton type="text" value="0" enabled={enabled}/>
                <KeyboardButton type="icon" value="backspace" enabled={enabled}/>
            </View>
        </View>
    );
};

function KeyboardButton({style, type, value, enabled}: KeyboardBtnProps) {
    const {theme} = useTheme();
    return <Pressable disabled={!enabled} style={({pressed}) => [
        {
            opacity: enabled ? 1 : 0.4,
        },
        style,
        styles.keyboardButton,
        {
            backgroundColor: pressed ? theme.colors.onPrimaryFixed : theme.colors.primaryFixed
        },
    ]}>
        {({ pressed }) => (
            <>
                {type === "text" && (
                    <Text
                        style={[
                            theme.typography.headlineLarge,
                            { color: pressed ? theme.colors.primaryFixed : theme.colors.onPrimaryFixed },
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
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 48
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
    header: {
        marginTop: 32,
        textAlign: 'center',
    },
    subheader: {
        marginTop: 12,
        textAlign: 'center',
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
    appIcon: {
        marginTop: -16
    },
});
