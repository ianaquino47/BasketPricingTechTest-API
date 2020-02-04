require('dotenv').config()
const Joi = require('joi');
const express = require('express');
const app = express();

import * as helper from './helpermethods';


app.use(express.json());

const priceList = {
    "Soup": 0.65,
    "Bread": 0.80,
    "Milk": 1.15,
    "Apples": 1.0
}

const discountList = {
    "Apples": "Apples have 10 percent off their normal price",
    "Milk": "Buy 3 Milks and get 50 cents off."
}


app.get('/',(req,res) => {
    res.send('Hi there!');
})

app.put('/api/shopping_total', async (req,res) => {
    const schema = {
        "items": Joi.array().required(),
        "currency": Joi.string().required()
    }

    const result = Joi.validate(req.body, schema);
    
    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    const count = helper.countItems(req.body.items); 
    const currency = await req.body.currency;
    const conversion = await helper.getConversion(currency);
    const subtotal = await helper.calculateSubtotal(priceList,currency , count,conversion);
    const discounts = helper.checkForDiscounts(count, discountList);
    const discountAmt =  await helper.calculateDiscount(count, currency,conversion);
    // const total =  Math.round(((subtotal - discountAmt) + Number.EPSILON) * 100) / 100
    const total =  (subtotal - discountAmt).toFixed(2);
    res.json({
        "subtotal": subtotal,
        "discounts":   discounts,
        "discountAmt": discountAmt,
        "total": total,
        "currency": req.body.currency
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));