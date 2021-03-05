const image = require("./image");
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  return res.send("Add a word as a parameter");
});

app.get("/:word", (req, res) => {
  const word = image.genaretImage(
    process.env.DEFAULT_PATH,
    process.env.FONT_NAME,
    req.params.word,
    (content, error) => {
      if (error) {
        res.writeHead(400, { "Content-type": "text/html" });
        res.end("No such image");
      } else {
        res.writeHead(200, { "Content-type": "image/png" });
        res.end(content);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
