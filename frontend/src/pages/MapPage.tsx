import {
	GoogleMap,
	InfoWindow,
	LoadScript,
	Marker,
} from '@react-google-maps/api'
import { useMemo, useState } from 'react'
import type { RequestItem } from '../services/requestService'
import './MapPage.css'

interface MapPageProps {
	requests: RequestItem[]
}

const containerStyle = {
	width: '100%',
	height: '620px',
}

const fallbackCenter = {
	lat: 49.0,
	lng: 31.3,
}

export default function MapPage({ requests }: MapPageProps) {
	const [selectedId, setSelectedId] = useState<number | null>(null)

	const mappableRequests = useMemo(
		() =>
			requests.filter(
				request =>
					typeof request.latitude === 'number' &&
					typeof request.longitude === 'number',
			),
		[requests],
	)

	const selectedRequest =
		mappableRequests.find(request => request.id === selectedId) ?? null

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

	const mapCenter = useMemo(() => {
		if (mappableRequests.length === 0) {
			return fallbackCenter
		}

		if (mappableRequests.length === 1) {
			return {
				lat: mappableRequests[0].latitude as number,
				lng: mappableRequests[0].longitude as number,
			}
		}

		const latSum = mappableRequests.reduce(
			(sum, item) => sum + (item.latitude as number),
			0,
		)
		const lngSum = mappableRequests.reduce(
			(sum, item) => sum + (item.longitude as number),
			0,
		)

		return {
			lat: latSum / mappableRequests.length,
			lng: lngSum / mappableRequests.length,
		}
	}, [mappableRequests])

	if (!apiKey) {
		return (
			<div className='map-fallback'>
				Додай <code>VITE_GOOGLE_MAPS_API_KEY</code> у файл <code>.env</code>,
				щоб увімкнути Google Maps.
			</div>
		)
	}

	if (mappableRequests.length === 0) {
		return (
			<div className='map-fallback'>
				Для заявок ще не вказані координати. Додай <code>latitude</code> і{' '}
				<code>longitude</code> під час створення заявки.
			</div>
		)
	}

	return (
		<div className='map-shell'>
			<LoadScript googleMapsApiKey={apiKey}>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={mapCenter}
					zoom={mappableRequests.length === 1 ? 12 : 6}
					options={{
						zoomControl: true,
						streetViewControl: false,
						mapTypeControl: false,
						fullscreenControl: true,
					}}
				>
					{mappableRequests.map(request => (
						<Marker
							key={request.id}
							position={{
								lat: request.latitude as number,
								lng: request.longitude as number,
							}}
							title={request.title}
							onClick={() => setSelectedId(request.id)}
						/>
					))}

					{selectedRequest && (
						<InfoWindow
							position={{
								lat: selectedRequest.latitude as number,
								lng: selectedRequest.longitude as number,
							}}
							onCloseClick={() => setSelectedId(null)}
						>
							<div className='map-popup'>
								<span
									className={`map-status ${popupStatusClass(
										selectedRequest.status,
									)}`}
								>
									{statusLabel(selectedRequest.status)}
								</span>
								<h3>{selectedRequest.title}</h3>
								<p>{selectedRequest.description}</p>
								<div className='map-popup-meta'>
									<strong>Локація:</strong> {selectedRequest.location}
								</div>
								<div className='map-popup-meta'>
									<strong>Тип тварини:</strong> {selectedRequest.animalType}
								</div>
								<div className='map-popup-meta'>
									<strong>Координати:</strong> {selectedRequest.latitude},{' '}
									{selectedRequest.longitude}
								</div>
							</div>
						</InfoWindow>
					)}
				</GoogleMap>
			</LoadScript>
		</div>
	)
}

function popupStatusClass(status: RequestItem['status']): string {
	if (status === 'Pending') return 'pending'
	if (status === 'In Progress') return 'progress'
	return 'completed'
}

function statusLabel(status: RequestItem['status']): string {
	if (status === 'Pending') return 'Нова'
	if (status === 'In Progress') return 'У роботі'
	return 'Завершена'
}
