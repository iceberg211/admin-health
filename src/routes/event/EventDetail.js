import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal, Button } from 'antd';
import styles from './event.less';
import { queryDetail } from '../../services/event';
import format from '../../utils/format';

const EventDetail = ({ currentItem, hidePageModal, update }) => {
  const save = (payload) => {
    update({
      id: currentItem.id,
      status: 1,
    });
  };
  return (
    <Modal
      title="查看活动"
      onCancel={hidePageModal}
      visible
      footer={[
        <Button key="push" type="primary" size="large" disabled={currentItem.status === 1} onClick={save}>发布</Button>,
        <Button key="cancel" size="large" onClick={hidePageModal}>取消</Button>,
      ]}
    >
      <div className={styles.page} >
        <img src={currentItem.image} className={styles.img} alt="活动图" />
        <h2>{currentItem.title}</h2>
        <h3>
          <span>{moment(currentItem.startTime).format('YYYY-MM-DD')}</span>
          <span>{currentItem.address}</span>
        </h3>
        <p className={styles.content}>
          活动简介:<br />{currentItem.content}
        </p>
      </div>
    </Modal >
  );
};

EventDetail.propTypes = {
  hidePageModal: PropTypes.func,
  update: PropTypes.func,
};

export default EventDetail;
