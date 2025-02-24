# NRG API

## Overview
This API provides endpoints to manage records, households, monthes, and resource data.

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

## Running the Server

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the server:
   ```sh
   npm start
   ```

The server will run on `http://localhost:3000`.

## Endpoints

### Records

- **GET /api/records**: Get all records.
- **GET /api/records/:id**: Get a record by its code.
- **POST /api/records**: Create a new record.
- **PUT /api/records/:id**: Update a record by its ID.
- **DELETE /api/records/:id**: Delete a record by its ID.

### Households

- **GET /api/households/:id**: Get household data by chart ID.

### Monthes

- **GET /api/monthes/:year/:chart_id**: Get month data by year and chart ID.

### Resource

- **GET /api/resource/:year/:chart_id**: Get resource data by year and chart ID.

## Example Requests

### Get All Records
```
GET /api/records
```

### Get Record by Code
```
GET /api/records/1
```

### Create a New Record
```
POST /api/records
Content-Type: application/json
{
  "name": "Sample Name",
  "value": "Sample Value"
}
```

### Update a Record
```
PUT /api/records/1
Content-Type: application/json
{
  "name": "Updated Name",
  "value": "Updated Value"
}
```

### Delete a Record
```
DELETE /api/records/1
```

### Get Household Data by Chart ID
```
GET /api/households/1
```

### Get Month Data by Year and Chart ID
```
GET /api/monthes/2018/1
```

### Get Resource Data by Year and Chart ID
```
GET /api/resource/2018/1
```

## Error Handling

If an error occurs, the API will return a JSON response with an error message and a status code of 500.

```json
{
  "error": "Error message"
}
```

## Project Structure

```
nrg-api/
├── controllers/
│   └── recordsController.js
│   └── householdsController.js
│   └── monthesController.js
│   └── resourceController.js
├── routes/
│   └── records.js
├── db.js
├── app.js
└── README.md
```
