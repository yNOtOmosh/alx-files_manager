import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

class DBClient {
  constructor() {
    envLoader();

    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        console.log('Connected successfully to MongoDB server');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  async isAlive() {
    // Check if the connection is established and active
    try {
      await this.client.db().admin().ping();
      return true;
    } catch (err) {
      return false;
    }
  }

  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  async usersCollection() {
    return this.client.db().collection('users');
  }

  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
