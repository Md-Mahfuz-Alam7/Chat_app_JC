import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import React from "react";
import { AuthProvider } from "../context/authContext";

const StackLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(main)" />
            {/* <Stack.Screen
                name="(main)/profileModal"
                options={{
                    presentation: "modal",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="(main)/newConversationModal"
                options={{
                    presentation: "modal",
                    headerShown: false,
                }}
            /> */}
        </Stack>
    );
};

const RootLayout = () => {
    return (
        <AuthProvider>
            <StackLayout/>
        </AuthProvider>
    );
};

export default RootLayout;

const styles = StyleSheet.create({});
