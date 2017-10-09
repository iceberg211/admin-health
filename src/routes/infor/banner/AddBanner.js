import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input, InputNumber, Icon, Upload, message } from 'antd';
import { fileApi } from '../../../utils/config';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const AddBanner = ({
    form: {
  getFieldDecorator,
  validateFields,
  getFieldsValue },
  onCancel,
  onSubmit,
  currentItem,
  modalType,
  title,
}) => {
  const save = (status) => {
    validateFields((errors) => {
      if (errors) {
        message.error('请补全所有必填字段');
        return;
      }
      const playload = getFieldsValue();
      if (playload.image.fileList) {
        const image = playload.image.fileList;
        playload.image = image.map((item) => {
          return item.response.data;
        }).toString();
      }
      playload.status = status;
      playload.publishTime = new Date().getTime();
      onSubmit(playload);
    });
  };
  let fileList = [];
  if (modalType === 'update') {
    fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      thumbUrl: currentItem ? currentItem[0].image : null,
      url: currentItem ? currentItem[0].image : null,
    }];
  }
  const props = {
    action: fileApi,
    listType: 'picture',
    defaultFileList: [...fileList],
    beforeUpload: () => {
      if (fileList.length > 1) {
        fileList = [];
      }
    },
  };
  return (
    <Modal
      title={title}
      visible
      onCancel={onCancel}
      footer={[
        <Button key="save" type="primary" size="large" onClick={save.bind(this, 0)}>保存</Button>,
        <Button key="push" type="primary" size="large" onClick={save.bind(this, 1)}>发布</Button>,
        <Button key="cancel" size="large" onClick={onCancel}>取消</Button>,
      ]}
    >
      <Form layout="vertical">
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: modalType === 'update' ? currentItem[0].title : null,
            rules: [{
              required: true,
              message: '必填项，请输入',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem label="图片" hasFeedback {...formItemLayout}>
          {getFieldDecorator('image', {
            initialValue: modalType === 'update' ? currentItem[0].image : null,
            rules: [{
              required: true,
              message: '必填项，请输入',
            }],
          })(<Upload {...props}>
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sortIndex', {
            initialValue: modalType === 'update' ? currentItem[0].sortIndex : null,
            rules: [{
              required: true,
              message: '必填项，请输入',
            }],
          })(<InputNumber min={1} />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

AddBanner.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  currentItem: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Form.create()(AddBanner);
