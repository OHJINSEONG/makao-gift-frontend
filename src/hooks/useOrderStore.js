import { useEffect } from 'react';
import { orderStore } from '../stores/OrderStore.js';

import useForceUpdate from './useForceUpdate.js';

export default function useOrderStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    orderStore.subscribe(forceUpdate);

    return () => orderStore.unsubscribe(forceUpdate);
  }, []);

  return orderStore;
}
