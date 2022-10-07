import passport from "passport"
import express from "express"
import * as path from "path";
import { fileURLToPath } from "url"
import partials from "express-partials"
import bodyParser from "body-parser";
import cors from "cors"

import multerConfig from "./middleware/multer.utils.js"
import routes from "./routes.js"
import { configSession } from "./data/mysql.data.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

app.use(configSession);
app.use(partials());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multerConfig);

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})