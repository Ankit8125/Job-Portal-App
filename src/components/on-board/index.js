'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { candidateOnboardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseClient = createClient('https://kpmpqqtsemzhhpzmhfoi.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_API_KEY ) // Project URL, API Key

// onboard = 2 sections -> CANDIDATE || RECRUITER
export default function OnBoard() {
  const [currentTab, setCurrentTab] = useState('candidate')
  const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData)
  const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData)

  const [file, setFile] = useState(null)


  const currentAuthUser = useUser() // Returns the current auth state and if a user is signed in, the user object.
  // console.log(currentAuthUser);
  const { user } = currentAuthUser // destructuring currentAuthUser

  function handleFileChange(event) {
    event.preventDefault()
    // console.log(event.target.files); // outputs a 'FileList' -> 0: File {consists details of file uploaded like name, type, size}
    setFile(event.target.files[0]) // stores file in our state
  }
  async function handleUploadPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from('job-board-public') // bucket name
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false
      })
    console.log(data, error);
    if (data) {
      setCandidateFormData({ // this will automatically store the resume
        ...candidateFormData,
        resume: data.path // above data will give me path and now this path we will store in our database
      })
    }
  }

  useEffect(() => {
    if (file) {
      handleUploadPdfToSupabase()
    }
  }, [file])

  function handleTabChange(value) {
    setCurrentTab(value)
  }

  function handleRecruiterFormValid() {
    return (
      // trim -> If we entered 'space', so it will not count that and remove it
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    )
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== ''
    )
  }

  async function createProfile() {
    const data = (currentTab === 'candidate') ? {
      candidateInfo: candidateFormData,
      role: 'candidate',
      isPremiumUser: false,
      userId: user?.id, // this is the clerk user Id
      email: user?.primaryEmailAddress?.emailAddress
    } : {
      recruiterInfo: recruiterFormData,
      role: 'recruiter',
      isPremiumUser: false,
      userId: user?.id, // this is the clerk user Id
      email: user?.primaryEmailAddress?.emailAddress
    }
    // console.log('Redirecting to /onboard');

    await createProfileAction(data, '/onboard')
  }

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to onboarding 😀
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            formControls={candidateOnboardFormControls}
            buttonText={'Onboard as candidate'}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            handleFileChange={handleFileChange}
            isButtonDisabled={!handleCandidateFormValid()}
            action={createProfile}
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            formControls={recruiterOnboardFormControls}
            buttonText={'Onboard as recruiter'}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            isButtonDisabled={!handleRecruiterFormValid()} // all details filled , so this 'handleRecruiterFormValid' will return true, therefore, disabled: false and button is enabled
            action={createProfile} // in common-form->index.js, we are passing `action={action}` inside form, so we need to pass it
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}