import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

export class Utils {
  static generateToken = async (id: number): Promise<string> => {
    return jsonwebtoken.sign(id.toString(), process.env.TOKEN_KEY as string);
  };

  static generatePassword = async (password: string): Promise<string> => {
    const salt: string = process.env.BCRYPT_SALT as string;
    const rounds: string = process.env.SALT_ROUNDS as string;

    //generate pass
    const hashPassword: string = bcrypt.hashSync(
      password + salt,
      parseInt(rounds)
    );
    return hashPassword;
  };
}
