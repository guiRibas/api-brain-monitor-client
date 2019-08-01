import * as argon2 from 'argon2';

export class HashPassword {
    static async encrypt(password) {
        try {
            return await argon2.hash(password);
        } catch (err) {
            return err;
        }
    }

    static async compare() {

    }
}