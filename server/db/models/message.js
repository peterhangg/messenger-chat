const { Sequelize, Op } = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// return the unread message count via conversation
Message.getUnreadMessageCount = async function (conversationId, userId) {
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

module.exports = Message;
