import dompurify from 'dompurify';
export const convertMessageToHTML = (message) => {
    const sanitizedMessage = dompurify.sanitize(message);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />;
  };
export const generateRandomCode = (leng) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';

  for (let i = 0; i < leng; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}