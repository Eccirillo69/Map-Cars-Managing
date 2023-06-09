import express from 'express';
import cors from 'cors';
import {router as personRoute} from "./routes/person"
import {router as carRoute} from "./routes/car"
import {router as authRoute} from "./routes/auth"
import {router as pointRoute} from "./routes/point"
import{router as excelRoute} from "./routes/excel"

const app = express();

const corsOptions = {
  origin: `http://localhost:4200`
  };
  
app.use(cors(corsOptions));

const port = 3000;
app.use(express.json());

app.use("/api/person", personRoute);
app.use("/api/car", carRoute);
app.use("/api/auth", authRoute);
app.use("/api/point", pointRoute);
app.use("/api/excel", excelRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});