const router = require('./routers/myRouter');
const helmet = require('helmet');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));