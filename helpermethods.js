const axios = require("axios");

export const countItems = (items) => { 
    let counts = {};

    for (let i = 0; i < items.length; i++) {
        let num = items[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
}

export const  calculateSubtotal = (priceList, currency,count,conversion) => {
    let total = 0;

    Object.keys(count).forEach(function (item) {
        total += priceList[item] * count[item];
    });
    
    return (total * conversion.data.quotes[`USD${currency}`]).toFixed(2);
}

export const checkForDiscounts = (count, discountList) => {
    let discounts = [];

    if (Object.keys(count).includes("Apples")){
        discounts.push(discountList["Apples"]);
    }
    
    if (Object.keys(count).includes("Milk") && count["Milk"] >= 3 ){
        discounts.push(discountList["Milk"]);
    }

    return discounts
}

export const calculateDiscount =  (count, currency, conversion) => {
    let totalDiscount = 0;

    if (Object.keys(count).includes("Apples")){
        totalDiscount += count["Apples"] * 0.1;
    }
    
    if (Object.keys(count).includes("Milk") && count["Milk"] >= 3 ){
        totalDiscount += Math.floor(count["Milk"]/3) * 0.50
    }
    
    return (totalDiscount * conversion.data.quotes[`USD${currency}`]).toFixed(2);  
}

export const getConversion = async (currency) => {
    try {
      return await axios.get(`http://apilayer.net/api/live?access_key=${process.env.API_KEY}&currencies=${currency}&source=USD&format=1`)
    } catch (error) {
      console.error(error)
    }
}