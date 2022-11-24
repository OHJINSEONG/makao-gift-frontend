import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Image = styled.img`
  width: 270px;
  height: 180px;
  margin-left: 50px;
`;

export default function HomePage() {
  return (
    <Container>
      <div>
        <p>
          무얼 선물할 지 고민이라면
        </p>
        <h2>
          특별한
          {' '}
          <br />
          아이템을 전하세요
        </h2>
        <p>
          마카오 선물하기에서만 볼 수 있는 특별한 아이템
        </p>
      </div>
      <Image className="home" alt="gift" src="https://cdn.shopify.com/s/files/1/1749/5899/articles/Best-Gifts-For-Tennis-Players-Epirus-Blog-min_1000x.png?v=1611551327" />
    </Container>
  );
}
