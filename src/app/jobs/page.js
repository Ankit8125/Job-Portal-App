import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobsPage({searchParams}) {
  console.log(searchParams); // prints the query (made by filter)

  const user = await currentUser()
  const profileInfo = await fetchProfileAction(user?.id) // gives profile info and the user

  // we need to check whether fetching for candidate or job
  const jobList = (profileInfo?.role === 'candidate')
    ? await fetchJobsForCandidateAction(searchParams)
    : await fetchJobsForRecruiterAction(user?.id)
  // console.log("Posting jobs", jobList); // Prints the details that we filled in 'Post A Job' form

  const getJobApplicationList = (profileInfo?.role === 'candidate')
    ? await fetchJobApplicationsForCandidate(user?.id)
    : await fetchJobApplicationsForRecruiter(user?.id)

  const fetchFilterCategories = await createFilterCategoryAction()

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      jobApplications={getJobApplicationList}
      filterCategories={fetchFilterCategories}
    />
  )
}