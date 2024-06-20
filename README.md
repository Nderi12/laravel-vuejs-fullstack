Sure, here is the updated README file reflecting the use of the AdminLTE template:

---

# Options Strategy Analyzer

## Overview

The **Options Strategy Analyzer** is a full-stack application designed to facilitate risk and reward analysis for options trading strategies. This tool allows users to input details for up to four options contracts, calculate key financial metrics, and visualize the potential profit and loss outcomes on an interactive graph.

## Technologies Used

- **Backend:** Laravel
- **Frontend:** Vue.js
- **UI Template and Charts:** AdminLTE

## Features

- **User Input:**
  - Input up to four options contracts.
  - Specify contract type (call or put), strike price, premium, and quantity.

- **Calculation:**
  - Compute maximum profit, maximum loss, and break-even points.
  - Generate a risk & reward graph where X is the price of the underlying at expiry and Y is the profit/loss.

- **Visualization:**
  - Interactive line chart displaying potential outcomes using AdminLTE's built-in charting tools.
  - Dynamically updated metrics and graph based on user input.

## Project Structure

- **Backend:** Laravel API handles the business logic and data processing.
- **Frontend:** Vue.js handles the user interface and interactions.
- **Components:**
  - **OptionsStrategyAnalyzer.vue:** Main component for user input and calculation.
  - **Navbar.vue & Footer.vue:** Layout components for the application structure.
  - **AdminLTE:** UI template and charting library for rendering the risk & reward graph.

## Installation

### Prerequisites

- Node.js
- npm
- PHP
- Composer
- MySQL or any other database supported by Laravel

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/Nderi12/laravel-vuejs-fullstack.git
    cd options-strategy-analyzer
    ```

2. Install backend dependencies:
    ```sh
    composer install
    ```

3. Create a `.env` file and set your database credentials and other environment variables:
    ```sh
    cp .env.example .env
    php artisan key:generate
    ```

4. Migrate the database:
    ```sh
    php artisan migrate
    ```

5. Start the Laravel server:
    ```sh
    php artisan serve
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install frontend dependencies:
    ```sh
    npm install
    ```

3. Start the Vue development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to the development server URL provided by Laravel, usually `http://127.0.0.1:8000`.
2. Use the form to input details for your options contracts.
3. Click the "Calculate" button to generate the risk & reward graph and view the computed metrics.