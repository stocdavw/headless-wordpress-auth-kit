import { LoginForm } from '@/components/login-form'
import styles from './login.module.css'

export const metadata = {
    title: 'Login | Headless WP',
}

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <LoginForm />
        </div>
    )
}
