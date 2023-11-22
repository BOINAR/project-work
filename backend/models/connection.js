var mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.h9pgw.mongodb.net/work_appli?retryWrites=true&w=majority`;
  const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  await mongoose.connect(uri, options, function (error) {
    if (error == null) {
      console.log(`✅Connexion à la base de données réussie.`);
    } else {
      console.log(error);
    }
  });
}
