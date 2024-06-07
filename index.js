import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";
//insert your own username, password, API key, and bearer token
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";
const auth= {username: yourUsername, password: yourPassword}

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async(req, res) => {
   try {
    const result = await axios.get(`${API_URL}random`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/basicAuth", async (req, res) => {
  try { 
    const result = await axios.get(`${API_URL}all?page=2`, { auth: auth });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) { 
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
  });

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}secrets/42`, { headers: { Authorization: `Bearer ${yourBearerToken}` } });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
