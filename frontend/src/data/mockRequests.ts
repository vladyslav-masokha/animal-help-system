import type { AnimalRequest } from '../types/request'

export const mockRequests: AnimalRequest[] = [
	{
		id: 1,
		title: 'Потрібен корм для собак',
		description:
			'У прифронтовому районі залишилось декілька покинутих собак. Потрібен сухий корм та вода.',
		region: 'Харківська область',
		helpType: 'Корм',
		status: 'Pending',
		createdAt: '2026-03-10',
		authorName: 'Vladyslav Masokha',
	},
	{
		id: 2,
		title: 'Евакуація котів із небезпечної зони',
		description:
			'Потрібна допомога з евакуацією 4 котів із зони бойових дій та тимчасова перетримка.',
		region: 'Донецька область',
		helpType: 'Перевезення',
		status: 'In Progress',
		createdAt: '2026-03-09',
		authorName: 'Daria Yakymenko',
	},
	{
		id: 3,
		title: 'Термінове лікування пораненої собаки',
		description:
			'Собака отримала поранення після обстрілу. Потрібен огляд ветеринара, ліки та транспортування.',
		region: 'Запорізька область',
		helpType: 'Лікування',
		status: 'Completed',
		createdAt: '2026-03-08',
		authorName: 'Volunteer Team',
	},
]
