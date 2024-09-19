# Job-Portal-App
## Working Video : [https://www.youtube.com/watch?v=9jdMz0j4Q_I](https://youtu.be/h4071vDeH1A)
A modern job portal application built using Next.js, designed to connect job seekers with potential employers, providing features like job listing, user authentication, and membership subscriptions.

## Tools & Technologies Used
• **Next.js**: Server-side rendering and frontend framework. <br>
• **Clerk**: For user authentication and session management.<br>
• **Stripe**: Payment and subscription integration.<br>
• **MongoDB**: Database for storing user profiles and job listings.<br>
• **Supabase**: File storage for candidate resumes.<br>
• **Tailwind CSS**: Styling framework.<br>
• **Shadcn-UI**: For UI components like buttons, sheets, dialogs.<br>
• **Lucide-React**: Icon library for modern UI.<br>
• **Query-String**: Used for filtering jobs via URL parameters.<br>

## Features
• <strong>User Authentication </strong>: Seamless login and registration using Clerk.<br>
• <strong>Role-Based Navigation</strong>: Different UI and functionalities for candidates, recruiters, and unauthenticated users.<br>
• <strong>Job Posting</strong>: Recruiters can post jobs and view the list of candidates who applied.<br>
• <strong>Job Application</strong>: Candidates can browse and apply for jobs, with the application status tracked.<br>
• <strong>Resume Upload</strong>: Candidates can upload resumes, stored via Supabase.<br>
• <strong>Premium Membership</strong>: Subscription functionality using Stripe, enabling access to premium features for recruiters and candidates.<br>
• <strong>Filtering</strong>: Dynamic job filtering based on search parameters.<br>

## Usage
- **For Recruiters**: Post new jobs and view applications.
- **For Candidates**: Browse and apply for jobs, upload resumes.
- **Premium Users**: Unlock additional features by purchasing a premium membership.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Ankit8125/Job-Portal-App.git
    cd Job-Portal-App
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    Create a `.env.local` file with your Clerk, Stripe, Supabase, and MongoDB credentials.

4. Run the app:
    ```bash
    npm run dev
    ```

## Note
To handle Stripe locally, ensure to modify the following in `actions->index.js->createStripePaymentAction(data)`:
```javascript
success_url: 'http://localhost:3000/membership' + '?status=success',
cancel_url: 'http://localhost:3000/membership' + '?status=cancel'
