/* eslint-disable no-undef */
Feature('상품 선택-고객은 원하는 상품을 친구에게 선물하기 위해 상품과 개수를 선택하고 주문할수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('스토어');
  I.click('.item');
});

Scenario('로그인 하지 않았을때', ({ I }) => {
  // When
  I.click('선물하기');

  // Then
  I.see('USER LOGIN');
});

Scenario('주문 하기', ({ I }) => {
  // Given
  I.click('선물하기');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });

  // When
  I.click('선물하기');

  // Then
  I.see('받는 분 성함');
});

Scenario('주문수량 늘리기', ({ I }) => {
  // Given
  I.click('선물하기');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });

  // When
  I.click('.plus');

  // Then
  I.see('41800원');
});

Scenario('주문수량 줄이기', ({ I }) => {
  // Given
  I.click('선물하기');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });

  // When
  I.click('.plus');
  I.click('.minus');

  // Then
  I.see('20900원');
});

Scenario('주문 실패 (잔액 부족)', ({ I }) => {
  // Given
  I.click('선물하기');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });

  // When
  I.click('.plus');
  I.click('.plus');
  I.click('.plus');
  I.click('.plus');
  I.click('.plus');
  I.click('선물하기');

  // Then
  I.see('잔액이 부족하여 선물하기가 불가합니다.');
});
