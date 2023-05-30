const express = require("express");
const app = express();
const serverless = require('serverless-http');
var cors = require("cors");

app.use(cors());

var request = require('request').defaults({ encoding: null });

var mysql = require("mysql");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "dbcloud.cr1myqujll1z.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "admin1234",
  database: "db_cloud",
});

con.connect(function (err) {
  if (err) throw err;

  console.log("connection successful");
});

app.get("/", (req, res) => {
  res.send("api is working");
});

app.post("/share/public", (req, res) => {
  
  let data = JSON.parse(req.body);
  let username = data.username;
  let image = data.image;
  console.log(username);
  console.log(image);
  con.query(
    `SELECT library FROM images WHERE username = '${username}' AND library = '${image}'`,
    function (err, result, fields) {
      // console.log("select result" + result);

      if (err) {
        // console.log(err);
        return res.status(500).json({
          success: false,
          message: "server error",
        });
      }

      if (result.length > 0) {
        var today = new Date().toISOString().slice(0, 19).replace("T", " ");
        // console.log(today);
        con.query(
          `UPDATE images SET times = '${today}' WHERE library = '${image}'`,
          function (err, result) {
            if (err) throw err;
            // console.log(result);

            var url = "https://xzh89ra0ui.execute-api.us-east-1.amazonaws.com/createLink/" + image;
            return res.status(200).json({
              success: true,
              message: "Image Retrieved Succesfully",
              url: url,
            });
          }
        );
      } else {
        return res.status(200).send({
          success: false,
          message: "Image doesn't exist",
        });
      }
    }
  );
});

app.get("/image/:id", (req, res) => {
  let imageId = req.params.id;
  let baseUrl = "https://dalphotosharing.s3.amazonaws.com/";
  let imgUrl = baseUrl + imageId;
  console.log(imageId);
  con.query(
    `SELECT times FROM images WHERE library = '${imageId}'`,
    function (err, result, fields) {
      //console.log(result);

      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "server error",
        });
      }

      if (result.length > 0) {
        var todayDate = new Date().toISOString().slice(0, 19).replace("T", " ");
        var today = new Date(todayDate);
        //console.log(result[0].times);
        let timeStamp = new Date(result[0].times);
        var time = today.getTime() - timeStamp.getTime();
        var seconds = time / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;

        if (hours < 24) {
          //console.log(timeStamp);
          //console.log(today);
          console.log(hours);
          // return res.status(200).sendFile(

          // "https://bucket1-5410.s3.amazonaws.com/grocery.png",
          // );

          request.get(imgUrl, function (err, response, body) {
            console.log(body);
            console.log(imgUrl);
            res.set("Content-Type", "image/png");
            return res.status(200).send(body);
          });
        } else {
          return res.status(200).send(
            "Sorry, Link is expired !"
          );
        }
      } else {
        return res.status(204).send({
          success: false,
          message: "No Such Image Exists",
        });
      }
    }
  );
});

app.listen(2200, () => {
    console.log('server running at port:2000 ');
})

module.exports.handler = serverless(app);
