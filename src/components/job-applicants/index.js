'use client'

import CandidateList from "../candidate-list"
import { Drawer, DrawerContent } from "../ui/drawer"
import { ScrollArea } from "../ui/scroll-area"

export default function JobApplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
  jobItem,
  jobApplications
}) {
  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent className="max-h-[50vh]">
        <ScrollArea className="h-auto overflow-y-auto">
          <CandidateList
            currentCandidateDetails={currentCandidateDetails}
            setCurrentCandidateDetails={setCurrentCandidateDetails}
            showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
            setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
            jobApplications={jobApplications}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}