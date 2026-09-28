const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required." });
  }
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home",{id:shortID})
  // return res.status(201).json({ id: shortID });
}

async function handleUpdateAndRedirect(req, res) {
  const shortId = req.params.shortId;
//   console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics (req,res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    return res.json({totalClicks: result.visitHistory.length,analytics:result.visitHistory})
}

module.exports = {
  handleGenerateNewShortURL,
  handleUpdateAndRedirect,
  handleGetAnalytics
};
