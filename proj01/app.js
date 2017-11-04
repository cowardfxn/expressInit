const express = require("express"),
    path = require("path"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser"),
    ejs = require("ejs"),
    session = require("express-session"),
    compression = require("compression"),
    moment = require("moment");

const app = express(),
    env = process.env,
    port = env.PORT || 3000;

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, parameterLimit: 10000}));
app.use(session({
    secret: env.secret || 8080,
    resave: true,
    saveUninitialized: false,
    // cookie: env.cookie,
    // store: new MongoStore({
    //     url: config.url
    // })
}));

// html engine setup
app.set("views", path.join(__dirname, "htmls"));
app.engine("html", ejs.__express);
app.set("view engine", "html");
// static resources location
app.use(express.static(path.join(__dirname, "public")));

// router(app);

let router = express.Router();
router.get("/", function (req, res, next) {
    let timeStr = moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
    res.render("./main.html", {timeStr: timeStr});
});

router.get("/countDown", function (req, res, next) {
    res.render("./countDown.html");
});

app.use(router);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use(history());

app.listen(port, function () {
    console.log("Server running on", "loalhost:" + port);
});

