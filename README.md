# JavaScript Handbook Backend

The robust backend service powering the JavaScript Handbook platform - an interactive guide for mastering JavaScript. Built with Node.js, Express, and TypeScript.

## Technologies Used

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens), Firebase
- **Validation**: Zod (Schema Validation)
- **Security**: bcrypt (Password Hashing)
- **Content**: Markdown files for library topics and blogs

## Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn
- Git

### Setup

```bash
git clone https://github.com/[your-username]/js-handbook-be.git
cd js-handbook-be
npm install
```

Create a `.env` file in the root directory:
```env
MONGO_URI="mongodb://localhost:27017/"
PORT=9000
JWT_SECRET="your-secret-key-here"
```

Start the server:
```bash
npm run dev
```

The server will start on `http://localhost:9000`

## Features

- **User Management**: User registration, profile management, and authentication
- **Library API**: Structured JavaScript learning content with 30+ topics covering core concepts
- **Code Snippets**: Practical code examples for common JavaScript patterns and functions
- **Progress Tracking**: User progress tracking and achievement system
- **Blogs**: Technical blog posts on advanced JavaScript topics
- **Questions**: Practice questions for JavaScript concepts
- **Health Check**: Server health monitoring endpoint

## Tech Stack

- **Core**: Node.js, TypeScript, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT Authentication, Firebase Integration, bcrypt for password hashing
- **Validation**: Zod Schema Validation
- **Content Management**: Markdown files for library topics and blogs

## Project Structure

```
src/
├── config/          # Configuration files (MongoDB connection)
├── controllers/     # Request handlers
│   ├── blogsController.ts
│   ├── libraryController.ts
│   ├── progressController.ts
│   ├── questionsController.ts
│   ├── snippetsController.ts
│   └── userController.ts
├── enums/           # TypeScript enums
├── files/           # Content files
│   ├── blogs/       # Markdown blog posts
│   ├── library/     # Markdown library topics (30+ topics)
│   └── snippets/    # JavaScript code snippets
├── middleware/      # Custom middleware (authentication, etc.)
├── models/          # Mongoose data models
│   ├── blogs.ts
│   ├── library.ts
│   ├── progress.ts
│   ├── questions.ts
│   ├── snippet.ts
│   └── users.ts
├── routes/          # API route definitions
│   ├── blogRoutes.ts
│   ├── libraryRoutes.ts
│   ├── progressRoutes.ts
│   ├── questionRoutes.ts
│   ├── snippetRoutes.ts
│   └── userRoutes.ts
├── services/        # Business logic layer
│   ├── blogsService.ts
│   ├── libraryService.ts
│   ├── progressService.ts
│   ├── questionService.ts
│   ├── snippetsService.ts
│   └── userService.ts
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── index.ts         # Application entry point
```

## API Documentation

### Base URL
```
http://localhost:9000/api
```

### Endpoints

#### Health Check
- `GET /health` - Server health check with uptime information

#### User Routes (`/api/user`)
- `POST /api/user/register` - Register a new user
- `GET /api/user/:uid` - Get user profile by UID
- `PUT /api/user` - Update user profile

#### Library Routes (`/api/library`)
- `GET /api/library` - Get all library topics
- `GET /api/library/:user_id` - Get library topics for a specific user
- `GET /api/library/topic/:topic_id` - Get specific topic content by ID

#### Snippet Routes (`/api/snippets`)
- `GET /api/snippets` - Get all code snippets
- `GET /api/snippets/:user_id` - Get snippets for a specific user
- `GET /api/snippets/snippet/:snippet_id` - Get specific snippet by ID

#### Progress Routes (`/api/progress`)
- `GET /api/progress/:user_id` - Get user progress
- `PUT /api/progress/update` - Update user progress
- `DELETE /api/progress/reset/:user_id` - Reset user progress

#### Blog Routes (`/api/blogs`)
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:blog_id` - Get specific blog post by ID

#### Question Routes (`/api/questions`)
- `GET /api/questions` - Get all practice questions

## Content Structure

### Library Topics
The library contains 30+ JavaScript topics covering:
- Core Concepts (Variables, Functions, Objects, Classes, etc.)
- Advanced Topics (Closures, Prototypes, Event Loop, etc.)
- Patterns & Techniques (Currying, Debounce, Throttle, etc.)
- Performance & Security
- And more...

### Code Snippets
Practical JavaScript code examples including:
- Array methods (map, filter, reduce, forEach)
- Function techniques (call, apply, bind, curry)
- Performance utilities (debounce, throttle)
- Promise patterns (Promise.all)

### Blogs
Technical blog posts on:
- ESNext Features
- Performance Hacks
- State Management
- TypeScript vs Vanilla JavaScript

## Available Scripts

- `npm run dev` - Clean build directory, compile TypeScript, and start development server
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (requires built files in dist/)
- `npm run prisma:studio` - Open Prisma Studio (if using Prisma)
- `npm run prisma:migrate` - Run Prisma migrations
- `npm test` - Run tests (currently placeholder)

## Environment Variables

Required environment variables:
- `MONGO_URI` - MongoDB connection string (default: `mongodb://localhost:27017/`)
- `PORT` - Server port (default: `9000`)
- `JWT_SECRET` - Secret key for JWT token signing

## Database

The application uses MongoDB with the following collections:
- `users` - User profiles and authentication data
- `library` - JavaScript learning topics
- `snippets` - Code snippet examples
- `progress` - User learning progress
- `blogs` - Blog posts
- `questions` - Practice questions

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a Pull Request

## Roadmap

- [ ] Advanced exercise validation
- [ ] Real-time code execution
- [ ] Performance analytics
- [ ] Community features integration
- [ ] API rate limiting
- [ ] Comprehensive test coverage
- [ ] API documentation with Swagger/OpenAPI

## Contact

Harsh Srivastva - [@dev_harsh_x](https://x.com/dev_harsh_x)

## Related Projects

- [JavaScript Handbook Frontend](https://github.com/harshsrivastva97/javascript-handbook)

## License

MIT License
