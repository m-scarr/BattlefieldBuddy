export default (sequelize, DataTypes) => {
    const Battlefield = sequelize.define("Battlefield", {
        name: {
            type: DataTypes.STRING,
            defaultValue: "New Battlefield"
        },
        turn: {
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
        gridCellPixelSize: {
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
        gridCellActualSize: {
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
        gridOffsetX: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isBetween(value) {
                    if (value < 0 || value > 1600) {
                        throw new Error('Value must be between 0 and 1600');
                    }
                },
            },
        },
        gridOffsetY: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isBetween(value) {
                    if (value < 0 || value > 1600) {
                        throw new Error('Value must be between 0 and 1600');
                    }
                },
            },
        },
        backgroundSrc: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "./assets/noimage.png"
        }
    });
    Battlefield.associate = (models) => {
        Battlefield.belongsTo(models.User, {
            as: "gameMaster",
            foreignKey: "userId"
        })
        Battlefield.hasMany(models.Combatant, {
            as: "combatants",
            foreignKey: "battlefieldId"
        })
    };
    Battlefield.initializeHooks = (models) => {

    }
    return Battlefield;
};
