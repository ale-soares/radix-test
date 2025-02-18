import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./src/routes/routes";
import mongoose from "mongoose";
import cors from "cors";

const router: Express = express();
const port = process.env.PORT || 3000;

dotenv.config();

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

router.use(cors(corsConfig));

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use("/", routes);

mongoose
  .connect(
    `mongodb+srv://alesoares:HSFoJXsBwnmMm@cluster0.1q6uhd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .catch((err) => console.log(err));

router.get("/", (req: Request, res: Response) => {
  res.send("API");
});

router.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
