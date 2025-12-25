import React, {useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@/src/hooks/useTheme";
import BackButton from "@/src/components/BackButton";
import ScreenHeader from "@/src/components/ScreenHeader";
import MultiChoiceToggleBtn from "@/src/components/MultiChoiceToggleBtn";
import SpendlessButton from "@/src/components/SpendlessButton";
import SpendlessDropdown, {SpendlessDropdownOptionItem} from "@/src/components/SpendlessDropDown";

const expenseFormats = ["-$10", "($10)"];
const decimalSeparators = ["1.00", "1,00"];
const thousandsSeparators = ["1.000", "1,000", "1 000"];
const currencies: SpendlessDropdownOptionItem[] = [
    {label: "$  US Dollar (USD)", value: "USD"},
    {label: "€  Euro (EUR)", value: "EUR"},
]

function RegisterPreferencesScreen({}) {
    const {theme} = useTheme();
    const [selectedExpenseFormat, setSelectedExpenseFormat] = useState(0);
    const [selectedDecimalSeparator, setSelectedDecimalSeparator] = useState(0);
    const [selectedThousandsSeparator, setSelectedThousandsSeparator] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

    return (
        <SafeAreaView style={{...styles.root, backgroundColor: theme.colors.background}}>
            <View style={styles.container}>
                <BackButton style={styles.backBtn} onPress={() => console.log("back")}/>
                <ScreenHeader hideAppIcon={true} title="Set SpendLess to your preferences"
                              subTitle="You can change it at any times in settings."/>
                <View style={[styles.amountOverview, {backgroundColor: theme.colors.surfaceContainerLowest}]}>
                    <Text style={[theme.typography.headlineLarge]}>-$10,382.45</Text>
                    <Text style={[theme.typography.bodyMedium]}>spent this month</Text>
                </View>
                <OptionHeader text="Expenses format" style={{marginTop: 24}}/>
                <MultiChoiceToggleBtn selectedIndex={selectedExpenseFormat} onOptionSelected={setSelectedExpenseFormat}
                                      options={expenseFormats} style={{marginTop: 4}}/>

                <OptionHeader text="Currency" style={{marginTop: 16}}/>
                <SpendlessDropdown data={currencies} onChange={setSelectedCurrency} placeholder="Select a currency..." style={{marginTop: 4}}/>

                <OptionHeader text="Decimal separator" style={{marginTop: 16}}/>
                <MultiChoiceToggleBtn selectedIndex={selectedDecimalSeparator}
                                      onOptionSelected={setSelectedDecimalSeparator} options={decimalSeparators}
                                      style={{marginTop: 4}}/>
                <OptionHeader text="Thousands separator" style={{marginTop: 16}}/>
                <MultiChoiceToggleBtn selectedIndex={selectedThousandsSeparator}
                                      onOptionSelected={setSelectedThousandsSeparator} options={thousandsSeparators}
                                      style={{marginTop: 4}}/>
                <SpendlessButton label="Start Tracking !" style={{marginTop: 36}} loading={false}/>
            </View>
        </SafeAreaView>
    );
}

function OptionHeader({text, style}: { text: string, style?: StyleProp<ViewStyle> }) {
    const {theme} = useTheme();
    return <Text style={[styles.optionHeader, theme.typography.labelSmall, style]}>{text}</Text>;
}

export default RegisterPreferencesScreen;

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
    backBtn: {
        alignSelf: 'flex-start',
    },
    amountOverview: {
        width: "100%",
        padding: 24,
        marginTop: 24,
        alignItems: 'center',
        borderRadius: 24,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.05,
        shadowRadius: 16,

        // Android shadow
        elevation: 6,
    },
    optionHeader: {
        width: "100%",
    }
});
