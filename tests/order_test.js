/* eslint-disable no-undef */
Feature('상품 주문-고객은 상품을 친구에게 보내기 위해 주문을 완료 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('로그인');
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });
  I.click('스토어');
  I.click('.item');
  I.click('선물하기');
});

Scenario('주문 성공 => 주문 조회로 이동', ({ I }) => {
  // When
  I.order({
    receiver: '오진성',
    address: '울산',
    message: '선물이다',
  });

  // Then
  I.see('내가 주문한 내역입니다.');
});

Scenario('주문 실패(받는 분 미입력)', ({ I }) => {
  // When
  I.order({
    receiver: '',
    address: '울산',
    message: '선물이다',
  });

  // Then
  I.see('성함을 입력해주세요.');
});

Scenario('주문 실패(주소 미입력)', ({ I }) => {
  // When
  I.order({
    receiver: '오진성',
    address: '',
    message: '선물이다',
  });

  // Then
  I.see('주소를 입력해주세요.');
});
