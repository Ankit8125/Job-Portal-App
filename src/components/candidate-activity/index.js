'use client'

import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CandidateActivity({ jobList, jobApplicants }) {
  // console.log(jobList, jobApplicants); // output = total jobs present, how many jobs I applied 
  // Now I have 3 status: Applied (common), Selected, Rejected

  const uniqueStatusArray = [...new Set(
    jobApplicants.map((jobApplicantItem) => jobApplicantItem.status).flat(1)
  )] // output = shows only unique status(for ex:[Applied', 'Rejected'], same in this manner) rather than showing whole information. 



  return (
    <div className="mx-auto max-w-7xl">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between border-b pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {
              uniqueStatusArray.map((status) => (
                <TabsTrigger value={status}>
                  {status}
                </TabsTrigger>
              ))
            }
          </TabsList>
        </div>
        <div className="pb-24 pt-6">
          <div className="container mx-auto p-0 space-y-8">
            <div className="flex flex-col gap-4">
              {
                uniqueStatusArray.map((status) => (
                  <TabsContent value={status}>
                    {
                      jobList.filter( // First we are having all the jobs, so we are filtering
                        (jobItem) => jobApplicants.filter( // Then we are checking the job applicants (we'll be having an array). In that array we will be having only 'Applied', 'Selected', 'Rejected'
                          (jobApplication) => jobApplication.status.indexOf(status) > -1 // Now that filtering of array we are doing here
                        ).findIndex( // Once filtering is done, then we are checking the currentJobItem._id  === jobID of that application
                          (filteredItemByStatus) => jobItem._id === filteredItemByStatus.jobID
                        ) > -1 // Now above will get filtered based on the current tab we are having i.e 'Applied', 'Selected', 'Rejected'
                      ).map(finalFilteredItem => (
                        <CommonCard
                          icon={<JobIcon />}
                          title={finalFilteredItem?.title}
                          description={finalFilteredItem?.companyName}
                        />
                      ))
                    }
                  </TabsContent>
                ))
              }
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}