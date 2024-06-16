import { fetchProfileAction } from "@/actions";
import OnBoard from "@/components/on-board";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";

// onboard = 2 sections -> CANDIDATE || RECRUITER
export default async function OnBoardPage() {
  // getting the authenticated user from clerk
  const user = await currentUser()
  // console.log('Came to OnBoard Page');
  // fetch the profile info -> either user is candidate / recruiter
  const profileInfo = await fetchProfileAction(user?.id)

  // console.log('Came back from fetchProfileAction part', profileInfo);

  if (profileInfo?._id) {
    if (profileInfo?.role === 'recruiter' && !profileInfo.isPremiumUser) { // user = recruiter and not a premium user
      redirect('/membership')
    }
    else {
      redirect('/')
    }
  }
  else {
    return <OnBoard />
  }
}