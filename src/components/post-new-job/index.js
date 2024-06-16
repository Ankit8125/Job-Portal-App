'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import CommonForm from "../common-form"
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils"
import { postNewJobAction } from "@/actions"
import { useToast } from "../ui/use-toast"

export default function PostNewJob({ jobList, user, profileInfo }) {

  // console.log(user);

  const [showJobDialog, setShowJobDialog] = useState(false)
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName // in our mongoDb database or profile.js -> you can see the companyName is inside recruiterInfo !
  })

  function handleAtPostNewButtonValid() {
    return Object.keys(jobFormData).every((control) => jobFormData[control].trim() !== '')
  } // if all the fields are filled, then the button is not disabled

  const {toast} = useToast()

  function handleAddNewJob(){

    console.log(profileInfo?.memberShipType, "memberShipType user");

    if(!profileInfo?.isPremiumUser && jobList.length >= 2){ // if you are not a premium user and you have already posted 2 jobs, then you cannot post more jobs
      setShowJobDialog(false) // wont open the dialog
      toast ({
        variant: 'destructive', // gives the red color to the toast message
        title: 'You can post max 2 jobs',
        description: 'Please opt for membership to post more jobs'
      })
      return
    } 
    if(profileInfo?.memberShipType === 'basic' && jobList.length >= 5){ // for tier 1 premium user
      setShowJobDialog(false) // wont open the dialog
      toast ({
        variant: 'destructive', // gives the red color to the toast message
        title: 'You can post max 5 jobs',
        description: 'Please opt for higher membership plan to post more jobs'
      })
      return
    } 
    if(profileInfo?.memberShipType === 'teams' && jobList.length >= 10){ // for tier 2 premium user
      setShowJobDialog(false) // wont open the dialog
      toast ({
        variant: 'destructive', // gives the red color to the toast message
        title: 'You can post max 10 jobs',
        description: 'Please opt for higher membership plan to post more jobs'
      })
      return
    } 
    setShowJobDialog(true) // opens the dialog -> when notPremium (atmost 2) and when tier 3
  }

  async function createNewJob() {
    await postNewJobAction({
      ...jobFormData,
      recruiterId: user?.id,
      applicants: []
    }, '/jobs')

    setJobFormData({ // after creating a new job, we reset
      ...initialPostNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName
    })
    setShowJobDialog(false)
  }

  return (
    <div>
      <Button 
      onClick={handleAddNewJob} 
      className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post A Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false)
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName
          }) // So now if we add 'partial' data in 'Post A Job' and close it, we will get resetted dialog rather than previous saved dialog
        }}>
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              Post New Job
            </DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={'Add'}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isButtonDisabled={!handleAtPostNewButtonValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}