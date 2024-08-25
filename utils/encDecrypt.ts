import CryptoJS from "crypto-js";

const secretKey =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "defaultClientSecretKey";

export const encryptObjectClient = (obj: any): string => {
  const text = JSON.stringify(obj);
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decryptObjectClient = (ciphertext: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  } catch (error) {
    return null;
  }
};
