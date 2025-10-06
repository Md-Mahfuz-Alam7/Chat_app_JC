import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { colors, radius, spacingX, spacingY } from "../../constants/theme";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Avatar from "../../components/Avatar";
import * as ImagePicker from 'expo-image-picker';
import Input from '../../components/Input';
import Typo from '../../components/typo';
import { useAuth } from '../../context/authContext';
import Button from '../../components/Button';
import { verticalScale } from '../../utils/stylling';

const newConversationModal = () => {

    const { isGroup } = useLocalSearchParams();
    const isGroupMode = isGroup == "1";
    const router = useRouter();
    const [groupAvatar, setGroupAvatar] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [isLoading , setIsLoading] = useState(false);

    const {user: currentUser} = useAuth();

    console.log("Is Group :", isGroup); 

    const onPickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
            setGroupAvatar(result.assets[0]);
        }
    }

    const toggleParticipant = (user) =>{
        setSelectedParticipants((prev) => {
            if(prev.includes(user.id)){
               return prev.filter((id) => id!= user.id);
            }
            return [...prev, user.id];
        });
    }
    const onSelectUser = (user) => {
        if(!currentUser){
            Alert.alert("Authentication", "Please login to start a conversation");
            return;
        }
        if(isGroupMode){
            toggleParticipant(user);
        }else{
            // todo : start a new conversation
        }
    }

    const createGroup = async() =>{
        if(!groupName.trim() || !currentUser || selectedParticipants.length<2) return;
        
        // todo: create group 
    }

    const contacts = [
        {
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
            id: 3,
            name: "Emma Williams",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        {
            id: 4,
            name: "James Rodriguez",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        {
            id: 5,
            name: "Olivia Brown",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg"
        },
        {
            id: 6,
            name: "David Kim",
            avatar: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        {
            id: 7,
            name: "Sophia Martinez",
            avatar: "https://randomuser.me/api/portraits/women/7.jpg"
        },
        {
            id: 8,
            name: "Daniel Anderson",
            avatar: "https://randomuser.me/api/portraits/men/8.jpg"
        },
        {
            id: 9,
            name: "Isabella Taylor",
            avatar: "https://randomuser.me/api/portraits/women/9.jpg"
        },
        {
            id: 10,
            name: "Christopher Lee",
            avatar: "https://randomuser.me/api/portraits/men/10.jpg"
        }
    ];
    return (
        <ScreenWrapper isModal={true}>
            <View style={styles.container}>
                <Header
                    title={isGroupMode ? "New Group" : "Select User"}
                    leftIcon={<BackButton color={colors.black} />}
                />

                {
                    isGroupMode && (
                        <View style={styles.groupInfoContainer}>
                            <View style={styles.avatarContainer}>
                                <TouchableOpacity onPress={onPickImage}>
                                    <Avatar
                                        uri={groupAvatar ? groupAvatar.uri : null}
                                        isGroup={true}
                                        size={100}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.groupNameContainer}>
                                <Input
                                    placeholder="Group Name"
                                    value={groupName}
                                    onChangeText={setGroupName}
                                />
                            </View>
                        </View>
                    )
                }

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contactList}
                >
                    {
                        contacts.map((user, index) =>{

                            const isSelected = selectedParticipants.includes(user.id);
                            return(
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.contactRow, isSelected && styles.selectedContact]}
                                    onPress={()=> onSelectUser(user)}
                                >
                                    <Avatar 
                                        size={45}
                                        uri={user.avatar}
                                    />
                                    <Typo fontWeight={'500'}>
                                        {user.name}
                                    </Typo>

                                    {
                                        isGroupMode && (
                                            <View style={styles.selectionIndicator}>
                                                <View style={[styles.checkbox, isSelected && styles.checked]}/>

                                            </View>

                                        )
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                {
                    isGroupMode && selectedParticipants.length>=2 && (
                        <View style={styles.createGroupButton} >
                            <Button
                                onPress={createGroup}
                                disable={!groupName.trim()}
                                loading={isLoading}
                            >   
                                <Typo fontWeight={'bold'} size={17}>
                                    Create Group
                                </Typo>
                            </Button>
                        </View>
                    )
                }
            </View>
        </ScreenWrapper>
    )
}

export default newConversationModal;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacingX._15,
        flex: 1,
    },
    groupInfoContainer: {
        alignItems: "center",
        marginTop: spacingY._10,
    },
    avatarContainer: {
        marginBottom: spacingY._10,
    },
    groupNameContainer: {
        width: "100%",
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._10,
        paddingVertical: spacingY._5,

    },
    selectedContact: {
        backgroundColor: colors.neutral100,
        borderRadius: radius._15,
    },
    contactList: {
        gap: spacingY._12,
        marginTop: spacingY._10,
        paddingTop: spacingY._10,
        paddingBottom: verticalScale(150),
    },
    selectionIndicator: {
        marginLeft: "auto",
        marginRight: spacingX._10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    checked: {
        backgroundColor: colors.primary,
    },
    createGroupButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacingX._15,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.neutral200,
    }
});