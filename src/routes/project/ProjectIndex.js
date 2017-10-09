import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Filter from './Filter';
import Action from './Action';
import List from '../../components/List/List';
import format from '../../utils/format';


function state(num) {
  switch (num) {
    case 0:
      return '待融资';
    case 1:
      return '融资中';
    case 2:
      return '融资完成';
    default:
      return '未知';
  }
}


const columns = [
  {
    title: '活动编号',
    dataIndex: 'id',
    key: ' id',
  }, {
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '融资状态',
    dataIndex: 'status',
    key: 'status',
    render: text => <span> {state(text)}</span>,
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

const ProjectIndex = ({ project, loading, dispatch, location }) => {
  const { modalVisibility, data, pagination, modalType, currentItem } = project;
  const onCancel = () => {
    dispatch({
      type: 'project/hideModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'project/showModal',
      payload,
    });
  };
  const query = (payload) => {
    dispatch({
      type: 'project/query',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'project/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'project/query',
      payload,
    });
  };
  const changeEdit = () => {
    dispatch({
      type: 'add/addProject',
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'project/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'project/deletes',
      payload,
    });
  };


  const listProps = {
    columns,
    data,
    loading: loading.effects['project/query'],
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
    changeEdit,
    query,
    dispatch,
  };
  const filterProps = {
    query,
    updateQuery(payload) {
      dispatch({
        type: 'project/updateQuery',
        payload,
      });
    },
  };
  return (
    <div>
      <Filter {...filterProps} />
      <Action {...actionProps} />
      <List {...listProps} />
    </div>
  );
};


ProjectIndex.propTypes = {
  project: PropTypes.object,
  loading: PropTypes.object,

};

export default connect(({ project, loading }) => ({ project, loading }))(ProjectIndex);
