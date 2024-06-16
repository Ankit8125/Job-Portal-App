'use client'

import { Fragment } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { getCandidateDetailsByIDAction, updateJobApplicationAction } from "@/actions"
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseClient = createClient('https://kpmpqqtsemzhhpzmhfoi.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_API_KEY ) // Project URL, API Key

export default function CandidateList({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
  jobApplications
}) {

  async function handleFetchCandidateDetails(getCurrentCandidateId) {
    const data = await getCandidateDetailsByIDAction(getCurrentCandidateId)
    // console.log(data); // outputs all details of that particular candidate
    if (data) {
      setCurrentCandidateDetails(data)
      setShowCurrentCandidateDetailsModel(true)
    }
  }

  // console.log(currentCandidateDetails); //outputs all details of that particular candidate

  function handlePreviewResume() { // previews if resume = pdf, if its word doc -> will get downloaded directly
    const { data } = supabaseClient.storage
      .from('job-board-public')
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume) // have to pass the resume link here

    // console.log(data, "resume"); // prints resume link
    const a = document.createElement('a') // anchor tag
    a.href = data?.publicUrl
    a.setAttribute('download', 'Resume.pdf')
    a.setAttribute('target', '_blank') // so that it will open in new tab
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let copyJobApplicants = [...jobApplications]
    const indexOfCurrentJobApplicant = copyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    )
    // console.log(indexOfCurrentJobApplicant); // prints the total number of job applicants 'selected'

    const jobApplicantsToUpdate = {
      ...copyJobApplicants[indexOfCurrentJobApplicant],
      status: copyJobApplicants[indexOfCurrentJobApplicant].status.concat(getCurrentStatus) // so basically it will show 0: Applied, 1: selected
    }

    console.log(jobApplicantsToUpdate, 'jobApplicantsToUpdate'); // outputs all the 'Application' details with 'Status' Array size = 2 (0: Applied, 1: selected), since we clicked on selected. If we clicked on 'Reject' then we will see 1: rejected.
    await updateJobApplicationAction(jobApplicantsToUpdate, '/jobs')

  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {
          jobApplications && jobApplications.length > 0
            ? jobApplications.map((jobApplicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold">
                    {jobApplicantItem?.name}
                  </h3>
                  <Button // On Clicking, we will first check whether the data of that applicant is there or not. If there, then we will open the model/dialog
                    onClick={() => handleFetchCandidateDetails(jobApplicantItem?.candidateUserID)} // refer below flow, to know from where we got candidateUserID
                    className="flex h-11 items-center justify-center px-5">
                    View Profile
                  </Button>
                </div>
              </div> // jobApplicantItem <- jobApplications(candidate-list) <- (job-applicants) <- (recruiter-job-card) <- (job-listing) <- jobApplications={getJobApplicationList}(app->jobs->page.js) <- fetchJobApplicationsForRecruiter(actions) <- ApplicationSchema(application.js) <- candidateUserID
            ))
            : null
        }
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModel}
        onOpenChange={() => {
          setCurrentCandidateDetails(null)
          setShowCurrentCandidateDetailsModel(false)
        }}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {currentCandidateDetails?.candidateInfo?.name},{' '}
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-black">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-black">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p>
              Total Experience: {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p>
              Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{' '} LPA
            </p>
            <p>
              Notice Period:{' '}{currentCandidateDetails?.candidateInfo?.noticePeriod} Days
            </p>
            <div className="flex items-center gap-4 mt-6">
              <h1>Previous Companies</h1>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {
                  currentCandidateDetails?.candidateInfo?.previousCompanies
                    .split(',')
                    .map((skillItem) => ( // We have to split when ',' comes, as in recruiter we have written skills by giving commas between each of them
                      <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                        <h2 className="text-[13px] font-medium text-white">
                          {skillItem}
                        </h2>
                      </div>
                    ))
                }
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {
                currentCandidateDetails?.candidateInfo?.skills
                  .split(',')
                  .map((skillItem) => ( // We have to split when ',' comes, as in recruiter we have written skills by giving commas between each of them
                    <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                      <h2 className="text-[13px] font-medium text-white">
                        {skillItem}
                      </h2>
                    </div>
                  ))
              }
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handlePreviewResume}
              className="flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus('selected')}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={ // if candidate is selected, then show 'Selected' button and 'Reject' as disabled
                jobApplications.find(
                  (item) => item.candidateUserID === currentCandidateDetails?.userId
                )?.status.includes('selected') || jobApplications.find(
                  (item) => item.candidateUserID === currentCandidateDetails?.userId
                )?.status.includes('rejected') ? true : false
              }
            >
              {
                jobApplications.find(
                  (item) => item.candidateUserID === currentCandidateDetails?.userId
                )?.status.includes('selected') ? 'Selected' : 'Select'
              }
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus('rejected')}
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={ // if candidate is selected, then show 'Rejected' button and 'Select' as disabled
                jobApplications.find(
                  (item) => item.candidateUserID === currentCandidateDetails?.userId
                )?.status.includes('selected') || jobApplications.find(
                  (item) => item.candidateUserID === currentCandidateDetails?.userId
                )?.status.includes('rejected') ? true : false
              }
            >
              {
                jobApplications.find(
                  (item) => item.candidateUserID === currentCandidateDetails?.userId
                )?.status.includes('rejected') ? 'Rejected' : 'Reject'
              }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}