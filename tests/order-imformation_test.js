/* eslint-disable no-undef */
Feature('주문 세부 정보 확인-고객은 자신이 선물한 상품과 메세지를 자세히 알기 위해 주문 정보를 확인 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('로그인');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });
  I.click('주문조회');
});

Scenario('주문 목록이 있을때', ({ I }) => {
  // When
  I.click('.order');

  // Then
  I.see('세종시');
});
