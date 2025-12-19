export default async function handler(req, res) {
  const response = await fetch(
    `httpsdiscord.comapiv10channels${process.env.DISCORD_NEWS_CHANNEL_ID}messageslimit=10`,
    {
      headers {
        Authorization `Bot ${process.env.DISCORD_BOT_TOKEN}`
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
