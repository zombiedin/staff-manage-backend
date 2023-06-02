/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-unsupported-features/es-syntax */
import { DataTypes, Model, Sequelize } from 'sequelize';

export class ExampleModel extends Model {}

/**
 *
 * @param {Sequelize} sequelize - The Sequelize instance.
 */
export function initExampleModel(sequelize: Sequelize) {
  ExampleModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Example',
    }
  );
}
