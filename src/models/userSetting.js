import modelExtend from 'dva-model-extend';
import { reportQuery, create, deleteReport } from '../services/report';
import { listModel } from './common';


export default modelExtend(listModel, {
  namespace: 'userSetting',
  state: {
    modalVisibility: false,
    loading: false,
  },
  reducers: {

  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      // 包含状态值的响应数据
      const data = yield call(reportQuery, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *deleteReport({ payload }, { call, put }) {
      const data = yield call(deleteReport, payload);
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
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
});
