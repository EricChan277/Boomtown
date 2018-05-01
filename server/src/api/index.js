import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import initPostgres from '../resources/postgres';
import initJson from '../resources/jsonServer';

import typeDefs from './schema';
import createLoaders from './loaders';
import createResolvers from './resolvers';

export default function(app) {
  //   const pgResources = initPostgres(app);
  const jsonResources = initJson(app);

  const resolvers = createResolvers({
    // pgResources,
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
        loaders: createLoaders({ jsonResources })
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
