import express from 'express';
import dogRoute from './src/routes/DogRoute';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({hello: 'world'});
});

app.use('/dogs', dogRoute);

export default app;
