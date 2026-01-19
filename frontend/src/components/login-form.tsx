'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { login } from '@/app/actions'
import styles from './login-form.module.css'

const initialState = {
    message: '',
}

export function LoginForm() {
    const [state, formAction, isPending] = useActionState(login, initialState)

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <Image
                        src="/logo.png"
                        alt="Site Logo"
                        width={160}
                        height={160}
                        style={{ borderRadius: '16px' }}
                    />
                </div>
                <h1 className={styles.title}>Welcome Back</h1>
                <form
                    action={formAction}
                    className={styles.form}
                >
                    <div className={styles.field}>
                        <label
                            className={styles.label}
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className={styles.input}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label
                            className={styles.label}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className={styles.input}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            required
                        />
                        {state?.message && (
                            <div className={styles.error}>
                                {state.message}
                            </div>
                        )}
                    </div>
                    <div className={styles.actions}>
                        <button
                            className={styles.button}
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className={styles.buttonContent}>
                                    <svg className={styles.spinner} viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Logging in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </div>
                    <p className={styles.footer}>
                        Don't have an account? <a href="#" className={styles.link}>Contact Admin</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
