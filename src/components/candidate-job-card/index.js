'use client'

import { Fragment, useState } from "react"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { createJobApplicationAction } from "@/actions"
import { useToast } from "../ui/use-toast"


export default function CandidateJobCard({ jobItem, profileInfo, jobApplications }) {

  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false)
  console.log(jobItem, "jobItem"); // all the fields inside 'handleJobApply' are printed
  console.log(profileInfo, "profileInfo");
  console.log(jobApplications, "jobApplications");
  // On clicking, 'APPLY', we need to create job application. Now for creating this, we need to pass couple of actions
 
  const {toast} = useToast()
  async function handleJobApply() {

    if(!profileInfo?.isPremiumUser && jobApplications.length >=2 ){
      setShowJobDetailsDrawer(false)
      toast ({
        variant: 'destructive',
        title: 'You can apply max 2 jobs',
        description: 'Please opt for membership to apply for more jobs'
      })
      return 
    }
    if(profileInfo?.memberShipType === 'basic' && jobApplications.length >=5 ){
      setShowJobDetailsDrawer(false)
      toast ({
        variant: 'destructive',
        title: 'You can apply max 2 jobs',
        description: 'Please opt for membership to apply for more jobs'
      })
      return 
    }
    if(profileInfo?.memberShipType === 'teams' && jobApplications.length >=15 ){
      setShowJobDetailsDrawer(false)
      toast ({
        variant: 'destructive',
        title: 'You can apply max 2 jobs',
        description: 'Please opt for membership to apply for more jobs'
      })
      return 
    }
    
    await createJobApplicationAction({
      recruiterUserID: jobItem?.recruiterId,
      name: profileInfo?.candidateInfo?.name,
      email: profileInfo?.email,
      candidateUserID: profileInfo?.userId,
      status: ["Applied"],
      jobID: jobItem?._id,
      jobAppliedDate: new Date().toLocaleDateString() // gets current date
    }, '/jobs') // '/jobs' = pathToRevalidate
    setShowJobDetailsDrawer(false)
  }

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer} // This passes the current state of showJobDetailsDrawer to the Drawer component as the open prop. If showJobDetailsDrawer is true, the drawer will be open; if it’s false, the drawer will be closed.
        onOpenChange={setShowJobDetailsDrawer} // This is an event handler that updates the showJobDetailsDrawer state when the open/close state of the drawer changes. It ensures that the showJobDetailsDrawer state always reflects the current open/close state of the drawer.
      >
        <CommonCard icon={<JobIcon />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            // Wrapping it inside DrawerTrigger, so this will automatically trigger. Or we can also do 'onClick' method
            // <DrawerTrigger> 
            <Button onClick={() => setShowJobDetailsDrawer(true)} className="flex h-11 items-center justify-center px-5">
              View Details
            </Button>
            // </DrawerTrigger>
          }
        />
        <DrawerContent className="p-6">
          <DrawerHeader className="px-0">
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleJobApply}
                  disabled={
                    jobApplications.findIndex((item) => item.jobID === jobItem?._id) > -1 ? true : false
                  } // jobItem?._id = current job ID (for which we opened), if this value is equal to any jobID in jobApplications then true else false
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                >
                  {
                    jobApplications.findIndex(
                      (item) => item.jobID === jobItem?._id
                    ) > -1 ? "Applied" : "Apply"
                  }
                </Button>
                <Button
                  onClick={() => setShowJobDetailsDrawer(false)}
                  className="flex h-11 items-center justify-center px-5"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl font-medium text-gray-600">
            {jobItem?.description}
            <span className="text-xl ml-4 font-normal text-gray-500">{jobItem?.location}</span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold text-white">
              {jobItem?.type} Time
            </h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experience: {jobItem?.experience} year
          </h3>
          <div className="flex gap-4 mt-6">
            {
              jobItem?.skills.split(',').map((skillItem) => ( // We have to split when ',' comes, as in recruiter we have written skills by giving commas between each of them
                <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                  <h2 className="text-[13px] font-medium text-white">
                    {skillItem}
                  </h2>
                </div>
              ))
            }
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  )
}