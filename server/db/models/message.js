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

// Get last read message via conversation
Message.getLastReadMessage = async function (conversationId, userId) {
  const lastReadMessage = await Message.findAll({
    where: {
      conversationId: {
        [Op.eq]: conversationId,
      },
      senderId: {
        [Op.eq]: userId,
      },
      read: {
        [Op.eq]: true,
      },
    },
    limit: 1,
    order: [["createdAt", "DESC"]],
  });

  return lastReadMessage?.[0];
};

module.exports = Message;
