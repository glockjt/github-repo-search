const express = require("express");
const cors = require("cors");
const memcache = require("memory-cache");

const app = express();

const github = require("./github");

const cache = duration => {
  return (req, res, next) => {
    const key = req.originalUrl || req.url;
    const cachedBody = memcache.get(key);
    if (cachedBody) {
      res.json(JSON.parse(cachedBody));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        memcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.use(cors());

app.set("port", process.env.PORT || 8080);

app.get("/search", cache(10), github);

app.use((req, res) => {
  res.status(404).send(""); //not found
});

app.listen(app.get("port"), function() {
  console.log(`Example app listening on port ${app.get("port")}!`);
});
