import react, { use } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/theme";
import { useRouter } from "expo-router";
import {CaretLeftIcon} from 'phosphor-react-native';
import { verticalScale } from "../utils/stylling";

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
        <TouchableOpacity onpPress={() => router.back()} style={[styles.button, style]}>
            <CaretLeftIcon size={verticalScale(iconSize)} color={color} weight="bold"/>
        </TouchableOpacity>
    );
};
export default BackButton;

const styles = StyleSheet.create({
    button: {

    }
});