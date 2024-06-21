import { createStore, ActionContext } from 'vuex';
import {
  getUserSituation,
  signUp,
  authenticateWithPassword,
  confirmUserRegistration,
} from '@services/user.service.ts';
import router from '@routes';
import { stages } from '@constants/login.constants.ts';

export const state = () => ({
  token: '',
  error: '',
  success: '',
  stage: -1,
});

export const mutations = {
  login(state: State, token: string) {
    state.token = token;
    router.push('/');
  },
  setStage(state: State, stage: number) {
    state.stage = stage;
  },
  setError(state: State, error: string) {
    state.error = error;
  },
  setSuccess(state: State, success: string) {
    state.success = success;
  },
};

export const actions = {
  async login({ commit }: ActionContext<State, State>, user: UserPassword) {
    try {
      commit('setError', '');
      const { data } = await authenticateWithPassword(user);
      commit('login', data.token);
    } catch (error) {
      commit('setError', error.response.data.error);
    }
  },
  async confirmUserRegistration(
    { commit }: ActionContext<State, State>,
    user: UserConfirmation,
  ) {
    try {
      commit('setError', '');
      const { data } = await confirmUserRegistration(user);
      commit('login', data.token);
    } catch (error) {
      commit('setError', error.response.data.error);
    }
  },
  async signUp(
    { commit }: ActionContext<State, State>,
    user: UserConfirmation,
  ) {
    try {
      commit('setError', '');
      const { data } = await signUp(user);
      commit('setStage', stages.CONFIRMATION_CODE);
      commit('setSuccess', data.message);
      router.push('/');
    } catch (error) {
      commit('setError', error.response.data.error);
    }
  },
  async getUserSituation(
    { commit }: ActionContext<State, State>,
    email: string,
  ) {
    try {
      commit('setError', '');
      const { data } = await getUserSituation(email);
      commit('setStage', data.code);
    } catch (error) {
      commit('setError', error.response.data.error);
    }
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
