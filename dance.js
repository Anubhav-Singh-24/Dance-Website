const express = require('express')
const app = express();
const path = require('path');
const port = 80;
const bodyparser = require('body-parser');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dancewebsiteinfo',{useNewUrlParser:true});
mongoose.set('strictQuery', true);

// Setting the view engine as pug and path as the views file
app.use('/static',express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// Pug endpoint
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');    
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

// Post request for saving the contact infos
// We need to install bodyparser to send post requests with express
app.post('/contact',(req,res)=>{
    var mydata = new Contact(req.body);
    // .save() returns a promise so we have to add then
    mydata.save().then(()=>{
        res.send("The information was saved successfully")
    }).catch(()=>{
        res.status(400).send("Error in saving the data")
    })
});

// Server start
app.listen(port,()=>{
    console.log(`Server started at port: ${port}`);
});

// Defining mongoose schema for dance website database
var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    mail:String,
    desc:String,
});

var Contact = mongoose.model('Contact',contactSchema);
