const cors = require("cors");
const express = require("express");
const {
  payWithCash,
  payWithPSE,
  payWithDaviplata,
  payWithCreditCard,
  payWithSafetypay
} = require("./controllers/epayco.controllers");

app = express();
app.use(express.json());
app.use(cors());

app.get("/payment/epayco/cash", payWithCash);
app.get("/payment/epayco/pse", payWithPSE);
app.get("/payment/epayco/daviplata", payWithDaviplata);
app.get("/payment/epayco/credit_card", payWithCreditCard);
app.get("/payment/epayco/safetypay", payWithSafetypay);

app.listen(8000, () => console.log(`Server running on port 8000`));
app.get("/", (req, res) => res.send("Server running"));
