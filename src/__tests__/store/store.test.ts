import { describe, it, expect, vi, beforeEach } from 'vitest';
import { stages } from '@constants/login.constants';
import { state, mutations, actions } from '@store';
import { defineComponent } from 'vitest';
import router from '@routes';
import _ from 'lodash';
import {
  getUserSituation,
  authenticateWithPassword,
  confirmUserRegistration,
  signUp,
} from '@services/user.service';
import { ActionContext } from 'vuex';

vi.mock('@/services/user.service', () => ({
  authenticateWithPassword: vi.fn(),
  confirmUserRegistration: vi.fn(),
  signUp: vi.fn(),
  getUserSituation: vi.fn(),
}));

describe('Store', () => {
  let stateMock: State;

  describe('Mutations', () => {
    beforeEach(() => {
      stateMock = _.cloneDeep(state);
    });

    it('login - should set token on login mutation', () => {
      const token = 'fakeToken';

      mutations.login(stateMock, token);

      expect(stateMock.token).toBe(token);
      expect(router.currentRoute.value.path).toBe('/');
    });

    it('setStage - should set stage on setStage mutation', () => {
      const stage = 1;

      mutations.setStage(stateMock, stage);

      expect(stateMock.stage).toBe(stage);
    });

    it('setError - should set error message on setError mutation', () => {
      const errorMessage = 'Error message';

      mutations.setError(stateMock, errorMessage);

      expect(stateMock.error).toBe(errorMessage);
    });

    it('setSuccess - should set success message on setSuccess mutation', () => {
      const successMessage = 'Success message';

      mutations.setSuccess(stateMock, successMessage);

      expect(stateMock.success).toBe(successMessage);
    });
  });

  describe('Actions', () => {
    let actionContext: ActionContext<State, State>;

    beforeEach(() => {
      actionContext = { commit: vi.fn() };
      router.push = vi.fn();
    });

    describe('login', () => {
      it('should login and commit token on successful authentication', async () => {
        const token = 'fakeToken';
        const user = { username: 'username', password: 'password' };
        authenticateWithPassword.mockResolvedValueOnce({ data: { token } });

        await actions.login(actionContext, user);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(authenticateWithPassword).toHaveBeenCalledWith(user);
        expect(actionContext.commit).toHaveBeenCalledWith('login', token);
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });

      it('should handle error on login action', async () => {
        const errorMessage = 'Invalid credentials';
        const errorResponse = { response: { data: { error: errorMessage } } };
        const user = { username: 'username', password: 'password' };
        authenticateWithPassword.mockRejectedValueOnce(errorResponse);

        await actions.login(actionContext, user);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(authenticateWithPassword).toHaveBeenCalledWith(user);
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setError',
          errorMessage,
        );
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });
    });

    describe('confirmUserRegistration', () => {
      it('should confirm user registration and login on successful confirmation', async () => {
        const token = 'fakeToken';
        const user = { confirmationCode: '123456' };
        confirmUserRegistration.mockResolvedValueOnce({ data: { token } });

        await actions.confirmUserRegistration(actionContext, user);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(confirmUserRegistration).toHaveBeenCalledWith(user);
        expect(actionContext.commit).toHaveBeenCalledWith('login', token);
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });

      it('should handle error on confirmUserRegistration action', async () => {
        const errorMessage = 'Invalid confirmation code';
        const errorResponse = { response: { data: { error: errorMessage } } };
        const user = { confirmationCode: '123456' };
        confirmUserRegistration.mockRejectedValueOnce(errorResponse);

        await actions.confirmUserRegistration(actionContext, user);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(confirmUserRegistration).toHaveBeenCalledWith(user);
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setError',
          errorMessage,
        );
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });
    });

    describe('signUp', () => {
      it('should sign up user and set stage on successful sign up', async () => {
        const successMessage = 'User signed up successfully';
        const userData = {
          username: 'username',
          email: 'user@example.com',
          password: 'password',
        };
        signUp.mockResolvedValueOnce({ data: { message: successMessage } });

        await actions.signUp(actionContext, userData);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(signUp).toHaveBeenCalledWith(userData);
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setStage',
          stages.CONFIRMATION_CODE,
        );
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setSuccess',
          successMessage,
        );
        expect(router.push).toHaveBeenCalledWith('/');
        expect(router.push).toHaveBeenCalledTimes(1);
        expect(actionContext.commit).toHaveBeenCalledTimes(3);
      });

      it('should handle error on signUp action', async () => {
        const errorMessage = 'Failed to sign up user';
        const errorResponse = { response: { data: { error: errorMessage } } };
        const userData = {
          username: 'username',
          email: 'user@example.com',
          password: 'password',
        };
        signUp.mockRejectedValueOnce(errorResponse);

        await actions.signUp(actionContext, userData);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(signUp).toHaveBeenCalledWith(userData);
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setError',
          errorMessage,
        );
        expect(router.push).not.toHaveBeenCalled();
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });
    });

    describe('getUserSituation', () => {
      it('should get user situation and set stage on successful get', async () => {
        const statusCode = 1;
        const userEmail = 'user@example.com';
        getUserSituation.mockResolvedValueOnce({ data: { code: statusCode } });

        await actions.getUserSituation(actionContext, userEmail);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(getUserSituation).toHaveBeenCalledWith(userEmail);
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setStage',
          statusCode,
        );
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });

      it('should handle error on getUserSituation action', async () => {
        const errorMessage = 'Failed to get user situation';
        const errorResponse = { response: { data: { error: errorMessage } } };
        const userEmail = 'user@example.com';
        getUserSituation.mockRejectedValueOnce(errorResponse);

        await actions.getUserSituation(actionContext, userEmail);

        expect(actionContext.commit).toHaveBeenCalledWith('setError', '');
        expect(getUserSituation).toHaveBeenCalledWith(userEmail);
        expect(actionContext.commit).toHaveBeenCalledWith(
          'setError',
          errorMessage,
        );
        expect(actionContext.commit).toHaveBeenCalledTimes(2);
      });
    });
  });
});
