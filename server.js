let cors = require('cors');

const express =     require('express'),
    router =       require('./router');

port = process.env.PORT || 5000;


const corsOptions = {
    origin: true,
    methods: [
        'GET',
        'PUT',
        'POST',
        'DELETE',
        'OPTIONS'
    ],
    allowedHeaders: [
        'Authorization',
        'Content-Type',
        'Content-Length',
        'User-Email',
        'User-Hash',
        'X-Requested-With'
    ]
};

let app = express();
app.use(cors(corsOptions));

app.use(router);

app.listen(port);
console.log('APP started on: ' + port);
