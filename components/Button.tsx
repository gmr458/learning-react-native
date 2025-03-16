import { LucideIcon } from "lucide-react-native";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { palette } from "../theme/palette";

interface ButtonProps extends PressableProps {
    text?: string;
    variant?:
        | "primary"
        | "destructive"
        | "subtle"
        | "ghost"
        | "outline"
        | "default"
        | "link";
    loading?: boolean;
    startIcon?: LucideIcon;
    buttonStyle?: ViewStyle;
    textStyle?: ViewStyle;
}

export function Button({
    text,
    variant = "default",
    loading = false,
    startIcon: StartIcon,
    buttonStyle,
    textStyle,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <Pressable
            disabled={disabled || loading}
            style={({ pressed }) => {
                return [
                    styleSheetButton.base,
                    styleSheetButton[variant],
                    loading ? styleSheetButton.loading : {},
                    disabled ? styleSheetButton.disabled : {},
                    text ? styleSheetButton.text : styleSheetButton.icon,
                    pressed && !loading ? styleSheetButton.pressed : {},
                    buttonStyle,
                ];
            }}
            {...props}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    backgroundColor: "transparent",
                }}
            >
                {StartIcon && !loading ? (
                    <View>
                        {
                            <StartIcon
                                size={16}
                                color={styleSheetButton[variant].color}
                            />
                        }
                    </View>
                ) : null}
                {loading ? (
                    <ActivityIndicator
                        color={styleSheetButton[variant].color}
                        size={16}
                    />
                ) : null}
                {text ? (
                    <Text
                        style={[
                            styleSheetText.base,
                            { color: styleSheetButton[variant].color },
                            variant === "link" ? styleSheetText.link : {},
                            textStyle,
                        ]}
                    >
                        {text}
                    </Text>
                ) : null}
            </View>
        </Pressable>
    );
}

const styleSheetButton = StyleSheet.create({
    base: {
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    text: {
        paddingHorizontal: 16,
    },
    loading: {
        opacity: 0.5,
    },
    disabled: {
        opacity: 0.6,
    },
    pressed: {
        opacity: 0.8,
    },
    primary: {
        backgroundColor: palette.slate_700,
        borderColor: palette.slate_700,
        color: palette.white,
    },
    destructive: {
        backgroundColor: palette.red_600,
        borderColor: palette.red_600,
        color: palette.white,
    },
    subtle: {
        backgroundColor: palette.slate_200,
        borderColor: palette.slate_200,
        color: palette.slate_900,
    },
    ghost: {
        backgroundColor: palette.slate_100,
        borderColor: palette.slate_100,
        color: palette.slate_900,
    },
    outline: {
        borderWidth: 1,
        backgroundColor: palette.white,
        borderColor: palette.slate_200,
        color: palette.slate_900,
    },
    default: {
        backgroundColor: palette.slate_900,
        borderColor: palette.slate_900,
        color: palette.white,
    },
    link: {
        backgroundColor: palette.white,
        borderColor: palette.white,
        color: palette.slate_900,
    },
});

const styleSheetText = StyleSheet.create({
    base: {
        color: palette.white,
        fontFamily: "Inter_500Medium",
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: 0,
    },
    link: {
        textDecorationLine: "underline",
    },
});
