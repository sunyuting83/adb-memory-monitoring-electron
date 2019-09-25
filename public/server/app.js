const Koa = require('koa');
const getData = require('./data');
// 导入controller middleware:
// 导入采集项
const app = new Koa();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        let params = {
            cmder: 'all'
        };
        ctx.response.body = await getData.person.init(params);
    } else {
        await next();
    }
});
app.use(async (ctx, next) => {
    if (ctx.request.path === '/driver') {
        let params = {
            cmder: 'driver',
            driver: ctx.request.query.driver
        };
        ctx.response.body = await getData.person.init(params);
    } else {
        await next();
    }
});
app.use(async (ctx, next) => {
    if (ctx.request.path === '/package') {
        let params = {
            cmder: 'package',
            driver: ctx.request.query.driver,
            packages: ctx.request.query.packages
        };
        ctx.response.body = await getData.person.init(params);
    } else {
        await next();
    }
});
app.use(async (ctx, next) => {
    if (ctx.request.path === '/memory') {
        let params = {
            cmder: 'getmemory',
            driver: ctx.request.query.driver,
            packages: ctx.request.query.packages
        };
        ctx.response.body = await getData.person.init(params);
    } else {
        await next();
    }
});
// scheduleCronstyle();

app.listen(15325);

module.exports = app;