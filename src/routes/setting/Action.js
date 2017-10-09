import React from 'react';
import { Button, Row, Col, Icon, message } from 'antd';
import { Link } from 'dva';

const ButtonGroup = Button.Group;
const confirm = message.confirm;

const Action = ({ openModal, update, refesh, currentItem, deletes }) => {
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
      update(type);
    } else {
      message.error('请选择一项进行操作');
    }
  };
  const openModahande = () => {
    openModal('create');
  };
  return (
    <Row >
      <Col>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Button type="primary" onClick={edit}>编辑<Icon type="edit" /></Button>
          <Button type="danger" onClick={deleteHanlde}>删除<Icon type="delete" /></Button>
        </ButtonGroup>
        <ButtonGroup style={{ marginRight: '10px' }}>
          <Button onClick={updatehanlde.bind(this, 1)}>启用<Icon type="inbox" /></Button>
          <Button onClick={updatehanlde.bind(this, 0)}>禁用<Icon type="file-excel" /></Button>
          <Button onClick={refesh}>刷新<Icon type="reload" /></Button>
        </ButtonGroup>
      </Col>

    </Row>
  );
};

export default Action;
