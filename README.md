# Digital Product School (DPS) Software Engineer Challenge - ReactCRM+

Welcome to my submission for the DPS challenge! This project highlights my implementation of a customer management system enriched with advanced features and customizations to provide an optimal user experience.

---

## **Project Overview**

<img width="1233" alt="image" src="https://github.com/user-attachments/assets/1bd229d9-9d60-4ffc-babe-e55e2b20512b">

The goal was to develop a feature-rich web application to manage customer data while adhering to the provided mockup and requirements. I enhanced the core design with additional functionalities to make the application more robust, inclusive, and user-friendly.

---

## **Tech Stack**

- **Frontend Framework**: React (with Context API for state management)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with ShadCN components for rapid UI development
- **API**: [DummyJSON Users Endpoint](https://dummyjson.com/users)
- **Storage**: Session Storage and Local Storage for advanced features
- **Package Manager**: npm

---

## **Features**

### 1. **Enhanced Data Management**

- **Searchable List**: Filters customers dynamically by name with a 1-second debounce.
- **City Filter**: Dropdown to filter customers by city.
- **Highlighting Oldest Users**: Highlights the oldest users in each city when enabled.

### 2. **Data Settings Menu**

<img width="800" alt="image" src="https://github.com/user-attachments/assets/16a308e9-402e-4a2f-8506-ef3c149a0460">

- **View Modes**:
  - **Simplified View**: Displays essential fields in the table.
  - **Detailed View**: Displays all fields for a comprehensive view.
- **Data Saver**: Avoids redundant API requests by storing data in session storage and persisiting it for the session.
- **Offline Mode**: Persists data using local storage for offline accessibility (Expire Time - 24Hours).

### 3. **Theme Settings Menu**

- **Accessibility Features**:
  - Adjust font size.
  - Enable bold text for better readability.
  - Toggle light/dark themes.
- **DPS Theme**(Couldn't make it to prod): A special theme styled according to DPS's guidelines.

### 4. **Custom Components**

- **Pagination**: For seamless navigation through data.
- **Menu Bars**: Improved UI navigation experience.
- **Skeleton Loaders**: Provides a smooth experience during data fetch delays.

---

## **Setup Instructions**

1. **Prerequisites**

   - Install **Node.js (v14.x or later)** and **npm (v6.x or later)**.

2. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

3. **Install Dependencies and Run Project:**
   ```bash
    npm install
    npm run dev
   ```

or you can visit the live [link](https://dps-react-challenge-phi.vercel.app/) here (Deployed using Vercel).

## 🔮 **What's Next?**

Thank you for giving me the opportunity to work on this challenge! It was a great experience to enhance my skills and showcase my abilities in developing a feature-rich web application.

If you have any doubts or need further clarifications regarding the project, please feel free to ping me. I'm happy to assist and provide any additional information you may need.

Looking forward to hearing from you!

Best regards,  
**Pranjal Goyal**
