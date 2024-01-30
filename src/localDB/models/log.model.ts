import { Model, DataTypes, Optional } from 'sequelize'
import { sequelize } from './common'
import { EquipmentScanResult } from 'SutechEquipment'

interface LogAttributes {
  id: number;
  log: EquipmentScanResult;
  isTransferred: boolean;
  syncId: number;
  modelId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type LogInput = Optional<LogAttributes, | 'id' | 'isTransferred' | 'createdAt' | 'updatedAt' | 'modelId' | 'syncId'>
export type LogOutput = Required<LogAttributes>

class Log extends Model<LogAttributes, LogInput> implements LogAttributes {
  public readonly id!: number
  public readonly log!: EquipmentScanResult
  public readonly isTransferred!: boolean
  public readonly syncId!: number
  public readonly modelId!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Log.init({
  id: {
    type: new DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '로그 ID',
  },
  isTransferred: {
    type: new DataTypes.BOOLEAN,
    allowNull: false,
    comment: '서버 전송 여부',
    defaultValue: false,
  },
  log: {
    type: new DataTypes.JSONB,
    comment: '로그내용',
  },
  syncId: {
    type: new DataTypes.INTEGER,
    comment: '동기화 ID',
  },
  modelId: {
    type: new DataTypes.INTEGER,
    comment: '모델 ID',
  },
  createdAt: {
    type: new DataTypes.DATE,
    allowNull: false,
    comment: '생성일',
  },
  updatedAt: {
    type: new DataTypes.DATE,
    allowNull: false,
    comment: '수정일',
  },
}, {
  sequelize,
  tableName: 'logs',
  modelName: 'Log',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  freezeTableName: true,
  underscored: true,
})

export default Log
