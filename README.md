# Restaurant Reservation System

## Project Goals
Capstone project for Periodic Tables, a startup creating a reservation system for fine dining restaurants. This software is used by restaurant personnel to manage reservations over the phone.

## Features

### Create a Reservation
- The "New Reservation" page (/reservations/new) allows users to create reservations.
- Fields include name, mobile number, date, time (starting from 10:30 AM), and number of guests.
- Form and server-side validation with error handling.

### Search
- Search for existing reservations by mobile number.
- Flexible search input (any combination or length of numbers).

### Create a New Table
- Create tables with a name and capacity (1-8).
- Front-end and back-end validation.

### Edit a Reservation
- Edit existing reservations with pre-filled forms.
- Same validation as "Create a Reservation."

### Cancel a Reservation
- Cancel booked reservations with confirmation prompt.

## What I built
This is my Thinkful capstone, built on Thinkful's starter repo (the project scaffold, tests, and CI workflow came with it). My work:
- The React pages to create, edit, search, seat, and cancel reservations and to add tables, with one form component shared by the create and edit pages
- The reservations and tables API in Express with Knex and PostgreSQL, including the validation rules
- Seating and finishing a table, which update the table and the reservation in one database transaction

## Tools Used
- Node.js
- React
- React Hooks
- Express
- Knex
- PostgreSQL
- Bootstrap
- HTML5
- CSS
- Git

Live demo: https://system-ay7r.vercel.app/dashboard
