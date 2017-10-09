import request from '../utils/request';
import { apiPrefix } from '../utils/config';

const common = {
  allAddress: `${apiPrefix}/common/common/allAddress`,
  LevelCode: `${apiPrefix}/common/common/allSecondLevelCode`,
};

export function queryCity(params) {
  return request({
    url: common.allAddress,
    params,
  });
}

export async function queryCode(params) {
  return request({
    url: common.LevelCode,
    params,
  });
}
