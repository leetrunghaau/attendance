
const { generateKey } = require('crypto');
const ImgLink = require('../models/img-link-model');
const { generateId, generateRandomString } = require('../helpers/generate-key');
const ClassRoom = require('../models/class-room-model');

class ImgLinkService {
    static async getImgLinkById(imgLinkId) {
        return ImgLink.findByPk(imgLinkId);
    }

    static async getAllImgLink() {
        return ImgLink.findAll({
            include: [{ model: ClassRoom }]
        });
    }
    static async getAllImgLinkByClassRoomId(classRoomId) {
        return ImgLink.findAll({
            where: { classRoomId: classRoomId },
            include: [{ model: ClassRoom }]
        });
    }
    static async createImgLink(imgLinkData) {
        imgLinkData.imgLinkId = generateId();
        return ImgLink.create(imgLinkData);
    }


    static async updateImgLink(imgLinkId, imgLinkData) {
        await ImgLink.update(imgLinkData, {
            where: { imgLinkId: imgLinkId },

        });
        return this.getImgLinkById(imgLinkId);
    }

    static async deleteImgLinkById(imgLinkId) {
        return ImgLink.destroy({
            where: { imgLinkId: imgLinkId },
        });
    }
    static async deleteAll() {
        return ImgLink.destroy({
            where: { classRoomId: null },
        });
    }
}

module.exports = ImgLinkService;
