const request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:5000/";


import {countItems, calculateSubtotal, checkForDiscounts, calculateDiscount, getConversion} from '../helpermethods'

// describe("Response Test", () => {
//     describe("/api/shopping_total", function() {
//         it("PUT returns status code 200", function(done) {
//             request({
//                 url: base_url + "api/shopping_total",
//                 method: "PUT",
//                 headers: {
//                     "content-type": "application/json",
//                     },
//                 json: {
//                     "items": ["Apples","Milk","Soup"],
// 	                "currency" : "USD"
//                 }},function(error, response, body) {
//                 assert.equal(200, response.statusCode);
//                 done();
//             });
//         });
//     })    
// });

describe("Count items in a list", () => {
    describe("countItems", function() {
        it("returns an object - items: count", function(done) {
            const items = ["Apples","Milk","Soup"];
            console.log(countItems(items))
            assert.deepEqual({ 
                Apples: 1, 
                Milk: 1, 
                Soup: 1 } 
            , countItems(items));
            done();
        });

        it("returns an object - items: count", function(done) {
            const items = ["Apples"];
            console.log(countItems(items))
            assert.deepEqual({ 
                Apples: 1, 
            } 
            , countItems(items));
            done();
        });

        it("returns an object - items: count", function(done) {
            const items = [];
            assert.deepEqual({} 
            , countItems(items));
            done();
        });
    })    
});

describe("Calculate subtotal", () => {
    describe("calculateSubtotal", function() {
        it("returns subtotal before discount", function(done){   
            const conversion = {data: {quotes: {"USDEUR" : 1.5}}};
            const count = { Apples: 1, Milk: 1, Soup: 1 };
            const currency = "EUR";
            const priceList = {
                "Soup": 0.65,
                "Bread": 0.80,
                "Milk": 1.15,
                "Apples": 1.0
            } 
            assert.equal(4.2, calculateSubtotal(priceList, currency,count,conversion));
            done();
        })
    })    
});

describe("Check for discounts", () => {
    describe("checkForDiscounts", function() {
        it("returns discounts applied - no discount ", function(done){   
            const count = { Milk: 1, Soup: 1 };
            const discountList = {
                "Apples": "Apples have 10 percent off their normal price",
                "Milk": "Buy 3 Milks and get 50 cents off."
            }
            assert.deepEqual([], checkForDiscounts(count,discountList));
            done();
        })

        it("returns discounts applied - Apples", function(done){   
            const count = { Apples: 1, Milk: 1, Soup: 1 };
            const discountList = {
                "Apples": "Apples have 10 percent off their normal price",
                "Milk": "Buy 3 Milks and get 50 cents off."
            }
            assert.deepEqual(["Apples have 10 percent off their normal price"], checkForDiscounts(count,discountList));
            done();
        })

        it("returns discounts applied - Milk ", function(done){   
            const count = { Milk: 3, Soup: 1 };
            const discountList = {
                "Apples": "Apples have 10 percent off their normal price",
                "Milk": "Buy 3 Milks and get 50 cents off."
            }
            assert.deepEqual(["Buy 3 Milks and get 50 cents off."], checkForDiscounts(count,discountList));
            done();
        })

        it("returns discounts applied - Both ", function(done){   
            const count = { Apples: 1, Milk: 6, Soup: 1 };
            const discountList = {
                "Apples": "Apples have 10 percent off their normal price",
                "Milk": "Buy 3 Milks and get 50 cents off."
            }
            assert.deepEqual(["Apples have 10 percent off their normal price", "Buy 3 Milks and get 50 cents off."], checkForDiscounts(count,discountList));
            done();
        })
    })    
});

describe("Calculate total discounts", () => {
    describe("calculateDiscount", function() {
        it("returns total discounts applied - 1 Apple", function(done){   
            const conversion = {data: {quotes: {"USDEUR" : 1.5}}};
            const count = { Apples: 1, Milk: 1, Soup: 1 };
            const currency = "EUR";
            assert.equal(0.15, calculateDiscount(count, currency, conversion));
            done();
        })

        it("returns total discounts applied - 3 Milk", function(done){   
            const conversion = {data: {quotes: {"USDEUR" : 1.5}}};
            const count = { Milk: 3, Soup: 1 };
            const currency = "EUR";
            assert.equal(0.75, calculateDiscount(count, currency, conversion));
            done();
        })

        it("returns total discounts applied - 1 Apple , 3 Milk", function(done){   
            const conversion = {data: {quotes: {"USDEUR" : 1.5}}};
            const count = { Apples: 1, Milk: 3, Soup: 1 };
            const currency = "EUR";
            assert.equal(0.9, calculateDiscount(count, currency, conversion));
            done();
        })
    })    
});

