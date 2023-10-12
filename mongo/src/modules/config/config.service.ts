import * as dotenv from 'dotenv';

export class ConfigService {
    private readonly envConfig: Record<string, string>;
    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public getPortConfig() {
        return this.get('PORT');
    }

    public getJwtSecret() {
        return this.get('JWT_SECRET');
    }

    public getJwtExpireTime() {
      return this.get('JWT_EXPIRE_TIME');
  }

    public getMongoConfig() {
        const uri =
            this.get('MONGO_HOST') && this.get('MONGO_PASSWORD')
                ? 'mongodb+srv://' +
                  this.get('MONGO_USER') +
                  ':' +
                  this.get('MONGO_PASSWORD') +
                  '@' +
                  this.get('MONGO_HOST') +
                  '/' +
                  this.get('MONGO_DATABASE')
                : 'mongodb://' + this.get('MONGO_HOST') + '/' + this.get('MONGO_DATABASE');

        return {
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}
