import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  
  
  p{
    font-size: 1px;
    color : #999999;
    margin-bottom: 5px;
  }

  h1{
    width: 260px;
    margin-bottom: 10px;
    text-align: center;
  }

  a{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    height: 35px;
    border-radius: 10px;
    margin-top: 10px;
    color : white;
    background-color: #22daab;
  }
`;

export default function SignUpSuccessPage() {
  return (
    <Container>
      <h1>회원가입 완료</h1>
      <p>
        마카오 선물하기 회원가입이 완료되었습니다.
        <br />
        정상적인 서비스 이용을 위해 로그인을 진행해주세요.
      </p>
      <Link to="/login">로그인하기</Link>
    </Container>
  );
}
