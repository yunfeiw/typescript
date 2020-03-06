import * as Koa from 'koa';
import { get, post, middlewares } from '../utils/route-decors';
const users = [{ name: 'tom', age: 20 }, { name: 'tom', age: 20 }];

@middlewares([
    async function guard(ctx: Koa.Context, next: () => Promise<any>) {
        console.log('gurad', ctx.header);
        if (ctx.header.token) {
            await next();
        } else {
            throw '请登录'
        }
    }
])
export default class User {
    @get('/users')
    public list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }
    @post('/users', {
        middlewares: [
            async function validation(ctx: Koa.Context, next: () => Promise<any>) {
                // 用户名必填
                const name = ctx.request.body.name;
                if (!name) {
                    throw '请输入用户名！'
                }
                // 用户名不能重复
                try {
                    await api.findByName(name)
                    //校验通过
                    await next();
                } catch (error) {
                    throw error;
                }
            }
        ]
    })
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 };
    }
}
/**
 * 知识点补充 ：装饰器的编写，以@get('/users')为例，它是函数装饰器且有配置项，其函数签名为：
 *
*/
//异步校验接口
const api = {
    findByName(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name === 'xia') {
                    reject('用户名已存在');
                } else {
                    resolve();
                }
            }, 500);
        })
    }
}