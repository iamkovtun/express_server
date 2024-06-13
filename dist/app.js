"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const task_1 = require("./models/task");
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres'
});
app.use(express_1.default.json());
//Task model
(0, task_1.initTaskModel)(sequelize);
app.use('/tasks', tasks_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync();
    console.log(`Server is running on http://localhost:${port}`);
}));
