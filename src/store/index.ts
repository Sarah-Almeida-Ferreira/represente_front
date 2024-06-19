import { createStore, ActionContext } from "vuex";
import {
  getUserSituation,
  signUp,
  authenticateWithPassword,
  confirmUserRegistration,
} from "@/User/services/user.service.ts";
import router from "@/routes";
import { stages } from "@/User/constants/login.constants.ts";

const store = createStore({
  state() {
    return {
      token: "",
      error: "",
      success: "",
      stage: -1,
    };
  },
  getters: {
    getToken(state: State) {
      return state.token;
    },
  },
  mutations: {
    login(state: State, token: string) {
      state.token = token;
      router.push("/");
    },
    setStage(state: State, stage: number) {
      state.stage = stage;
    },
    setError(state: State, error: string) {
      state.error = error || "";
    },
    setSuccess(state: State, success: string) {
      state.success = success || "";
    },
  },
  actions: {
    async login({ commit }: ActionContext<State, State>, user: UserPassword) {
      try {
        commit("setError");
        const { data } = await authenticateWithPassword(user);
        commit("login", data.token);
      } catch (error: any) {
        commit("setError", error.response.data.error);
      }
    },
    async confirmUserRegistration(
      { commit }: ActionContext<State, State>,
      user: UserConfirmation
    ) {
      try {
        commit("setError");
        const { data } = await confirmUserRegistration(user);
        commit("login", data.token);
      } catch (error: any) {
        commit("setError", error.response.data.error);
      }
    },
    async signUp(
      { commit }: ActionContext<State, State>,
      user: UserConfirmation
    ) {
      try {
        commit("setError");
        const { data } = await signUp(user);
        commit("setStage", stages.CONFIRMATION_CODE);
        commit("setSuccess", data.message);
        router.push("/");
      } catch (error: any) {
        commit("setError", error.response.data.error);
      }
    },
    async getUserSituation(
      { commit }: ActionContext<State, State>,
      email: string
    ) {
      try {
        commit("setError");
        const { data } = await getUserSituation(email);
        commit("setStage", data.code);
      } catch (error: any) {
        commit("setError", error.response.data.error);
      }
    },
  },
});

export default store;
