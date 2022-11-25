const { default: UserStore } = require('./UserStore.js');

describe('userStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('signup', () => {
    it('signupSuccess', async () => {
      await userStore.create({
        name: '오진성',
        userName: 'ojs0828',
        password: 'Wlstjdcjs153!',
        reconfirmPassword: 'Wlstjdcjs153!',
      });

      expect(userStore.errorMessage).toBeUndefined();
    });

    it('signupFailedWithExistedUserName', async () => {
      await userStore.create({
        name: '오진성',
        userName: 'ojseong0828',
        password: 'Wlstjdcjs153!',
        reconfirmPassword: 'Wlstjdcjs153!',
      });

      expect(userStore.errorMessage).toEqual('해당 아이디는 사용할수 없습니다.');
    });

    it('signupFailedWithReconfirmError', async () => {
      await userStore.create({
        name: '오진성',
        userName: 'ojs0828',
        password: 'Wlstjdcjs153!',
        reconfirmPassword: 'Wlstjdcjs153!!',
      });

      expect(userStore.errorMessage).toEqual('비밀번호가 일치하지 않습니다.');
    });
  });

  describe('login', () => {
    it('loginSuccess', async () => {
      await userStore.login({
        userName: 'ojseong0828',
        password: 'Wlstjdcjs153!',
      });

      expect(userStore.amount).toBe(50000);
      expect(userStore.name).toBe('오진성');
    });

    it('loginFailedWithUnexistedUserName', async () => {
      await userStore.login({
        userName: 'ojs0828',
        password: 'Wlstjdcjs153!',
      });

      expect(userStore.errorMessage).toEqual('아이디 혹은 비밀번호가 맞지 않습니다.');
    });

    it('loginFailedWithPasswordError', async () => {
      await userStore.login({
        userName: 'ojseong0828',
        password: 'worngPassword',
      });

      expect(userStore.errorMessage).toEqual('아이디 혹은 비밀번호가 맞지 않습니다.');
    });
  });
});
