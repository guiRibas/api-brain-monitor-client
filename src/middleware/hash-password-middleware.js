import argon2 from 'argon2';

export class HashPassword {
    static async encrypt(password) {
        return await argon2.hash(password);
    }

    static async compare() {

    }
}