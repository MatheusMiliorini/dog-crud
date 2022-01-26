import express from 'express';
import morgan from 'morgan';
import dogRoute from './routes/DogRoute';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.use('/dogs', dogRoute);

export default app;
