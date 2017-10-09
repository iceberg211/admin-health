import modelExtend from 'dva-model-extend';
import { listModel } from './common';
import { query, update, create, deleteList, queryUsers, exportUsers } from '../services/event';

export default modelExtend(listModel, {
  namespace: 'event',
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
    pageVisibility: false,
    usersVisibility: false,
  },
  reducers: {
    updateQuery(state, { payload }) {
      return {
        ...state,
        query: { ...payload },
      };
    },
    queryUersSuccess(state, { payload }) {
      return {
        ...state,
        eventUsers: payload,
      };
    },
    showPageModal(state, { payload }) {
      return {
        ...state,
        pageVisibility: true,
        eventId: payload,
      };
    },
    hidePageModal(state) {
      return {
        ...state,
        pageVisibility: false,
      };
    },
    showUsersModal(state, { payload }) {
      return {
        ...state,
        usersVisibility: true,
        eventId: payload,
      };
    },
    hideUsersModal(state) {
      return {
        ...state,
        usersVisibility: false,
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
    *queryUers({ payload }, { call, put }) {
      const data = yield call(queryUsers, payload);
      if (data.code === 0) {
        yield put({
          type: 'queryUersSuccess',
          payload,
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
      if (data.code === 0) {
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/event') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
});
