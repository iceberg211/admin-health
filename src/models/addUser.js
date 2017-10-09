import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { detail, create, jobCreate, eduCreate, deletesEdu, deletesJob, examine } from '../services/user';

export default {
  namespace: 'addUser',
  state: {
    edit: false,
    data: {
      addressMap: {},
      eduList: [],
      investMap: {},
      jobList: [],
      user: {},
      userExt: {},
    },
    userId: null,
    auditor: false,
    renderOk: false,
  },
  reducers: {
    changeAuditor(state) {
      return {
        ...state,
        auditor: true,
        edit: true,
      };
    },
    changeEditState(state) {
      return {
        ...state,
        edit: true,
      };
    },
    // 在退出的时候需要清除掉用户详情，以及编辑状态，认证状态.
    clearEditState(state) {
      return {
        ...state,
        edit: false,
        data: {
          addressMap: {},
          eduList: [],
          investMap: {},
          jobList: [],
          user: {},
          userExt: {},
        },
        userId: null,
        auditor: false,
      };
    },
    querySuccess(state, { payload }) {
      return {
        ...state,
        data: payload,
        userId: payload.user.id,
        renderOk: true,
      };
    },
    createSuccess(state, { payload }) {
      const data = state.data;
      return {
        ...state,
        data: Object.assign(data, payload),
      };
    },
    createJobSuccess(state, { payload }) {
      const data = state.data;
      return {
        ...state,
        data: Object.assign(data, payload),
      };
    },
    createEduSuccess(state, { payload }) {
      return {
        ...state,
        eduList: payload,
      };
    },
  },
  effects: {
    *query({
      payload,
    }, { call, put }) {
      const data = yield call(detail, payload);
      if (data.code === 0) {
        yield put({ type: 'querySuccess', payload: data.data });
      } else {
        throw data;
      }
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.code === 0) {
        yield put({ type: 'createSuccess', payload: data.data });
        message.success('保存成功');
      } else {
        throw data.message;
      }
    },
    *eduCreate({ payload }, { call, put, select }) {
      const data = yield call(eduCreate, payload);
      const userId = yield select(state => state.addUser.userId);
      if (data.code === 0) {
        message.success('保存成功');
        yield put({ type: 'query', payload: { id: userId } });
      }
    },
    *deletesEdu({ payload }, { call, put, select }) {
      const data = yield call(deletesEdu, payload);
      const userId = yield select(state => state.addUser.userId);
      if (data.code === 0) {
        message.success('删除成功');
        yield put({ type: 'query', payload: { id: userId } });
      } else {
        throw data.message;
      }
    },
    *jobCreate({ payload }, { call, put, select }) {
      const data = yield call(jobCreate, payload);
      const userId = yield select(state => state.addUser.userId);
      if (data.code === 0) {
        yield put({ type: 'query', payload: { id: userId } });
        message.success('保存成功');
      } else {
        throw data.message;
      }
    },
    *deletesJob({ payload }, { call, put, select }) {
      const data = yield call(deletesJob, payload);
      const userId = yield select(state => state.addUser.userId);
      if (data.code === 0) {
        message.success('删除成功');
        yield put({ type: 'query', payload: { id: userId } });
      }
    },
    *examine({ payload }, { call, put }) {
      const data = yield call(examine, payload);
      if (data.code === 0) {
        message.success('操作成功');
        yield put(routerRedux.push('/user'));
      } else {
        throw data.message;
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/AddUser' && location.query.id !== undefined) {
          dispatch({
            type: 'query',
            payload: { id: location.query.id },
          });
          dispatch({
            type: 'changeEditState',
          });
        }
      });
    },
  },
};
