const router = require('./routers/myRouter');
const helmet = require('helmet');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/get-users', router);
app.use('/api/users/create-user', router);
app.use('/api/users/update-user', router);
app.use('/api/users/delete-user', router);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));