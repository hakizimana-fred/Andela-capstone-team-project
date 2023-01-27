import { config } from 'dotenv';
import express from 'express';
import session from 'express-session';
import { omit } from 'lodash';
import passport from 'passport';
import { dbConnection } from './config/db';
import { authentication_strategies } from './config/passport';
import routes from './routes';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  config();
}

// authentication strategies
authentication_strategies.googleStrategy();
authentication_strategies.localStrategy();

const PORT = 3000 || process.env.PORT;
const main = async () => {
  try {
    // connect to database
    await dbConnection();
    // middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    // routes
    app.use('/api/user', routes);
    app.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        failureRedirect: '/api/v1/failed',
        session: false,
      }),
      function (req, res) {
        const user: any = req.user;
        const response = omit(user.toJSON(), 'password');
        return res.send(response);
      }
    );

    // Not found error
    app.use((req, res) => {
      res.status(404).send({
        message: 'route not found',
        status: 'resource not found',
      });
    });

    app.listen(PORT, () => console.log(`server listening on ${PORT}`));
  } catch (err) {
    process.exit(1);
  }
};

main().catch((err) => console.log(err));
