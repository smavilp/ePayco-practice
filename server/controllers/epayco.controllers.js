const epayco = require("../config");

//Si en algún método de pago aparece el siguiente error: 'Número de factura o referencia cliente duplicada' es porque
//la propiedad "invoice", perteneceinte al cuerpo de la petición, se encuentra duplicada, debe cambiarse.

const payWithCash = async () => {
  //Así se cambie el método de pago, toda las respuestas son con Efecty.
  try {
    const cash_info = {
      invoice: "14720507730",
      description: "pay test",
      value: "20000",
      tax: "0",
      tax_base: "0",
      currency: "COP",
      type_person: "0",
      doc_type: "CC",
      doc_number: "10358519",
      name: "testing",
      last_name: "PAYCO",
      email: "smavilp@gmail.com",
      cell_phone: "3010000001",
      end_date: "2023-08-03",
      ip: "190.29.251.21", //!This is the client's IP, it is required
      paymentMethod: "SR",
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      metodoconfirmacion: "GET",

      //Los parámetros extras deben ser enviados tipo string, si se envía tipo array generara error.

      extra1: "",
      extra2: "",
      extra3: "",
      extra4: "",
      extra5: "",
      extra6: ""
    };
    epayco.cash
      .create("efecty", cash_info)
      .then(function (cash) {
        console.log(cash.data);
      })
      .catch(function (err) {
        console.log("err: " + err);
      });
  } catch (error) {
    console.log(error);
  }
};

const payWithPSE = async () => {
  try {
    var pse_info = {
      bank: "1022",
      invoice: "14720507731",
      description: "pay test",
      value: "10000",
      tax: "0",
      tax_base: "0",
      currency: "COP",
      type_person: "0",
      doc_type: "CC",
      doc_number: "10358519",
      name: "testing",
      last_name: "PAYCO",
      email: "smavilp@gmail.com",
      country: "CO",
      cell_phone: "3010000001",
      ip: "190.000.000.000" /*This is the client's IP, it is required */,
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      metodoconfirmacion: "GET",

      //Los parámetros extras deben ser enviados tipo string, si se envía tipo array generara error.
      extra1: "",
      extra2: "",
      extra3: "",
      extra4: "",
      extra5: "",
      extra6: ""
    };
    epayco.bank
      .create(pse_info)
      .then(function (bank) {
        console.log(bank.data);
      })
      .catch(function (err) {
        console.log("err: " + err);
      });
  } catch (error) {
    console.log(error);
  }
};

//It is not possible to test Daviplata in test environment because it is not enabled.
const payWithDaviplata = async () => {
  try {
    var body = {
      doc_type: "CC",
      document: "1053814580414720",
      name: "Testing",
      last_name: "PAYCO",
      email: "exmaple@epayco.co",
      ind_country: "CO",
      phone: "3148532222",
      country: "CO",
      city: "bogota",
      address: "Calle de prueba",
      // ip: "189.176.0.1",
      currency: "COP",
      description: "ejemplo de transaccion con daviplata",
      value: "5000",
      tax: "0",
      tax_base: "0",
      method_confirmation: ""
    };
    epayco.daviplata
      .create(body)
      .then(function (daviplata) {
        console.log(daviplata.data);
      })
      .catch(function (err) {
        console.log("err: " + err);
      });
  } catch (error) {
    console.log(error);
  }
};

const payWithCreditCard = async () => {
  //*Para hacer el pago con tarjeta primero se debe crear un token de la tarjeta y luego un cudtomer id.
  try {
    const credit_info = {
      "card[number]": "4575623182290326",
      "card[exp_year]": "2025",
      "card[exp_month]": "12",
      "card[cvc]": "123",
      hasCvv: true //hasCvv: validar codigo de seguridad en la transacción
    };

    let cardToken = null;

    await epayco.token
      .create(credit_info)
      .then(function (token) {
        console.log(token);
        cardToken = token.id;
      })
      .catch(function (err) {
        console.log("err: " + err);
      });

    const customer_info = {
      token_card: cardToken,
      name: "Joe",
      last_name: "Doe",
      email: "joe@payco.co",
      default: true,
      //Optional parameters: These parameters are important when validating the credit card transaction
      city: "Bogota",
      address: "Cr 4 # 55 36",
      phone: "3005234321",
      cell_phone: "3010000001"
    };

    let customerId = null;

    await epayco.customers
      .create(customer_info)
      .then(function (customer) {
        console.log(customer);
        customerId = customer.data.customerId;
      })
      .catch(function (err) {
        console.log("err: " + err);
      });

    const payment_info = {
      token_card: cardToken,
      customer_id: customerId,
      cardNumber: "4575623182290326",
      cardExpYear: "2025",
      cardExpMonth: "12",
      cardCvc: "123",
      doc_type: "CC",
      doc_number: "80755975",
      name: "Juan",
      last_name: "Mesa",
      email: "feli@hotmail.com",
      city: "Bogota",
      address: "Cr 4 # 55 36",
      phone: "2000000",
      cell_phone: "3000000000",
      bill: "OR-12345",
      description: "Test Payment",
      value: "116000",
      tax: "16000",
      tax_base: "100000",
      currency: "COP",
      dues: "1",
      ip: "190.29.251.21" /*This is the client's IP, it is required */,
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      method_confirmation: "GET",
      franquicia: "VS",
      estado: "Aceptada",
      respuesta: "Aprobada",

      // Los parámetros extras deben ser enviados tipo string, si se envía tipo array generara error.

      use_default_card_customer: true /*if the user wants to be charged with the card that the customer currently has as default = true*/,

      extras: {
        extra1: "",
        extra2: "",
        extra3: "",
        extra4: "",
        extra5: "",
        extra6: ""
      }
    };
    await epayco.charge
      .create(payment_info)
      .then(function (charge) {
        console.log(charge.data);
      })
      .catch(function (err) {
        console.log("err: " + err);
      });
  } catch (error) {
    console.log(error);
  }
};

const payWithSafetypay = async () => {
  try {
    var body = {
      cash: "1",
      end_date: "2023-08-05",
      doc_type: "CC",
      document: "123456789",
      name: "Jhon",
      last_name: "doe",
      email: "jhon.doe@yopmail.com",
      ind_country: "57",
      phone: "3003003434",
      country: "CO",
      invoice: "fac-02", // opcional
      city: "N/A",
      address: "N/A",
      ip: "192.168.100.100",
      currency: "COP",
      description: "Thu Jun 17 2021 11:37:01 GMT-0400 (hora de Venezuela)",
      value: 100000,
      tax: 0,
      ico: 0,
      tax_base: 0,
      url_confirmation: "",
      method_confirmation: ""
    };

    epayco.safetypay
      .create(body)
      .then(function (safetypay) {
        console.log(safetypay.data);
      })
      .catch(function (err) {
        console.log("err: " + err);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  payWithCash,
  payWithPSE,
  payWithDaviplata,
  payWithCreditCard,
  payWithSafetypay
};
