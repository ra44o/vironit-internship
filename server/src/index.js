const { userRouter, cityRouter } = require('./routers/routers');
const helmet = require('helmet');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../documentation.json');

const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customJs: '/custom.js' }));
app.use('/api/users', userRouter);
app.use('/api/cities', cityRouter);

const start = async () => {
  try {
    await mongoose.connect(
      // 'mongodb+srv://ra44o:rak1997@vironit-intern-ayhnq.mongodb.net/users',
      'mongodb://localhost:27017/vironit',
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      err => {
        if (err) {
          throw new Error(err);
        }
        console.log('Database is connected');
      }
    );
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
