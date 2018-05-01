import express from 'express';
import cors from 'cors';

import initConfigs from './configs';
import initAPI from './api';

const app = express();
const PORT = 3333;

app.use('*', cors());

initConfigs(app);
initAPI(app);

app.listen(PORT, err => {
  if (err) {
    console.log('ERROR starting Express ...', err);
  } else {
    console.log(
      `Express GraphQL server is running. Access GraphiQL on: http://localhost:${PORT}/graphiql`
    );
  }
});
