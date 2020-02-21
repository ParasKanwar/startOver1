const mongoose = require("mongoose");
const DataBaseName = "task-manager-api";

const connectToDatabase = async DataBaseName => {
  try {
    await mongoose.connect(
      `mongodb+srv://paras:paraskanwar30@cluster0-7pnto.mongodb.net/test?retryWrites=true&w=majority${DataBaseName}`,
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
      }
    );
  } catch (e) {
    console.log("cannot  connect to database");
  }
};
connectToDatabase(DataBaseName);
