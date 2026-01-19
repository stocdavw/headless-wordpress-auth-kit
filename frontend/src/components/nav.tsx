import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { logout } from '@/app/actions'
import styles from './nav.module.css'

export default async function Nav() {
    const token = (await cookies()).get('session_token')
    const isLoggedIn = !!token

    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logoLink}>
                <Image
                    src="/logo.png"
                    alt="Site Logo"
                    width={40}
                    height={40}
                    className={styles.logo}
                />
                <span className={styles.siteTitle}>Headless WP Auth Kit</span>
            </Link>
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
