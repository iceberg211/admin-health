import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import 'babel-polyfill';
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  //  history: browserHistory,
  onError(error) {
    message.error(error.message);
  },
});

// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(require('./models/app'));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
