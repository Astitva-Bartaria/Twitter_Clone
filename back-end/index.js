const express = require('express');
const dbConnect = require('./configure/config');
const app = express();
app.use(express.json());
const fileUpload = require('express-fileupload');
const cors = require('cors');
const route = require('./routes/route');
const cloudConnect = require('./configure/cloudConfig');
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use('/api/vt1',route);
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING AT ${PORT}`)
})
cloudConnect();
dbConnect();