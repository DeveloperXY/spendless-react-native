import {create} from "zustand";

type ExpensesFormat = "parentheses" | "no_parentheses";
type Currency = "USD" | "EUR";
type Separator = " " | "," | ".";
type DecimalSeparator = Exclude<Separator, " ">;

type RegisterFlowState = {
    username: string;
    pin: string;
    expensesFormat: ExpensesFormat;
    currency: Currency;
    decimalSeparator: DecimalSeparator;
    thousandSeparator: Separator;
}

type RegisterFlowActions = {
    setUsername: (username: string) => void;
    setPin: (pin: string) => void;
    setExpensesFormat: (expensesFormat: ExpensesFormat) => void;
    setCurrency: (currency: Currency) => void;
    setDecimalSeparator: (separator: DecimalSeparator) => void;
    setThousandSeparator: (separator: Separator) => void;
}

const initialRegisterFlowState: RegisterFlowState = {
    username: "",
    pin: "",
    expensesFormat: "no_parentheses",
    currency: "USD",
    decimalSeparator: ".",
    thousandSeparator: ".",
};

export const useRegisterFlowStore = create<RegisterFlowState & RegisterFlowActions>((set) => ({
    ...initialRegisterFlowState,

    setUsername: (username) => set({username}),
    setPin: (pin) => set({pin}),
    setExpensesFormat: (expensesFormat) => set({expensesFormat}),
    setCurrency: (currency) => set({currency}),
    setDecimalSeparator: (separator) => set({decimalSeparator: separator}),
    setThousandSeparator: (separator) => set({thousandSeparator: separator}),
}));
