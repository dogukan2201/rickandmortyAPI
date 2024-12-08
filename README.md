# Rick and Morty API - Frontend Project

This project is a web application built using **Next.js** and **React**, where users can interact with the **Rick and Morty API** to filter, sort, and view a table of characters from the show. The application allows users to filter and sort data, paginate through results, and view detailed information about characters.
## Deployment

The application is live and can be accessed [here](https://rickandmorty-api-dogukan2201s-projects.vercel.app/).

## Features

- **Search and Filter**: Users can filter the character data based on name, species, or gender.
- **Sorting**: Users can sort the character data by name or other criteria.
- **Pagination**: The data is paginated to handle large datasets effectively, with a customizable page size.
- **Detailed View**: When a user clicks on a row in the table, detailed information about the selected character is displayed below the table.
- **Error Handling**: The application properly handles API errors and displays relevant messages when no data is found.

## Technologies Used

- **Next.js**: Framework used for building the application.
- **React**: For building the user interface and managing the state.
- **Context API**: Used for global state management.
- **Shadcn**: A UI component library used for styling.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **API**: [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data.
- **Vercel**: The application is deployed and live on Vercel.

## How to Run

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rick-and-morty-api-project.git
   ```
2. Install dependencies:
   ```bash
   cd rick-and-morty-api-project
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

