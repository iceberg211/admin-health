import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { detail, create, upData, update } from '../services/project';

export default {
  namespace: 'addProject',
  state: {
    saveProjectMilestoneRqBeanList: [],
    saveProjectTeamRqBeanList: [],
    saveProjectFinancingHistoryRqBeanList: [],
  },
  reducers: {
    changeEditState(state) {
      return {
        ...state,
        edit: true,
      };
    },
    closeEditState(state) {
      return {
        ...state,
      };
    },
    onChange(state, { payload }) {
      return {
        ...state,
        upload: Object.assign({}, state.upload, ...payload),
      };
    },
    clearEditState(state) {
      return {
        ...state,
        saveProjectMilestoneRqBeanList: [],
        saveProjectTeamRqBeanList: [],
        saveProjectFinancingHistoryRqBeanList: [],
        edit: false,
      };
    },
    querySuccess(state, { payload }) {
      return {
        ...state,
        projectInfoRsBean: payload.projectInfoRsBean,
        projectFinancingDemandRsBean: payload.projectFinancingDemandRsBean,
        projectMarketAnalysisRsBean: payload.projectMarketAnalysisRsBean,
        projectOperationRsBean: payload.projectOperationRsBean,
        saveProjectTeamRqBeanList: payload.projectTeamRsBeanList,
        saveProjectFinancingHistoryRqBeanList: payload.projectFinancingHistoryRsBeanList,
        projectDetailRsBean: payload.projectDetailRsBean,
        projectTeamRsBeanList: payload.projectTeamRsBeanList,
      };
    },
    addProjectList(state, { payload }) {
      let list = state.saveProjectMilestoneRqBeanList;
      if (list == null) list = [];
      list.push(payload);
      return {
        ...state,
        saveProjectMilestoneRqBeanList: list,
      };
    },
    delProjectList(state, { payload }) {
      return {
        ...state,
        saveProjectTeamRqBeanList: [
          ...state.saveProjectMilestoneRqBeanList.slice(0, payload),
          ...state.saveProjectMilestoneRqBeanList.slice(payload + 1),
        ],
      };
    },
    addTeamList(state, { payload }) {
      let list = state.saveProjectTeamRqBeanList;
      if (list == null) list = [];
      list.push(payload);
      return {
        ...state,
        saveProjectTeamRqBeanList: list,
      };
    },
    delTeamList(state, { payload }) {
      return {
        ...state,
        saveProjectTeamRqBeanList: [
          ...state.saveProjectTeamRqBeanList.slice(0, payload),
          ...state.saveProjectTeamRqBeanList.slice(payload + 1),
        ],
      };
    },
    addFinancList(state, { payload }) {
      let list = state.saveProjectFinancingHistoryRqBeanList;
      if (list == null) list = [];

      list.push(payload);
      return {
        ...state,
        saveProjectFinancingHistoryRqBeanList: list,
      };
    },
    delFinancList(state, { payload }) {
      return {
        ...state,
        saveProjectFinancingHistoryRqBeanList: [
          ...state.saveProjectFinancingHistoryRqBeanList.slice(0, payload),
          ...state.saveProjectFinancingHistoryRqBeanList.slice(payload + 1),
        ],
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
        message.success('创建成功');
        yield put({ type: 'changeEditState' });
      } else {
        throw data;
      }
    },
    *upData({ payload }, { call }) {
      const data = yield call(upData, payload);
      if (data.code === 0) {
        message.success('修改成功');
      } else {
        throw data;
      }
    },
    *update({ payload }, { call, put }) {
      const data = yield call(update);
      if (data.code === 0) {
        message.success('发布成功');
        yield put(routerRedux.push('/project'));
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/addProject' && location.query.id !== undefined) {
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
