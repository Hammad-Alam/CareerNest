CareerNest  

💻 Tech Stack Used:
- Frontend: React  
- Backend: Node.js & Express.js  
- Database: MongoDB  
- Styling: Tailwind CSS  

Key Features  

Auth Module  
- User Roles: Users can sign up as either **Job Seekers** or **Admins**.  
- Admins: Only verified company employees can register as admins.  
- Functionalities:  
  - Sign Up  
  - Sign In  
  - Forgot Password  

User Module  
- Job Listings: Users can view and apply for job listings by submitting their applications.  
- Profile Management:  
  - Update personal profiles  
  - Change passwords  
- Job Filtering: Easily filter job listings based on categories to find the perfect match.  

Admin Module  
- Job Management: Create, update, view, and delete job postings.  
- Dashboard Analytics: Access comprehensive website analytics to monitor performance and user engagement.  
- Profile Management:  
  - Update admin profiles  
  - Change passwords  
- Candidate Interaction: View and contact candidates who have applied for jobs, facilitating effective communication and recruitment.  

Data Storage  
- Secure Storage: All user and employer data, job postings, and applications are securely stored in a MongoDB database.  
- Dynamic Retrieval: Data is dynamically retrieved and displayed on dashboards, ensuring up-to-date information is always available.  

Real-time Updates  
- Instant Synchronization: Whether a new job post or an updated profile, all data is automatically saved to the database and reflected in real-time on the respective dashboards.  
- Enhanced User Experience: Real-time updates ensure that both job seekers and admins have the latest information without any delays.  

Project Guidelines  

The project folder structure contains two main directories: frontend and backend.  

Running the Frontend
1. Navigate to the frontend directory:  
   cd frontend  
   
2. Start the frontend server:  
   npm run start  
   
Running the Backend  
1. Navigate to the backend directory: 
   cd backend  
   
2. Start the backend server using one of the following commands:  
   npx nodemon .\index.js  or nodemon index.js  
