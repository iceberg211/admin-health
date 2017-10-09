import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Icon } from 'antd';
import Filter from './Filter';
import Action from './Action';
import AddEvent from './AddEvent';
import List from '../../components/List/List';
import format from '../../utils/format';
import EventTeam from './EventTeam';
import EventDetail from './EventDetail';

function state(num) {
  switch (num) {
    case 0:
      return '待发布';
    case 1:
      return '已发布待报名';
    case 2:
      return '已发布报名中';
    case 3:
      return '已发布结束报名';
    case 4:
      return '已结束';
  }
}


const EventIndex = ({ event, dispatch, loading }) => {
  const { modalVisibility, data, pagination, modalType,
    currentItem, pageVisibility, usersVisibility, eventId } = event;

  const query = (payload) => {
    dispatch({
      type: 'event/query',
      payload,
    });
  };
  const onCancel = () => {
    dispatch({
      type: 'event/hideModal',
    });
  };
  const userModal = (payload) => {
    dispatch({
      type: 'event/showUsersModal',
      payload,
    });
  };
  const hideUserModal = () => {
    dispatch({
      type: 'event/hideUsersModal',
    });
  };
  const hidePageModal = () => {
    dispatch({
      type: 'event/hidePageModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'event/showModal',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'event/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'event/query',
      payload,
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'event/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'event/deletes',
      payload,
    });
  };
  const pageModal = (payload) => {
    choiceItem(payload);
    dispatch({
      type: 'event/showPageModal',
      payload,
    });
  };
  const columns = [
    {
      title: '活动编号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <span style={{ color: '#108ee9' }} onClick={pageModal.bind(this, record)}>{text}</span>,
    }, {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '活动状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span> {state(text)}</span>,
    },
    {
      title: '报名人员',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '查看报名人员',
      key: 'openUseModal',
      render: (text, record) => <span style={{ color: '#108ee9' }} onClick={userModal.bind(this, record.id)}><Icon type="plus" /></span>,
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
  const modalProps = {
    currentItem: modalType === 'create' ? {} : currentItem,
    visibility: modalVisibility,
    onCancel,
    onSubmit(payload) {
      dispatch({
        type: 'event/create',
        payload,
      });
    },
    title: `${modalType === 'create' ? '添加活动信息' : '更新活动信息'}`,
    modalType,
  };
  const listProps = {
    columns,
    data,
    loading: loading.effects['event/query'],
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
  const filterProps = {
    query,
    refesh,
  };
  const eventTeamProps = {
    hideUserModal,
    eventId,
  };
  const eventDetailProps = {
    hidePageModal,
    eventId,
    currentItem,
    update,
  };
  return (
    <div>
      <Filter {...filterProps} />
      <Action {...actionProps} />
      <List {...listProps} />
      {modalVisibility ? <AddEvent {...modalProps} /> : null}
      {usersVisibility ? <EventTeam {...eventTeamProps} /> : null}
      {pageVisibility ? <EventDetail {...eventDetailProps} /> : null}
    </div>
  );
};

EventIndex.propTypes = {
  event: PropTypes.object,
};

export default connect(({ event, loading }) => ({ event, loading }))(EventIndex);

