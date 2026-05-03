import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import AdminPage from './pages/AdminPage'
import CreateRequestPage from './pages/CreateRequestPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import RequestDetailsPage from './pages/RequestDetailsPage'
import RequestsPage from './pages/RequestsPage'

function App() {
	return (
		<div className='app-shell'>
			<Navbar />

			<main className='app-content'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/requests' element={<RequestsPage />} />

					<Route
						path='/requests/create'
						element={
							<ProtectedRoute>
								<CreateRequestPage />
							</ProtectedRoute>
						}
					/>

					<Route path='/requests/:id' element={<RequestDetailsPage />} />

					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>

					<Route
						path='/admin'
						element={
							<ProtectedRoute requireAdmin>
								<AdminPage />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>

			<Footer />
		</div>
	)
}

export default App
