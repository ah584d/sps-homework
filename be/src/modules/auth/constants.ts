export const jwtConstants = {
    secret: process.env?.['JWT_SECRET'],
    expire: process.env?.['JWT_EXPIRE_TIME'] ?? '15m',
};
