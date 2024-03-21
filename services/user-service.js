
const { generateKey } = require('crypto');
const User = require('../models/user-model');
const { generateId } = require('../helpers/generate-key');

class UserService {
  static async getUserById(userId) {
    return User.findByPk(userId);
  }
  static async getAllUser() {
    return User.findAll();
  }
  static async createUser(userData) {
    userData.userId = generateId()
    return User.create(userData);
  }

  static async updateUser(userId, userData) {
    await User.update(userData, {
      where: { userId: userId },
    });
    return this.getUserById(userId);
  }

  static async deleteUserById(userId) {
    return User.destroy({
      where: { userId: userId },
    });
  }
}

module.exports = UserService;
