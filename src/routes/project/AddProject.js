import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Collapse, message } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BaseInfor from './addProject/BaseInfor';
import DetailedInfor from './addProject/DetailedInfor';
import Market from './addProject/Market';
import Progress from './addProject/Progress';
import Team from './addProject/Team';
import Operation from './addProject/Operation';
import FinanchHistory from './addProject/FinanchHistory';
import Financing from './addProject/Financing';
import Styles from './addProject.less';

const ButtonGroup = Button.Group;
const Panel = Collapse.Panel;

/**
 * 该组件为表单提交页面,提交的对象中数组型(如saveProjectFinancingHistoryRqBeanList)的数据流走redux,对象类通过getFieldsValue获取
 * @param {any} { dispatch, form, addProject, location }
 * @returns
 */
const AddProject = ({ dispatch, form, addProject }) => {
  const {
    edit,
    saveProjectMilestoneRqBeanList,
    saveProjectTeamRqBeanList,
    saveProjectFinancingHistoryRqBeanList,
    projectInfoRsBean,
    projectFinancingDemandRsBean,
    projectMarketAnalysisRsBean,
    projectOperationRsBean,
    projectDetailRsBean,
  } = addProject;

  const { validateFields, getFieldsValue } = form;
  const submit = () => {
    validateFields((error) => {
      if (error) {
        message.error('请补全所有必填字段');
        return;
      }
      const baseInfo = getFieldsValue(['brief', 'postion', 'company', 'creatorIdentity', 'financingRounds', 'icon',
        'investor', 'name', 'operationAdvantage', 'stage', 'teamFeature']);
      if (baseInfo.icon.fileList) {
        baseInfo.icon = baseInfo.icon.fileList.map((item) => {
          return item.response.data;
        }).toString();
      }
      const { postion } = baseInfo;
      baseInfo.province = postion[0];
      baseInfo.city = postion[1];
      delete baseInfo.postion;
      baseInfo.online = true;
      // 基本信息
      const addProjectInfoRqBean = baseInfo;
      const saveProjectDetailRqBean = getFieldsValue(['advantage', 'downloadAndroid', 'downloadIos', 'images',
        'officeAddress', 'videoUrl', 'website']);
      if (saveProjectDetailRqBean.images && saveProjectDetailRqBean.images.fileList) {
        saveProjectDetailRqBean.images = saveProjectDetailRqBean.images.fileList.map((item) => {
          return item.response.data;
        }).join(',');
      }
      const saveProjectFinancingDemandRqBean = getFieldsValue(['amount', 'plan']);
      const saveProjectMarketAnalysisRqBean = getFieldsValue(['advantage', 'profitModel', 'rival', 'targetUsers']);
      const saveProjectOperationRqBean = getFieldsValue(['introduction', 'mau', 'monthlyIncome',
        'pct', 'pv', 'sale', 'totalUsers', 'uv']);

      /*
      ** 编辑模式下需要添加id,不然接口会出现400错误
      */
      if (edit) {
        addProjectInfoRqBean.id = projectInfoRsBean.id;
        saveProjectDetailRqBean.id = projectInfoRsBean.id;
        saveProjectMarketAnalysisRqBean.id = projectDetailRsBean.id;
        saveProjectOperationRqBean.id = projectDetailRsBean.id;
        saveProjectFinancingDemandRqBean.id = projectDetailRsBean.id;
        if (saveProjectMilestoneRqBeanList) saveProjectMilestoneRqBeanList.forEach(item => (item.projectId = projectDetailRsBean.id));
        if (saveProjectTeamRqBeanList) saveProjectTeamRqBeanList.forEach(item => (item.projectId = projectDetailRsBean.id));
        if (saveProjectFinancingHistoryRqBeanList) saveProjectFinancingHistoryRqBeanList.forEach(item => (item.projectId = projectDetailRsBean.id));
        dispatch({
          type: 'addProject/upData',
          payload: {
            updateProjectInfoRqBean: baseInfo,
            saveProjectDetailRqBean,
            saveProjectFinancingDemandRqBean,
            saveProjectMarketAnalysisRqBean,
            saveProjectOperationRqBean,
            saveProjectMilestoneRqBeanList,
            saveProjectTeamRqBeanList,
            saveProjectFinancingHistoryRqBeanList,
          },
        });
      } else {
        dispatch({
          type: 'addProject/create',
          payload: {
            addProjectInfoRqBean,
            saveProjectDetailRqBean,
            saveProjectFinancingDemandRqBean,
            saveProjectMarketAnalysisRqBean,
            saveProjectOperationRqBean,
            saveProjectMilestoneRqBeanList,
            saveProjectTeamRqBeanList,
            saveProjectFinancingHistoryRqBeanList,
          },
        });
      }
    });
  };
  const upProgress = (payload) => {
    dispatch({
      type: 'addProject/addProjectList',
      payload,
    });
  };
  const addTeam = (payload) => {
    dispatch({
      type: 'addProject/addTeamList',
      payload,
    });
  };
  const delTeam = (payload) => {
    dispatch({
      type: 'addProject/delTeamList',
      payload,
    });
  };
  const addFinanch = (payload) => {
    dispatch({
      type: 'addProject/addFinancList',
      payload,
    });
  };
  const delFinanch = (payload) => {
    dispatch({
      type: 'addProject/delFinancList',
      payload,
    });
  };
  const BaseInforProps = { projectInfoRsBean, edit, form };
  const DetailedInforProps = { projectDetailRsBean, edit, form };
  const MarketProps = { projectMarketAnalysisRsBean, edit, form };
  const ProgressProps = { edit, upProgress, saveProjectMilestoneRqBeanList };
  const teamProps = { edit, addTeam, delTeam, saveProjectTeamRqBeanList };
  const operationProps = { projectOperationRsBean, edit, form };
  const financingProps = { projectFinancingDemandRsBean, edit, form };
  const FinanchHistoryProps = {
    edit,
    form,
    addFinanch,
    delFinanch,
    saveProjectFinancingHistoryRqBeanList,
  };
  return (
    <div>
      <Form >
        <Collapse defaultActiveKey={edit ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['1']} accordion={!edit}>
          <Panel header={'项目简介(所有项目必填)'} key="1">
            <BaseInfor {...BaseInforProps} />
          </Panel>
          <Panel header={'详细信息'} key="2">
            <DetailedInfor {...DetailedInforProps} />
          </Panel>
          <Panel header={'市场分析'} key="3">
            <Market {...MarketProps} />
          </Panel>
          <Panel header={'项目历程'} key="4">
            <Progress {...ProgressProps} />
          </Panel>
          <Panel header={'团队成员'} key="5">
            <Team {...teamProps} />
          </Panel>
          <Panel header={'运营数据'} key="6">
            <Operation {...operationProps} />
          </Panel>
          <Panel header={'融资需求'} key="7">
            <Financing {...financingProps} />
          </Panel>
          <Panel header={'融资历史'} key="8">
            <FinanchHistory {...FinanchHistoryProps} />
          </Panel>
        </Collapse>
      </Form>
      <ButtonGroup className={Styles.subButton}>
        <Button onClick={submit} type="primary" style={{ width: '180px' }} >保存</Button>
        <Button onClick={submit} type="primary" style={{ width: '180px' }} >发布</Button>
        <Link to="/project"><Button style={{ width: '180px' }} >返回</Button></Link>
      </ButtonGroup>

    </div >
  );
};

AddProject.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object,
  addProject: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    addProject: state.addProject,
    loading: state.loading,
  };
};

export default Form.create()(connect(mapStateToProps)(AddProject));

