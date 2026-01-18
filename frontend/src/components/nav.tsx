import Link from 'next/link'
import { cookies } from 'next/headers'
import { logout } from '@/app/actions'
import styles from './nav.module.css'

export async function Nav() {
    const cookieStore = await cookies()
    const isLoggedIn = cookieStore.has('session_token')

    return (
        <nav className={styles.nav}>
            <div>
                {isLoggedIn ? (
                    <form action={logout}>
                        <button type="submit" className={styles.authButton}>
                            Logout
                        </button>
                    </form>
                ) : (
                    <Link href="/login" className={styles.authButton}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}
