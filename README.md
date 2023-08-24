#) sequelize cli commands
npm install sequelize-cli -g

#) For creating basic model configuration
npx sequelize-cli init

#)  For creating model and migration both at a time
npx sequelize-cli model:generate --name User --attributes firstName:string

sequelize commands
#)  For creating migration table
sequelize migration:create --name create_users_table

#) For running migration
sequelize db:migrate

#) For undo all migration
sequelize db:migrate:undo:all

#)  For creating seeder file
sequelize seed:generate --name demo-user

#) For running seeder file
sequelize db:seed:all

#) For creating Controller file run command from root of folder
touch controllers/UserController.js

#) For creating Request file run command from root of folder
touch requests/userRequest.js

-- For Run Project
- npm start

