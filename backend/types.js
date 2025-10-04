// JSDoc typedefs for Mongoose models

/**
 * @typedef {import("mongoose").Document} Document
 * @typedef {import("mongoose").Types.ObjectId} ObjectId
 */

/**
 * @typedef {Object} UserProps
 * @property {string} email
 * @property {string} password
 * @property {string} [name]
 * @property {string} [avatar]
 * @property {Date} [created]
 */

/**
 * @typedef {Object} ConversationProps
 * @property {ObjectId} _id
 * @property {"direct"|"group"} type
 * @property {string} [name]
 * @property {ObjectId[]} participants
 * @property {ObjectId} [lastMessage]
 * @property {ObjectId} [createdBy]
 * @property {string} [avatar]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */