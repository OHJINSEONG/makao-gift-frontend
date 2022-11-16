import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  font-size: .5em;
  
  ul{
      display: flex;
      justify-content: space-between;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  li{
    margin-right: .5em;
  }
`;

export default function Header() {
  const navigator = useNavigate();

  const userStore = useUserStore();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleClick = () => {
    setAccessToken('');
    navigator('/');
  };

  return (
    <Container>
      <nav>
        <ul>
          <Menu>
            <li>
              <Link to="/">홈</Link>
            </li>

            <li>
              <Link to="/products">스토어</Link>
            </li>
            <li>
              <Link to="/orders">주문조회</Link>
            </li>
          </Menu>
          {accessToken
            ? (
              <Menu>
                <p>
                  내 잔액:
                  {' '}
                  {userStore.amount}
                  원
                </p>
                <button
                  type="button"
                  onClick={handleClick}
                >
                  로그아웃
                </button>
              </Menu>
            )
            : (
              <Menu>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              </Menu>
            ) }
        </ul>
      </nav>
    </Container>
  );
}
