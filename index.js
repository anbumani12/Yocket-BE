import express from "express";
import cors from "cors";
import { getRandomCity } from "./data.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

let fugitiveCity = getRandomCity();

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Fugitive Capture Game API");
});

// API route to check for fugitive
app.post("/api/check", (req, res) => {
  const { selectedCities } = req.body;
  let success = false;
  let capturingCop = null;

  for (const cop in selectedCities) {
    if (selectedCities[cop].name === fugitiveCity.name) {
      success = true;
      capturingCop = cop;
      break;
    }
  }

  if (success) {
    return res.json({
      success: true,
      message: `${capturingCop} captured the fugitive!`,
    });
  } else {
    return res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
