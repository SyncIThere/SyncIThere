
import mongoose from 'mongoose';

const connectDB = async () => {
    console.log("DB location: " + process.env.DB_LOCAL + "   " + (process.env.DB_LOCAL === "true" ? process.env.DB_LOCAL_URI : process.env.MONGO_URI));
    try {
        const conn = await mongoose.connect(process.env.DB_LOCAL === "true" ? process.env.DB_LOCAL_URI : process.env.MONGO_URI, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
