# 🐾 Animal Help System

> Вебзастосунок для координації допомоги тваринам у зонах бойових дій, евакуації з небезпечних територій та організації роботи волонтерів.

![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Web%20API-512BD4?style=for-the-badge&logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-Client-3178C6?style=for-the-badge&logo=typescript)
![Docker](https://img.shields.io/badge/Docker-PostgreSQL-2496ED?style=for-the-badge&logo=docker)

## 📌 Про проєкт

**Animal Help System** — це інформаційна система для створення, перегляду та обробки заявок на допомогу тваринам, які постраждали внаслідок бойових дій або залишилися в небезпечних регіонах без догляду.

Система орієнтована на користувачів, волонтерів та адміністраторів. Користувачі можуть створювати заявки, вказувати опис ситуації, адресу, координати, тип тварини та рівень терміновості. Волонтери й адміністратори можуть переглядати заявки, брати їх у роботу та змінювати статус виконання.

## 🎯 Мета системи

Метою проєкту є створення зручної платформи для швидкої координації допомоги тваринам у прифронтових і небезпечних регіонах.

Система допомагає:

- швидко фіксувати заявки про тварин, які потребують допомоги;
- зберігати дані про місце знаходження тварини;
- координувати роботу волонтерів;
- відстежувати статус кожної заявки;
- централізовано керувати інформацією через API та базу даних.

## ✨ Основний функціонал

### 👤 Користувач

- реєстрація та авторизація;
- створення заявки на допомогу тварині;
- додавання опису, адреси, координат і фото;
- перегляд актуальних заявок;
- відстеження статусу заявки.

### 🦺 Волонтер

- перегляд заявок;
- взяття заявки в роботу;
- оновлення статусу виконання;
- робота із заявками за регіонами та рівнем терміновості.

### 🛠️ Адміністратор

- керування всіма заявками;
- зміна статусів;
- видалення неактуальних заявок;
- перегляд користувачів;
- контроль даних у системі.

## 🧱 Технологічний стек

### Backend

| Технологія | Призначення |
|---|---|
| ASP.NET Core Web API | Серверна частина та REST API |
| Entity Framework Core | Робота з базою даних |
| PostgreSQL | Основна база даних |
| Npgsql | Провайдер PostgreSQL для .NET |
| JWT Bearer | Авторизація та захист API |
| Swagger / OpenAPI | Документація та тестування API |

### Frontend

| Технологія | Призначення |
|---|---|
| React | Клієнтський інтерфейс |
| TypeScript | Типізація frontend-коду |
| Vite | Швидке середовище розробки |
| CSS | Стилізація інтерфейсу |

### DevOps / Tools

| Інструмент | Призначення |
|---|---|
| Docker | Запуск PostgreSQL у контейнері |
| pgAdmin | Перегляд і редагування бази даних |
| Git | Контроль версій |

## 🗂️ Структура проєкту

```text
animal-help-system/
├── backend/
│   └── AnimalHelp.API/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Models/
│       ├── Migrations/
│       ├── Program.cs
│       ├── appsettings.json
│       └── AnimalHelp.API.csproj
│
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    ├── vite.config.ts
    └── .env
```

## 🧩 Основні сутності

### User

Користувач системи.

Основні поля:

- `Id`
- `FullName`
- `Email`
- `PasswordHash`
- `Phone`
- `Role`
- `Region`
- `CreatedAt`

### AnimalRequest

Заявка на допомогу тварині.

Основні поля:

- `Id`
- `Title`
- `Description`
- `AnimalType`
- `Condition`
- `Status`
- `UrgencyLevel`
- `Latitude`
- `Longitude`
- `Address`
- `PhotoUrl`
- `CreatedAt`
- `UpdatedAt`
- `CreatedByUserId`

### Shelter

Притулок або організація, яка може приймати тварин.

Основні поля:

- `Id`
- `Name`
- `Address`
- `Phone`
- `Capacity`

## 🔐 Ролі користувачів

| Значення | Роль | Опис |
|---|---|---|
| `0` | User | Звичайний користувач |
| `1` | Volunteer | Волонтер |
| `2` | Admin | Адміністратор |

## 📍 Дані заявки

Заявка може містити:

- назву проблеми;
- детальний опис ситуації;
- тип тварини;
- стан тварини;
- рівень терміновості;
- адресу;
- координати `latitude` та `longitude`;
- фото;
- статус виконання.

Приклад заявки:

```json
{
  "title": "Евакуація собаки з прифронтової зони",
  "description": "Після обстрілу залишився поранений собака. Потрібна евакуація з небезпечної території та ветеринарна допомога.",
  "animalType": 0,
  "condition": 3,
  "urgencyLevel": 4,
  "address": "Покровський район, Донецька область",
  "latitude": 48.2820,
  "longitude": 37.1750,
  "photoUrl": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"
}
```

## 🚀 Швидкий запуск

### 1. Клонування проєкту

```bash
git clone https://github.com/vladyslav-masokha/animal-help-system.git
cd animal-help-system
```

### 2. Запуск PostgreSQL через Docker

```bash
docker run --name animal-help-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=AnimalHelpDb \
  -p 5433:5432 \
  -d postgres:16
```

Перевірити контейнер:

```bash
docker ps
```

Якщо контейнер уже створений, але зупинений:

```bash
docker start animal-help-postgres
```

### 3. Налаштування backend

Файл:

```text
backend/AnimalHelp.API/appsettings.json
```

Приклад конфігурації:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5433;Database=AnimalHelpDb;Username=postgres;Password=admin"
  },
  "Jwt": {
    "Key": "super_secret_key_for_animal_help_system_2026",
    "Issuer": "AnimalHelp.API",
    "Audience": "AnimalHelp.Client",
    "ExpiresInMinutes": 120
  },
  "AllowedHosts": "*"
}
```

### 4. Запуск backend

```bash
cd backend/AnimalHelp.API
dotnet restore
dotnet run
```

Після запуску API буде доступне за адресою:

```text
http://localhost:5262
```

Swagger:

```text
http://localhost:5262/swagger
```

### 5. Налаштування frontend

У frontend-папці створити або перевірити файл `.env`:

```env
VITE_API_BASE_URL=http://localhost:5262/api
```

### 6. Запуск frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend буде доступний за адресою:

```text
http://localhost:5173
```

## 🔑 Тестові акаунти

| Роль | Email | Пароль |
|---|---|---|
| Admin | admin@animalhelp.com | Admin123! |
| Volunteer | volunteer@animalhelp.com | Volunteer123! |

## 📡 Основні API endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Animal Requests

```http
GET    /api/animalrequests
GET    /api/animalrequests/{id}
POST   /api/animalrequests
PUT    /api/animalrequests/{id}
DELETE /api/animalrequests/{id}
```

### Users

```http
GET /api/users
```

### Shelters

```http
GET    /api/shelters
POST   /api/shelters
PUT    /api/shelters/{id}
DELETE /api/shelters/{id}
```

## 🧪 Приклад тестування API

### Реєстрація

```bash
curl -X POST http://localhost:5262/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "User123!",
    "phone": "+380000000000",
    "role": 0,
    "region": "Донецька область"
  }'
```

### Авторизація

```bash
curl -X POST http://localhost:5262/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@animalhelp.com",
    "password": "Admin123!"
  }'
```

## 🗄️ Підключення через pgAdmin

Для перегляду бази даних у pgAdmin потрібно створити новий сервер:

```text
Name: Animal Help Postgres
Host: localhost
Port: 5433
Maintenance database: postgres
Username: postgres
Password: admin
```

Після підключення база буде доступна як:

```text
AnimalHelpDb
```

Основні таблиці:

```text
Users
AnimalRequests
Shelters
RequestStatusHistories
```

## 🛟 Типові проблеми та рішення

### `password authentication failed for user "postgres"`

Перевірити пароль у `appsettings.json`:

```text
Username=postgres;Password=admin
```

Якщо пароль у PostgreSQL інший — змінити його або оновити connection string.

### `connection timeout expired`

PostgreSQL не запущений або вказаний неправильний порт.

Перевірити контейнер:

```bash
docker ps
```

Запустити контейнер:

```bash
docker start animal-help-postgres
```

### Frontend не виконує авторизацію

Перевірити:

- чи запущений backend;
- чи запущений PostgreSQL;
- чи правильно вказаний `VITE_API_BASE_URL`;
- чи backend доступний за адресою `http://localhost:5262`;
- чи правильні email і пароль.

### Заявки показують неправильний регіон

Регіон може братися з користувача, який створив заявку. Потрібно перевірити `CreatedByUserId` у таблиці `AnimalRequests` та поле `Region` у таблиці `Users`.

## 📊 Статуси заявок

| Статус | Опис |
|---|---|
| Нова | Заявку створено |
| У роботі | Волонтер взяв заявку |
| Завершена | Допомогу надано |
| Видалена / скасована | Заявка більше неактуальна |

## 🧭 Подальший розвиток

У майбутньому систему можна розширити такими можливостями:

- інтерактивна мапа заявок;
- фільтрація за областю, типом тварини та терміновістю;
- повідомлення для волонтерів;
- завантаження фото напряму на сервер;
- історія зміни статусів;
- кабінет волонтера;
- інтеграція з притулками;
- мобільна версія або PWA.

## 👥 Автори

Проєкт розробили:

- **Vladyslav Masokha**
- **Daria Yakymenko**

## 📄 Ліцензія

Проєкт створено в навчальних цілях.

## ✅ Висновок

**Animal Help System** демонструє реалізацію повноцінного вебзастосунку з клієнтською та серверною частинами, базою даних, авторизацією, ролями користувачів і системою заявок. Проєкт може бути використаний як основа для подальшого розвитку платформи координації допомоги тваринам у небезпечних регіонах.
