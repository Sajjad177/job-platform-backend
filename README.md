# HireMe – Job Posting Platform (Backend)

A robust backend API built with **Express.js** and **MongoDB** for a job posting platform where companies can post jobs and job seekers can apply by uploading resumes and making payments. The system uses secure JWT authentication and implements role-based access control for Admins, Employees (Recruiters), and Job Seekers.

---

## Features

- **Role-Based Authentication & Authorization**  
  Secure JWT authentication with permission checks for Admins, Employees, and Job Seekers.

- **Job & User Management**  
  Admins can manage users and jobs; Employees can post and manage their company’s jobs and applicants.

- **Resume Upload**  
  Job Seekers can upload CVs (PDF/DOCX) with file size and type validation using Multer.

- **Payment Integration**  
  Mock payment system requiring 100 Taka payment to apply for jobs, with invoice storage.

- **Application Management**  
  Employees can accept or reject applicants; Job Seekers can view their application history.

---

## Tech Stack

- Node.js, Express.js  
- MongoDB with Mongoose  
- JWT for authentication  
- Multer for file uploads  
- Mock payment system (Stripe/SSLcommerz)  
- Zod for input validation (optional)  
- dotenv for environment variable management

---

## Folder Structure
```bash
📦 JOB-TASK
├── 📁 src
│   ├── 📁 config           # App configuration files (e.g., multer, env)
│   ├── 📁 DB               # create admin when database running
│   ├── 📁 errors           # Custom error classes and handlers
│   ├── 📁 interface        # Global TypeScript interfaces
│   ├── 📁 middleware       # Express middlewares (auth, error handling, etc.)
│   ├── 📁 modules          # Main application modules
│   │   ├── 📁 application  # application-related controllers, models, routes, service, validation.
│   │   ├── 📁 auth         # auth-related controllers, models, routes, service, validation.
│   │   ├── 📁 company      # company, job, payment, user both follow same folder Structure
│   │   ├── 📁 job
│   │   ├── 📁 payment
│   │   └── 📁 user
│   ├── 📁 router            # Main router configuration
│   ├── 📁 utils             # Utility functions (async handler, response, token)
│   ├── app.ts                # Express app setup
│   └── server.ts             # Server entry point
├── 📁 uploads                # File upload directory
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
└── eslint.config.mjs         # ESLint configuration
└── package-lock.json
└── package.json
└── tsconfig.json              # typeScript configuration

```

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
     ```bash
     git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
     cd hireme-backend
     ```
2. **Install Dependencies:**
     ```bash
     npm install
     ```

🧾 Environment Variables (.env)
```bash
  # Server configuration
  PORT=add your port                  # Server running port
  MONGODB_URL=add your mongodb url    # MongoDB connection URI

  BCRYPT_SALT_ROUNDS=add salt password    # Number of bcrypt salt rounds for password hashing
  NODE_ENV=production                     # Environment type (development | production)

  JWT_ACCESS_TOKEN_SECRET=your_secret_key  # JWT secret for access token   
  JWT_ACCESS_EXPIRES_IN=7d                 # Access token expiration (e.g. 1d, 2h)

  ADMIN_EMAIL=add your admin email         # Default admin email (auto-created on first run)
  ADMIN_PASSWORD=add your admin password   # Default admin password
```

   - Now run the project :
     ```bash
     npm run start:dev
     ```
## 👥 User Roles & Permissions
| Role       | Permissions                                                    |
| ---------- | -------------------------------------------------------------- |
| Admin      | Manage all users, jobs, applications, filter by company/status |
| Employee   | Post/edit/delete jobs, view applicants, accept/reject them     |
| Job Seeker | View jobs, apply with CV & payment, view application history   |

## 📬 API Endpoints

### 🔐 Auth Routes
| Method | Endpoint     | Description          |
|--------|--------------|----------------------|
| POST   | /auth/login  | Login and get JWT token |

### 👤 User Routes
| Method | Endpoint                       | Description          |
|--------|--------------------------------|----------------------|
| POST   | /user/register                 | Register user        |
| POST   | /user/create-employee          | Create employee      |
| GET    | /user                          | Get all users        |
| GET    | /user/:userId                  | Get single user      |
| PATCH  | /user/:userId                  | Update user role     |
| PATCH  | /usersoft-delete/:userId       | Soft delete user     |

### 🏢 Company Routes
| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | /company/create    | Create new company   |
| GET    | /company           | Get all companies    |

### 💼 Job Routes
| Method | Endpoint                     | Description           |
|--------|------------------------------|-----------------------|
| POST   | /job/create-job              | Create new job        |
| GET    | /job                         | Get all jobs          |
| GET    | /job/my-posted-jobs         | Get own posted jobs   |
| PUT    | /job/:jobId                  | Update job            |
| PATCH  | /job/deleted/:jobId          | Soft delete job       |

### 📄 Applications Routes
| Method | Endpoint                             | Description                |
|--------|--------------------------------------|----------------------------|
| POST   | /application/apply                   | Apply to a job             |
| GET    | /application                         | Get all applications       |
| GET    | /application/my-applications         | Get own applications       |
| PUT    | /applicationId/:applicationId        | Update application status  |

### 💳 Payment Routes
| Method | Endpoint        | Description              |
|--------|------------------|--------------------------|
| POST   | /payment/pay     | Pay for job application  |



> 📌 **Payment Flow (Mock)**  
> Fake payment system implemented.  
> 🔗 Follow full flow in Postman documentation: [View Postman Docs](https://documenter.getpostman.com/view/36958927/2sB2qXjNMA)  
>  
> ✅ Example Payload:
> ```json
> {
>   "invoiceId": "INV-123456",
>   "userId": "user_id",
>   "amount": 100,
>   "status": "paid",
>   "time": "2025-05-17T09:30:00Z"
> }
> ```







