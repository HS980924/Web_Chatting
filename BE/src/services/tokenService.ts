import jwt from 'jsonwebtoken';

export const jwtSign = async (user_id: number) => {
    const payload: object = {
        user_id: user_id
    }
    const privateKey: string = process.env.JWTSECERTKEY || "jwt-secret-key";
    const options: object = {
        issuer: "chatting",
        expiresIn: '1h',
    }
    const token = jwt.sign(payload, privateKey, options);
    return token;
}

export const refreshJwtSign = async () => {
    const privateKey: string = process.env.JWTSECERTKEY || "jwt-secret-key";
    const options: object = {
        issuer: "chatting",
        expiresIn: '7d',
    }
    const refreshToken = jwt.sign({}, privateKey, options);
    return refreshToken;
}