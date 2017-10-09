import React, { PropTypes } from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/app';


const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

function Routers({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/inforHome'));
          cb(null, { component: require('./routes/infor/index/InforHome') });
        }, 'inforHome');
      },
      childRoutes: [
        {
          path: 'home/infor',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/inforHome'));
              cb(null, require('./routes/infor/index/InforHome'));
            }, 'infor');
          },
        },
        {
          path: 'home/inforReport',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/report'));
              cb(null, require('./routes/infor/report/Reportindex'));
            }, 'inforReport');
          },
        },
        {
          path: 'home/inforPic',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/banner'));
              cb(null, require('./routes/infor/banner/BannerIndex'));
            }, 'inforPic');
          },
        },
        {
          path: 'event',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/event'));
              cb(null, require('./routes/event/EventIndex'));
            }, 'event');
          },
        },
        {
          path: 'user',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user'));
              cb(null, require('./routes/user/User'));
            }, 'user');
          },
        },
        {
          path: 'addUser',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/addUser'));
              cb(null, require('./routes/user/AddUser'));
            }, 'user');
          },
        },
        // {
        //   path: '/setting/contacts',
        //   getComponent(nextState, cb) {
        //     require.ensure([], (require) => {
        //       registerModel(app, require('./models/userSetting'));
        //       cb(null, require('./routes/setting/UserSetting'));
        //     }, 'contacts');
        //   },
        // },
        {
          path: 'project',
          name: 'project',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/project'));
              cb(null, require('./routes/project/ProjectIndex'));
            }, 'project');
          },
        },
        {
          path: 'addProject',
          name: 'addProject',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/addProject'));
              cb(null, require('./routes/project/AddProject'));
            }, 'addProject');
          },
        },
        {
          path: 'login',
          name: 'login',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'));
              cb(null, require('./routes/login/login'));
            }, 'login');
          },
        },
        {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/index'));
            }, 'error');
          },
        },
      ],
    },
  ];
  return (
    <Router history={history} routes={routes} />
  );
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};


export default Routers;
