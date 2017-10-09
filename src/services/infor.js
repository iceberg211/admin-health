import request from '../utils/request';
import { apiPrefix } from '../utils/config';

const infor = {
  inforList: `${apiPrefix}/information/news/default/list`,
  delete: `${apiPrefix}/information/news/default/delete`,
  update: `${apiPrefix}/information/news/default/update`,
  detail: `${apiPrefix}/information/news/default/info`,
  save: `${apiPrefix}/information/news/default/save`,
};

export async function querys(params) {
  return request({
    url: infor.inforList,
    params,
  });
}

export async function detail(params) {
  return request({
    url: infor.detail,
    params,
  });
}

export async function create(params) {
  return request({
    url: infor.save,
    method: 'POST',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function deleteList(params) {
  return request({
    url: infor.delete,
    method: 'DELETE',
    params,
  });
}
export async function update(params) {
  return request({
    url: `${infor.update}`,
    method: 'POST',
    params,
  });
}
