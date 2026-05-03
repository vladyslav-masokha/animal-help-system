export type RequestStatus = 'Pending' | 'In Progress' | 'Completed'

export type UserRole = 'User' | 'Volunteer' | 'Admin' | 'Shelter'

export interface AnimalRequest {
	id: number
	title: string
	description: string
	region: string
	helpType: string
	status: RequestStatus
	createdAt: string
	authorName: string
}
