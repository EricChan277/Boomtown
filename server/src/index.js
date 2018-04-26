import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';
import schema from './schema';

const app = express();
const PORT = 3333;

app.use('*', cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.listen(PORT, err => {
  if (err) {
    console.log('ERROR starting Express ...', err);
  } else {
    console.log(
      `Express GraphQL server is running. Access GraphiQL on: http://localhost:${PORT}/graphiql`
    );
  }
});

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);
