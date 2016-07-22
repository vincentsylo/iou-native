import _ from 'lodash';
import axios from 'axios';

function getHeaders(accessToken) {
  return accessToken ? {
    Authorization: `Bearer ${accessToken}`,
  } : {};
}

export default function api(user) {
  return axios.create({
    baseURL: 'http://192.168.1.115:8080/api',
    headers: getHeaders(_.get(user, 'token.accessToken') || null),
  });
}