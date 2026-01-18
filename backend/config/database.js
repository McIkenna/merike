const mongoose = require('mongoose');

const connectDatabase = async () => {
   try {
     const con = await mongoose.connect(process.env.DB_LOCAL_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
   } catch (err) {
     console.error(`Error: ${err.message}`);
     process.exit(1);
   }
 };
 
 module.exports = connectDatabase;
 