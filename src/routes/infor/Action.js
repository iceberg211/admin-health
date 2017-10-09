import React from 'react';
import { Button, Row, Col, Icon, message, Modal } from 'antd';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

const Action = (props) => {
  const { openModal, update, refesh, currentItem, deletes } = props;
  const edit = () => {
    if (currentItem && currentItem.length === 1) {
      openModal('update');
    } else {
      message.error('请选择一项进行操作');
    }
  };
  const deleteHanlde = () => {
    if (currentItem && currentItem.length < 1) {
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
  const updatehanlde = (status) => {
    if (currentItem && currentItem.length < 1) {
      message.error('请选择一项进行操作');
      return;
    }
    update({
      id: currentItem[0].id,
      status,
    });
  };
  const openModahande = () => {
    openModal('create');
  };
  return (
    <Row >
      <Col>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Button type="primary" onClick={openModahande} >添加<Icon type="plus" /></Button>
          <Button type="primary" onClick={edit}>编辑<Icon type="edit" /></Button>
          <Button type="danger" onClick={deleteHanlde}>删除<Icon type="delete" /></Button>
        </ButtonGroup>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Button type="primary" onClick={updatehanlde.bind(this, 1)}>发布<Icon type="inbox" /></Button>
          <Button type="danger" onClick={updatehanlde.bind(this, 0)}>下线<Icon type="file-excel" /></Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default Action;
