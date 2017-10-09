import modelExtend from 'dva-model-extend';
import { querys, update, create, deleteList, detail } from '../services/infor';
import { listModel } from './common';

export default modelExtend(listModel, {
  namespace: 'inforHome',
  state: {
    modalVisibility: false,
    pageVisibility: false,
    query: {
      page: 1,
      size: 10,
      startTime: null,
      endTime: null,
      status: null,
      title: null,
    },
  },
  reducers: {
    updateQuery(state, { payload }) {
      return {
        ...state,
        query: { ...payload },
      };
    },
    showPageModal(state) {
      return {
        ...state,
        pageVisibility: true,
      };
    },
    hidePageModal(state) {
      return {
        ...state,
        pageVisibility: false,
      };
    },
    queryDetailSuc(state, { payload }) {
      return {
        ...state,
        page: payload,
      };
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(querys, payload);
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
      const data = yield call(deleteList, params);
      if (data.code === 0) {
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *queryDetail({ payload }, { call, put }) {
      const data = yield call(detail, payload);
      if (data.code === 0) {
        yield put({ type: 'showPageModal' });
        yield put({ type: 'queryDetailSuc', payload: data.data });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/' || location.pathname === '/home/infor') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
});
