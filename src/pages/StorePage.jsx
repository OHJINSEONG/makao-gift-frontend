import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import image from '../../image';
import useProductStore from '../hooks/useProductStore';
import banner from '../images/home.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  grid: repeat(2,auto)/repeat(4,auto);
  justify-content: center;
  align-items: center;

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
  width: 100px;

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
  width: 100px;
  height: 20px;
  
  color : gray;
  font-size: .2em;
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
      <Banner src={banner} />
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
                      src="data:image/jpeg;base64,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"
                    />
                    <Imformation>
                      <p>
                        제조사:
                        {' '}
                        {product.manufacturer}
                      </p>
                      <p>{product.title}</p>
                      <p>
                        {product.price}
                        {' '}
                        원
                      </p>
                    </Imformation>
                  </Link>
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
