"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTaskModel = exports.Task = void 0;
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
function initTaskModel(sequelize) {
    Task.init({
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Task'
    });
}
exports.initTaskModel = initTaskModel;
