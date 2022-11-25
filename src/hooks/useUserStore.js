import { useEffect } from 'react';
import { userStore } from '../stores/UserStore.js';
import useForceUpdate from './useForceUpdate.js';

export default function useUserStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    userStore.subscribe(forceUpdate);

    return () => userStore.unsubscribe(forceUpdate);
  }, []);

  return userStore;
}
