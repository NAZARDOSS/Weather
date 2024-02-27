const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const authRouter = require('./authRouter');

const uri =
  'mongodb+srv://nazardosik:nazardosik9W@cluster0.ftuwvid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

// Позволяет всем источникам отправлять запросы к вашему серверу (для разработки)
app.use(cors());

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
