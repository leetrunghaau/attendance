const crypto = require('crypto')

const accessTokenSecret = crypto.randomBytes(32).toString('hex');
const generateId = () => {
  const randomBytes = crypto.randomBytes(9).toString('hex');
  const shortenedId = randomBytes.substring(0, 18);
  return shortenedId;
};
function generateCode() {
  const codeLength = 6;
  const min = Math.pow(10, codeLength - 1);
  const max = Math.pow(10, codeLength) - 1;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(code).padStart(codeLength, '0');
}
function generateRandomString(length) {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function generateGVId() {
  const characters = '0123456789';
  let result = 'GV_';
  const charactersLength = characters.length;
  for (let i = 0; i < 9; i++) {
    if (i % 3 == 0 && i != 0) {
      result += "-";
    }
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateHSId() {
  const characters = '0123456789';
  let result = 'HS_';
  const charactersLength = characters.length;
  for (let i = 0; i < 9; i++) {
    if (i % 3 == 0 && i != 0) {
      result += "-";
    }
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateIndexId(indexChar) {
  const numChars = '0123456789';
  const lowChars = 'abcdefghijklmnopqrstuvwxyz';
  const hightChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = indexChar;
   result += '_';
  const numCharsLength = numChars.length;
  const lowCharsLength = lowChars.length;
  const hightCharsLength = hightChars.length;
  for (let i = 0; i < 3; i++) {
    result += hightChars.charAt(Math.floor(Math.random() * hightCharsLength));
  }
  result += "-";
  for (let i = 0; i < 3; i++) {
    result += lowChars.charAt(Math.floor(Math.random() * lowCharsLength));
  }
  result += "-";
  for (let i = 0; i < 3; i++) {
    result += numChars.charAt(Math.floor(Math.random() * numCharsLength));
  }
  return result;
}

module.exports = {
  accessTokenSecret,
  generateId,
  generateCode,
  generateRandomString,
  generateGVId,
  generateHSId,
  generateIndexId
}