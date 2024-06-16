'use client'

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useEffect } from "react"

export default function HomePageButtonControls({ user, profileInfo }){

  const router = useRouter()

  useEffect(() => { // so now after logging in, our page will be refreshed automatically so that updated homepage is shown to the user
    router.refresh()
  }, [])

  return (
    <div className="flex space-x-4">
      <Button 
      onClick={() => router.push('/jobs')}
      className='flex h-11 items-center justify-center px-5'
      >
        {
          user 
            ? profileInfo?.role === 'candidate' 
              ? 'Browse Jobs' 
              : 'Jobs Dashboard' 
            : 'Find Jobs' // 'Find Jobs' for unAuth user
        }
      </Button>
      <Button 
      onClick={() => router.push(
        user 
          ? profileInfo?.role === 'candidate' 
            ? '/activity' 
            : '/jobs' 
          : '/jobs'
      )}
      className='flex h-11 items-center justify-center px-5'>
        {
          user 
            ? profileInfo?.role === 'candidate' 
              ? 'Your Activity' 
              : 'Post New Job' 
            : 'Post New Job' // 'Find Jobs' for unAuth user
        }
      </Button>
    </div>
  )
}