import mongoose from "mongoose"

const ApplicationSchema = new mongoose.Schema({
  recruiterUserID: String, // to keep track of which recruiter has posted that job which we are applying for
  name: String,
  email: String,
  candidateUserID: String,
  status: Array,
  jobID: String,
  jobAppliedDate: String
})

const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema)

export default Application