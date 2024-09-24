# Finax interview fullstack project

# Project Overview

The project is designed as part of an 
interview process for FINAX. 
It is a single page mini web application
simulating portfolio management dashboard.
The project uses JavaScript for the frontend and PHP for the backend.
Data is stored locally in **JSON files** and **localStorage**,
and visualized with **Chart.js** and **DataTables**.

## Features

- CRUD (Create, Read, Update, Delete) operations on investments
- Visual representation of data using **Chart.js**
  and **Datatables** libraries
- Filtering the data
- Form submission for adding or updating
- Validation of user inputs on backend and frontend side

### Investment columns

- *id* - investment id
- *title* - investment title
- *value* - value of investment
- *percentage* - percentage share of investment in portfolio
- *type* - type of investment (**Bonds**, **Shares**, **ETFs**)
- *date_of_creation* - when the investment was created


## Technologies

- PHP, JSON - Backend
- HTML, CSS, Javascript - Frontend
- [Chart.js](https://www.chartjs.org/) - Data visualisation in donut graph
- [Datatables](https://datatables.net/) - Data visualisation


## API Endpoints

1. Create investment (`/php/api/create.php`):

Method: `POST`

Request Body:

```json
{
"title": "Investment Name",
"value": 5000,
"percentage": 20,
"type": "Shares"
}
```
Response:

```json
{
"success": true,
"message": "Investment successfully added",
"newInvestment": { ... },
"investments": { ... }
}
```

2. Read Investments (`/php/api/read.php`):

Method: `GET`

Response: Returns all investments.

3. Update Investment (`/php/api/update.php`):

Method: `POST`

Request Body: Investment data with the updated fields.

Response:
```json
{
  "success": true,
  "investments": {investments}
}
```

4. Delete Investment (`/php/api/delete.php`):

Method: `POST`
Request Body:

```json
{
"id": 3
}
```

Response:

```json
{
  "success": true, 
  "message": "Investment successfully deleted", 
  "investments": {investments}
}
```

The investments are returned in every 
response to update the localstorage.