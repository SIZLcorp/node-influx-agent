import { Sequelize } from 'sequelize'

// Sequelize 설정
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/db.sqlite',
  logging: true,
})

export async function init() {
  await sequelize.sync({ force: true })
}

export { sequelize }