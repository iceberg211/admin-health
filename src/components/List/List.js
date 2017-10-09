import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';


const List = ({ columns, data, loading, pagination, choiceItem, query }) => {
  const { totalOfData, page, size } = pagination;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      choiceItem(selectedRows);
    },
  };
  function onChange(pageNumber, pageSize) {
    query({
      page: pageNumber,
      size: pageSize,
    });
  }
  const onShowSizeChange = (current, pageSize) => {
    query({
      page: 1,
      size: pageSize,
    });
  };
  const props = {
    total: totalOfData,
    showTotal: (total, range) => `第${range[0]}项-第${range[1]}项     共${total} 项`,
    onChange,
    showSizeChanger: true,
    onShowSizeChange,
    current: page,
  };


  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        rowSelection={rowSelection}
        pagination={props}
        bordered
        loading={loading}
      />
    </div>
  );
};

List.propTypes = {
  columns: PropTypes.array,
};

export default List;

