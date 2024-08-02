import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const useAuthListener = () => {
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
        setUser(authUser);
    } else {
        setUser(null);
    }
  }));

  return { user };
}

export default useAuthListener;