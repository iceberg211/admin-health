import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill'; // ES6
import theme from 'react-quill/dist/quill.snow.css';
import { Modal, Button, Form, Input, InputNumber, Upload, Tag, Tooltip, Icon, message } from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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
const Layout = {
  wrapperCol: {
    span: 24,
  },
};

class AddInfor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    const { currentItem } = this.props;
    if (currentItem[0]) {
      this.setState({
        tags: currentItem[0].label.split(','),
      });
    }
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }
  saveInputRef = input => this.input = input
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }
  save = (status) => {
    const { form, onSubmit } = this.props;
    const { validateFields, getFieldsValue } = form;

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
      playload.label = this.state.tags.join(',');
      playload.status = status;
      onSubmit(playload);
    });
  };


  render() {
    const { form, onCancel, currentItem, modalType, title } = this.props;
    const { getFieldDecorator } = form;
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
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        <Modal
          title={title}
          visible
          onCancel={onCancel}
          footer={[
            <Button key="save" type="primary" size="large" onClick={this.save.bind(this, 0)}>保存</Button>,
            <Button key="push" type="primary" size="large" onClick={this.save.bind(this, 1)}>发布</Button>,
            <Button key="cancel" size="large" onClick={onCancel}>取消</Button>,
          ]}
        >
          <Form layout="vertical">
            <FormItem label="标题" hasFeedback {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: modalType === 'update' ? currentItem[0].title : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(
                <Input />)}
            </FormItem>
            <FormItem label="排序" hasFeedback {...formItemLayout}>
              {getFieldDecorator('sortIndex', {
                initialValue: modalType === 'update' ? currentItem[0].sortIndex : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<InputNumber min={1} />)}
            </FormItem>
            <FormItem label="标签" hasFeedback {...formItemLayout}>
              {getFieldDecorator('label', {
                initialValue: modalType === 'update' ? currentItem[0].label : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(
                <div>
                  {tags.map((tag) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                  })}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加新标签</Button>}
                </div>,
              )}
            </FormItem>
            <FormItem label="来源" hasFeedback {...formItemLayout}>
              {getFieldDecorator('source', {
                initialValue: modalType === 'update' ? currentItem[0].source : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="图片" {...formItemLayout}>
              {getFieldDecorator('image', {
                initialValue: modalType === 'update' ? currentItem[0].image : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传
              </Button>
              </Upload>)}
            </FormItem>
            <FormItem label="图片ALT" hasFeedback {...formItemLayout}>
              {getFieldDecorator('imgAlt', {
                initialValue: modalType === 'update' ? currentItem[0].imgAlt : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="版权" hasFeedback {...formItemLayout}>
              {getFieldDecorator('copyright', {
                initialValue: modalType === 'update' ? currentItem[0].copyright : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="摘要" hasFeedback {...formItemLayout}>
              {getFieldDecorator('digest', {
                initialValue: modalType === 'update' ? currentItem[0].digest : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem hasFeedback {...Layout}>
              {getFieldDecorator('content', {
                initialValue: modalType === 'update' ? currentItem[0].content : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(<ReactQuill style={{ minHeight: '300px' }} />)}
            </FormItem>
          </Form>
        </Modal>
      </div >
    );
  }
}

AddInfor.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  modalType: PropTypes.string,
  title: PropTypes.string,
};

export default Form.create()(AddInfor);
