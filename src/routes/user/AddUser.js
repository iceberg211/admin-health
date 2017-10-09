import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, message, Button, Card, Input } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BaseInfor from './addUser/BaseInfor';
import Education from './addUser/Education';
import Work from './addUser/Work';
import Styles from './AddUser.less';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const { TextArea } = Input;
const AddUser = ({ addUser, dispatch }) => {
  const { data, edit, userId, auditor, renderOk } = addUser;
  const { user, userExt, eduList, jobList } = data;
  const saveUser = (payload) => {
    dispatch({
      type: 'addUser/create',
      payload,
    });
  };
  const eduCreate = (payload) => {
    dispatch({
      type: 'addUser/eduCreate',
      payload,
    });
  };

  const jobCreate = (payload) => {
    dispatch({
      type: 'addUser/jobCreate',
      payload,
    });
  };
  const deletesEdu = (payload) => {
    dispatch({
      type: 'addUser/deletesEdu',
      payload,
    });
  };
  const deletesJob = (payload) => {
    dispatch({
      type: 'addUser/deletesJob',
      payload,
    });
  };
  let content = null;
  const textAreaHandle = (e) => {
    content = e.target.value;
  };
  const auditorSave = (status) => {
    dispatch({
      type: 'addUser/examine',
      payload: {
        status,
        id: userId,
        content,
      },
    });
  };
  const baseInforProp = {
    user,
    userExt,
    edit,
    saveUser,
    userId,
    renderOk,
  };
  const eduProps = {
    eduList,
    edit,
    eduCreate,
    deletesEdu,
    userId,
  };
  const workProps = {
    edit,
    jobCreate,
    deletesJob,
    jobList,
    userId,
  };
  return (
    <div className={Styles.container}>
      <Collapse defaultActiveKey={edit ? ['1', '2', '3'] : ['1']} accordion={!edit} >
        <Panel key="1" header={'用户信息(请填写完成后再添加经历)'}> <BaseInfor {...baseInforProp} /> </Panel>
        <Panel key="2" header={'教育信息'}> <Education {...eduProps} /> </Panel>
        <Panel key="3" header={'工作经历'}> <Work {...workProps} /> </Panel>
      </Collapse >
      {auditor ?
        <Card title="审核结果描述" className={Styles.clearfix}>
          <TextArea rows={5} onChange={textAreaHandle} className={Styles.input} />
          <ButtonGroup className={Styles.subButton}>
            <Button type="primary" style={{ width: '180px' }} onClick={auditorSave.bind(this, 1)}>通过</Button>
            <Button type="danger" style={{ width: '180px' }} onClick={auditorSave.bind(this, -1)} >不通过</Button>
            <Link to="/user"><Button style={{ width: '180px' }}>取消</Button></Link>
          </ButtonGroup>
        </Card> : null}
    </div>

  );
};

AddUser.propTypes = {
  addUser: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    addUser: state.addUser,
  };
};
export default connect(mapStateToProps)(AddUser);
