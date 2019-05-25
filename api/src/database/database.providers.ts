import * as mongoose from 'mongoose';
import { mongoUri, dbName } from '../config/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        mongoUri,  
        { dbName: dbName, useNewUrlParser: true }
      ),
  },
];
