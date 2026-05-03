import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRequest } from '../services/requestService'

const CreateRequestPage = () => {
	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [location, setLocation] = useState('')
	const [animalType, setAnimalType] = useState('')
	const [region, setRegion] = useState('')
	const [address, setAddress] = useState('')
	const [condition, setCondition] = useState(3)
	const [urgencyLevel, setUrgencyLevel] = useState(3)
	const [latitude, setLatitude] = useState<string>('')
	const [longitude, setLongitude] = useState<string>('')
	const [photoPreview, setPhotoPreview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) { setPhotoPreview(null); return }
		setPhotoPreview(URL.createObjectURL(file))
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setError('')

		if (!title.trim()) { setError('Вкажи заголовок заявки'); return }
		if (!location.trim()) { setError('Вкажи локацію'); return }
		if (!animalType.trim()) { setError('Вкажи тип тварини'); return }

		try {
			setLoading(true)
			await createRequest({
				title: title.trim(),
				description: description.trim(),
				location: location.trim(),
				animalType: animalType.trim(),
				region: region.trim() || null,
				address: address.trim() || null,
				condition,
				urgencyLevel,
				latitude: latitude.trim() ? Number(latitude) : null,
				longitude: longitude.trim() ? Number(longitude) : null,
				photoUrl: null,
			})
			navigate('/requests')
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Не вдалося створити заявку')
		} finally {
			setLoading(false)
		}
	}

	const levelLabels: Record<number, string> = {
		1: '1 — Мінімально',
		2: '2 — Низько',
		3: '3 — Середньо',
		4: '4 — Серйозно',
		5: '5 — Критично',
	}

	return (
		<div className='create-request-page'>
			<div className='create-request-container'>
				<p className='section-badge'>📋 Нова заявка</p>
				<h1>Створити заявку</h1>
				<p className='create-request-subtitle'>
					Опишіть ситуацію — волонтери та притулки отримають сповіщення і зможуть допомогти.
				</p>

				<form className='create-request-form' onSubmit={handleSubmit}>

					<p className='form-section-title'>Основна інформація</p>

					<div className='form-group full-width'>
						<label htmlFor='title'>Заголовок заявки *</label>
						<input
							id='title'
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							placeholder='Наприклад: Поранений собака біля будинку'
						/>
					</div>

					<div className='form-group full-width'>
						<label htmlFor='description'>Опис ситуації</label>
						<textarea
							id='description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Опишіть стан тварини, ситуацію та яка допомога потрібна'
							rows={4}
						/>
					</div>

					<p className='form-section-title'>Тварина та місце</p>

					<div className='form-grid'>
						<div className='form-group'>
							<label htmlFor='animalType'>Тип тварини *</label>
							<input
								id='animalType'
								type='text'
								value={animalType}
								onChange={e => setAnimalType(e.target.value)}
								placeholder='Собака, кіт, птах...'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='location'>Локація *</label>
							<input
								id='location'
								type='text'
								value={location}
								onChange={e => setLocation(e.target.value)}
								placeholder='Харків, район Салтівка'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='region'>Регіон</label>
							<input
								id='region'
								type='text'
								value={region}
								onChange={e => setRegion(e.target.value)}
								placeholder="Необов'язково"
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='address'>Адреса</label>
							<input
								id='address'
								type='text'
								value={address}
								onChange={e => setAddress(e.target.value)}
								placeholder="Необов'язково"
							/>
						</div>
					</div>

					<p className='form-section-title'>Стан та терміновість</p>

					<div className='form-grid'>
						<div className='form-group'>
							<label>Стан тварини</label>
							<select value={condition} onChange={e => setCondition(Number(e.target.value))}>
								{[1, 2, 3, 4, 5].map(n => (
									<option key={n} value={n}>{levelLabels[n]}</option>
								))}
							</select>
						</div>

						<div className='form-group'>
							<label>Рівень терміновості</label>
							<select value={urgencyLevel} onChange={e => setUrgencyLevel(Number(e.target.value))}>
								{[1, 2, 3, 4, 5].map(n => (
									<option key={n} value={n}>{levelLabels[n]}</option>
								))}
							</select>
						</div>
					</div>

					<p className='form-section-title'>Координати GPS (опційно)</p>

					<div className='form-grid'>
						<div className='form-group'>
							<label htmlFor='latitude'>Широта</label>
							<input
								id='latitude'
								type='number'
								step='any'
								value={latitude}
								onChange={e => setLatitude(e.target.value)}
								placeholder='50.4501'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='longitude'>Довгота</label>
							<input
								id='longitude'
								type='number'
								step='any'
								value={longitude}
								onChange={e => setLongitude(e.target.value)}
								placeholder='30.5234'
							/>
						</div>
					</div>

					<p className='form-section-title'>Фото тварини (опційно)</p>

					<div className='form-group'>
						<label htmlFor='photo'>Завантажити фото</label>
						<input
							id='photo'
							type='file'
							accept='image/*'
							onChange={handlePhotoChange}
						/>
					</div>

					{photoPreview && (
						<div className='photo-preview-wrapper'>
							<img
								src={photoPreview}
								alt='Попередній перегляд'
								className='photo-preview'
							/>
						</div>
					)}

					{error && <p className='form-error'>{error}</p>}

					<div className='form-actions'>
						<button
							type='button'
							className='secondary-button'
							onClick={() => navigate('/requests')}
						>
							Скасувати
						</button>
						<button type='submit' className='primary-button' disabled={loading}>
							{loading ? 'Створення...' : '📋 Створити заявку'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateRequestPage
