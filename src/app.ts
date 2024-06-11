import express from 'express';
import { Sequelize} from 'sequelize';
import { initTaskModel } from './models/task';
import taskRouter from './routes/tasks';

const app = express();
const port = process.env.PORT || 3000;

const sequelize = new Sequelize('postgres', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres'
  });

app.use(express.json());

//Task model
initTaskModel(sequelize);
app.use('/tasks', taskRouter);



app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server is running on http://localhost:${port}`);
});
