const express = require("express");
const multer = require("multer");
const connect_db = require("./config/database");
const { Image } = require("./models/Image");

const app = express();
connect_db();
const uploadMiddleware = multer({
  limits: {
    fileSize: 1500000,
  },
  fileFilter(req, file, cb) {
    if (file.originalname.endsWith(".jpg")) {
      return cb(null, file);
    } else {
      cb(new Error("invalid type"));
    }
  },
});

app.use(express.static("./views"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    title: "UPLOAD YOURS IMGS",
  });
});

app.get("/image/:id", async (req, res) => {
  const image = await Image.findById(req.params.id);
  res.send(image.image);
});

app.post(
  "/upload",
  uploadMiddleware.single("upload"),
  async (req, res) => {
    const buffer = req.file.buffer;
    const image = new Image({
      image: buffer,
    });
    await image.save();
    res.send({ done: "uploaded success", id: image._id });
  },
  (err, req, res, next) => {
    res.json({
      error: err.message,
    });
  }
);

app;

app.listen(3000, () => {
  console.log(`Running on http://localhost:3000`);
});
