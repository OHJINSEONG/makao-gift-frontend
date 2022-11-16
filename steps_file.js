// in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    setupDatabase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-database`);
    },
    signUp({
      name, userName, password, reconfirmPassword,
    }) {
      this.fillField('이름', name);
      this.fillField('아이디', userName);
      this.fillField('비밀번호', password);
      this.fillField('비밀번호 확인', reconfirmPassword);
      this.click('[type=submit]');
    },
    login({
      userName, password,
    }) {
      this.fillField('아이디', userName);
      this.fillField('비밀번호', password);
      this.click('로그인하기');
    },
    deleteProducts() {
      this.amOnPage(`${backdoorBaseUrl}/delete-products`);
    },
    order({ receiver, address, message }) {
      this.fillField('받는 분 성함', receiver);
      this.fillField('받는 분 주소', address);
      this.fillField('받는 분께 보내는 메세지', message);
      this.click('[type=submit]');
    },
    deleteOrders() {
      this.amOnPage(`${backdoorBaseUrl}/delete-orders`);
    },
  });
};
