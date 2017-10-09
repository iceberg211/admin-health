import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Action from '../Action';
import List from '../../../components/List/List';
import SearchBar from '../SearchBar';
import AddReport from './addReport';
import format from '../../../utils/format';

const columns = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
  }, {
    title: '发布状态',
    dataIndex: 'status',
    key: 'status',
    render: text => <span> {text ? '已发布' : '未发布'}</span>,
  }, {
    title: '记录创建者',
    dataIndex: 'creator',
    key: 'creator',

  }, {
    title: '发布日期',
    dataIndex: 'publishTime',
    key: 'publishTime',
    render: text => <span>{new Date(text).format('yyyy-MM-dd hh:mm:ss')}</span>,
  }, {
    title: '创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
    render: text => <span>{new Date(text).format('yyyy-MM-dd hh:mm:ss')}</span>,
  },
];

const ReportIndex = ({ reportIndex, dispatch, loading }) => {
  const { modalVisibility, data, pagination, modalType, currentItem, INVESTMENT } = reportIndex;
  const query = (payload) => {
    dispatch({
      type: 'reportIndex/query',
      payload,
    });
  };

  const searchProps = {
    query,
  };
  const onCancel = () => {
    dispatch({
      type: 'reportIndex/hideModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'reportIndex/showModal',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'reportIndex/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'reportIndex/query',
      payload,
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'reportIndex/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'reportIndex/deletes',
      payload,
    });
  };
  const modalProps = {
    currentItem: modalType === 'create' ? {} : currentItem,
    visibility: modalVisibility,
    onCancel,
    onSubmit(payload) {
      dispatch({
        type: 'reportIndex/create',
        payload,
      });
    },
    title: `${modalType === 'create' ? '添加融资报信息' : '更新融资报信息'}`,
    modalType,
    INVESTMENT,
  };
  const listProps = {
    columns,
    data,
    loading: loading.effects['inforPic/query'],
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
      <SearchBar {...searchProps} />
      <Action {...actionProps} />
      <List {...listProps} />
      {modalVisibility ? <AddReport {...modalProps} /> : null}
    </div>
  );
};

ReportIndex.propTypes = {
  reportIndex: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ reportIndex, loading }) => ({ reportIndex, loading }))(ReportIndex);
