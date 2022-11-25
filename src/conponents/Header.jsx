import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore.js';

const Container = styled.div`
  position: fixed;
  font-size: .5em;
  font-weight: bold;
  width: 100%;
  background-color: white;
  border-bottom: solid 1px black;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 40px;

  ul{
      display: flex;
      justify-content: space-between;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin-right: 300px;

  .on {
    border-bottom: solid 1px #22daab;
  }  
`;

const Menu2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;

  button {
    font-size: .3em;
    background-color: transparent;
  }
`;

export default function Header() {
  const navigator = useNavigate();
  const [homeHover, setHomeHover] = useState(false);
  const [storeHover, setStoreHover] = useState(false);
  const [orderHover, setOrderHover] = useState(false);

  const userStore = useUserStore();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleClick = () => {
    setAccessToken('');
    navigator('/');
  };

  return (
    <Container>
      <Wrapper>
        <nav>
          <ul>
            <Menu>
              <h2>선물하기</h2>
              <li>
                <Link
                  to="/"
                  className={homeHover ? 'on' : 'off'}
                  onMouseEnter={() => { setHomeHover(true); }}
                  onMouseLeave={() => { setHomeHover(false); }}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={storeHover ? 'on' : 'off'}
                  onMouseEnter={() => { setStoreHover(true); }}
                  onMouseLeave={() => { setStoreHover(false); }}
                >
                  스토어
                </Link>
              </li>
              <li>
                <Link
                  to={accessToken ? '/orders' : '/login'}
                  className={orderHover ? 'on' : 'off'}
                  onMouseEnter={() => { setOrderHover(true); }}
                  onMouseLeave={() => { setOrderHover(false); }}
                >
                  주문조회
                </Link>
              </li>
            </Menu>
            {accessToken
              ? (
                <Menu2>
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
                </Menu2>
              )
              : (
                <Menu2>
                  <li>
                    <Link to="/signup">회원가입</Link>
                  </li>
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                </Menu2>
              ) }
          </ul>
        </nav>
      </Wrapper>
    </Container>
  );
}
