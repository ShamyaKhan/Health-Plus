const express = require("express");
const cors = require("cors");
const dns = require("dns");
const connectDB = require("./config/db");
const connectCloudinary = require("./config/cloudinary");
const adminRouter = require("./routes/adminRoutes");
const { PORT } = require("./utils/constants");

const app = express();

const port = PORT || 4000;

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API Working!");
});

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

startServer();
