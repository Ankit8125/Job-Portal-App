'use client'

import { useState } from "react";
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import JobApplicants from "../job-applicants";

export default function RecruiterJobCard({ jobItem, jobApplications }) {
  // console.log(jobApplications, "jobApplications for recruiter");

  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false)
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null)
  const [showCurrentCandidateDetailsModel, setShowCurrentCandidateDetailsModel] = useState(false)

  return (
    <div>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        footerContent={
          <Button
            onClick={() => setShowApplicantsDrawer(true)}
            className="disabled:opacity-55 flex h-11 items-center justify-center px-5"
            disabled={jobApplications.filter((item) => item.jobID === jobItem?._id).length === 0}
          >
            {
              jobApplications.filter((item) => item.jobID === jobItem?._id).length
            }{" "} Applicants
          </Button>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
        setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
        jobItem={jobItem}
        jobApplications={jobApplications.filter( // so if you go to recruiter page, you will see that we are getting ALL the applicants list in the form of array. But I want to see only those applicants which have applied for a particular job, so we have to filter the applicants 
          (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
        )} // Ex: Recruiter posted (SWE, UI). And Now I have 2 applicants for SWE and 1 for UI. So recuriter will be getting array of 3 applicants. But if he clicks on the button ' x Applicants ' for SWE, then he must be able to see only those applicants who applied for SWE, rather than showing him the applicant for UI as well. That's why we need filter
      />
    </div>
  )
}