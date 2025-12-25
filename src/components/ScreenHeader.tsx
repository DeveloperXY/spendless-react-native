import {useTheme} from "@/src/hooks/useTheme";
import {Image, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import React from "react";

type ScreenHeaderProps = {
    title: string;
    subTitle: string;
    hideAppIcon?: boolean;
    style?: StyleProp<ViewStyle>
};

function ScreenHeader({title, subTitle, style, hideAppIcon = false}: ScreenHeaderProps) {
    const {theme} = useTheme();
    return <View style={[styles.headerContainer, style]}>
        {!hideAppIcon && <Image style={styles.appIcon} source={require("../../assets/images/spendless-icon.png")}/>}
        <Text style={{...styles.header, ...theme.typography.headlineMedium}}>{title}</Text>
        <Text style={{...styles.subheader, ...theme.typography.bodyMedium}}>{subTitle}</Text>
    </View>;
}

export default ScreenHeader;

const styles = StyleSheet.create({
    headerContainer: {
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
    appIcon: {
        marginTop: -16
    },
});
