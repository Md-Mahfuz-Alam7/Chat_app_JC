import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert } from "react-native";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { scale, verticalScale } from "../../utils/stylling";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Avatar from "../../components/Avatar";
import { Ionicons } from '@expo/vector-icons';
import Typo from "../../components/typo";
import Input from "../../components/Input";
import { useAuth } from "../../context/authContext";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import { updateProfile } from "../../socket/socketEvents";
import * as ImagePicker from 'expo-image-picker';
import { uploadFIleToClodinary } from "../../services/imageService";

const ProfileModal = () => {

    const { user, signOut, updateToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: null,
    });

    useEffect(()=>{
        updateProfile(processUpdateProfile);

        return ()=>{
            updateProfile(processUpdateProfile, true);
        }
    }, []);

    const processUpdateProfile = (res) =>{
        console.log("got res", res);
        setLoading(false);

        if(res.success){
            updateToken(res.data.token);
            router.back();
        }else{
            Alert.alert('User', res.msg);
        }
    }

    useEffect(() => {
        setUserData({
            name: user?.name || "",
            email: user?.email || "",
            avatar: user?.avatar || null,
        });
    }, [user]);

    const onPickImage = async () => {
        try {
            // Request permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images!');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.4, // Reduced quality for faster upload
                exif: false,
            });

            console.log(result);

            if (!result.canceled && result.assets && result.assets[0]) {
                setUserData({ ...userData, avatar: result.assets[0] });
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    }

    const handleLogout = async() => {
        router.back();
        await signOut();
    }
    const showLogoutAlert = () =>{
        Alert.alert("cConfirm", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => console.log("cancel logout"),
            },
            {
                text: "Logout",
                onPress: () => handleLogout(),
                style: 'destructive'
            }
        ])
    }

    const onSubmit = async() => {
        let {name, avatar} = userData;
        if(!name.trim()){
            Alert.alert("Error", "Please enter your name");
            return;
        }

        let data = {
            name: name.trim(),
            avatar
        }

        try {
            if(avatar && avatar?.uri){
                setLoading(true);
                const res = await uploadFIleToClodinary(avatar, "profiles");
                console.log("Upload result:", res);
                if(res.success){
                    data.avatar = res.data;
                }else{
                    Alert.alert("Error", res.msg || "Could not upload avatar");
                    setLoading(false);
                    return;
                }
            }

            updateProfile(data);
        } catch (error) {
            console.log("Error updating profile:", error);
            Alert.alert("Error", "Failed to update profile. Please try again.");
            setLoading(false);
        }
    }
    return (
        <ScreenWrapper isModal={true}>
            <View style={styles.container}>
                <Header
                    title="Update Profile"
                    leftIcon={Platform.OS == 'android' && <BackButton color={colors.black} />}
                    style={{ marginVertical: spacingY._15 }}
                />

                {/* form */}

                <ScrollView contentContainerStyle={styles.form} style={{flex: 1}}>
                    <View style={styles.avatarContainer}>
                        <Avatar uri={userData.avatar} size={170} />
                        <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
                            <Ionicons name="pencil" size={verticalScale(20)} color={colors.neutral800} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ gap: spacingY._20 }}>
                        <View style={styles.inputContainer}>
                            <Typo style={{ paddingLeft: spacingX._10 }}>
                                Email
                            </Typo>
                            <Input
                                value={userData.email}
                                containerStyle={{
                                    borderColor: colors.neutral350,
                                    paddingLeft: spacingX._20,
                                    backgroundColor: colors.neutral300,
                                }}
                                onChangeText={(value) => {
                                    setUserData({ ...userData, email: value })
                                }}
                                editable={false}
                            />

                            <Typo style={{ paddingLeft: spacingX._10 }}>
                                Name
                            </Typo>
                            <Input
                                value={userData.name}
                                containerStyle={{
                                    borderColor: colors.neutral350,
                                    paddingLeft: spacingX._20,
                                    // backgroundColor: colors.neutral300,
                                }}
                                onChangeText={(value) => {
                                    setUserData({ ...userData, name: value })
                                }}
                            // editable={false}
                            />

                        </View>
                    </View>

                </ScrollView>
                
                <View style={styles.footer}>
                        {
                            !loading && (
                                <Button
                                    style={{
                                        backgroundColor: colors.rose,
                                        height: verticalScale(56),
                                        width: verticalScale(56),
                                    }}
                                    onPress={showLogoutAlert}
                                >
                                    <Ionicons name="log-out-outline" size={verticalScale(30)} color={colors.white} />
                                </Button>
                            )
                        }


                        <Button
                            style={{ flex: 1 }} onPress={onSubmit} loading={loading}>
                            <Typo color={colors.black} fontWeight={'700'}>Update</Typo>
                        </Button>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default ProfileModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        gap: scale(12),
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral200,
        marginBottom: spacingY._10,
        borderTopWidth: 1,
    },
    form: {
        gap: spacingY._30,
        marginTop: spacingY._15,
    },
    avatarContainer: {
        position: 'relative',
        alignSelf: 'center',
    },
    avatar: {
        alignSelf: 'center',
        backgroundColor: colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500,
    },
    editIcon: {
        position: 'absolute',
        bottom: spacingY._5,
        right: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: spacingY._7,
    },
    inputContainer: {
        gap: spacingY._7,
    },
});