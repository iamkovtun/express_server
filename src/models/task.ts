import { DataTypes, Model, Sequelize } from 'sequelize';

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
}

export function initTaskModel(sequelize: Sequelize) {
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Task'
    }
  );
}
