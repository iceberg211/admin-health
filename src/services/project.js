import request from '../utils/request';
import { apiPrefix } from '../utils/config';


const project = {
  list: `${apiPrefix}/projectCenter/projectCenter/pageList`,
  delete: `${apiPrefix}/projectCenter/projectCenter/info`,
  update: `${apiPrefix}/ publish/activity/default/update`,
  detail: `${apiPrefix}/projectCenter/projectCenter/info`,
  save: `${apiPrefix}/projectCenter/projectCenter`,
};
export async function query(params) {
  return request({
    url: project.list,
    params,
  });
}
export async function update(params) {
  return request({
    url: project.update,
    params,
  });
}
export async function create(params) {
  return request({
    url: project.save,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function upData(params) {
  return request({
    url: project.save,
    method: 'put',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function detail(params = { id: 'GR00000001' }) {
  return request({
    url: project.delete,
    params,
  });
}
export async function deleteList(params) {
  return request({
    url: project.delete,
    method: 'post',
    params,
  });
}
