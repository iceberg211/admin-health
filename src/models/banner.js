import modelExtend from 'dva-model-extend';
import { listModel } from './common';
import { query, create, deleteList, update } from '../services/banners';

export default modelExtend(listModel, {
  namespace: 'inforPic',
  state: {
    modalVisibility: false,
    loading: false,
    modalType: 'create',
  },
  reducers: {
    clear(state) {
      return {
        ...state,
        currentItem: [],
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
        throw data;
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
        if (location.pathname === '/home/inforPic') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
});
