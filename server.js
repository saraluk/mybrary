if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

// set out view engine
app.set("view engine", "ejs");
// set where our views are going to be coming from
app.set("views", __dirname + "/views");
//hook up express layouts
app.set("layout", "layouts/layout");
// tell our express application that we want to use express layouts
app.use(expressLayouts);
// tell our express application where our public files (style sheets, JS, images) are going to be
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conntected to Mongoose"));

// hook up our index route
app.use("/", indexRouter);
app.use("/authors", authorRouter);

// listen on a certain port
app.listen(process.env.PORT || 3000);
