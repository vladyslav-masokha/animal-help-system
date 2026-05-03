import { useEffect, useMemo, useState } from 'react'
import {
	calculateStats,
	deleteRequest,
	getAllRequests,
	type RequestItem,
	type RequestStatus,
	updateRequestStatus,
} from '../services/requestService'
import './AdminPage.css'
import MapPage from './MapPage'

type FilterStatus = 'All' | RequestStatus
type TabKey = 'requests' | 'map'

export default function AdminPage() {
	const [requests, setRequests] = useState<RequestItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState<FilterStatus>('All')
	const [activeTab, setActiveTab] = useState<TabKey>('requests')
	const [busyId, setBusyId] = useState<number | null>(null)

	const loadRequests = async () => {
		try {
			setLoading(true)
			setError('')
			const data = await getAllRequests()
			setRequests(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Сталася помилка')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		void loadRequests()
	}, [])

	const stats = useMemo(() => calculateStats(requests), [requests])

	const filteredRequests = useMemo(() => {
		return requests.filter(request => {
			const matchesStatus =
				statusFilter === 'All' || request.status === statusFilter

			const query = search.trim().toLowerCase()

			const matchesSearch =
				!query ||
				request.title.toLowerCase().includes(query) ||
				request.description.toLowerCase().includes(query) ||
				request.location.toLowerCase().includes(query) ||
				request.animalType.toLowerCase().includes(query) ||
				(request.region ?? '').toLowerCase().includes(query)

			return matchesStatus && matchesSearch
		})
	}, [requests, search, statusFilter])

	const handleDelete = async (id: number) => {
		try {
			setBusyId(id)
			await deleteRequest(id)
			await loadRequests()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Не вдалося видалити заявку',
			)
		} finally {
			setBusyId(null)
		}
	}

	const handleStatusChange = async (id: number, status: RequestStatus) => {
		try {
			setBusyId(id)
			setError('')
			await updateRequestStatus(id, status)
			await loadRequests()
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Не вдалося змінити статус заявки',
			)
		} finally {
			setBusyId(null)
		}
	}

	return (
		<section className='admin-page'>
			<div className='container admin-shell'>
				<div className='admin-hero'>
					<div>
						<span className='admin-eyebrow'>Панель керування</span>
						<h1>Адмін панель</h1>
						<p>
							Модерація заявок, перегляд статистики, контроль статусів і карта
							звернень.
						</p>
					</div>
				</div>

				<div className='admin-stats-grid'>
					<div className='admin-stat-card'>
						<span>Усього заявок</span>
						<strong>{stats.total}</strong>
					</div>
					<div className='admin-stat-card'>
						<span>Нові</span>
						<strong>{stats.pending}</strong>
					</div>
					<div className='admin-stat-card'>
						<span>У роботі</span>
						<strong>{stats.inProgress}</strong>
					</div>
					<div className='admin-stat-card'>
						<span>Завершені</span>
						<strong>{stats.completed}</strong>
					</div>
				</div>

				<div className='admin-tabs'>
					<button
						className={activeTab === 'requests' ? 'active' : ''}
						onClick={() => setActiveTab('requests')}
						type='button'
					>
						Заявки
					</button>
					<button
						className={activeTab === 'map' ? 'active' : ''}
						onClick={() => setActiveTab('map')}
						type='button'
					>
						Карта
					</button>
				</div>

				{activeTab === 'requests' && (
					<>
						<div className='admin-toolbar'>
							<input
								type='text'
								placeholder='Пошук по назві, опису, локації...'
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>

							<select
								value={statusFilter}
								onChange={e => setStatusFilter(e.target.value as FilterStatus)}
							>
								<option value='All'>Усі статуси</option>
								<option value='Pending'>Нові</option>
								<option value='In Progress'>У роботі</option>
								<option value='Completed'>Завершені</option>
							</select>
						</div>

						{error && <div className='admin-alert'>{error}</div>}

						{loading ? (
							<div className='admin-empty'>Завантаження...</div>
						) : filteredRequests.length === 0 ? (
							<div className='admin-empty'>Нічого не знайдено.</div>
						) : (
							<div className='admin-request-grid'>
								{filteredRequests.map(request => (
									<article className='request-card' key={request.id}>
										<div className='request-card-top'>
											<div>
												<span
													className={`request-badge ${badgeClass(
														request.status,
													)}`}
												>
													{statusLabel(request.status)}
												</span>
												<h3>{request.title}</h3>
											</div>

											<div className='request-id'>#{request.id}</div>
										</div>

										<p className='request-description'>{request.description}</p>

										<div className='request-meta'>
											<div>
												<span>📍 Локація</span>
												<strong>{request.location}</strong>
											</div>
											<div>
												<span>🐾 Тип тварини</span>
												<strong>{request.animalType}</strong>
											</div>
											<div>
												<span>🗺️ Регіон</span>
												<strong>{request.region || 'Не вказано'}</strong>
											</div>
											<div>
												<span>🕒 Створено</span>
												<strong>
													{new Date(request.createdAt).toLocaleString('uk-UA')}
												</strong>
											</div>
										</div>

										<div className='request-actions'>
											<button
												className='ghost-btn'
												disabled={busyId === request.id}
												onClick={() =>
													handleStatusChange(request.id, 'Pending')
												}
												type='button'
											>
												Нова
											</button>

											<button
												className='primary-btn'
												disabled={busyId === request.id}
												onClick={() =>
													handleStatusChange(request.id, 'In Progress')
												}
												type='button'
											>
												У роботу
											</button>

											<button
												className='success-btn'
												disabled={busyId === request.id}
												onClick={() =>
													handleStatusChange(request.id, 'Completed')
												}
												type='button'
											>
												Завершити
											</button>

											<button
												className='danger-btn'
												disabled={busyId === request.id}
												onClick={() => handleDelete(request.id)}
												type='button'
											>
												Видалити
											</button>
										</div>
									</article>
								))}
							</div>
						)}
					</>
				)}

				{activeTab === 'map' && (
					<div className='admin-map-panel'>
						<MapPage requests={requests} />
					</div>
				)}
			</div>
		</section>
	)
}

function badgeClass(status: RequestStatus): string {
	if (status === 'Pending') return 'pending'
	if (status === 'In Progress') return 'progress'
	return 'completed'
}

function statusLabel(status: RequestStatus): string {
	if (status === 'Pending') return 'Нова'
	if (status === 'In Progress') return 'У роботі'
	return 'Завершена'
}
