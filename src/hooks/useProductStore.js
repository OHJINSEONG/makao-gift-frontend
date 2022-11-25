import { useEffect } from 'react';
import { productStore } from '../stores/ProductStore.js';
import useForceUpdate from './useForceUpdate.js';

export default function useProductStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    productStore.subscribe(forceUpdate);

    return () => productStore.unsubscribe(forceUpdate);
  }, []);

  return productStore;
}
