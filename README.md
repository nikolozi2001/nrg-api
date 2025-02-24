# NRG API

This project is a Node.js API that connects to a SQL Server database and provides CRUD operations.

## Prerequisites

- Node.js
- SQL Server

## Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd nrg-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure the database connection:
   Update the `db.js` file with your SQL Server credentials.

## Running the API

Start the server:
```sh
node app.js
```

The server will be running on `http://localhost:3000`.

## API Endpoints

### Get all records
```http
GET /api/records
```

### Get a single record by ID
```http
GET /api/records/:id
```

### Create a new record
```http
POST /api/records
```
- Request body:
  ```json
  {
    "name": "string",
    "value": "string"
  }
  ```

### Update a record by ID
```http
PUT /api/records/:id
```
- Request body:
  ```json
  {
    "name": "string",
    "value": "string"
  }
  ```

### Delete a record by ID
```http
DELETE /api/records/:id
```

## Project Structure

```
nrg-api/
├── controllers/
│   └── recordsController.js
├── routes/
│   └── records.js
├── db.js
├── app.js
└── README.md
```
