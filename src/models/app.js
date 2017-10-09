import { routerRedux } from 'dva/router';
import { queryCode } from '../services/common';

export default {
  namespace: 'app',
  state: {
    user: {
      name: '',
      id: '',
      login: '',
    },
    logined: true,
  },
  effects: {
    *fetch({
      payload,
    }, { call, put }) {
      yield put({ type: 'save' });
    },
    *logout({
      payload,
    }, { put }) {
      yield put(routerRedux.push('/login'));
      yield put({ type: 'changeLogin' });
    },
    *login({
      payload,
    }, { put }) {
      yield put(routerRedux.push('/home/infor'));
      yield put({ type: 'changeLogin' });
    },
    *queryCode({ payload }, { call, put }) {
      const data = yield call(queryCode);
      if (data.code === 0) {
        yield put({
          type: 'updateState',
          payload: data.data,
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        code: payload,
      };
    },
    changeLogin(state) {
      return {
        ...state,
        ...{
          logined: !state.logined,
        },
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          // dispatch({ type: 'queryCode' });
        }
      });
    },
  },
};
