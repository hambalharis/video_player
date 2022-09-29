import {API} from '../utils/ApiEndpoints';

const header = () => {
  return {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  };
};

export const getDashboardData = data => {
  return fetch(API.Dashboard, {
    method: 'post',
    body: data,
    headers: header(),
  });
};

export const getVideoData = data => {
  return fetch(API.VideoList, {
    method: 'post',
    body: data,
    headers: header(),
  });
};
