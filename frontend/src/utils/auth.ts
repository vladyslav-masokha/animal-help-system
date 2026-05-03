export interface AuthUser {
	id: number
	fullName: string
	email: string
	role: string
	expiresAt?: string
}

function normalizeRole(role: string | undefined | null): string {
	const value = (role ?? '').trim().toLowerCase()

	if (value === 'admin') return 'Admin'
	if (value === 'volunteer') return 'Volunteer'
	if (value === 'shelter') return 'Shelter'

	return 'User'
}

export function saveAuth(token: string, user: AuthUser) {
	const normalizedUser: AuthUser = {
		...user,
		role: normalizeRole(user.role),
	}

	localStorage.setItem('token', token)
	localStorage.setItem('user', JSON.stringify(normalizedUser))
}

export function clearAuth() {
	localStorage.removeItem('token')
	localStorage.removeItem('user')
}

export function logout() {
	clearAuth()
}

export function getToken(): string | null {
	const token = localStorage.getItem('token')
	const userRaw = localStorage.getItem('user')

	if (!token || !userRaw) return null

	try {
		const user = JSON.parse(userRaw) as AuthUser

		if (user.expiresAt && new Date(user.expiresAt).getTime() <= Date.now()) {
			clearAuth()
			return null
		}

		return token
	} catch {
		clearAuth()
		return null
	}
}

export function getUser(): AuthUser | null {
	if (!getToken()) return null

	const userRaw = localStorage.getItem('user')
	if (!userRaw) return null

	try {
		const user = JSON.parse(userRaw) as AuthUser
		return { ...user, role: normalizeRole(user.role) }
	} catch {
		clearAuth()
		return null
	}
}

export function isAuthenticated(): boolean {
	return !!getToken()
}

export function isAdmin(): boolean {
	return getUser()?.role === 'Admin'
}

export function isVolunteer(): boolean {
	return getUser()?.role === 'Volunteer'
}

export function isShelter(): boolean {
	return getUser()?.role === 'Shelter'
}

export function hasRole(...roles: string[]): boolean {
	const user = getUser()
	if (!user) return false

	const normalizedRoles = roles.map(normalizeRole)
	return normalizedRoles.includes(user.role)
}
