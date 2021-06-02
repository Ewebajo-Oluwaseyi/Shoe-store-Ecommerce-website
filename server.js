const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/user')
const auth = require('./routes/auth')
const product = require('./routes/product')
const cart = require('./routes/cart')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();

app.use(express.json({ extended: false }));


connectDB();

app.use("/api/users", user);
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/cart', cart);


/*app.get("/api/products", (req,res) =>{
    res.send(database.products);
});*/


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log("server started at http://localhost:5000")})