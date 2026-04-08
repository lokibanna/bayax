# RESTful API Design

## Endpoints

### 1. Authentication
**POST `/api/v1/user/register`**
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "teacher_01",
    "email": "teacher@school.com",
    "password": "securepassword123"
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "message": "User registered successfully",
    "userId": "uuid-string"
  }
  ```

**POST `/api/v1/user/login`**
- **Description:** Authenticates user and returns JWT.
- **Request Body:**
  ```json
  {
    "email": "teacher@school.com",
    "password": "securepassword123"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "token": "jwt-token-string",
    "user": {
      "id": "uuid-string",
      "username": "teacher_01"
    }
  }
  ```

### 2. Lesson Plans
**POST `/api/v1/lesson/generate`**
- **Description:** Calls AI to generate a lesson plan based on input features.
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "subject": "Biology",
    "topic": "Photosynthesis",
    "grade": "10th",
    "duration": 45
  }
  ```
- **Response `200 OK`:** Base64 Encoded DOCX stream or JSON object.
  ```json
  {
    "success": true,
    "message": "Lesson generated",
    "data": {
      "docxBase64": "UEsDBBQABg...",
      "overview": "..."
    }
  }
  ```

### HTTP Status Codes Used
- `200 OK`: Successful retrieval or action.
- `201 Created`: Resource created successfully.
- `400 Bad Request`: Validation failure.
- `401 Unauthorized`: Missing or invalid authentication.
- `500 Internal Server Error`: Server/AI integration failures.
