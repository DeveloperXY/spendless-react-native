export type FontWeightToken = "400" | "500" | "600" | "700";

export type TextVariant = {
    fontFamily: string;
    fontWeight: FontWeightToken;
    fontSize: number;
    lineHeight: number;
};

export type Typography = {
    displayLarge: TextVariant;    // 45 / 52 / SemiBold
    displayMedium: TextVariant;   // 36 / 44 / SemiBold
    headlineLarge: TextVariant;   // 32 / 40 / SemiBold
    headlineMedium: TextVariant;  // 28 / 34 / SemiBold
    titleLarge: TextVariant;      // 20 / 26 / SemiBold
    titleMedium: TextVariant;     // 16 / 24 / SemiBold
    titleSmall: TextVariant;      // 14 / 20 / Medium
    labelMedium: TextVariant;     // 16 / 24 / Medium
    labelSmall: TextVariant;      // 14 / 20 / Medium
    bodyMedium: TextVariant;      // 16 / 24 / Regular
    bodySmall: TextVariant;       // 14 / 20 / Medium

    // ExtendedTypography
    bodyExtraSmall: TextVariant;  // 12 / 16 / Medium
};

export const AppTypography: Typography = {
    displayLarge: {fontFamily: "Figtree", fontWeight: "600", fontSize: 45, lineHeight: 52},
    displayMedium: {fontFamily: "Figtree", fontWeight: "600", fontSize: 36, lineHeight: 44},
    headlineLarge: {fontFamily: "Figtree", fontWeight: "600", fontSize: 32, lineHeight: 40},
    headlineMedium: {fontFamily: "Figtree", fontWeight: "600", fontSize: 28, lineHeight: 34},

    titleLarge: {fontFamily: "Figtree", fontWeight: "600", fontSize: 20, lineHeight: 26},
    titleMedium: {fontFamily: "Figtree", fontWeight: "600", fontSize: 16, lineHeight: 24},
    titleSmall: {fontFamily: "Figtree", fontWeight: "500", fontSize: 14, lineHeight: 20},

    labelMedium: {fontFamily: "Figtree", fontWeight: "500", fontSize: 16, lineHeight: 24},
    labelSmall: {fontFamily: "Figtree", fontWeight: "500", fontSize: 14, lineHeight: 20},

    bodyMedium: {fontFamily: "Figtree", fontWeight: "400", fontSize: 16, lineHeight: 24},
    bodySmall: {fontFamily: "Figtree", fontWeight: "500", fontSize: 14, lineHeight: 20},

    bodyExtraSmall: {fontFamily: "Figtree", fontWeight: "500", fontSize: 12, lineHeight: 16},
};
