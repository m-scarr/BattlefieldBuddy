export default (sequelize, DataTypes) => {
    const Combatant = sequelize.define("Combatant", {
        type: {
            type: DataTypes.ENUM('ally', 'neutral', 'foe'),
            defaultValue: 'neutral'
        },
        name: {
            type: DataTypes.STRING,
            defaultName: "New Combatant",
            validate: {
                isNotEmpty(value) {
                    if (value.length < 1) {
                        throw new Error('Value must be have atleast one character.');
                    }
                },
            },
        },
        markerSrc: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./assets/sword.png"
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isBetween(value) {
                    if (value < 1 || value > 1000) {
                        throw new Error('Value must be between 1 and 1000');
                    }
                },
            },
        },
        x: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        visible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isBetween(value) {
                    if (value < 16 || value > 1600) {
                        throw new Error('Value must be between 16 and 1600');
                    }
                },
            },
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isBetween(value) {
                    if (value < 1 || value > 1000) {
                        throw new Error('Value must be between 1 and 1000');
                    }
                },
            },
        },
        remainingMovement: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isBetween(value) {
                    if (value < 1 || value > 1000) {
                        throw new Error('Value must be between 1 and 1000');
                    }
                },
            },
        }
    });
    Combatant.associate = (models) => {
        Combatant.belongsTo(models.Battlefield, {
            as: "battlefield",
            foreignKey: "battlefieldId"
        })
        Combatant.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        })
    };
    Combatant.initializeHooks = (models) => {

    }
    return Combatant;
};
