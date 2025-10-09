import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { colors } from "../constants/theme";
const SplashScreen = () => {
    // Navigation is handled by authContext based on login status

    
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />
            <Animated.Image
                source={require("../assets/splashImage.png")}
                entering={FadeInDown.duration(700).springify()}
                resizeMode="contain"
                style={styles.logo}
            />
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral900,
    },
    logo: {
        height: "23%",
        aspectRatio: 1,
    }
});