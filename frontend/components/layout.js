import { useFetchUser, UserProvider } from '../pages/api/utils/user'
import styles from './layout.module.css'


export default function Layout({ children }) {
    render() {
        const {user, loading} = await useFetchUser();
        // console.log(user, loading);
        // console.log(user.);
        return (
        <UserProvider value={{user, loading}}>
            <div className={styles.container}>{children}</div>
        </UserProvider>);
    }
  
}