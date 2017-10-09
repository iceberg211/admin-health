import modelExtend from 'dva-model-extend';
import { query, create, deletes, update } from '../services/user';
import { listModel } from './common';


export default modelExtend(listModel, {
  namespace: 'user',
  state: {
    modalVisibility: false,
    loading: false,
  },
  reducers: {

  },
  effects: {
    *query({ payload }, { call, put }) {
      // 包含状态值的响应数据
      const data = yield call(query, payload);
      if (data.code === 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            data,
          },
        });
      }
    },
    *update({ payload }, { call, put }) {
      const data = yield call(update, payload);
      if (data.code === 0) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.code === 0) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data.err.Error;
      }
    },
    *deletes({ payload }, { call, put }) {
      let params;
      if (payload.length > 1) {
        params = {
          ids: payload.join(','),
        };
      } else {
        params = {
          id: payload.toString(),
        };
      }
      const data = yield call(deletes, params);
      if (data.code === 0) {
        yield put({ type: 'query' });
      } else {
        throw data.err.Error;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
          });
          // 在用户主页，需要清除掉审核状态,需要关掉编辑模式,还需要清除用户的信息，以免引起bug
          dispatch({
            type: 'addUser/clearEditState',
          });
        }
      });
    },
  },
});
