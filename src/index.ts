import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import microORMConfig from './mikro-orm.config'

const main = async () => {
    const orm = await MikroORM.init(microORMConfig);

    const post = orm.em.create(Post, { title: 'First post' });
    await orm.em.persistAndFlush(post);
    console.log('------------------------sql 2----------------------------');
    await orm.em.nativeInsert(Post, { title: 'first post 2' });
}

main();

