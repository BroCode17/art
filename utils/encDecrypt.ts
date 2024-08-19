// import crypto from 'crypto';

// const algorithm = 'aes-256-cbc'; // Encryption algorithm
// const key = process.env.NEXT_PUBLIC_PRODUCT_DATA_KEY // Generate a secure random key
// const iv = process.env.NEXT_PUBLIC_PRODUCT_DATA_IV_KEY // Initialization vector

// export function dataEncryptor(data: any) {
//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return {
//         iv: iv.toString('hex'),
//         encryptedData: encrypted
//     };
// }

// export function dataDecryptor(encryptedText, ivHex) {
//     const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

// console.log(dataEncryptor('helloworld'))