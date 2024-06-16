import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectToDB = async () => {
  const connectionURL = process.env.MONGODB_URI

  mongoose
    .connect(connectionURL)
    .then(() => console.log("Job Board database connection is successful"))
    .catch((error) => console.log(error));
}

export default connectToDB