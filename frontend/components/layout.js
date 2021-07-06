import { useFetchUser, UserProvider } from '../pages/api/utils/user'
import styles from './layout.module.css'


export default function Layout({ children }) {

        return (
        <UserProvider value={{user, loading}}>
            <div className={styles.container}>{children}</div>
        </UserProvider>);
  
}