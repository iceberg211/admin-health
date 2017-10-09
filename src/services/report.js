import request from '../utils/request';
import { apiPrefix } from '../utils/config';

const report = {
  financingList: `${apiPrefix}/information/financing/default/list`,
  save: `${apiPrefix}/information/financing/default/save`,
  delete: `${apiPrefix}/information/financing/default/delete`,
  update: `${apiPrefix}/information/financing/default/update`,
};
export async function reportQuery(params) {
  return request({
    url: report.financingList,
    params,
  });
}
export async function update(params) {
  return request({
    url: report.update,
    method: 'post',
    params,
  });
}
export async function create(params) {
  return request({
    url: report.save,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function deleteList(params) {
  return request({
    url: report.list,
    method: 'delete',
    params,
  });
}
