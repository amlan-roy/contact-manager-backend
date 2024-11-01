import bcrypt from "bcrypt";
import { SALT_WORK_FACTOR } from "./../constants/encryption.js";

/**
 * Encrypts a password
 * @param {string} pwd
 */
const encryptPassword = async (pwd) => {
  const hashedPassword = await bcrypt.hash(pwd.trim(), SALT_WORK_FACTOR);
  return hashedPassword;
};

const pwdAndEncryptedPwdSame = async (pwd, encryptedPwd) => {
  const hashedPwd = await encryptPassword(pwd);
  return hashedPwd === encryptedPwd;
};

export { encryptPassword, pwdAndEncryptedPwdSame };
