# Basket Pricing API Tech Test

## Assignment

- Write a program and associated unit tests that can price a basket of goods in a selected currency, accounting for special offers.
- The input is an object in the following form:
```shell
    {
	    "items": ["Apples","Milk","Soup"],
	    "currency" : "USD"
    }
```
- The output is in the form of a json object. e.g.

```shell
    {
        "subtotal": "2.80",
        "discounts": [
            "Apples have 10 percent off their normal price"
        ],
        "discountAmt": "0.10",
        "total": "2.70",
        "currency": "USD"
    }
```

------

## Installation  

### Clone

- Clone this repo to your local machine using `https://github.com/ianaquino47/BasketPricingTechTest-API.git`
- Navigate to the folder using the terminal.
  
```shell
$ git clone https://github.com/ianaquino47/AND_Digital_test.git
$ cd BasketPricingTechTest-API
```


### Setup
> Install dependencies using the following code (just Mocha really for the tests):

```shell
$ npm install
```

------

## Tests

- I used Mocha as the testing suite.
> Run the tests on terminal using the following code:

```shell
$ npm test
```
