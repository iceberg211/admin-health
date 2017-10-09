import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import styles from './app.less';
import { Header, Sider, Footer, Loader } from '../components/Layout/index';
import Login from '../routes/login/login';
import { footerText, name } from '../utils/config';

let lastHref;

const App = (props) => {
  const { children, dispatch, location, route, app, loading } = props;
  const { logined } = app;
  const href = window.location.href;
  /**
   * NProgress的加载动画，通过dva-loading的global属性，一旦有请求或者路由切换事件，global都会变为false
   * 通过global来控制NProgress的动画条
   */
  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  const headerProps = {
    logout() {
      dispatch({ type: 'app/logout' });
    },
    name,
  };
  const siderProps = {
    location,
  };
  const BreadProps = {
    location,
  };
  const footeProps = {
    text: footerText,
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>健康创投融资</title>
      </Helmet>
      {
        logined ?
          <div>
            <Header {...headerProps} />
            <Sider {...siderProps} />
            <div className={styles.main}>
              <div className={styles.container}>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
            </div>
            <Footer {...footeProps} />
          </div>
          :
          <Login />
      }
    </div>
  );
};
App.propTypes = {
  app: PropTypes.object,
  loading: PropTypes.object,
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
