/* eslint-disable no-undef */
Feature('로그인-고객은 자신임을 증명하기 위해 로그인 할수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('로그인');
});

Scenario('로그인 성공', ({ I }) => {
  // When
  I.login({
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
  });

  // Then
  I.see('Hello, world!');
});

Scenario('로그인 실패(아이디가 존재하지 않을때)', ({ I }) => {
  // When
  I.login({
    userName: 'ojs0828',
    password: 'Wlstjdcjs153!',
  });

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다.');
});

Scenario('로그인 실패(비밀번호가 틀렸을때)', ({ I }) => {
  // When
  I.login({
    userName: 'ojseong0828',
    password: 'WrongPassword!!',
  });

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다.');
});

Scenario('로그인 실패(아이디 미입력)', ({ I }) => {
  // When
  I.login({
    userName: '',
    password: 'Wlstjdcjs153!',
  });

  // Then
  I.see('아이디를 입력해주세요.');
});

Scenario('로그인 실패(비밀번호 미입력)', ({ I }) => {
  // When
  I.login({
    userName: 'ojseong0828',
    password: '',
  });

  // Then
  I.see('비밀번호를 입력해주세요.');
});
