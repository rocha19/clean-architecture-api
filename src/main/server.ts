import 'module-alias/register';
import 'dotenv/config';
import { MongoHelper } from '@/infra/repositories/mongodb/helper';

const port = process.env.PORT;
const mongo = `${process.env.MONGO_URL}`;
MongoHelper.connect(mongo)
  .then(async () => {
    const app = await (await import('./config/app')).default;
    app.listen(port, () => {
      console.log(`server running at http://localhost:${port}`);
    });
  })
  .catch(console.error);
