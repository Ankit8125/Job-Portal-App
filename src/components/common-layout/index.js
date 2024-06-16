import { currentUser } from '@clerk/nextjs/server';
import Header from "../header";
import { fetchProfileAction } from '@/actions';

// made this in seperate file, so that our code looks much cleaner and in an organized way

export default async function CommonLayout({ children }) {

  const user = await currentUser()
  const profileInfo = await fetchProfileAction(user?.id) // this will basically give me whtehr user is recruiter or candidate

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header Component */}
      <Header
        user={JSON.parse(JSON.stringify(user))}
        profileInfo={profileInfo}
      />
      {/* Header Component */}

      {/* Main Content */}
      <main>{children}</main>
      {/* Main Content */}
    </div>
  )
}