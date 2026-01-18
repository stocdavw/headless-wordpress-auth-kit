'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_REST_URL}/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })

        const data = await res.json()

        if (!res.ok) {
            let errorMessage = data.message || 'Login failed'
            // Strip HTML tags
            errorMessage = errorMessage.replace(/<[^>]*>?/gm, '')
            return { message: errorMessage }
        }

        if (data.token) {
            const cookieStore = await cookies()
            cookieStore.set('session_token', data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            })
        }
    } catch (error) {
        return { message: 'An unexpected error occurred' }
    }

    redirect('/')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session_token')
    redirect('/login')
}
