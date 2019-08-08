const axios = require("axios");

const github = async (req, res) => {
  const { q, sort, order } = req.query;

  if (!q) {
    return res.sendStatus(400).send(new Error("Search term is required."));
  }

  try {
    const done = await axios.get(
      `https://api.github.com/search/repositories?q=${q}+in:name+in:description+in:readme&sort=${sort ||
        "score"}&order=${order || "desc"}&per_page=10`,
      {
        headers: { accept: "application/json" }
      }
    );

    res.json(done.data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500).send(err);
  }
};

module.exports = github;
