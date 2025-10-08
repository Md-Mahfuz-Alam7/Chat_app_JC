import React, { useState, useEffect } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Typo from '../../components/typo';
import { colors, radius, spacingX, spacingY } from '../../constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/authContext';
import { scale, verticalScale } from '../../utils/stylling';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import * as Icons from 'phosphor-react-native';
import MessageItem from '../../components/MessageItem';
import Input from "../../components/Input";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import Loading from "../../components/Loading";
import { uploadFIleToClodinary } from '../../services/imageService';
import { getMessages, newMessage } from '../../socket/socketEvents';

const Conversation = () => {
    const { user: currentUser } = useAuth();

    const {
        id: conversationId,
        name,
        participants: signifiedParticipants,
        avatar,
        type,
    } = useLocalSearchParams();

    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const participants = JSON.parse(signifiedParticipants);

    let conversationAvatar = avatar;
    let isDirect = type == 'direct';
    const otherParticipant = isDirect ? participants.find((p) => p._id !== currentUser?.id)
        : null;
    if (isDirect && otherParticipant)
        conversationAvatar = otherParticipant.avatar;

    let conversationName = isDirect ? otherParticipant.name : name;
    // console.log("got conversation data:", data);

    useEffect(()=>{
        newMessage(newMessageHandler);
        getMessages(messagesHandler);

        getMessages({conversationId});

        return () => {
           newMessage(newMessageHandler, true);
           getMessages(messagesHandler, true); 
        }
    }, []);

    const newMessageHandler = (res) =>{
        setLoading(false);
        if(res.success) {
            if(res.data.conversationId == conversationId) {
                setMessages((prevMessages) => [res.data, ...prevMessages]);
            }
        }else{
            Alert.alert("Error", res.msg);
        }
    };

    const messagesHandler = (res) => {
        if(res.success) setMessages(res.data);
    }

    // const dummyMessages = [
    //     {
    //         id: 1,
    //         sender: {
    //             id: 2,
    //             name: "Michael Chen",
    //             avatar: null
    //         },
    //         content: "Hey! How are you doing?",
    //         createdAt: "2025-10-07T09:15:00Z",
    //         isMe: false
    //     },
    //     {
    //         id: 2,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "I'm doing great! Just finished my morning workout.",
    //         createdAt: "2025-10-07T09:16:30Z",
    //         isMe: true
    //     },
    //     {
    //         id: 3,
    //         sender: {
    //             id: 2,
    //             name: "Michael Chen",
    //             avatar: null
    //         },
    //         content: "That's awesome! I should start working out too.",
    //         createdAt: "2025-10-07T09:17:45Z",
    //         isMe: false
    //     },
    //     {
    //         id: 4,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "You definitely should! Want to join me tomorrow?",
    //         createdAt: "2025-10-07T09:18:20Z",
    //         isMe: true
    //     },
    //     {
    //         id: 5,
    //         sender: {
    //             id: 3,
    //             name: "Emma Williams",
    //             avatar: null
    //         },
    //         content: "Did anyone see the game last night?",
    //         createdAt: "2025-10-07T10:30:00Z",
    //         isMe: false
    //     },
    //     {
    //         id: 6,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "Yes! It was incredible. That last-minute goal was insane!",
    //         createdAt: "2025-10-07T10:31:15Z",
    //         isMe: true
    //     },
    //     {
    //         id: 7,
    //         sender: {
    //             id: 4,
    //             name: "James Rodriguez",
    //             avatar: null
    //         },
    //         content: "Can someone send me the meeting notes from yesterday?",
    //         createdAt: "2025-10-07T11:00:00Z",
    //         isMe: false
    //     },
    //     {
    //         id: 8,
    //         sender: {
    //             id: 5,
    //             name: "Olivia Brown",
    //             avatar: null
    //         },
    //         content: "I'll send them over in a few minutes!",
    //         createdAt: "2025-10-07T11:02:30Z",
    //         isMe: false
    //     },
    //     {
    //         id: 9,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "Thanks Olivia! You're the best.",
    //         createdAt: "2025-10-07T11:03:00Z",
    //         isMe: true
    //     },
    //     {
    //         id: 10,
    //         sender: {
    //             id: 6,
    //             name: "David Kim",
    //             avatar: null
    //         },
    //         content: "Anyone up for lunch at that new Italian place?",
    //         createdAt: "2025-10-07T12:15:00Z",
    //         isMe: false
    //     },
    //     {
    //         id: 11,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "Count me in! What time?",
    //         createdAt: "2025-10-07T12:16:30Z",
    //         isMe: true
    //     },
    //     {
    //         id: 12,
    //         sender: {
    //             id: 7,
    //             name: "Sophia Martinez",
    //             avatar: null
    //         },
    //         content: "I've been there, the pasta is amazing!",
    //         createdAt: "2025-10-07T12:17:00Z",
    //         isMe: false
    //     },
    //     {
    //         id: 13,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "Perfect! Let's meet at 1 PM then.",
    //         createdAt: "2025-10-07T12:18:45Z",
    //         isMe: true
    //     },
    //     {
    //         id: 14,
    //         sender: {
    //             id: 8,
    //             name: "Daniel Anderson",
    //             avatar: null
    //         },
    //         content: "Has anyone seen my charger? I think I left it in the conference room.",
    //         createdAt: "2025-10-07T13:30:00Z",
    //         isMe: false
    //     },
    //     {
    //         id: 15,
    //         sender: {
    //             id: 1,
    //             name: "You",
    //             avatar: null
    //         },
    //         content: "I saw one there this morning. Check near the projector!",
    //         createdAt: "2025-10-07T13:31:20Z",
    //         isMe: true
    //     }
    // ];

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to upload images!');
        }
    };

    const onPickFile = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: false,
                quality: 0.2,
                exif: false,
            });

            if (!result.canceled) {
                setSelectedFile(result.assets[0]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            alert('Failed to pick image. Please try again.');
        }
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
    };

    const onSend = async () => {
        if (!message.trim() && !selectedFile) return;

        if (!currentUser) return;

        setLoading(true);
        try {
            let attachement = null;
            if (selectedFile) {
                const uploadResult = await uploadFIleToClodinary(
                    selectedFile,
                    "message-attachements"
                );

                if (uploadResult.success) {
                    attachement = uploadResult.data;
                } else {
                    setLoading(false);
                    Alert.alert("Error", "Could not send the image");
                }
            }

            newMessage({
               conversationId,
               sender: {
                id : currentUser?.id,
                name: currentUser.name,
                avatar: currentUser.avatar
               },
               content: message.trim(),
               attachement
            });

            setMessage("");
            setSelectedFile(null);

        } catch (error) {
            console.log("Error sending message:", error);
            Alert.alert("Error", "Failed to send message");
        } finally {
            setLoading(false);
        }
    }
    return (
        <ScreenWrapper showPattern={true} bgOpacity={0.5}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? "padding" : "height"}
                style={styles.container}
            >
                {/* Header */}
                <Header
                    style={styles.header}
                    leftIcon={
                        <View style={styles.headerLeft}>
                            <BackButton />
                            <Avatar
                                size={40}
                                uri={conversationAvatar}
                                isGroup={type == 'group'}
                            />
                            <Typo color={colors.white} fontWeight={'500'} size={22}>
                                {conversationName}
                            </Typo>
                        </View>
                    }
                    rightIcon={
                        <TouchableOpacity style={{ marginBottom: verticalScale(7) }}>
                            <Icons.DotsThreeOutlineVertical
                                weight="fill"
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    }
                />

                {/* messages */}
                <View
                    style={styles.content}
                >
                    <FlatList
                        data={messages}
                        inverted={true}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.messagesContent}
                        renderItem={({ item }) => (
                            <MessageItem
                                item={item}
                                isDirect={isDirect}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />

                    <View style={styles.footer}>
                        <Input
                            value={message}
                            onChangeText={setMessage}
                            containerStyle={{
                                paddingLeft: spacingX._10,
                                paddingRight: scale(65),
                                borderWeight: 0,
                            }}
                            placeholder="Type a message..."
                            icon={
                                <TouchableOpacity style={styles.inputIcon} onPress={onPickFile}>
                                    {selectedFile ? (
                                        <Image
                                            source={{ uri: selectedFile.uri }}
                                            style={styles.iconImage}
                                        />
                                    ) : (
                                        <Icons.Plus
                                            color={colors.black}
                                            weight="bold"
                                            size={verticalScale(22)}
                                        />
                                    )}
                                </TouchableOpacity>
                            }
                        />

                        <View style={styles.inputRightIcon}>
                            <TouchableOpacity style={styles.inputIcon} onPress={onSend}>
                                {
                                    loading ? (
                                        <Loading size="small" color={colors.black} />
                                    ) : (
                                        <Icons.PaperPlaneTilt
                                            color={colors.black}
                                            weight="fill"
                                            size={verticalScale(22)}
                                        />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default Conversation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: spacingX._15,
        paddingTop: spacingY._10,
        paddingBottom: spacingY._15,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._12,
    },
    inputRightIcon: {
        position: "absolute",
        right: scale(10),
        top: verticalScale(15),
        paddingLeft: spacingX._12,
        borderLeftWidth: 1.5,
        borderLeftColor: colors.neutral300,
    },
    selectedFile: {
        position: "absolute",
        height: verticalScale(38),
        width: verticalScale(38),
        borderRadius: radius.full,
        alignSelf: "center",
    },
    content: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: "continuous",
        overflow: "hidden",
        paddingHorizontal: spacingX._15,
    },
    inputIcon: {
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        padding: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    footer: {
        paddingTop: spacingY._7,
        paddingBottom: verticalScale(22),
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        paddingTop: spacingY._20,
        paddingBottom: spacingY._10,
        gap: spacingY._12,
    },
    plusIcon: {
        backgroundColor: colors.primary,
        borderRadius: radius.full,
        padding: 8,
    },
    selectedImageContainer: {
        marginBottom: spacingY._10,
        position: 'relative',
        alignSelf: 'flex-start',
    },
    selectedImage: {
        width: scale(80),
        height: scale(80),
        borderRadius: radius._12,
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: colors.rose,
        borderRadius: radius.full,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 40,
        height: 40,
        borderRadius: radius.full,
        position: 'absolute',
    },
});