## Nest-monorepo-grpc

- [Introduction](#introduction)
- [Features](#features)
- [Running](#running)
- [Schema](#schema)

## Introduction

This Nest.js monorepo is comprised of four microservices. Each microservice interacts with others using gRPC and ProtoBuf files.

- **Client Service:** Receives requests via a REST API.
- **Auth Service:** Handles user registration and authentication.
- **Posts Service:** Manages the creation, retrieval, and manipulation of posts.
- **DB Service:** Manages database operations.
  Through the use of gRPC and ProtoBuf files, these microservices communicate effectively with each other. While demonstrating this architectural approach, the repository ensures the reliability and correctness of the application's functionality.

## Features

- **Databases:** PostgreSQL are used, with the help of the TypeORM library for interacting with them.

- **Authentication:** The project includes an authentication mechanism using the Passport library to ensure user login security.

## Running

1. **Clone the repo**

```bash
github.com/andrey-lawyer/nest-microservices-grpc
```

2. **Install dependencies** It's recommended to use npm:

```bash
npm install
```

3. **Start the PostgreSQL database container using Docker Compose:**

```bash
docker-compose up -d
```

2. **Start each individual service in a separate terminal:**

- _Start the db service_

```bash
npm run start:dev db
```

- _Start the auth service_

```bash
npm run start:dev auth
```

- _Start the posts service_

```bash
npm run start:dev posts
```

- _Start the client service_

```bash
npm run start:dev client
```

## Schema

The database schema includes tables for User and Post. Relationships between these tables allow you to organise posts between different users.
