import { Collection, MongoClient } from 'mongodb';
import { disconnect } from 'process';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  async disconnect(): Promise<void> {
    this.client.close();
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },
  clearCollection(name: string): void {
    this.client.db().collection(name).deleteMany({});
  },
};
