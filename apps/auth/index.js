import Koa from 'koa'
import c from 'koa-convert'
import { get } from 'koa-route'
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'
import session from 'koa-generic-session'
import kpassport from 'koa-passport'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import browserify from 'koa-browserify-middleware'
import path from 'path'

const app = new Koa()
const { AUTH0_ID, AUTH0_SECRET, AUTH0_DOMAIN, SESSION_SECRET } = process.env
const { PASSPORT_CALLBACK_PATH } = process.env

// Set up Passport
const strategy = new Auth0Strategy({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_ID,
  clientSecret: AUTH0_SECRET,
  callbackURL: '/callback'
}, (a, r, extra, profile, done) =>
  done(null, Object.assign(profile, { jwtToken: extra.id_token })))
passport.use(strategy)
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))
app.keys = [SESSION_SECRET]
app.use(c(session({ cookie: { key: 'calf-session', signed: false } })))
app.use(bodyParser())
app.use(kpassport.initialize())
app.use(kpassport.session())
app.use(c(get(PASSPORT_CALLBACK_PATH, (ctx, next) => {
  return kpassport.authenticate('auth0', (user, info, status) => {
    ctx.login(user)
    next()
  })(ctx, next)
})))

// Parse JWTs
app.use(async (ctx, next) => {
  if (ctx.headers.Authorization) {
    c(jwt({
      secret: new Buffer(AUTH0_SECRET, 'base64'),
      audience: AUTH0_ID
    })).apply(ctx, arguments)
  }
  await next()
})

// Routes for login/logout/ensure-logged-in
app.use(async (ctx, next) => {
  if (!ctx.session.passport) return await next()
  ctx.state.user = ctx.session.passport.user
  await next()
})
app.use(c(get('/', async (ctx, next) => {
  ctx.state.user ? ctx.redirect('/campaigns') : ctx.redirect('/login')
})))
app.use(c(get('/login.js', c(browserify(
  path.join(__dirname, 'client.js'),
  { transform: ['babelify', 'brfs', 'envify'] }
)))))
app.use(c(get('/login', async (ctx, next) => {
  if (ctx.state.user) return ctx.redirect('/campaigns')
  ctx.body = `
    <html><body><script src="login.js"></script></body></html>
  `
})))
app.use(c(get('/logout', (ctx) => {
  ctx.logout()
  ctx.redirect('/')
})))
app.use(c(get('/callback', async (ctx, next) => {
  ctx.redirect('/')
})))

export default app
