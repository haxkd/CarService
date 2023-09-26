# Car Rental Application

## Overview

The Car Rental Application is a comprehensive system designed to facilitate the rental of cars by both regular users and administrators. It provides an intuitive user interface built with react and a robust backend powered by .Net Core, ensuring a smooth and secure car rental experience. The application uses a MSSQL Server database with Entity Framework for efficient data management.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Regular User Flow

- **User Authentication:** Users can securely log in with their credentials.
- **Car Search:** Users can search for available cars based on various criteria, including the car's make, model, and rental price.
- **Car Selection:** Users can browse a list of cars that match their search criteria and select a car for rental.
- **Rental Agreement:** The system generates a rental agreement with detailed information about the selected car, rental duration, total cost, and user details.
- **Rental History:** Users can view all their rental agreements in the "My Rental Agreements" section.
- **Edit Agreements:** Users have the option to edit rental agreement details before accepting them.
- **Return Request:** If users want to return a rented car, they can mark it as a "request for return."

### Admin User Flow

- **Admin Dashboard:** Admin users can access a dashboard with an overview of rental agreements.
- **Manage Agreements:** Admins have the authority to update or delete any rental agreement.
- **Inspection:** Admins can validate cars marked as "request for return" by conducting inspections.
- **Car Return:** After inspection, admin users can mark cars as "returned."

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Visual Studio 2022:** Install Visual Studio 2022 for .Net Core development.
- **Visual Studio Code:** Use Visual Studio Code for react development.
- **SQL Server Management Studio:** Install SQL Server Management Studio for database management.
- **Git:** Make sure you have Git installed to manage source code.
- **Web Browsers:** Use Google Chrome or Mozilla Firefox for the best experience.

## Getting Started

Follow these steps to set up and run the Car Rental Application:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/haxkd/CarService.git

2. Open the solution in Visual Studio 2022 for the backend and Visual Studio Code for the frontend.

3. Set up the MSSQL Server database using the provided .bak file.

4. Configure connection strings in the application settings for both frontend and backend.

4. Build and run the application.

## Project Structure
The project follows a clean and organized structure:

- /backend: Contains the .Net Core backend code.
- /frontend: Houses the react frontend application.
- /database: Contains the SQL Server database file.
- /documentation: Includes additional documentation and diagrams.

## Usage
1. Access the application in your web browser.

2. Log in as a regular user or administrator.

3. Explore the features mentioned in the Features section.

4. Enjoy the car rental experience!

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Commit your changes
- Push your changes to your fork
- Open a pull request with a clear description of your changes

## License
This project is licensed under the MIT License.
