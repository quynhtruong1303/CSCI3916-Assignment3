# CSC3916 Assignment 3 — Movie API

A Node.js REST API backed by MongoDB Atlas, secured with JWT authentication.

## Live API

[https://csci3916-hw3-jzho.onrender.com](https://csci3916-hw3-jzho.onrender.com)

## React Frontend

[https://csci3916-movie-app-project.onrender.com](https://csci3916-movie-app-project.onrender.com)

## Features

- User signup and signin with JWT authentication
- Full CRUD operations for movies (`/movies`, `/movies/:title`)
- All movie routes protected by JWT
- Validation: movies must include at least one actor
- Genre restricted to predefined enum values

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /signup | No | Register a new user |
| POST | /signin | No | Sign in and receive a JWT token |
| GET | /movies | Yes | Get all movies |
| POST | /movies | Yes | Create a new movie |
| GET | /movies/:title | Yes | Get a movie by title |
| PUT | /movies/:title | Yes | Update a movie by title |
| DELETE | /movies/:title | Yes | Delete a movie by title |

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
DB=<your MongoDB Atlas connection string>
SECRET_KEY=<your JWT secret>
PORT=8080
```

### Run Locally

```bash
npm start
```

## Deployment

Deployed as a Web Service on Render.

1. Push the repository to GitHub
2. Go to Render → **New** → **Web Service**
3. Connect the GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables: `DB`, `SECRET_KEY`, `PORT`
6. Click **Deploy**

## Postman Collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/51835208-a9db9f08-948c-430c-8afb-8ed424ab3b4b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D51835208-a9db9f08-948c-430c-8afb-8ed424ab3b4b%26entityType%3Dcollection%26workspaceId%3D38a655c2-4ed7-4018-a133-e59b71970420#?env%5Btruong-hw3%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiSldULi4uIiwiY29tcGxldGVTZXNzaW9uVmFsdWUiOiJKV1QgZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZNVlqYzJaV0UzTTJaak9EZGhaamc1TkdRNE9URTBZU0lzSW5WelpYSnVZVzFsSWpvaWRYTmxjbDlxYTJJM2Fqa2lMQ0pwWVhRaU9qRTNOek0yTWpreE1qTXNJbVY0Y0NJNk1UYzNNell6TWpjeU0zMC4tNWhuU3BsN1AwNnBvWFdXSldSWDNRSGNWYl9LUEVzcjFmeHFuVmFGUXM0Iiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6InJhbmRvbVVzZXJuYW1lIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoidXNlcl9qa2I3ajkiLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6InVzZXJfamtiN2o5Iiwic2Vzc2lvbkluZGV4IjoxfSx7ImtleSI6InJhbmRvbVBhc3N3b3JkIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoicGFzc19ka2V0azQiLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6InBhc3NfZGtldGs0Iiwic2Vzc2lvbkluZGV4IjoyfV0=)