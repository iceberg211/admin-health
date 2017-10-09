import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Action from './Action';
import List from '../../components/List/List';
import Filter from './Filter';
import format from '../../utils/format';


const columns = [
  {
    title: '用户名',
    dataIndex: 'id',
    key: ' id',
  }, {
    title: '真实姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <span> {text ? '已发布' : '未发布'}</span>,
  },
  {
    title: '角色',
    dataIndex: 'company',
    key: 'company',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '登录数',
    dataIndex: 'auditor',
    key: 'auditor',
  },
  {
    title: '记录创建者',
    dataIndex: 'creator',
    key: 'creator',

  }, {
    title: '记录创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
    render: text => <span>{new Date(text).format('yyyy-MM-dd hh:mm:ss')}</span>,
  },
];

const UserSetting = ({ dispatch, userSetting, loading }) => {
  const { modalVisibility, data, pagination, modalType, currentItem } = userSetting;
  const query = (payload) => {
    dispatch({
      type: 'userSetting/query',
      payload,
    });
  };

  const searchProps = {
    query,
  };
  const onCancel = () => {
    dispatch({
      type: 'userSetting/hideModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'userSetting/showModal',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'userSetting/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'userSetting/query',
      payload,
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'userSetting/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'userSetting/deletes',
      payload,
    });
  };
  const modalProps = {
    currentItem: modalType === 'create' ? {} : currentItem,
    visibility: modalVisibility,
    onCancel,
    onSubmit(payload) {
      dispatch({
        type: 'userSetting/create',
        payload,
      });
    },
    title: `${modalType === 'create' ? '添加资讯信息' : '更新资讯信息'}`,
    modalType,
  };
  const listProps = {
    columns,
    data,
    loading: loading.effects['userSetting/query'],
    pagination,
    choiceItem,
    query,
  };
  const actionProps = {
    openModal,
    onCancel,
    update,
    refesh,
    currentItem,
    deletes,
  };
  return (
    <div>
      <Filter {...searchProps} />
      <Action {...actionProps} />
      <List {...listProps} />

    </div>
  );
};

UserSetting.propTypes = {

};

export default connect(({ userSetting, loading }) => ({ userSetting, loading }))(UserSetting);
