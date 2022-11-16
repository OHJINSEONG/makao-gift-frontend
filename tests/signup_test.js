/* eslint-disable no-undef */
Feature('회원가입-고객은 상품을 주문할 수 있는 자격을 얻기 위해 회원가입을 할 수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('회원가입');
});

Scenario('회원가입 성공', ({ I }) => {
  // When
  I.signUp({
    name: '오진성',
    userName: 'ojs0828',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: 'Wlstjdcjs153!',
  });

  // Then
  I.see('로그인하기');
});

Scenario('회원가입 실패(동일한 아이디 존재)', ({ I }) => {
  // Given
  //  동일한 아이디 만들어 넣기

  // When
  I.signUp({
    name: '오진성',
    userName: 'ojseong0828',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: 'Wlstjdcjs153!',
  });

  // Then
  I.see('해당 아이디는 사용할수 없습니다.');
});

Scenario('회원가입 실패(이름 형식 실패)', ({ I }) => {
  // When
  I.signUp({
    name: '오진성일까아닐까그것이문제로다',
    userName: 'ojs0828',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: 'Wlstjdcjs153!',
  });

  // Then
  I.see('이름을 다시 확인해주세요.');
});

Scenario('회원가입 실패(비밀번호 형식 실패)', ({ I }) => {
  // When
  I.signUp({
    name: '오진성',
    userName: 'ojs0828',
    password: 'ㅎㅇ',
    reconfirmPassword: 'ㅎㅇ',
  });

  // Then
  I.see('비밀번호를 다시 확인해주세요.');
});

Scenario('회원가입 실패(비밀번호 재확인 실패)', ({ I }) => {
  // When
  I.signUp({
    name: '오진성',
    userName: 'ojs0828',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: 'Wlstjdcjs153!!',
  });

  // Then
  I.see('비밀번호가 일치하지 않습니다.');
});

Scenario('회원가입 실패(이름 빈칸  넣었을때)', ({ I }) => {
  // When
  I.signUp({
    name: '',
    userName: 'ojs0828',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: 'Wlstjdcjs153!',
  });

  // Then
  I.see('이름을 입력해주세요.');
});

Scenario('회원가입 실패(아이디 빈칸  넣었을때)', ({ I }) => {
  // When
  I.signUp({
    name: '오진성',
    userName: '',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: 'Wlstjdcjs153!',
  });

  // Then
  I.see('아이디를 입력해주세요.');
});

Scenario('회원가입 실패(비밀번호 빈칸  넣었을때)', ({ I }) => {
  // When
  I.signUp({
    name: '오진성',
    userName: 'ojs0828',
    password: '',
    reconfirmPassword: 'Wlstjdcjs153!',
  });

  // Then
  I.see('비밀번호를 입력해주세요.');
});

Scenario('회원가입 실패(비밀번호 확인 빈칸  넣었을때)', ({ I }) => {
  // When
  I.signUp({
    name: '오진성',
    userName: 'ojs0828',
    password: 'Wlstjdcjs153!',
    reconfirmPassword: '',
  });

  // Then
  I.see('비밀번호 확인을 입력해주세요.');
});
