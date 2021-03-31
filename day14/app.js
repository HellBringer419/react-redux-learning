const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const csrf = require("csurf");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const uploadRoutes = require("./routes/uploads");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

dotenv.config();
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, destinationCallBack) => {
        destinationCallBack(null, "images");
    },
    filename: (req, file, fileNameCallBack) => {
        fileNameCallBack(null, uuidv4() + file.originalname);
    },
});

const fileFilter = (req, file, fileFilterCallBack) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    )
        fileFilterCallBack(null, true);
    else fileFilterCallBack(null, false);
};

// const csrfProtection = csrf();

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

// app.use(
//   session({
//     secret: "my secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(csrfProtection);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});
// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// });

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/upload", uploadRoutes);
// app.use(authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});

let port = 5000;
if (process.env.PORT) port = process.env.PORT;
app.listen(port);
console.info(`[INFO] app started on port ${port}`);
