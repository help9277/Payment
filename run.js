const express = require('express');

const path = require('path');

const PUBLISHABLE_KEY=PUBLISHABLE_KEY;
const SECRET_KEY=SECRET_KEY;
const stripe=require('stripe')(SECRET_KEY);

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  


app.set('view engine', 'ejs');

app.get('/payment',(req,res)=>{
    res.render('payment',{key:PUBLISHABLE_KEY});
    });
app.post('/payment', (req,res)=>{
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
    })
    .then((customer)=>{
        return stripe.charges.create({
            amount:2000,
            description:'Description of Payment',
            currency:'inr',
            customer:customer.id
     })
    })
    .then((charge)=>{
        res.send('Payment Successful');
    })
    .catch((err)=>{
        res.send(err);
    })
    });


app.listen(5000);