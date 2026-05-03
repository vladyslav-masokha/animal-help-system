import { useState } from 'react'
import { getUser } from '../utils/auth'

const roleLabels: Record<string, string> = {
	Admin: 'Адміністратор',
	Volunteer: 'Волонтер',
	Shelter: 'Притулок',
	User: 'Користувач',
}

const roleColors: Record<string, string> = {
	Admin: 'rgba(239,68,68,0.12)',
	Volunteer: 'rgba(34,197,94,0.12)',
	Shelter: 'rgba(251,191,36,0.12)',
	User: 'rgba(79,134,247,0.12)',
}

const roleBorders: Record<string, string> = {
	Admin: 'rgba(239,68,68,0.28)',
	Volunteer: 'rgba(34,197,94,0.28)',
	Shelter: 'rgba(251,191,36,0.28)',
	User: 'rgba(79,134,247,0.28)',
}

const roleTextColors: Record<string, string> = {
	Admin: '#fca5a5',
	Volunteer: '#86efac',
	Shelter: '#fcd34d',
	User: '#93c5fd',
}

const ProfilePage = () => {
	const user = getUser()
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

	const initials = user?.fullName
		? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
		: '?'

	const role = user?.role ?? 'User'
	const roleLabel = roleLabels[role] ?? role

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setAvatarUrl(URL.createObjectURL(file))
		}
	}

	return (
		<div style={{
			minHeight: '100vh',
			padding: '48px 20px',
			background: 'radial-gradient(ellipse at top, rgba(79,134,247,0.08) 0%, transparent 50%), linear-gradient(180deg, #060d1f 0%, #08122a 100%)',
		}}>
			<div style={{ maxWidth: 800, margin: '0 auto' }}>

				{/* Profile header card */}
				<div style={{
					borderRadius: 28,
					background: 'rgba(8,16,42,0.9)',
					border: '1px solid rgba(79,134,247,0.12)',
					boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
					padding: '40px',
					marginBottom: 20,
					display: 'flex',
					alignItems: 'center',
					gap: 32,
					flexWrap: 'wrap',
				}}>
					{/* Avatar */}
					<div style={{ position: 'relative', flexShrink: 0 }}>
						<div style={{
							width: 100,
							height: 100,
							borderRadius: '50%',
							background: avatarUrl ? 'transparent' : 'linear-gradient(135deg, #4f86f7, #7c4dff)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 36,
							fontWeight: 800,
							color: '#fff',
							overflow: 'hidden',
							border: '3px solid rgba(79,134,247,0.3)',
							boxShadow: '0 0 0 6px rgba(79,134,247,0.08)',
						}}>
							{avatarUrl
								? <img src={avatarUrl} alt='avatar' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
								: initials
							}
						</div>
						{/* Change avatar button */}
						<label style={{
							position: 'absolute',
							bottom: 2,
							right: 2,
							width: 28,
							height: 28,
							borderRadius: '50%',
							background: 'linear-gradient(135deg, #4f86f7, #7c4dff)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
							fontSize: 14,
							border: '2px solid #060d1f',
							title: 'Змінити фото',
						}}>
							✏️
							<input
								type='file'
								accept='image/*'
								onChange={handleAvatarChange}
								style={{ display: 'none' }}
							/>
						</label>
					</div>

					{/* Name & role */}
					<div style={{ flex: 1 }}>
						<div style={{ marginBottom: 8 }}>
							<span style={{
								display: 'inline-block',
								padding: '4px 12px',
								borderRadius: 999,
								background: roleColors[role] ?? roleColors.User,
								border: `1px solid ${roleBorders[role] ?? roleBorders.User}`,
								color: roleTextColors[role] ?? roleTextColors.User,
								fontSize: 12,
								fontWeight: 700,
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
								marginBottom: 10,
							}}>
								{roleLabel}
							</span>
						</div>
						<h1 style={{
							margin: '0 0 6px',
							fontFamily: "'Unbounded', sans-serif",
							fontSize: 28,
							fontWeight: 800,
							letterSpacing: '-0.03em',
						}}>
							{user?.fullName ?? 'Невідомо'}
						</h1>
						<p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>
							{user?.email ?? ''}
						</p>
					</div>

					{/* Quick stats */}
					<div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
						{[
							{ label: 'Заявки', value: '—', icon: '📋' },
							{ label: 'Виконано', value: '—', icon: '✅' },
						].map(stat => (
							<div key={stat.label} style={{
								padding: '16px 20px',
								borderRadius: 16,
								background: 'rgba(255,255,255,0.03)',
								border: '1px solid rgba(255,255,255,0.07)',
								textAlign: 'center',
								minWidth: 80,
							}}>
								<div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
								<div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
								<div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{stat.label}</div>
							</div>
						))}
					</div>
				</div>

				{/* Info grid */}
				<div style={{
					borderRadius: 24,
					background: 'rgba(8,16,42,0.88)',
					border: '1px solid rgba(255,255,255,0.07)',
					padding: '28px',
				}}>
					<p style={{
						margin: '0 0 20px',
						fontFamily: "'Unbounded', sans-serif",
						fontSize: 11,
						fontWeight: 700,
						letterSpacing: '0.08em',
						textTransform: 'uppercase',
						color: 'rgba(79,134,247,0.85)',
						paddingBottom: 10,
						borderBottom: '1px solid rgba(79,134,247,0.1)',
					}}>
						Інформація акаунту
					</p>

					<div style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: 14,
					}}>
						{[
							{ label: "Повне ім'я", value: user?.fullName ?? 'Невідомо', icon: '👤' },
							{ label: 'Email адреса', value: user?.email ?? 'Невідомо', icon: '📧' },
							{ label: 'Роль у системі', value: roleLabel, icon: '🎯' },
							{ label: 'ID користувача', value: `#${user?.id ?? '—'}`, icon: '🔑' },
						].map(item => (
							<div key={item.label} style={{
								padding: '16px 18px',
								borderRadius: 14,
								background: 'rgba(255,255,255,0.025)',
								border: '1px solid rgba(255,255,255,0.06)',
								display: 'flex',
								flexDirection: 'column',
								gap: 5,
							}}>
								<span style={{
									color: 'rgba(168,200,255,0.6)',
									fontSize: 11,
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.06em',
									display: 'flex',
									alignItems: 'center',
									gap: 5,
								}}>
									{item.icon} {item.label}
								</span>
								<span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>
									{item.value}
								</span>
							</div>
						))}
					</div>
				</div>

			</div>
		</div>
	)
}

export default ProfilePage
