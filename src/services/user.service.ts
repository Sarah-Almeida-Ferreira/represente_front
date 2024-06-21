import axios from 'axios';
import { BASE_URL } from '@constants/api.constants.ts';

const getUserSituation = async (email: string) => {
  return axios({
    method: 'get',
    baseURL: BASE_URL,
    url: '/user/situation/' + email
  });
};

const signUp = async (data: UserConfirmation) => {
  return axios({
    method: 'post',
    baseURL: BASE_URL,
    url: '/signup',
    data
  });
};

const confirmUserRegistration = async (data: UserConfirmation) => {
  return axios({
    method: 'post',
    baseURL: BASE_URL,
    url: 'signup/confirmation',
    data
  });
};

const authenticateWithPassword = async (data: UserPassword) => {
  return axios({
    method: 'post',
    baseURL: BASE_URL,
    url: '/signin/authenticate/password',
    data
  });
};

export {
  getUserSituation,
  signUp,
  authenticateWithPassword,
  confirmUserRegistration
};
