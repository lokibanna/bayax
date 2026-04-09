const mongoose = require('mongoose');

const uri = "mongodb+srv://samaysamrat3076_db_user:8522153076@clipai.t5x6msi.mongodb.net/bayax";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ ERROR: Connection failed.");
    console.error(err.message);
    process.exit(1);
  });
