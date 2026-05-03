export default function DonationPage() {
	const donate = async () => {
		await fetch('/api/donations', {
			method: 'POST',
			body: JSON.stringify({
				amount: 10,
			}),
		})
	}

	return (
		<div>
			<h1>Support Animals</h1>

			<button onClick={donate}>Donate 10€</button>
		</div>
	)
}
