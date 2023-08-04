const express = require("express");
const { userRoute } = require("./routes/userroute");
const { connection } = require("./main");
const { allproductsroute } = require("./routes/allproductsroute");
const cors = require("cors");
const { Auth } = require("./middleware/middleware");
const { cartRoute } = require("./routes/cartroute");
const { router } = require("./routes/paymentRoute");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/customer", userRoute);

app.use("/ourproducts", allproductsroute);
app.use("/api/payment", router);
app.use(Auth);

app.use("/jewellery", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello world Dipti!");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server is running");
  } catch (error) {
    console.log("Error occured while connecting!");
  }
});
