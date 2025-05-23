# Educase India API

A RESTful API for managing school information with location-based features.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm (Node Package Manager)
## IN env.sample there are my credential you can use by  just changing  its name to .env
## live swagger <a href="https://educase-zp18.onrender.com/api-docs/">live</a>
## for postman testing <a href="https://drive.google.com/file/d/1QElp9yJtAtWk63WV_GlPqWNsg9K6pca3/view?usp=sharing">json file</a>
## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd educase_india
```

2. Install dependencies:
```bash
npm install
```

3. Create a MySQL database and update the configuration in `config.js` with your database credentials.

4. Create the required table in your MySQL database:
```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(5,5) NOT NULL,
  longitude DECIMAL(5,5) NOT NULL,
  UNIQUE KEY unique_school (name, address, latitude, longitude)
);
```

5. Start the server:
```bash
node server.js
```

The server will start running on `http://localhost:3306`

## API Endpoints

### 1. Add a School
- **URL**: `/addSchool`
- **Method**: `POST`
- **Body**:
```json
{
    "name": "Delhi Public School",
    "address": "123 Main Street, New Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
}
```
- **Success Response**:
```json
{
    "message": "School added successfully",
    "id": 1
}
```

### 2. List Schools
- **URL**: `/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `lat`: User's latitude (required)
  - `lng`: User's longitude (required)
- **Example**: `/listSchools?lat=28.6139&lng=77.2090`
- **Success Response**:
```json
[
    {
        "id": 1,
        "name": "Delhi Public School",
        "address": "123 Main Street, New Delhi",
        "latitude": 28.6139,
        "longitude": 77.2090,
        "distance": 0.5
    }
]
```

## Testing with Postman

### 1. Add School Request
1. Open Postman
2. Create a new POST request to `http://localhost:3306/addSchool`
3. Set Headers:
   - Content-Type: application/json
4. Set Body (raw JSON):
```json
{
    "name": "Delhi Public School",
    "address": "123 Main Street, New Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
}
```

### 2. List Schools Request
1. Open Postman
2. Create a new GET request to `http://localhost:3306/listSchools?lat=28.6139&lng=77.2090`

## Sample Data for Testing

Here are some sample schools you can use for testing:

```json
{
    "name": "Delhi Public School",
    "address": "123 Main Street, New Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
}
```

```json
{
    "name": "Modern School",
    "address": "456 Park Road, New Delhi",
    "latitude": 28.6145,
    "longitude": 77.2085
}
```

```json
{
    "name": "Springdales School",
    "address": "789 Garden Avenue, New Delhi",
    "latitude": 28.6150,
    "longitude": 77.2095
}
```

## Error Responses

### Invalid Input
```json
{
    "error": "Invalid input"
}
```

### Invalid Coordinates
```json
{
    "error": "Invalid coordinates"
}
```

### Database Error
```json
{
    "error": "Database error",
    "message": "Error message details"
}
```

## Dependencies

- express: ^5.1.0
- mysql2: ^3.14.1
- cors: ^2.8.5
- dotenv: ^16.5.0

## License

ISC 
