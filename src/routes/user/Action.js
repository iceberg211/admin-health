import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Icon, message, Modal } from 'antd';
import { Link, routerRedux } from 'dva/router';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

const Action = ({ openModal, update, currentItem, deletes, dispatch, closeAuditor }) => {
  const edit = () => {
    if (currentItem && currentItem.length === 1) {
      openModal('update');
    } else {
      message.error('请选择一项进行操作');
    }
  };
  const deleteHanlde = () => {
    if (currentItem == null) {
      message.error('请至少选择一项');
      return;
    }
    const id = currentItem.map(item => item.id);
    confirm({
      title: '删除',
      content: '删除内容将不可恢复，是否继续删除',
      onOk() {
        deletes(id);
      },
      onCancel() {
      },
    });
  };
  const updatehanlde = (type) => {
    if (currentItem && currentItem.length === 1) {
      update({
        id: currentItem[0].id,
        status: type,
      });
    } else {
      message.error('请选择一项进行操作');
    }
  };
  const editHandler = () => {
    if (currentItem && currentItem.length === 1) {
      closeAuditor();
      dispatch(routerRedux.push({
        pathname: '/AddUser',
        query: {
          id: currentItem[0].id,
        },
      }));
    } else {
      message.error('请选择一项进行编辑');
    }
  };
  return (
    <Row >
      <Col>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Link to="/AddUser"><Button type="primary">添加<Icon type="plus" /></Button></Link>
          <Button type="primary" onClick={editHandler}>编辑<Icon type="edit" /></Button>
          <Button type="danger" onClick={deleteHanlde}>删除<Icon type="delete" /></Button>
        </ButtonGroup>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Button type="primary" onClick={updatehanlde.bind(this, 1)}>启用<Icon type="inbox" /></Button>
          <Button type="danger" onClick={updatehanlde.bind(this, 0)}>禁用<Icon type="file-excel" /></Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};
Action.propTypes = {
  openModal: PropTypes.func,
  update: PropTypes.func,
  currentItem: PropTypes.array,
  deletes: PropTypes.func,
  dispatch: PropTypes.func,
  closeAuditor: PropTypes.func,
};

export default Action;
