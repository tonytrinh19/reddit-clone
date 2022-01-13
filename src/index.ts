import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microORMConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microORMConfig);

  // Runs the migration
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: "First post" });
  // await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main();
