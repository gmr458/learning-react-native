import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "./components/Main";
import { palette } from "./theme/palette";

export default function App() {
    let [fontsLoaded] = useFonts({ Inter_500Medium });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar style="light" />
                <Main />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: palette.zinc_200,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
    },
});
