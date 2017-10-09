import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Modal, Button, Form, Input, InputNumber, Tag, Select, message, Tooltip } from 'antd';
import { financingRoundData } from '../../../utils/select';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class AddReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      investorTags: [],
      inputVisible: false,
      inputValue: '',
      investorVisible: false,
      investorInput: '',
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  componentWillMount() {
    const { currentItem } = this.props;
    if (currentItem[0]) {
      this.setState({
        tags: currentItem[0].industry.split(','),
        investorTags: currentItem[0].investor.split(','),
      });
    }
  }

  saveInputRef = input => this.input = input;
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
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let investorTags = state.investorTags;
    if (inputValue && investorTags.indexOf(inputValue) === -1) {
      investorTags = [...investorTags, inputValue];
    }
    this.setState({
      tags: investorTags,
      investorVisible: false,
      inputValue: '',
    });
  }
  /**
   * @memberof 投资方
   */
  investorTagsClose = (removedTag) => {
    const investorTags = this.state.investorTags.filter(tag => tag !== removedTag);
    this.setState({ investorTags });
  }
  showInvestorInput = () => {
    this.setState({ investorVisible: true }, () => this.textInput.focus());
  }
  investorChange = (e) => {
    this.setState({ investorInput: e.target.value });
  }
  investorInputConfirm = () => {
    const state = this.state;
    const investorInput = this.state.investorInput;
    let investorTags = state.investorTags;
    // 合并到tags中
    if (investorInput && investorTags.indexOf(investorInput) === -1) {
      investorTags = [...investorTags, investorInput];
    }
    this.setState({
      investorTags,
      inputVisible: false,
      investorInput: '',
    });
  }
  /**
   *
   * @memberof 行业细分
  */

  save = (status) => {
    const { form, onSubmit } = this.props;
    form.validateFields((errors) => {
      if (errors) {
        message.error('请补全所有必填字段');
        return;
      }
      const playload = form.getFieldsValue();
      playload.industry = this.state.tags.join(',');
      playload.investor = this.state.investorTags.join(',');
      playload.status = status;
      onSubmit(playload);
    });
  };
  render() {
    const { form: {
        getFieldDecorator,
      },
      onCancel,
      currentItem,
      modalType,
      title,
    } = this.props;
    const { tags, inputVisible, inputValue,
      investorTags, investorInput, investorVisible } = this.state;
    return (
      <div>
        <Modal
          title={title}
          onCancel={onCancel}
          visible
          footer={[
            <Button key="back" type="primary" size="large" onClick={this.save.bind(this, 1)}>保存</Button>,
            <Button key="cancel" type="primary" size="large" onClick={this.save.bind(this, 2)}>发布</Button>,
            <Button key="submit" size="large" onClick={onCancel}>取消</Button>,
          ]}
        >
          <Form layout="vertical">
            <FormItem label="项目名称" hasFeedback {...formItemLayout}>
              {getFieldDecorator('projectName', {
                initialValue: modalType === 'update' ? currentItem[0].projectName : null,
                rules: [{
                  required: true,
                  message: '必填项，请输入',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem label="细分行业" hasFeedback {...formItemLayout}>
              {getFieldDecorator('industry', {
                initialValue: modalType === 'update' ? currentItem[0].industry : null,
                rules: [{
                  required: true,
                  message: '必填项，请输入',
                }],
              })(<div>
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
                    style={{ width: 80 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
                {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加行业</Button>}
              </div>)}
            </FormItem>
            <FormItem label="金额" hasFeedback {...formItemLayout}>
              {getFieldDecorator('amount', {
                initialValue: modalType === 'update' ? currentItem[0].amount : null,
                rules: [{
                  required: true,
                  message: '必填项，请输入',
                }],
              })(<InputNumber min={0} style={{ width: 180 }} />)}
            </FormItem>
            <FormItem label="轮次" hasFeedback {...formItemLayout}>
              {getFieldDecorator('rounds', {
                initialValue: modalType === 'update' ? currentItem[0].rounds.toString() : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(
                <Select>
                  {financingRoundData.map(item => (
                    <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem label="投资方" hasFeedback {...formItemLayout}>
              {getFieldDecorator('investor', {
                initialValue: modalType === 'update' ? currentItem[0].investor : null,
                rules: [{ required: true, message: '必填项，请输入' }],
              })(
                <div>
                  {investorTags.map((tag) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable afterClose={() => this.investorTagsClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                  })}
                  {investorVisible && (
                    <Input
                      ref={(input) => { this.textInput = input; }}
                      type="text"
                      size="small"
                      style={{ width: 80 }}
                      value={investorInput}
                      onChange={this.investorChange}
                      onBlur={this.investorInputConfirm}
                      onPressEnter={this.investorInputConfirm}
                    />
                  )}
                  {!investorVisible && <Button size="small" type="dashed" onClick={this.showInvestorInput}>+ 添加投资方</Button>}
                </div>)}
            </FormItem>
          </Form>
        </Modal>
      </div >
    );
  }
}

AddReport.propTypes = {
  form: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  modalType: PropTypes.string,
  title: PropTypes.string,
};

export default Form.create()(AddReport);
