import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Don't exit immediately in development, but in production we might need to
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => process.exit(1), 5000); // Give it some time to log
    }
  }
};

export default connectDB;
