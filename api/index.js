require("dotenv").config();
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
const routes = require('../src/routes/routes')
const dotenv = require('dotenv')
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


//PORT 
const PORT = process.env.PORT || 4000

dotenv.config();

//DB Connection
const client = new MongoClient(process.env.DB_CONNECT, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


app.use(express.json());
// app.use(cors())

app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.options(
    '*',
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);


app.get('/', (req, res) => {
    res.send('Hello NotifyMeUp!');
});

app.use('/api', routes)

const server = app.listen(PORT, () => {
    console.log(`Server Running: http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server Close: Process Terminated!');
    });
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);