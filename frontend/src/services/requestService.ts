import { getToken } from '../utils/auth'

const API_BASE = 'http://localhost:5262/api'
const APP_BASE = 'http://localhost:5262'
const REQUESTS_API = `${API_BASE}/animalrequests`

export type RequestStatus = 'Pending' | 'In Progress' | 'Completed'

export interface RequestItem {
	id: number
	title: string
	description: string
	location: string
	animalType: string
	status: RequestStatus
	createdAt: string
	latitude: number | null
	longitude: number | null
	photoUrl?: string | null
	userName?: string | null
	volunteerName?: string | null
	region?: string | null
	condition: number
	urgencyLevel: number
	address?: string | null
	createdByUserId: number
	assignedVolunteerId?: number | null
	shelterId?: number | null
	authorName?: string | null
}

export interface CreateRequestPayload {
	title: string
	description: string
	location: string
	animalType: string
	latitude?: number | null
	longitude?: number | null
	photoUrl?: string | null
	region?: string | null
	condition: number
	urgencyLevel: number
	address?: string | null
}

type RawRequest = Record<string, unknown>

function authHeaders(withJson = false): HeadersInit {
	const token = getToken()

	if (!token) {
		throw new Error('Токен авторизації відсутній. Увійди в систему ще раз.')
	}

	return {
		Accept: 'application/json',
		...(withJson ? { 'Content-Type': 'application/json' } : {}),
		Authorization: `Bearer ${token}`,
	}
}

function toStringValue(value: unknown, fallback = ''): string {
	return typeof value === 'string' ? value : fallback
}

function toNumberValue(
	value: unknown,
	fallback: number | null = null,
): number | null {
	return typeof value === 'number' ? value : fallback
}

function normalizePhotoUrl(value: unknown): string | null {
	if (typeof value !== 'string' || !value.trim()) return null

	if (value.startsWith('http://') || value.startsWith('https://')) {
		return value
	}

	if (value.startsWith('/')) {
		return `${APP_BASE}${value}`
	}

	return `${APP_BASE}/${value}`
}

function mapRequest(item: RawRequest): RequestItem {
	return {
		id: Number(item.id ?? 0),
		title: toStringValue(item.title, 'Без назви'),
		description: toStringValue(item.description, ''),
		location: toStringValue(item.location, ''),
		animalType: toStringValue(item.animalType, ''),
		status: toStringValue(item.status, 'Pending') as RequestStatus,
		createdAt: toStringValue(item.createdAt, new Date().toISOString()),
		latitude: toNumberValue(item.latitude),
		longitude: toNumberValue(item.longitude),
		photoUrl: normalizePhotoUrl(item.photoUrl),
		userName: toStringValue(item.userName, ''),
		volunteerName: toStringValue(item.volunteerName, ''),
		region: toStringValue(item.region, ''),
		condition: Number(item.condition ?? 0),
		urgencyLevel: Number(item.urgencyLevel ?? 0),
		address: toStringValue(item.address, ''),
		createdByUserId: Number(item.createdByUserId ?? 0),
		assignedVolunteerId:
			item.assignedVolunteerId === null ||
			item.assignedVolunteerId === undefined
				? null
				: Number(item.assignedVolunteerId),
		shelterId:
			item.shelterId === null || item.shelterId === undefined
				? null
				: Number(item.shelterId),
		authorName: toStringValue(item.authorName, ''),
	}
}

export async function getAllRequests(): Promise<RequestItem[]> {
	const response = await fetch(REQUESTS_API)

	if (!response.ok) {
		throw new Error(`Не вдалося отримати заявки: ${response.status}`)
	}

	const data: RawRequest[] = await response.json()
	return data.map(mapRequest)
}

export async function getRequestById(id: number): Promise<RequestItem> {
	const response = await fetch(`${REQUESTS_API}/${id}`)

	if (!response.ok) {
		throw new Error(`Не вдалося отримати заявку: ${response.status}`)
	}

	const data: RawRequest = await response.json()
	return mapRequest(data)
}

export async function createRequest(
	payload: CreateRequestPayload,
): Promise<{ id: number; message: string }> {
	const response = await fetch(REQUESTS_API, {
		method: 'POST',
		headers: authHeaders(true),
		body: JSON.stringify({
			title: payload.title,
			description: payload.description,
			location: payload.location,
			animalType: payload.animalType,
			latitude: payload.latitude ?? null,
			longitude: payload.longitude ?? null,
			photoUrl: payload.photoUrl ?? null,
			region: payload.region ?? null,
			condition: payload.condition,
			urgencyLevel: payload.urgencyLevel,
			address: payload.address ?? null,
		}),
	})

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(
			errorText || `Не вдалося створити заявку: ${response.status}`,
		)
	}

	return response.json()
}

export async function updateRequestStatus(
	id: number,
	status: RequestStatus,
): Promise<void> {
	const response = await fetch(`${REQUESTS_API}/${id}/status`, {
		method: 'PUT',
		headers: authHeaders(true),
		body: JSON.stringify({ status }),
	})

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(
			errorText || `Не вдалося оновити статус: ${response.status}`,
		)
	}
}

export async function deleteRequest(id: number): Promise<void> {
	const response = await fetch(`${REQUESTS_API}/${id}`, {
		method: 'DELETE',
		headers: authHeaders(),
	})

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(
			errorText || `Не вдалося видалити заявку: ${response.status}`,
		)
	}
}

export function calculateStats(requests: RequestItem[]) {
	return {
		total: requests.length,
		pending: requests.filter(request => request.status === 'Pending').length,
		inProgress: requests.filter(request => request.status === 'In Progress')
			.length,
		completed: requests.filter(request => request.status === 'Completed')
			.length,
	}
}
