import { saveAuth } from '../utils/auth'

const API_URL = 'http://localhost:5262/api'

export interface LoginRequest {
	email: string
	password: string
}

export interface RegisterRequest {
	fullName: string
	email: string
	password: string
	phone: string
	region: string
	role: number
}

export interface AuthResponse {
	token: string
	expiresAt: string
	userId: number
	fullName: string
	email: string
	role: string
}

function normalizeRole(role: string | null | undefined): string {
	if (!role) return 'User'

	const value = role.trim().toLowerCase()

	if (value === 'admin') return 'Admin'
	if (value === 'volunteer') return 'Volunteer'
	return 'User'
}

function persistAuth(result: AuthResponse) {
	saveAuth(result.token, {
		id: result.userId,
		fullName: result.fullName,
		email: result.email,
		role: normalizeRole(result.role),
		expiresAt: result.expiresAt,
	})
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/Auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		const text = await response.text()
		throw new Error(text || 'Помилка входу')
	}

	const result: AuthResponse = await response.json()
	persistAuth(result)

	return {
		...result,
		role: normalizeRole(result.role),
	}
}

export async function registerUser(
	data: RegisterRequest,
): Promise<AuthResponse> {
	const response = await fetch(`${API_URL}/Auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(errorText || 'Помилка реєстрації')
	}

	const result: AuthResponse = await response.json()
	persistAuth(result)

	return {
		...result,
		role: normalizeRole(result.role),
	}
}
