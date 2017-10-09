import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Icon } from 'antd';
import { Link, routerRedux } from 'dva/router';
import Action from './Action';
import List from '../../components/List/List';
import Filter from './Filter';
import format from '../../utils/format';


function state(num) {
  switch (num) {
    case 1:
      return '待认证';
    case 2:
      return '认证通过';
    case 3:
      return '认证不通过';
    default:
      return '未知';
  }
}


const User = ({ user, loading, dispatch }) => {
  const { data, pagination, currentItem } = user;

  const query = (payload) => {
    dispatch({
      type: 'user/query',
      payload,
    });
  };

  const searchProps = {
    query,
  };
  const onCancel = () => {
    dispatch({
      type: 'user/hideModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'user/showModal',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'user/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'user/query',
      payload,
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'user/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'user/deletes',
      payload,
    });
  };
  const changeEditState = () => {
    dispatch({
      type: 'user/changeEditState',
    });
  };
  const addAuditor = (payload) => {
    dispatch(routerRedux.push({
      pathname: '/AddUser',
      query: {
        id: payload,
      },
    }));
    dispatch({
      type: 'addUser/changeAuditor',
    });
  };
  const closeAuditor = () => {
    dispatch({
      type: 'addUser/closeAuditor',
    });
  };
  const columns = [
    {
      title: '用户编号',
      dataIndex: 'id',
      key: ' id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所在公司',
      dataIndex: 'company',
      key: 'company',
    }, {
      title: '职位',
      dataIndex: 'job',
      key: 'job',
    }, {
      title: '认证状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span> {state(text)}</span>,
    }, {
      title: '认证审核',
      key: 'auditors',
      render: (text, record) => <span style={{ color: '#108ee9' }} onClick={addAuditor.bind(this, record.id)}><Icon type="plus" /></span>,
    },
    {
      title: '记录创建者',
      dataIndex: 'auditor',
      key: 'auditor',

    }, {
      title: '记录创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: text => <span>{text.slice(0, -2) || '未知'}</span>,
    },
  ];
  const listProps = {
    columns,
    data,
    loading: loading.effects['user/query'],
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
    dispatch,
    closeAuditor,
  };
  return (
    <div>
      <Filter {...searchProps} />
      <Action {...actionProps} />
      <List {...listProps} />
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    code: state.app.code,
    user: state.user,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(User);
