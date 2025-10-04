import { StyleSheet, Text, View, StatusBar, } from "react-native";
import React, { use, useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { colors } from "../constants/theme";
import { useRouter } from "expo-router";
const SplashScreen = () => {
    // const router = useRouter();
    // useEffect(() => {
    //     setTimeout(() => {
    //         router.replace("/(auth)/welcome");
    //     }, 1500);
    // }, []);

    
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
    },
});