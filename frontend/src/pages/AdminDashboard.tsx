import { useEffect, useState } from 'react'
import { getRequests, type RequestItem } from '../services/requestService'

export default function AdminDashboard() {
	const [stats, setStats] = useState({
		total: 0,
		active: 0,
		completed: 0,
	})

	useEffect(() => {
		const load = async () => {
			const requests: RequestItem[] = await getRequests()

			const total = requests.length
			const active = requests.filter(r => r.status === 'In Progress').length
			const completed = requests.filter(r => r.status === 'Completed').length

			setStats({ total, active, completed })
		}

		load()
	}, [])

	return (
		<div className='dashboard'>
			<h1>Admin Dashboard</h1>

			<div className='cards'>
				<div className='card'>
					<h3>Total Requests</h3>
					<p>{stats.total}</p>
				</div>

				<div className='card'>
					<h3>Active</h3>
					<p>{stats.active}</p>
				</div>

				<div className='card'>
					<h3>Completed</h3>
					<p>{stats.completed}</p>
				</div>
			</div>
		</div>
	)
}
