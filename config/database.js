const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'data/database.db',
  seeders: {
    path: "../seeders"
  }
});
sequelize.sync()
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa');
  })
  .catch((error) => {
    console.error('Lỗi khi đồng bộ hóa cơ sở dữ liệu:', error);
  });
// Đồng bộ hóa model với cơ sở dữ liệu và tự động tạo cơ sở dữ liệu mới nếu nó chưa tồn tại
// sequelize.sync({ force: true }) // Thêm tùy chọn { force: true }
//   .then(() => {
//     console.log('Cơ sở dữ liệu đã được đồng bộ hóa và tạo mới nếu cần');
//   })
//   .catch((error) => {
//     console.error('Lỗi khi đồng bộ hóa cơ sở dữ liệu:', error);
//   });

module.exports = sequelize;