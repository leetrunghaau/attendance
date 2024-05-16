const crypto = require('crypto')

const generateId = () => {
  const randomBytes = crypto.randomBytes(5).toString('hex');
  const shortenedId = randomBytes.substring(0, 10);
  return shortenedId;
};
const subtractMinutes = (time1, time2) => {
  // Chia thời gian thành giờ, phút và giây
  const time1Parts = time1.split(':').map(Number);
  const time2Parts = time2.split(':').map(Number);

  // Tính toán số phút được trừ
  const minutes1 = time1Parts[0] * 60 + time1Parts[1];
  const minutes2 = time2Parts[0] * 60 + time2Parts[1];
  const differenceMinutes = minutes1 - minutes2;

  return differenceMinutes;
}
const time1thanTime2 = (time1, time2) => {
  // Chia thời gian thành giờ, phút và giây
  const time1Parts = time1.split(':').map(Number);
  const time2Parts = time2.split(':').map(Number);

  // Tính toán tổng số giây
  const seconds1 = time1Parts[0] * 3600 + time1Parts[1] * 60 + time1Parts[2];
  const seconds2 = time2Parts[0] * 3600 + time2Parts[1] * 60 + time2Parts[2];
  if (seconds1 > seconds2){
    return true
  }
  return false;
}


module.exports = {
  generateId,
  subtractMinutes,
  time1thanTime2
}