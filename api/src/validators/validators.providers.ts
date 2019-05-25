import { Connection } from 'mongoose';
import { ValidatorSchema } from './schemas/validator.schema';

export const validatorsProviders = [
  {
    provide: 'VALIDATOR_MODEL',
    useFactory: (connection: Connection) => connection.model('Validator', ValidatorSchema, 'validators'),
    inject: ['DATABASE_CONNECTION'],
  },
];
