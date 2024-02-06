export default (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
    }, {
        timestamps: false,
    });
    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            as: 'sender',
            foreignKey: "senderId"
        });
        Message.belongsTo(models.User, {
            as: 'recipient',
            foreignKey: "recipientId"
        });
    };
    Message.initializeHooks = (models) => {

    }
    return Message;
};
