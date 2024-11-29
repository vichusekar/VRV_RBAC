# Role-Based Access Control (RBAC) System

This project implements a Role-Based Access Control (RBAC) system using **Node.js**. It provides user authentication and authorization with roles such as `admin`, `mooderator`, and `user`. The system ensures that only authorized users can access specific resources.

## Features

- User authentication with **JWT (JSON Web Token)**.
- Password hashing with **bcryptjs**.
- Role-based access control for fine-grained authorization.
- Integration with **MongoDB** for user data persistence.
- Email notifications using **nodemailer**.
- Secure environment variable handling with **dotenv**.
- Cross-Origin Resource Sharing (CORS) support.
- Live server reloading during development with **nodemon**.

# How It Works
 - User Registration: New users register with their email and password. Passwords are hashed using bcryptjs before being  - saved to the database.
 - Authentication: Users login with their credentials to receive a JWT, which is used for subsequent requests.
 - Role-Based Authorization: Middleware checks the user's role to determine access to protected routes.
 - Email Notifications: The system sends email notifications (e.g., password reset links) using nodemailer.