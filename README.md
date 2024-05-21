# Information System using Express.js and EJS

Welcome to the information system built using Express.js as the backend and EJS as the template engine. This application runs on `http://localhost:5000`.

## Key Features

1. **Product Management**
   - Add, edit, and delete products.
   - Display a list of products with search and sort capabilities.
   - Finished product when all status is finished

2. **Order Management**
   - Manage customer orders.
   - Track order progress (on progress, delayed, finished).
   - Track finished product

3. **Reporting**
   - View sales reports and product analysis.

## User Roles

This system supports two user roles: Office and Production.

- **Office Role:**
  - Can add, edit, and delete products.
  - Access to product list and finished product table.
  - Receive notifications using Toastr.

- **Production Role:**
  - Can track order progress (on progress, delayed, finished).
  - View and manage production-related data.

## How to Run the Application

1. **Install Dependencies**
   Make sure you have Node.js and npm (Node Package Manager) installed on your computer. Then, install all dependencies by running the following command in the terminal:

### `npm install`

2. **Start the Application**
After the installation is complete, start the application by running the command

### `npm start`


The application will run on `http://localhost:5000`. Open your browser and visit this URL to view the application.

## Technology Stack

- **Express.js**: Node.js backend framework for building web applications.
- **EJS (Embedded JavaScript)**: Template engine for creating dynamic views on the server-side.
- **Bootstrap**: CSS framework used for responsive design and layout.
- **jQuery**: JavaScript library for DOM manipulation and server interactions.

## Contribution

We welcome contributions! If you would like to contribute to the development of this application, please open a new issue or submit a pull request via our GitHub repository.


## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
