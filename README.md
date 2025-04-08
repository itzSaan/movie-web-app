# Movie Web Application

A web application built with React TMDB Movie API and Appwrite that allows users to search for movies and TV shows from a vast database, featuring a trending section and more.

## Features

- Search for movies and TV shows by title, genre, or other criteria
- Browse trending movies and shows
- View detailed information about each movie or show

## Tech Stack

- **Frontend**: React
- **Backend**: Appwrite & TMDB Movie API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/movie-app-dev/movie-web-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-web-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up Appwrite:

   - Create an account on [Appwrite](https://appwrite.io/) and create a new project.
   - Note down the Project ID and generate an API Key.

5. Create a `.env` file in the project root with the following content:

   ```env
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   ```

   Replace `your_project_id` and `your_api_key` with your actual Appwrite project ID and API key.

6. Start the development server:

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Use the search bar to find movies and TV shows.
- Browse the trending section to see popular content.
- Click on a movie or show to view detailed information.

## Screenshots

- [Desktop View](./screenshots/Macbook-Air.png)
- [Tablet View](./screenshots/Galaxy-Tab-S7.png)
- [Mobile View](./screenshots/iPhone-14-Plus.png)


## Live Preview

- [Live Preview](https://movie-web-app.vercel.app)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please open an issue on the [GitHub repository](https://github.com/movie-app-dev/movie-web-app).