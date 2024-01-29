<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Blog API

Welcome to the documentation for the NestJS Blog API! This API provides endpoints to manage users, posts, search and filtering functionalities, as well as administrative tasks on our blogging platform.

## Endpoints

### Users

- **`POST /users`**: Register new users. Each user must have a username, password, and a boolean isAdmin field.
- **`POST /users/login`**: User login.
- **`GET /users`**: List all users.
- **`GET /users/{id}`**: Get details of a specific user.
- **`PUT /users/{id}`**: Update a specific user (only their own profile or if they are an administrator).
- **`DELETE /users/{id}`**: Delete a user (only administrators).

### Posts

- **`POST /posts`**: Create a new post (only registered users). Posts will have an id, title, author, content, and an array of categories.
- **`GET /posts`**: List all posts. Supports parameters for pagination (default results per page if no param is provided is 10).
- **`GET /posts/{id}`**: View details of a specific post.
- **`PUT /posts/{id}`**: Update a post (only the author or administrators).
- **`DELETE /posts/{id}`**: Delete a post (only the author or administrators).
- **`GET /posts/user/{userId}`**: View all posts of a specific user.

### Search and Filtering

- **`GET /posts/search`**: Search posts by title, content, etc. Supports parameters for pagination (default results per page if no param is provided is 10).
- **`GET /posts/filter`**: Additional endpoints to filter posts by category or author.

### Administration

- **`GET /admin/users`**: Get all users (only administrators).
- **`DELETE /admin/users/{id}`**: Delete users (only administrators).
- **`GET /admin/posts`**: Get all posts with moderation options (delete or edit) (only administrators).

## Authentication

This API utilizes token-based authentication. To access protected endpoints, provide a valid access token in the authorization header of the request.

## Response Formats

The API uses consistent response formats to provide clear and coherent data structures across all responses. Refer to the detailed documentation of each endpoint for information on specific response formats.

## Get Started

Feel free to explore and interact with our blogging platform using the provided endpoints. Happy blogging!

## Developed by

This project was developed by [Alberto Bautista](https://www.linkedin.com/in/albertobautistac/).
