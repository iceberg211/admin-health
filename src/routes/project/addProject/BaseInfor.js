import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Select, Cascader, Upload, Icon, Button } from 'antd';
import cityData from '../../../utils/city';
import { fileApi } from '../../../utils/config';
import { financingRoundData, financingData } from '../../../utils/select';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

const AddProject = ({
  form: {
  getFieldDecorator,
  },
  projectInfoRsBean,
  edit,
  onChange,
  }) => {
  let fileList = [];
  let drawUploader = false;
  if (edit) {
    fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      thumbUrl: projectInfoRsBean ? projectInfoRsBean.icon : null,
      url: projectInfoRsBean ? projectInfoRsBean.icon : null,
    }];
    drawUploader = true;
  }
  const props = {
    action: fileApi,
    listType: 'picture',
    defaultFileList: [...fileList],
  };
  return (
    <Row>
      <Col span={12}>
        {drawUploader && (<FormItem>
          <FormItem label="图片" {...formItemLayout}>
            {getFieldDecorator('icon', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.icon : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传
              </Button>
              </Upload>)}
          </FormItem>
        </FormItem>)}
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="项目名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.name : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="公司全称" {...formItemLayout}>
            {getFieldDecorator('company', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.company : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="一句话介绍" {...formItemLayout}>
            {getFieldDecorator('brief', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.brief : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="团队特色" {...layout}>
            {getFieldDecorator('teamFeature', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.teamFeature : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="运营亮点" {...layout}>
            {getFieldDecorator('operationAdvantage', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.operationAdvantage : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="投资方" {...layout}>
            {getFieldDecorator('investor', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.investor : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="所在位置" {...formItemLayout}>
            {getFieldDecorator('postion', {
              initialValue: edit && projectInfoRsBean ?
                [Number(projectInfoRsBean.province), Number(projectInfoRsBean.city)] : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<Cascader options={cityData.data} placeholder="选择省市" />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="我的身份" {...formItemLayout}>
            {getFieldDecorator('creatorIdentity', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.creatorIdentity.toString() : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(
              <Select placeholder="我的身份">
                <Option value="1">创始成员</Option>
                <Option value="2">投资人</Option>
                <Option value="3">普通员工</Option>
              </Select>)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="项目阶段" {...formItemLayout}>
            {getFieldDecorator('stage', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.stage.toString() : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<Select>
              {
                financingData.map(item => (
                  <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
                ))
              }
            </Select>)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="融资轮次" {...formItemLayout}>
            {getFieldDecorator('financingRounds', {
              initialValue: edit && projectInfoRsBean ?
                projectInfoRsBean.financingRounds.toString() : null,
              rules: [{ required: true, message: '必填项，请输入' }],
            })(<Select>
              {financingRoundData.map(item => (
                <Option key={item.name} value={(item.id).toString()}>{item.name}</Option>
              ))}
            </Select>)}
          </FormItem>
        </FormItem>
      </Col>
    </Row>
  );
};

AddProject.propTypes = {
  form: PropTypes.object,
  projectInfoRsBean: PropTypes.object,
  edit: PropTypes.bool,
};

export default AddProject;

