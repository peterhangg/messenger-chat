const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids
Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

// return the unread message count via conversation
Conversation.getUnreadMessageCount = async function (conversationId, userId) {
  const unreadMessageCount = await Message.count({
    where: {
      conversationId: {
        [Op.eq]: conversationId,
      },
      senderId: {
        [Op.ne]: userId,
      },
      read: {
        [Op.eq]: false,
      },
    },
  });
  return unreadMessageCount;
};

module.exports = Conversation;
