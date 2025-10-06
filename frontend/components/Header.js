import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Typo from "./typo";

const Header = ({
    title = "",
    leftIcon,
    rightIcon,
    style
}) => {
    return (
        <View style={[styles.contaner, style]}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

            {
                title && (
                    <Typo size={22} fontWeidth={'600'} style={styles.title}>{title}</Typo>
                )
            }

            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    contaner:{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    title: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        zIndex: 10,
    },
    leftIcon:{
        alignSelf: "flex-start",
        zIndex: 20,
    },
    rightIcon: {
        alignSelf: "flex-end",
        zIndex: 30,
    },
});