/* eslint-disable no-undef */
Feature('주문 목록 확인-고객은 자신이 선물한 이력을 확인하기 위해 주문 목록을 확인할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('로그인');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });
});

Scenario('주문 목록이 있을때', ({ I }) => {
  // When
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역입니다.');
});

Scenario('주문 목록이 없을때', ({ I }) => {
  // Given
  I.deleteOrders();
  I.amOnPage('/');

  // When
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역이 없습니다.');
});
