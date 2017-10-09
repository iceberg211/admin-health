import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input, DatePicker, message, Upload, Icon } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';
import { fileApi } from '../../utils/config';
import City from '../../components/City/City';

const { TextArea } = Input;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const Layout = {
  wrapperCol: {
    span: 24,
  },
};
const AddEvent = ({
     form: {
    getFieldDecorator,
  validateFields,
  getFieldsValue,
  },
  onCancel,
  onSubmit,
  currentItem,
  modalType,
  title,
}) => {
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
  };
  const onTimeChange = (field, value) => {
    if (field != null) {
      return field._d.getTime();
    }
  };
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
      const { postions } = playload;
      playload.province = postions[0];
      playload.city = postions[1];
      delete playload.postions;
      onSubmit(playload);
    });
  };

  return (
    <Modal
      visible
      title={title}
      onCancel={onCancel}
      footer={[
        <Button key="save" type="primary" size="large" onClick={save.bind(this, 0)}>保存</Button>,
        <Button key="push" type="primary" size="large" onClick={save.bind(this, 1)}>发布</Button>,
        <Button key="cancel" size="large" onClick={onCancel}>取消</Button>,
      ]}
    >
      <Form layout="vertical">
        <FormItem label="图片" {...formItemLayout}>
          {getFieldDecorator('image', {
            initialValue: modalType === 'update' ? currentItem[0].image : null,
            rules: [{ required: true, message: '必填项，请输入' }],
          })(
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 上传
            </Button>
            </Upload>)
          }
        </FormItem>
        <FormItem label="图片ALT" hasFeedback {...formItemLayout}>
          {getFieldDecorator('imgAlt', {
            initialValue: modalType === 'update' ? currentItem[0].imgAlt : null,
            rules: [{
              required: true,
              message: '必填项，请输入',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem label="活动名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: modalType === 'update' ? currentItem[0].title : null,
            rules: [{
              required: true,
              message: '必填项，请输入' },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="活动开始时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('startTime', {
            initialValue: modalType === 'update' ? moment(currentItem[0].startTime) : null,
            rules: [{
              required: true,
              message: '必填项，请输入',
            }],
          })(
            <DatePicker placeholder="请选择时间" onChange={onTimeChange} />)}
        </FormItem>
        <FormItem label="活动结束时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('endTime', {
            initialValue: modalType === 'update' ? moment(currentItem[0].endTime) : null,
            rules: [{ required: true,
              message: '必填项，请输入',
            }],
          })(
            <DatePicker placeholder="请选择时间" onChange={onTimeChange} />)}
        </FormItem>
        <FormItem label="报名开始时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('enterBeginTime', {
            initialValue: modalType === 'update' ? moment(currentItem[0].enterBeginTime) : null,
            rules: [{ required: true, message: '必填项，请输入' }],
          })(
            <DatePicker placeholder="请选择时间" onChange={onTimeChange} />)}
        </FormItem>
        <FormItem label="报名结束时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('enterEndTime', {
            initialValue: modalType === 'update' ? moment(currentItem[0].enterEndTime) : null,
            rules: [{ required: true, message: '必填项，请输入' }],
          })(
            <DatePicker placeholder="请选择时间" onChange={onTimeChange} />)}
        </FormItem>
        <FormItem label="活动地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: modalType === 'update' ? currentItem[0].address : null,
            rules: [{ required: true, message: '必填项，请输入' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="定位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('postions', {
            rules: [{ required: true, message: '必填项，请输入' }],
            initialValue: modalType === 'update' ? [currentItem[0].province, currentItem[0].city] : null,
          })(<City />)}
        </FormItem>
        <FormItem hasFeedback {...Layout}>
          {getFieldDecorator('content', {
            initialValue: modalType === 'update' ? currentItem[0].content : null,
            rules: [{ required: true, message: '必填项，请输入' }],
          })(<ReactQuill />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

AddEvent.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  currentItem: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  modalType: PropTypes.string,
};

export default Form.create()(AddEvent);
