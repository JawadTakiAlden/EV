import CryptoJS from "crypto-js";

const APP_KEY = process.env.REACT_APP_APP_KEY as string;

export const Encrypt = (text: string) => {
  console.log(APP_KEY);
  try {
    const hash = CryptoJS.AES.encrypt(text, APP_KEY).toString();
    return hash;
  } catch (er) {
    return null;
  }
};

export const Decrypt = (hasedValue: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(hasedValue, APP_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (er) {
    return null;
  }
};
