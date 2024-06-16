const { default: mongoose } = require("mongoose");

// here we will manage both candidate and recruiter

const ProfileSchema = new mongoose.Schema({
  userId: String, // this is the clerk user id who is authenticated user
  role: String, // either candidate or recruiter
  email: String,
  isPremiumUser: Boolean,
  memberShipType: String,
  memberShipStartDate: String,
  memberShipEndDate: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyRole: String
  },
  candidateInfo: {
    resume: String,
    name: String,
    currentCompany: String,
    currentJobLocation: String,
    preferredJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    skills: String,
    previousCompanies: String,
    totalExperience: String,
    college: String,
    collegeLocation: String,
    graduatedYear: String,
    linkedinProfile: String,
    githubProfile: String
  }
})

const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema)

export default Profile