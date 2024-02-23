const exp = require('express');
const app = exp();
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer=require('nodemailer');

//connecting to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'manas'
// });


// //checking if connection is successful or not  
// connection.connect((error) => {
//     if (error) {
//         console.log('Error connecting to database:', error);
//     } else {
//         console.log('Database connection successful!');
//     }
// });

//middleware
app.use(cors());
app.use(exp.json())
app.use(bodyParser.json())
app.use(exp.urlencoded({ extended: true }));

app.post("/booktable",(req,res)=>{
    console.log(req.body);
    let FullName = req.body.FullName;
    let Email = req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;
    let NumberOfPeople = req.body.NumberOfPeople;
    let datee = req.body.datee;
    let timee = req.body.timee;
    let note = req.body.note;
    // const sql = "INSERT INTO bookinginfo VALUES (?,?,?,?,?,?,?)";
    // connection.query(sql, [FullName, Email,PhoneNumber,NumberOfPeople,datee,timee,note], (error, result) => {
    //     if (error) {
    //         console.log('Error inserting data:', error);
    //     } else {
    //         console.log(result.affectedRows + ' record(s) inserted');
    //     }
    // })
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        post: 'smtp.gmail.com',
        port:587,
        auth: {
          user: 'ukasaa00@gmail.com',
          pass: 'qfhn dkum xlvf xldm',
        },
      });
      let subject="Table is Booked ";
      let message="Confirmed for "+NumberOfPeople+" people at "+datee+" "+timee;
      const mailOptions = {
        from: 'ukasaa00@gmail.com',
        to: Email,
        subject: subject,
        text: message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.send({success:"success"});
      });
})



app.listen(3500, () => console.log("Server listening in port 3500"));