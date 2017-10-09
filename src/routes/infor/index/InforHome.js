import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Action from '../Action';
import List from '../../../components/List/List';
import SearchBar from '../SearchBar';
import Modal from './AddInfor';
import format from '../../../utils/format';
import InforDetail from './InforDetail';


const InforHome = (props) => {
  const { dispatch, inforHome, loading, location } = props;
  const { modalVisibility, data, pagination,
    modalType, currentItem, pageVisibility, page } = inforHome;
  const query = (payload) => {
    dispatch({
      type: 'inforHome/query',
      payload,
    });
  };

  const searchProps = {
    query,
  };
  const onCancel = () => {
    dispatch({
      type: 'inforHome/hideModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'inforHome/showModal',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'inforHome/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'inforHome/query',
      payload,
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'inforHome/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'inforHome/deletes',
      payload,
    });
  };
  const openPage = (payload) => {
    dispatch({
      type: 'inforHome/queryDetail',
      payload: {
        id: payload,
      },
    });
  };
  const hidePage = () => {
    dispatch({
      type: 'inforHome/hidePageModal',
    });
  };
  const modalProps = {
    currentItem: modalType === 'create' ? {} : currentItem,
    visibility: modalVisibility,
    onCancel,
    onSubmit(payload) {
      dispatch({
        type: 'inforHome/create',
        payload,
      });
    },
    title: `${modalType === 'create' ? '添加资讯信息' : '更新资讯信息'}`,
    modalType,
  };
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <span style={{ color: '#108ee9' }} onClick={openPage.bind(this, record.id)}>{text}</span>,
    }, {
      title: '发布状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span> {text ? '已发布' : '未发布'}</span>,
    }, {
      title: '记录创建者',
      dataIndex: 'creator',

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
  const listProps = {
    data,
    columns,
    loading: loading.effects['inforPic/query'],
    pagination,
    choiceItem,
    query,
    openPage,
  };
  const actionProps = {
    openModal,
    onCancel,
    update,
    refesh,
    currentItem,
    deletes,
  };
  const detailProps = {
    hidePage,
    page,
    update,
  };
  return (
    <div>
      <SearchBar {...searchProps} />
      <Action {...actionProps} />
      <List {...listProps} />
      {modalVisibility ? <Modal {...modalProps} /> : null}
      {pageVisibility ? <InforDetail {...detailProps} /> : null}
    </div>
  );
};

InforHome.propTypes = {
  inforHome: PropTypes.object,
  loading: PropTypes.object,

};

export default connect(({ inforHome, loading }) => ({ inforHome, loading }))(InforHome);

