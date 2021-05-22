const Express = require('express');

const CardRoutes = require('./routes/cardroute');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = new Express();


const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use(bodyParser.json());


app.use("/card",CardRoutes)

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(Express.static(path.join(__dirname, 'task-frontend/build')));
// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'task-frontend/build', 'index.html'));
    });
}



const port = process.env.PORT || 5000;

app.listen(port,(err)=>{

      if(err){
         console.log(err);
         return;
      }

      console.log("App is running on "+port)
})
