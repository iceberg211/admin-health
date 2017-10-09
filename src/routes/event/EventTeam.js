import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Modal, Button, Table } from 'antd';
import styles from './event.less';
import List from '../../components/List/List';
import { queryUsers } from '../../services/event';
import { apiPrefix } from '../../utils/config';


const columns = [
  {
    title: '姓名',
    dataIndex: 'userName',
    key: ' userName',
  }, {
    title: '手机号',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '记录创建日期',
    dataIndex: 'enterTime',
    key: 'enterTime',
    render: text => <span>{new Date(text).format('yyyy-MM-dd hh:mm:ss')}</span>,
  },
];

class EventTeam extends Component {
  constructor(props) {
    super(props);
    this.state = { form: [] };
  }
  componentWillMount() {
    queryUsers({
      id: this.props.eventId,
      page: 1,
      size: 20,
    },
    ).then((response) => {
      const data = response.data;
      this.setState({
        data,
      });
    });
  }
  render() {
    const eventId = this.props.eventId;
    const Url = `${apiPrefix}/publish/activity/user/export?id=${eventId}`;
    const listProps = {
      dataSource: this.state.data,
      columns,
    };
    return (
      <Modal
        title="查看活动人员"
        onCancel={this.props.hideUserModal}
        visible
        footer={[
          <Button key="push" type="primary" size="large"><Link href={Url}>导出</Link></Button>,
          <Button key="cancel" size="large" onClick={this.props.hideUserModal}>取消</Button>,
        ]}
      >
        <div className={styles.page}>
          <Table rowKey="id" {...listProps} />
        </div>
      </Modal>
    );
  }

}

EventTeam.propTypes = {
  hideUserModal: PropTypes.func,
  eventId: PropTypes.number,
};

export default EventTeam;

