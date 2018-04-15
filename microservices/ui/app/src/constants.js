const clusterName = 'illumination52';
const GRAPHQL_URL = 'https://data.' + clusterName + '.hasura-app.io/v1alpha1/graphql';
const AUTH_URL = 'https://auth.' + clusterName + '.hasura-app.io';

const REDIRECT_URL = 'http://localhost:3000'

var userInfo = null;

function saveUserInfo(info) {
  userInfo = info;
}

function getUserInfo() {
  return userInfo;
}

export {
  saveUserInfo, getUserInfo,
  GRAPHQL_URL,
  AUTH_URL,
  REDIRECT_URL
};
