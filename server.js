const express = require("express");
const connectdb = require("./config/dbconnection");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const errorhandler = require("./middleware/errorhandler");
connectdb();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorhandler);

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {

    console.log("MongoDB connected");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

})
.catch((err) => {
    console.log(err);
});