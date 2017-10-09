import React from 'react';
import { Button, Row, Col, Icon, Modal, message } from 'antd';
import { routerRedux, Link } from 'dva/router';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

const Action = ({ update, refesh, currentItem, deletes, dispatch }) => {
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
      update(type);
    } else {
      message.error('请选择一项进行操作');
    }
  };
  const editHanlde = () => {
    if (currentItem && currentItem.length === 1) {
      dispatch(routerRedux.push({
        pathname: '/addProject',
        query: {
          id: currentItem[0].id,
        },
      }));
    } else {
      message.error('选择一项进行编辑');
    }
  };
  return (
    <Row >
      <Col>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Link to="/addProject"> <Button type="primary" >添加<Icon type="plus" /></Button></Link>
          <Button type="primary" onClick={editHanlde}>编辑<Icon type="edit" /></Button>
          <Button type="danger" onClick={deleteHanlde}>删除<Icon type="delete" /></Button>
        </ButtonGroup>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Button type="primary" onClick={updatehanlde.bind(this, 1)}>启用<Icon type="inbox" /></Button>
          <Button type="danger" onClick={updatehanlde.bind(this, 0)}>禁用<Icon type=" file-excel" /></Button>
        </ButtonGroup>
      </Col>
    </Row >
  );
};

export default Action;
