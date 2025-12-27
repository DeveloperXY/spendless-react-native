import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@/src/hooks/useTheme";
import SpendlessButton from "@/src/components/SpendlessButton";
import {Link} from "expo-router";

type RegisterScreenProps = {
    username: string | null;
    setUsername: (username: string) => void;
    onNext: () => void;
};

function Register({username, setUsername, onNext}: RegisterScreenProps) {
    const {theme} = useTheme();

    return (
        <SafeAreaView style={{...styles.root, backgroundColor: theme.colors.background}}>
            <View style={styles.container}>
                <Image style={styles.appIcon} source={require("../../../assets/images/spendless-icon.png")}/>
                <Text style={{...styles.header, ...theme.typography.headlineMedium}}>
                    Welcome to SpendLess!{"\n"}How can we address you ?
                </Text>
                <Text style={{...styles.subheader, ...theme.typography.bodyMedium}}>
                    Create a unique username
                </Text>
                <TextInput
                    onChangeText={setUsername}
                    value={username ?? ""}
                    placeholder="Username"
                    placeholderTextColor={`${theme.colors.onSurface}61`}
                    returnKeyType="next"
                    onSubmitEditing={onNext}
                    cursorColor={theme.colors.primary}
                    selectionColor={`${theme.colors.primary}66`}
                    style={{
                        ...styles.username,
                        ...theme.typography.displayMedium,
                        backgroundColor: `${theme.colors.onBackground}14`,
                        color: theme.colors.onSurface,
                    }}
                />
                <SpendlessButton onPress={onNext} loading={false} disabled={false} label="Next" iconName="arrow-forward"
                                 style={{
                                     marginTop: 16,
                                 }}/>
                <Link style={{
                    ...styles.login,
                    ...theme.typography.titleMedium,
                    color: theme.colors.primary
                }} href={"/(auth)/register"}>Already have an account ?</Link>
            </View>
        </SafeAreaView>
    );
}

export default Register;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 48,
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
    username: {
        marginTop: 32,
        borderRadius: 16,
        width: "100%",
        paddingVertical: 10,
        textAlign: "center",
    },
    login: {
        marginTop: 48,
    },
    appIcon: {
        marginTop: -16
    },
});
