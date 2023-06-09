const mongoose = require('mongoose');

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://rohitlohra3036:mgt7aiZYrUStkdCb@cluster0.svpp8le.mongodb.net/divishDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
