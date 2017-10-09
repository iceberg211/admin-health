import modelExtend from 'dva-model-extend';
import { query, update, create, deleteList } from '../services/project';
import { listModel } from './common';

export default modelExtend(listModel, {
  namespace: 'project',
  state: {
    modalVisibility: false,
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
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.data.code === 0) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *deletes({ payload }, { call, put }) {
      let params;
      if (payload.length > 1) {
        params = {
          ids: payload,
        };
      } else {
        params = {
          id: payload,
        };
      }
      const data = yield call(deleteList, params);
      if (data.data.code === 0) {
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/project') {
          dispatch({
            type: 'query',
          });
          dispatch({
            type: 'addProject/clearEditState',
          });
        }
      });
    },
  },
});
