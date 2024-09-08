# Activities Management Application for the Department of Agricultural Extension

## License Version

Welcome to the Activities Management Application repository! This project is a comprehensive tool designed to streamline the management of various agricultural activities for the Department of Agricultural Extension (DAE).

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
   - [User Roles](#user-roles)
   - [Activity Management](#activity-management)
   - [Notes](#notes)
   - [Notices](#notices)
   - [Farmer Data Integration](#farmer-data-integration)
3. [Technologies Used](#technologies-used)
4. [Usage](#usage)
5. [Contact](#contact)

## Introduction

The Activities Management Application is a robust platform developed to assist the Department of Agricultural Extension (DAE) in managing and organizing agricultural activities. The application offers a wide range of features that support different user roles, ensuring that agricultural projects and activities are carried out efficiently and all relevant data is stored and accessible.

## Features

### User Roles

The application provides different functionalities based on user roles:

#### User

- **Add and Manage Activities:** Users can add and manage detailed information about various agricultural activities such as demos, field days, schools, and farmer group meetings.
- **Demo Management:** Users can create demo records, including images, dates, conditions, and more. The demo process is divided into two stages: Primary and Final, allowing users to transition a demo from one stage to another with additional details.
- **Farmer Integration:** Users can input a farmer’s National ID (NID) to auto-fill their details or manually add new farmer information if the NID is not found in the database.

#### Admin

- **Project Management:** Admins have full control over project management, including the ability to add, delete, or mark projects as completed.
- **User Management:** Admins can change user passwords, assign tasks, add training sessions, manage materials distribution, and organize motivational tours.
- **Notice Board:** Admins can post notices, assign tasks, and monitor participation and task completion in real-time.

### Activity Management

The application allows users to manage a variety of agricultural activities. Below are the details of each feature:

#### Demos

- **Primary Stage:** Users can initiate a demo by adding primary information such as images, high officials' names, dates, and the demo's condition.
- **Final Stage:** Users can transition the demo to the final stage by adding required data, including production per hectare, total production, and farmer reviews.
- **Special Notes:** Users can add notes for specific farmers, such as requests for materials or training. Once the request is fulfilled, users can mark the note as complete and add a comment indicating that the farmer's request has been served.

#### Training Sessions

Admins can schedule and manage training sessions for farmers. This includes setting up sessions, tracking attendance, and ensuring that all necessary materials are distributed.

#### Field Days

Field days can be organized and managed within the application. Users can add details about the field day, including the date, location, presented officers, and participants. They can also upload images and other relevant documents.

#### Materials Distribution

Admins can manage the distribution of materials to farmers. This feature allows for tracking which materials have been distributed to which farmers, ensuring that all resources are accounted for.

#### DAE Farmer Group Meetings

Users can schedule and manage farmer group meetings, including adding details about the meeting agenda, attendees, and outcomes. This feature ensures that all meetings are properly documented and accessible for future reference.

#### Motivational Tours

Admins can organize motivational tours for farmers, including setting up the tour itinerary, tracking participation, and gathering feedback from attendees.

#### Schools

Users can manage agricultural school sessions, including scheduling classes, tracking attendance, and recording the results of each session. This feature ensures that all educational activities are properly managed and recorded.

### Notes

- **Note Stages:** Notes have two stages:
  - **Not Completed:** Indicates that the note is still pending action.
  - **Completed:** Indicates that the note has been addressed.

- **Special Notes:** Users can add special notes for specific actions, such as:
  - Demo visits
  - Material distribution
  - Training calls
  - Motivation tours
  - Demo presentations

### Notices

- **Priority Levels:** Notices have three priority levels:
  - **High**
  - **Medium**
  - **Low**

- **Targeting Notices:** Notices can be sent to all users or specific users as needed as per needed.

- **Comment Thread Management:** Admins can control the comment threads for each notice, allowing for efficient communication and tracking of discussions.

### Farmer Data Integration

- **Auto-Fill:** If a farmer's NID is found in the database, their basic information is automatically filled in.
  
- **Manual Addition:** If the NID is not found, a modal will be displayed indicating that the farmer's data is not in the database. Users can choose to manually add the farmer's information, which will then be stored and associated with the unique NID for future use.

- **Demo Data:** When adding a demo, if the NID has been previously recorded in the database, the data from the database will be fetched and used to auto-fill the farmer's basic data.

## Technologies Used

**Frontend:**
- HTML
- CSS
- JavaScript
- React.js
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

**Image Storage:**
- Cloudinary

**Authentication:**
- JWT (JSON Web Token)

**API Integration:**
- REST APIs for NID and other services

## Usage

Once the application is up and running, users can log in and start managing various agricultural activities. The features include:

- **Adding and Managing Activities:** Users can add information about demos, field days, schools, and more.
- **Farmer Data Integration:** Utilize the NID database to automatically fill in farmer information or manually add new data.
- **Project Management:** Admins can oversee all projects, ensuring they are properly managed and completed on time.
- **Task Monitoring:** Track user participation and ensure all tasks are completed efficiently.

## Contact

For any inquiries or support, please contact:

- **Name:** Md Rasel Molla
- **Email:** raselmolla6336@gmail.com
- **LinkedIn:** [Md Rasel Molla](https://www.linkedin.com/in/iamraselmolla/)
- **GitHub:** [iamraselmolla](https://github.com/iamraselmolla/)
