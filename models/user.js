export default (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        type: {
            type: DataTypes.ENUM('admin', 'user', 'moderator'),
            defaultValue: 'user'
        },
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [8, 255],
                noSpaces(value) {
                    if (value.includes(' ')) {
                        throw new Error('Username cannot contain spaces.');
                    }
                },
            },
            unique: true,
            allowNull: false
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./assets/default_profile_pic.png"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    });
    User.associate = (models) => {
        User.hasMany(models.Battlefield, {
            as: "battlefields",
            foreignKey: "userId"
        });
        User.hasMany(models.Combatant, {
            as: "combatants",
            foreignKey: "userId"
        });
        User.hasMany(models.Message, { as: "sentMessages", foreignKey: "senderId" });
        User.hasMany(models.Message, { as: "recievedMessages", foreignKey: "recipientId" });
    };
    User.initializeHooks = (models) => {

    }
    return User;
};
