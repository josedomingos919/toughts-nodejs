const express = require("express");
const flash = require("express-flash");
const session = require("express-session");

const path = require("path");
const conn = require("./db/conn");
const handlebars = require("express-handlebars");

const Os = require("os");
const FileStore = require("session-file-store")(session);

const app = express();

//Mofules
const { Tought } = require("./models/Tought");
const { User } = require("./models/User");

const { toughtRoutes } = require("./routes/toughtsRoutes");
const { authRoutes } = require("./routes/authRoutes");

const { ToughtController } = require("./controllers/ToughtController");

//template engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

//receber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

//receber json
app.use(express.json());

//sessão
app.use(
  session({
    resave: false,
    name: "session",
    secret: "nosso_segredo",
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: path.join(Os.tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
    },
  })
);

//falhs message
app.use(flash());

//public
app.use(express.static("public"));

//set session to res
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/toughts", toughtRoutes);
app.use("/", authRoutes);

app.use("/", ToughtController.showToughts);

conn.sequelize
  .sync()
  // .sync({ force: true })
  .then(() => app.listen(4000))
  .catch((err) => console.log(`App bug ao connectar: ${err}`));
