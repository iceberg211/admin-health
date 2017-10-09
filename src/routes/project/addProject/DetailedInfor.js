import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Upload, Button, Icon } from 'antd';
import { fileApi } from '../../../utils/config';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

const DetailedInfor = (props) => {
  const {
    form: {
      getFieldDecorator,
    },
    projectDetailRsBean,
    edit,
    } = props;

  let fileList = [];
  let UrlList = [];
  let drawUploader = false;
  if (projectDetailRsBean && projectDetailRsBean.images != null) {
    UrlList = projectDetailRsBean.images.split(',');
    drawUploader = true;
  }
  fileList = UrlList.map((item, index) => ({
    uid: index - 1,
    name: 'xxx.png',
    status: 'done',
    thumbUrl: item,
    url: item,
  }),
  );
  return (
    <Row>
      <Col span={24}>
        <FormItem>
          <FormItem label="项目亮点" {...layout}>
            {getFieldDecorator('advantage', {
              initialValue: edit && projectDetailRsBean ?
                projectDetailRsBean.advantage : null,
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        {drawUploader && (<FormItem>
          <FormItem label="产品效果图" {...layout}>
            {getFieldDecorator('images', {
              initialValue: edit && projectDetailRsBean ?
                [...fileList] : null,
            })(<Upload
              action={fileApi}
              listType={'picture'}
              defaultFileList={fileList}
            >
              <Button>
                <Icon type="upload" /> 上传
            </Button>
            </Upload>)}
          </FormItem>
        </FormItem>)}
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="安卓app下载地址" {...formItemLayout}>
            {getFieldDecorator('downloadAndroid', {
              initialValue: edit && projectDetailRsBean ?
                projectDetailRsBean.downloadAndroid : null,
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem>
          <FormItem label="IOS app下载地址" {...formItemLayout}>
            {getFieldDecorator('downloadIos', {
              initialValue: edit && projectDetailRsBean ?
                projectDetailRsBean.downloadIos : null,
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="官网地址" {...layout}>
            {getFieldDecorator('website', {
              initialValue: edit && projectDetailRsBean ?
                projectDetailRsBean.website : null,
            })(<Input />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="视频地址" {...layout}>
            {getFieldDecorator('videoUrl', {
              initialValue: edit && projectDetailRsBean ?
                projectDetailRsBean.videoUrl : null,
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
      <Col span={24}>
        <FormItem>
          <FormItem label="办公地址" {...layout}>
            {getFieldDecorator('officeAddress', {
              initialValue: edit && projectDetailRsBean ?
                projectDetailRsBean.officeAddress : null,
            })(<TextArea />)}
          </FormItem>
        </FormItem>
      </Col>
    </Row>
  );
};

DetailedInfor.propTypes = {
  form: PropTypes.object,
  projectDetailRsBean: PropTypes.object,
  edit: PropTypes.bool,
};

export default DetailedInfor;

