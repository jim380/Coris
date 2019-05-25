# Coris API

Build with [NestJS](https://www.npmjs.com/package/@nestjs/core) framework

Includes the following modules:

- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB driver
- [nest-schedule](https://www.npmjs.com/package/nest-schedule) - Scheduling

### Config

```TypeScript
export const nodeRpc1 = "http://localhost:1317"
export const mongoUri = "<MONGO-URI-GOES-HERE>";
export const dbName = "<DB-NAME-GOES-HERE>";
export const cronInterval = "<RESCHEDULE-INTERVAL>"
```

### Runing 