import * as argon2 from 'argon2';

export class HashPassword {
    static async encrypt(password) {
        try {
            const hash = await argon2.hash(password);
            return hash;
        } catch (err) {
            return err;
        }
    }

    static async compare() {

    }
}