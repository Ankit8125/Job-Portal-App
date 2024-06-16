import { fetchProfileAction } from '@/actions';
import HomePageButtonControls from '@/components/homepage-button-controls';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

// User is authenticaed --> (if yes) profile info -> (if yes) onboard as candidate or recruiter
//                                                   (if no) Redirect this user to onboard route

export default async function Home() {

  const user = await currentUser()
  // console.log(user, 'currentuser'); // outputs the complete user details who have registered
  // UserInfo means if the user is authenticated or not and ProfileInfo means either it can be a candidate or a recruiter
  const profileInfo = await fetchProfileAction(user?.id)

  if (user && !profileInfo?._id) { // means user is authenticated but not onboarded as a recruiter or as a candidate, then redirect to '/onboard'
    redirect('/onboard')
  }

  return (
    <Fragment>
      <div className='bg-white'>
        <div className='relative w-full'>
          <div className='min-h-screen flex'>
            <div className='container m-auto p-0'>
              <div className='flex items-center flex-wrap gap-12 lg:gap-0'>
                <div className='lg:w-5/12 space-y-8'>
                  <span className='flex space-x-2'>
                    <span className='block w-14 mb-2 border-b-2 border-gray-700'></span>
                    <span className='font-medium text-gray-600'>
                      One Stop Solution to Find Jobs
                    </span>
                  </span>
                  <h1 className='text-4xl font-bold md:text-6xl'>
                    The Best <br /> Job Portal App
                  </h1>
                  <p className='text-xl text-gray-700'>
                    Find Best Jobs From Top Product Based Companies and Build Your Career
                  </p>
                  <HomePageButtonControls 
                  user={JSON.parse(JSON.stringify(user))} // If we do 'user={user}, we get this error message: Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
                  profileInfo={profileInfo}
                  />
                </div>
                <div className='hidden relative md:block lg:w-7/12'>
                  <img
                    src='https://shorturl.at/msw07'
                    alt='Job Portal'
                    className='relative ml-auto'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
// In MongoDB, we have '_id' which is mongoDb's id for uniqueness and 'userId' which is auth user id i.e. clerk user id