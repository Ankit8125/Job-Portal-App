import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  location: String,
  type: String,
  experience: String,
  description: String,
  skills: String,
  minimumQualification: String,
  recruiterId: String, // which recruiter posted the job, we need its Id to keep track
  applicants: [ // which applicants have applied for the job, for tracking them
    {
      name: String,
      email: String,
      userId: String,
      status: String // like accepted or rejected
    }
  ]
})

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema)

export default Job