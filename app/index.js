import express, { json } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { searchMovies } from "./main";
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    res.render("index", { data: [] });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/search", async (req, res) => {
    try {
      const searchMovie = await searchMovies(req?.query?.keyword || ' ');
      if(searchMovie){
          res.status(200).json({ data: searchMovie });
      }
    } catch (error) {
      console.log('error', error)
      res.status(400).json({ data: [] });
    }
  });

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
