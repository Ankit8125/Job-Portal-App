# Job-Portal-App
## Working Video : [https://www.youtube.com/watch?v=9jdMz0j4Q_I](https://youtu.be/h4071vDeH1A)
A modern job portal application built using Next.js, designed to connect job seekers with potential employers, providing features like job listing, user authentication, and membership subscriptions.

## Tools & Technologies Used
• Next.js: For server-side rendering and client-side routing. <br>
• Clerk: For user authentication and session management.<br>
• Stripe: For handling payments and subscriptions.<br>
• MongoDB: Database for user profiles and job data.<br>
• Supabase: File storage for resumes.<br>
• Tailwind CSS: Styling framework.<br>
• Shadcn-UI: For UI components like buttons, sheets, dialogs.<br>
• Lucide-React: For icons.<br>
• Query-String: For handling URL parameters in job filtering.<br>

## Features
• <strong>User Authentication </strong>: Integrated using Clerk for seamless login and registration flows.<br>
• <strong>Role-Based Navigation</strong>: Separate navigation and functionalities for candidates, recruiters, and unauthenticated users.<br>
• <strong>Job Posting</strong>: Recruiters can post jobs and view the list of candidates who applied.<br>
• <strong>Job Application</strong>: Candidates can browse and apply for jobs, with the application status tracked.<br>
• <strong>Resume Upload</strong>: Candidates can upload resumes, stored via Supabase.<br>
• <strong>Premium Membership</strong>: Subscription functionality using Stripe, enabling access to premium features for recruiters and candidates.<br>
• <strong>Filtering and Sorting</strong>: Dynamic job filtering based on search parameters.<br>

Note: While running on your local machine, make these changes in actions->index.js->createStripePaymentAction(data):

success_url: 'http://localhost:3000/membership' + '?status=success',

cancel_url: 'http://localhost:3000/membership' + '?status=cancel'

// Default ReadMe.md file: 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
