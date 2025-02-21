# JavaScript Handbook Backend

The robust backend service powering the JavaScript Handbook platform - an interactive guide for mastering JavaScript. Built with Node.js, Express, and TypeScript.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Prisma (Database ORM)
- PostgreSQL
- Firebase
- JWT Authentication
- Zod (Schema Validation)

## Quick Start

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn
- Git

### Setup

```bash
git clone https://github.com/[your-username]/js-handbook-be.git
cd js-handbook-be
npm install
```

Create a `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=9000
```

Initialize the database:
```bash
npx prisma generate
npx prisma migrate dev
```

Start the server:
```bash
npm run dev
```

Access the API at http://localhost:9000

## Features

- **User Management**: Authentication and profile management
- **Content API**: Structured JavaScript learning content
- **Progress Tracking**: User progress and achievements

## Tech Stack

- **Core**: Node.js, TypeScript, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Security**: JWT Authentication, Firebase
- **Validation**: Zod Schema Validation

## Project Structure

```
src/
├── controllers/    # Request handlers
├── middlewares/    # Custom middleware
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
└── server.ts       # Entry point
```

## API Documentation

### Base URL
```
http://localhost:9000/api
```

## Available Scripts

- `npm start` - Production build and start
- `npm run start` - Build tsc and start server

## Contributing

1. Clone the repo
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'feat: add some feature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a Pull Request

## Roadmap

- Advanced exercise validation
- Real-time code execution
- Performance analytics
- Community features integration

## Contact

Harsh Srivastva - [@dev_harsh_x](https://x.com/dev_harsh_x)

## Related Projects

- [JavaScript Handbook Frontend](https://github.com/harshsrivastva97/javascript-handbook)

## License

MIT License
