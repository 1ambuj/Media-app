import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const login = async (emailId, pwd) => {
    const user = await signInWithEmailAndPassword(auth, emailId, pwd);
    return user
}