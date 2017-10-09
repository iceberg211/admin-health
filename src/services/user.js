import request from '../utils/request';
import { apiPrefix } from '../utils/config';

const user = {
  list: `${apiPrefix}/user/user/default/list`,
  delete: `${apiPrefix}/user/user/default/delete`,
  update: `${apiPrefix}/user/user/default/update`,
  detail: `${apiPrefix}/user/user/default/info`,
  save: `${apiPrefix}/user/user/default/save`,
  eduSave: `${apiPrefix}/user/user/edu/save`,
  jobSave: `${apiPrefix}/user/user/job/save`,
  eduDelete: `${apiPrefix}/user/user/edu/delete`,
  jobDelete: `${apiPrefix}/user/user/job/delete`,
  examine: `${apiPrefix}user/user/default/examine`,
};
export async function query(params) {
  return request({
    url: user.list,
    params,
  });
}

export async function update(params) {
  return request({
    url: user.update,
    method: 'post',
    params,
  });
}
export async function create(params) {
  return request({
    url: user.save,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export function eduCreate(params) {
  return request({
    url: user.eduSave,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function jobCreate(params) {
  return request({
    url: user.jobSave,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function examine(params) {
  return request({
    url: user.examine,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}


export async function deletes(params) {
  return request({
    url: user.delete,
    method: 'delete',
    params,
  });
}
export async function deletesEdu(params) {
  return request({
    url: user.eduDelete,
    method: 'delete',
    params,
  });
}
export async function deletesJob(params) {
  return request({
    url: user.jobDelete,
    method: 'delete',
    params,
  });
}

export async function detail(params) {
  return request({
    url: user.detail,
    params,
  });
}
