import "dotenv/config"
import express from "express"
import configCatClient from "configcat-node"
import path from "node:path"

const app = express();
const PORT = process.env.PORT || 3000;

const configCatClient = configcat.getClient(
  process.env.CONFIGCAT_SDK_KEY || 'SDK-KEY-DE-PRUEBA',
  configcat.PollingMode.AutoPoll,
  { pollIntervalSeconds: 60 }
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/api/features', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId || 'anonymous-user';
    const userObject = new configcat.User(userId);

    const isDarkModeEnabled = await configCatClient.getValueAsync(
      'dark_mode_enabled',
      false,
      userObject
    );

    res.json({ darkModeEnabled: isDarkModeEnabled });
  } catch (error) {
    res.json({ darkModeEnabled: false });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;