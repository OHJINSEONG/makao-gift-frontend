import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: .5em;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;

  h1 {
    align-self: flex-start;
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid: repeat(2,180px)/repeat(4,110px);
  justify-content: center;
  align-items: center;

  li{
    border: 1px solid black;
    width: 100%;
    height: 100%;
  }

  a {
    
    width: 100%;
    height: 100%;
  }
`;

const Pagenation = styled.ul`
  display: flex;
  justify-content: center;
  width: 100px;

  button {
    border: none;
    background-color: transparent;
  }
`;

export default function StorePage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts(1);
  }, []);

  const handelClick = (page) => {
    productStore.fetchProducts(page);
  };

  return (
    <Container>
      {productStore.products.length
        ? (
          <Menu>
            <h1>
              인기선물을 한 자리에 모았어요.
            </h1>
            <ProductList>
              {productStore.products.map((product) => (
                <li key={product.id}>
                  <Link className="item" to={`${product.id}`}>
                    상품
                  </Link>
                  <p>
                    {product.price}
                    {' '}
                    원
                  </p>
                </li>
              ))}
            </ProductList>
            <Pagenation>
              {productStore.pages.map((page) => (
                <li key={page.number}>
                  <button
                    type="button"
                    onClick={() => handelClick(page.number)}
                  >
                    {page.number}
                  </button>
                </li>
              ))}
            </Pagenation>
          </Menu>
        )
        : (<p>상품이 존재하지 않습니다.</p>)}
    </Container>
  );
}
