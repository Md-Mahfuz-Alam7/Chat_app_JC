// TypeScript types/interfaces removed for JavaScript compatibility

import { Router } from "expo-router";
import { ReactNode } from "react";
import {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

// Example: TypoProps as JSDoc
/**
 * @typedef {Object} TypoProps
 * @property {number} [size]
 * @property {string} [color]
 * @property {string} [fontWeight]
 * @property {*} children
 * @property {TextStyle} [style]
 * @property {TextProps} [textProps]
 */

// Example: UserProps as JSDoc
/**
 * @typedef {Object} UserProps
 * @property {string} email
 * @property {string} name
 * @property {string|null} [avatar]
 * @property {string} [id]
 */

// Example: UserDataProps as JSDoc
/**
 * @typedef {Object} UserDataProps
 * @property {string} name
 * @property {string} email
 * @property {*} [avatar]
 */

/**
 * @typedef {Object} InputProps
 * @property {ReactNode} [icon]
 * @property {ViewStyle} [containerStyle]
 * @property {TextStyle} [inputStyle]
 * @property {React.RefObject<TextInput>} [inputRef]
 */

/**
 * @typedef {Object} DecodedTokenProps
 * @property {UserProps} user
 * @property {number} exp
 * @property {number} iat
 */

/**
 * @typedef {Object} AuthContextProps
 * @property {string|null} token
 * @property {UserProps|null} user
 * @property {function(string, string): Promise<void>} signIn
 * @property {function(string, string, string, string=): Promise<void>} signUp
 * @property {function(): Promise<void>} signOut
 * @property {function(string): Promise<void>} updateToken
 */

/**
 * @typedef {Object} ScreenWrapperProps
 * @property {ViewStyle} [style]
 * @property {ReactNode} children
 * @property {boolean} [isModal]
 * @property {boolean} [showPattern]
 * @property {number} [bgOpacity]
 */

/**
 * @typedef {Object} ResponseProps
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [msg]
 */

/**
 * @typedef {Object} ButtonProps
 * @property {ViewStyle} [style]
 * @property {function(): void} [onPress]
 * @property {boolean} [loading]
 * @property {ReactNode} children
 */

/**
 * @typedef {Object} BackButtonProps
 * @property {ViewStyle} [style]
 * @property {string} [color]
 * @property {number} [iconSize]
 */

/**
 * @typedef {Object} AvatarProps
 * @property {number} [size]
 * @property {string|null} uri
 * @property {ViewStyle} [style]
 * @property {boolean} [isGroup]
 */

/**
 * @typedef {Object} HeaderProps
 * @property {string} [title]
 * @property {ViewStyle} [style]
 * @property {ReactNode} [leftIcon]
 * @property {ReactNode} [rightIcon]
 */

/**
 * @typedef {Object} ConversationListItemProps
 * @property {ConversationProps} item
 * @property {boolean} showDivider
 * @property {boolean} [isGroup]
 * @property {Router} router
 */

/**
 * @typedef {Object} ConversationProps
 * @property {string} _id
 * @property {"direct"|"group"} type
 * @property {string|null} avatar
 * @property {Array<{_id: string, name: string, avatar: string, email: string}>} participants
 * @property {string} [name]
 * @property {{_id: string, content: string, senderId: string, type: "text"|"image"|"file", attachement?: string, createdAt: string}} [lastMessage]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} MessageProps
 * @property {string} id
 * @property {{id: string, name: string, avatar: string|null}} sender
 * @property {string} content
 * @property {string|null} [attachment] // Fixed typo
 * @property {boolean} [isMe]
 * @property {string} createdAt
 */