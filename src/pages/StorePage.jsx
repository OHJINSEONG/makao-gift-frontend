import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useProductStore from '../hooks/useProductStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: .5em;

  .notCurrentPage {
    color: #999999
  }

  .manufacturer{
    margin: 3px;
    color: #999999
  }

  .price {
    margin-top: 5px;
    color : black
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;

  h1 {
    align-self: flex-start;
  }
`;

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 840px;

  li{
    width: 200px;
    height: 250px;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const Pagenation = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;

  button {
    border: none;
    background-color: transparent;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Banner = styled.img`
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
`;

const Imformation = styled.div`
  width: 150px;
  height: 20px;
  
  color : gray;
  font-size: .2em;
`;

export default function StorePage() {
  const productStore = useProductStore();
  const [correntPage, setCorrentPage] = useState(1);

  useEffect(() => {
    productStore.fetchProducts(1);
  }, []);

  const handelClick = (page) => {
    setCorrentPage(page);
    productStore.fetchProducts(page);
  };

  return (
    <Container>
      <Banner src="https://cdn.shopify.com/s/files/1/1749/5899/articles/Best-Gifts-For-Tennis-Players-Epirus-Blog-min_1000x.png?v=1611551327" />
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
                    <Image
                      className="productImage"
                      alt={product.image}
                      src={product.image}
                    />
                    <Imformation>
                      <p className="manufacturer">
                        제조사:
                        {' '}
                        {product.manufacturer}
                      </p>
                      <h2 className="title">{product.title}</h2>
                      <h1 className="price">
                        {product.price}
                        {' '}
                        원
                      </h1>
                    </Imformation>
                  </Link>
                </li>
              ))}
            </ProductList>
            <Pagenation>
              {productStore.pages.map((page) => (
                <li key={page.number}>
                  <button
                    className={page.number === correntPage ? 'currentPage' : 'notCurrentPage'}
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
