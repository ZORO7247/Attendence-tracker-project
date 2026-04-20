# Student Attendance Viewer

A web application for teachers to track and monitor student attendance visually.

## Features

- Fetch student data from API
- Display student name, email, and attendance percentage
- Color-coded status badges (Green for ≥75%, Red for <75%)
- Filter students by All, Present, or Absent
- Toggle to show only students with <75% attendance
- Click on student cards to view detailed information
- Sort students by attendance percentage
- Responsive design for different screen sizes

## Technical Implementation

### State Management
The application uses the following state variables:
- `students` - Array of all student data
- `filterType` - Current filter (all/present/absent)
- `selectedStudent` - Currently selected student for detail view
- `showLowAttendance` - Boolean toggle for low attendance filter
- `sortAscending` - Boolean for sort direction

### API Integration
- Uses JSONPlaceholder API to fetch user data
- Generates random attendance percentages (60-100%)
- Handles loading and error states

### Filtering Logic
- **All**: Shows all students
- **Present**: Shows students with ≥75% attendance
- **Absent**: Shows students with <75% attendance
- **Low Attendance Toggle**: Filters to show only <75% attendance

### UI Features
- Color coding for attendance percentages
- Interactive cards with hover effects
- Highlighted selection state
- Empty state handling
- Loading state display

## File Structure

```
├── index.html    - Main HTML structure
├── styles.css    - All styling
├── script.js     - JavaScript functionality
└── README.md     - This file
```

## How to Run

1. Open `index.html` in a web browser
2. The application will automatically fetch student data
3. Use the filter buttons to filter students
4. Check the toggle to show only low attendance students
5. Click on any student card to view details
6. Use the sort button to sort by attendance percentage

## Browser Compatibility

Works on all modern browsers that support ES6 JavaScript features.

## Learning Outcomes Covered

- useState equivalent (vanilla JS state variables)
- useEffect equivalent (fetch on DOMContentLoaded)
- API integration with error handling
- Complex filtering logic
- Conditional styling and rendering
- List rendering with map()
- Proper event handling
- Interactive UI elements
