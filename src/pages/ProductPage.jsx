import { useParams } from 'react-router-dom';
import Product from '../conponents/Product.jsx';

export default function ProductPage() {
  const { productId } = useParams();

  return (<Product productId={productId} />);
}
