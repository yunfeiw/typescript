"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodify = require("koa-body");
const serve = require("koa-static");
const timing = require("koa-xtime");
const app = new Koa();
app.use(timing());
app.use(serve(`${__dirname}/public`));
app.use(bodify({
    multipart: true,
    //使用非严格模式，解析delete 请求的请求体
    strict: false
}));
app.use((ctx) => {
    ctx.body = "hello";
});
app.listen(3000, () => {
    console.log("服务开启");
});
//# sourceMappingURL=index.js.map