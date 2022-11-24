/* eslint-disable no-undef */
Feature('스토어-고객은 마음에 드는 상품을 고르기 위해 상품 목록을 볼수 있다.');

// Given
Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
});

Scenario('상품이 없을때', ({ I }) => {
  // Given
  I.deleteProducts();
  I.amOnPage('/');

  // When
  I.click('스토어');

  // Then
  I.see('상품이 존재하지 않습니다.');
});

Scenario('상품이 있을때(50개)', ({ I }) => {
  // When
  I.click('스토어');

  // Then
  I.see('인기선물을 한 자리에 모았어요.');
});
