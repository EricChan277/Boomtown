import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import initFirebase from '../resources/firebase';
import initPostgres from '../resources/postgres';
import initJson from '../resources/jsonServer';

import typeDefs from './schema';
import createLoaders from './loaders';
import createResolvers from './resolvers';

export default function(app) {
  const firebaseResources = initFirebase(app);
  const pgResources = initPostgres(app);
  const jsonResources = initJson(app);

  const resolvers = createResolvers({
    firebaseResources,
    pgResources,
    jsonResources
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
      schema,
      context: {
        loaders: createLoaders({
          jsonResources,
          pgResources,
          firebaseResources
        })
      }
    })
  );

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql'
    })
  );
}
