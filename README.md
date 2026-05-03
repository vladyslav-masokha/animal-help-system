# Animal Help System

**Animal Help System** — це вебзастосунок для обробки заявок на допомогу тваринам у зонах бойових дій. Система дозволяє створювати заявки про евакуацію або порятунок тварин, переглядати їхній статус, працювати з ролями користувачів та координувати допомогу між користувачами, волонтерами й адміністраторами.

## Основна ідея проєкту

Проєкт призначений для організації допомоги тваринам, які залишилися без догляду, постраждали після обстрілів або потребують евакуації з небезпечних територій. Користувач може створити заявку, вказати опис проблеми, тип тварини, рівень терміновості, адресу та координати. Волонтери й адміністратори можуть переглядати заявки та змінювати їхній статус.

## Функціональні можливості

- реєстрація та авторизація користувачів;
- JWT-аутентифікація;
- розподіл ролей: користувач, волонтер, адміністратор;
- створення заявок на допомогу тваринам;
- перегляд списку заявок;
- редагування статусу заявки;
- видалення заявок;
- збереження адреси, регіону, координат і фото;
- відображення заявок з урахуванням їхнього статусу;
- API-документація через Swagger.

## Технологічний стек

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Npgsql
- JWT Bearer Authentication
- Swagger / OpenAPI

### Frontend

- React
- TypeScript
- Vite
- CSS / адаптивний інтерфейс

### База даних

- PostgreSQL
- Docker для локального запуску бази даних

## Структура проєкту

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
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.ts
```

## Вимоги для запуску

Перед запуском потрібно встановити:

- .NET SDK 9 або новішу версію;
- Node.js;
- npm;
- Docker Desktop;
- PostgreSQL-клієнт або pgAdmin, якщо потрібно переглядати базу вручну.

## Налаштування бази даних

Для локального запуску використовується PostgreSQL у Docker.

Команда для створення контейнера:

```bash
docker run --name animal-help-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=AnimalHelpDb \
  -p 5433:5432 \
  -d postgres:16
```

Перевірити, чи контейнер запущено:

```bash
docker ps
```

Очікуваний результат:

```text
animal-help-postgres   postgres:16   0.0.0.0:5433->5432/tcp
```

Якщо контейнер уже створений, але зупинений, його можна запустити командою:

```bash
docker start animal-help-postgres
```

## Налаштування backend

У файлі:

```text
backend/AnimalHelp.API/appsettings.json
```

потрібно вказати рядок підключення до PostgreSQL:

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

## Запуск backend

Перейти в папку backend-проєкту:

```bash
cd backend/AnimalHelp.API
```

Відновити залежності:

```bash
dotnet restore
```

Запустити backend:

```bash
dotnet run
```

Після запуску API буде доступне за адресою:

```text
http://localhost:5262
```

Swagger-документація:

```text
http://localhost:5262/swagger
```

Під час запуску backend автоматично застосовує міграції до бази даних через Entity Framework Core.

## Запуск frontend

Перейти в папку frontend:

```bash
cd frontend
```

Встановити залежності:

```bash
npm install
```

Запустити frontend:

```bash
npm run dev
```

Після запуску сайт буде доступний за адресою:

```text
http://localhost:5173
```

Якщо frontend використовує файл `.env`, потрібно вказати адресу API:

```env
VITE_API_BASE_URL=http://localhost:5262/api
```

## Тестові користувачі

У системі можуть бути створені тестові користувачі:

| Роль | Email | Пароль |
|---|---|---|
| Admin | admin@animalhelp.com | Admin123! |
| Volunteer | volunteer@animalhelp.com | Volunteer123! |
| User | user@animalhelp.com | User123! |

## Основні API endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
```

### Animal Requests

```text
GET    /api/animalrequests
GET    /api/animalrequests/{id}
POST   /api/animalrequests
PUT    /api/animalrequests/{id}
DELETE /api/animalrequests/{id}
```

### Users

```text
GET /api/users
```

### Shelters

```text
GET    /api/shelters
POST   /api/shelters
PUT    /api/shelters/{id}
DELETE /api/shelters/{id}
```

## Приклад створення заявки

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

## Статуси заявок

У системі заявки можуть мати різні статуси:

- Нова;
- У роботі;
- Завершена;
- Скасована або видалена.

Статус заявки може змінювати адміністратор або волонтер залежно від логіки доступу.

## Ролі користувачів

| Значення | Роль |
|---|---|
| 0 | User |
| 1 | Volunteer |
| 2 | Admin |

## Робота з pgAdmin

Для підключення до бази через pgAdmin потрібно створити новий сервер із такими параметрами:

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

## Можливі проблеми

### Помилка `password authentication failed for user "postgres"`

Причина: неправильний пароль у `appsettings.json` або PostgreSQL запущений з іншими параметрами.

Рішення: перевірити рядок підключення:

```text
Host=localhost;Port=5433;Database=AnimalHelpDb;Username=postgres;Password=admin
```

### Помилка `connection timeout expired`

Причина: PostgreSQL-контейнер не запущений або вказаний неправильний порт.

Рішення:

```bash
docker ps
docker start animal-help-postgres
```

### Frontend не авторизує користувача

Причини можуть бути такі:

- backend не запущений;
- PostgreSQL не запущений;
- неправильний `VITE_API_BASE_URL`;
- неправильний email або пароль;
- frontend звертається не на той порт API.

## Автор проєкту

Проєкт розроблено в межах навчальної роботи.

**Автор:** Vladyslav Masokha

## Висновок

Animal Help System демонструє роботу повноцінного вебзастосунку з клієнтською та серверною частинами, базою даних, JWT-аутентифікацією, ролями користувачів і системою заявок. Проєкт може бути використаний як основа для подальшого розвитку сервісу координації допомоги тваринам у небезпечних регіонах.
