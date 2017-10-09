import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Action from '../Action';
import List from '../../../components/List/List';
import SearchBar from '../SearchBar';
import AddBanner from './AddBanner';
import format from '../../../utils/format';


const columns = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
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


const BannerIndex = ({ inforPic, loading, dispatch }) => {
  const { modalVisibility, data, pagination, modalType, currentItem } = inforPic;
  const query = (payload) => {
    dispatch({
      type: 'inforPic/query',
      payload,
    });
  };

  const searchProps = {
    query,
  };
  const onCancel = () => {
    dispatch({
      type: 'inforPic/hideModal',
    });
  };
  const openModal = (payload) => {
    dispatch({
      type: 'inforPic/showModal',
      payload,
    });
  };
  const update = (payload) => {
    dispatch({
      type: 'inforPic/update',
      payload,
    });
  };
  const refesh = (payload) => {
    dispatch({
      type: 'inforPic/query',
      payload,
    });
  };
  const choiceItem = (payload) => {
    dispatch({
      type: 'inforPic/choiceItem',
      payload,
    });
  };
  const deletes = (payload) => {
    dispatch({
      type: 'inforPic/deletes',
      payload,
    });
  };
  const modalProps = {
    currentItem: modalType === 'create' ? {} : currentItem,
    visibility: modalVisibility,
    onCancel,
    onSubmit(payload) {
      dispatch({
        type: 'inforPic/create',
        payload,
      });
    },
    title: `${modalType === 'create' ? '添加banner' : '更新banner'}`,
    modalType,
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
      {modalVisibility ? <AddBanner {...modalProps} /> : null}
    </div>
  );
};

BannerIndex.propTypes = {
  inforPic: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    inforPic: state.inforPic,
    loading: state.loading,
  };
};
export default connect(mapStateToProps)(BannerIndex);
