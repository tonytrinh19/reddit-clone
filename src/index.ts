import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microORMConfig from "./mikro-orm.config";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const port = process.env.PORT || 3000;

const main = async () => {
  const orm = await MikroORM.init(microORMConfig);

  // Runs the migration
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // const post = orm.em.create(Post, { title: "First post" });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
};

main();
