import request from '../utils/request';
import { apiPrefix } from '../utils/config';


const event = {
  list: `${apiPrefix}/publish/activity/default/list`,
  delete: `${apiPrefix}/publish/activity/default/delete`,
  update: `${apiPrefix}/publish/activity/default/update`,
  detail: `${apiPrefix}/publish/activity/default/info`,
  save: `${apiPrefix}/publish/activity/default/save`,
  queryUsers: `${apiPrefix}/publish/activity/user/list`,
  exportUsers: `${apiPrefix}/publish/activity/user/export`,
};

export async function query(params) {
  return request({
    url: event.list,
    params,
  });
}
export async function queryDetail(params) {
  return request({
    url: event.detail,
    params,
  });
}
export async function update(params) {
  return request({
    url: event.update,
    params,
    method: 'post',
  });
}
export async function create(params) {
  return request({
    url: event.save,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function deleteList(params) {
  return request({
    url: event.delete,
    method: 'delete',
    params,
  });
}
export async function queryUsers(params) {
  return request({
    url: event.queryUsers,
    params,
  });
}

export function exportUsers(params) {
  return `${exportUsers}?id=${params}`;
}

