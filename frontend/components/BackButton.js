import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/theme";
import { useRouter } from "expo-router";
import { verticalScale } from "../utils/stylling";
import { Ionicons } from '@expo/vector-icons';

/**
 * @param {BackButtonProps} props
 */
const BackButton = ({
    style,
    iconSize= 26,
    color = colors.white,

}) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
            <Ionicons name="chevron-back" size={verticalScale(iconSize)} color={color} />
        </TouchableOpacity>
    );
};
export default BackButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
    }
});