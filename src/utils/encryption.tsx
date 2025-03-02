import CryptoJS from "crypto-js";

export const Encrypt = (text: string) => {
  const APP_KEY = "jawad";

  try {
    const hash = CryptoJS.AES.encrypt(text, APP_KEY).toString();
    return hash;
  } catch (er) {
    return null;
  }
};

export const Decrypt = (hasedValue: string) => {
  const APP_KEY = "jawad";
  try {
    const bytes = CryptoJS.AES.decrypt(hasedValue, APP_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (er) {
    return null;
  }
};
