import request from '../utils/request';
import { apiPrefix } from '../utils/config';

const Banner = {
  list: `${apiPrefix}/information/adverts/default/list`,
  delete: `${apiPrefix}/information/adverts/default/delete`,
  update: `${apiPrefix}/information/adverts/default/update`,
  detail: `${apiPrefix}/information/adverts/default/info`,
  save: `${apiPrefix}/information/adverts/default/save`,
};

export async function query(params) {
  return request({
    url: Banner.list,
    params,
  });
}

export async function update(params) {
  return request({
    url: Banner.update,
    method: 'post',
    params,
  });
}
export async function create(params) {
  return request({
    url: Banner.save,
    method: 'post',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
export async function deleteList(params) {
  return request({
    url: Banner.delete,
    method: 'delete',
    params,
  });
}
