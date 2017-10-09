import modelExtend from 'dva-model-extend';
import { reportQuery, create, deleteReport, update } from '../services/report';
import { listModel } from './common';


export default modelExtend(listModel, {
  namespace: 'reportIndex',
  state: {
    modalVisibility: false,
  },
  reducers: {

  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      // 包含状态值的响应数据
      const data = yield call(reportQuery, payload);
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
        throw data.message;
      }
    },
    *deleteReport({ payload }, { call, put }) {
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
      const data = yield call(deleteReport, params);
      if (data.data.success) {
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/home/inforReport') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
});
