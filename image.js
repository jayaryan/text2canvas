const fs = require("fs");
const { createCanvas, registerFont } = require("canvas");

exports.genaretImage = (path, font, word, callback) => {
  imageProcess(path, font, word, (image, error) => {
    if (error) return callback(error);
    else return callback(null, image);
  });
};

const imageProcess = (path, font, word, callback) => {
  fs.stat(font, function (err) {
    if (err) callback(new Error("Font not exist!"));
  });

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  let textName = word.toUpperCase();
  let extension = "png";

  if (fs.existsSync(path + "/" + textName + "." + extension)) {
    fs.readFile(
      path + "/" + textName + "." + extension,
      function (err, content) {
        if (err) return callback(new Error("Image not found"));
        else return callback(null, content);
      }
    );
  } else {
    const canvas = createCanvas(200, 200);
    let ctx = canvas.getContext("2d");

    registerFont(font, { family: "Lato Bold" });
    ctx.font = "240px";

    let grd = ctx.createLinearGradient(0, 0, 270, 0);
    grd.addColorStop(0, "#e8f9fc");
    grd.addColorStop(1, "#bbecf6");
    ctx.fillStyle = grd;
    ctx.fillText(textName, 0, 235);
    fs.writeFile(
      path + "/" + textName + "." + extension,
      canvas.toBuffer(),
      function (err) {
        if (err) return callback(err);

        fs.readFile(
          path + "/" + textName + "." + extension,
          function (err, content) {
            if (err) return callback(err);
            else return callback(null, content);
          }
        );
        console.log("The file was saved!");
      }
    );
  }
};
