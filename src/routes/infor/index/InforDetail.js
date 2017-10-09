import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import styles from './InforHome.less';
import format from '../../../utils/format';

export default function InforDetail({ hidePage, page, update }) {
  const save = () => {
    update({
      id: page.id,
      status: 1,
    });
  };
  return (
    <Modal
      title="查看详情"
      onCancel={hidePage}
      visible
      footer={[
        <Button key="push" type="primary" size="large" onClick={save} disabled={page.status === 1}> 发布</Button>,
        <Button key="cancel" size="large" onClick={hidePage}>取消</Button>,
      ]}
    >
      <div className={styles.page}>
        <h2>{page.title}</h2>
        <h3 className={styles.samll}>
          <span style={{ margin: '0 10px' }}>来源:{page.source}</span>
          <span style={{ margin: '0 10px' }}>发布时间:{new Date(page.publishTime).format('yyyy-MM-dd hh:mm:ss')}</span>
        </h3>
        <div className={styles.content}>{page.content}</div>
      </div>
    </Modal>);
}

