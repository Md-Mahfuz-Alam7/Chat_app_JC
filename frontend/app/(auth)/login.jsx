import React, { useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Typo from "../../components/typo";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import * as Icons from 'phosphor-react-native';
import { verticalScale } from "../../utils/stylling";
import { useRouter } from "expo-router";
import Button from "../../components/Button";
import { useAuth } from "../../context/authContext";


const Login = () => {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {signIn} = useAuth();

    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Login Up', 'Please fill all the fields');
            return;
        }

        try {
            setIsLoading(true);
            await signIn(emailRef.current, passwordRef.current);
        } catch (error) {
            Alert.alert("Login Error", error.message || error.toString());
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? "padding" : "height"}>
            <ScreenWrapper showPattern={true}>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <BackButton iconSize={28} />
                        <Typo size={17} color={colors.white} >
                            Forgot Your Password?
                        </Typo>
                    </View>

                    <View style={styles.content}>
                        <ScrollView
                            contentContainerStyle={styles.form}
                            showVerticalScrollIndicator={false}>
                            <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                                <Typo size={28} fontWeight="600">Welcome Back</Typo>
                                <Typo color={colors.neutral600}>Please enter your credentials to continue</Typo>
                            </View>

                            <Input
                                placeholder="Enter Your Email"
                                onChangeText={value => emailRef.current = value}
                                icon={<Icons.At
                                    size={verticalScale(26)}
                                    color={colors.neutral600}
                                />}
                            />
                            <Input
                                placeholder="Enter Your Password"
                                secureTextEntry
                                onChangeText={value => passwordRef.current = value}
                                icon={<Icons.Lock
                                    size={verticalScale(26)}
                                    color={colors.neutral600}
                                />}
                            />

                            <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                                <Button loading={isLoading} onPress={handleSubmit}>
                                    <Typo fontWeight={"bold"} color={colors.black} size={20}>Login</Typo>
                                </Button>

                                <View style={styles.footer}>
                                    <Typo color={colors.neutral600}>Don't Have An Account?</Typo>
                                    <Pressable onPress={() => router.push("/(auth)/register")}>
                                        <Typo color={colors.primaryDark} fontWeight={"bold"}>Register</Typo>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScreenWrapper>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    header: {
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._15,
        paddingBottom: spacingY._25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: "continuous",
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._20,
    },
    form: {
        gap: spacingY._15,
        marginTop: spacingY._20,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
});