import qs from 'query-string'

export const recruiterOnboardFormControls = [
	{
		label: 'Name', // This is the text that will be displayed as the label for the form control.
		name: 'name', // This is the unique identifier for the form control.
		placeholder: 'Enter your name', // This is the text that will be displayed in the form control when it’s empty.
		componentType: 'input' // This indicates the type of the form control. 
	},
	{
		label: 'Company Name',
		name: 'companyName',
		placeholder: 'Enter your company name',
		componentType: 'input'
	},
	{
		label: 'Company Role',
		name: 'companyRole',
		placeholder: 'Enter your company role',
		componentType: 'input'
	}
]

export const initialRecruiterFormData = {
	name: '',
	companyName: '',
	companyRole: '',
}

export const candidateOnboardFormControls = [
	{
		label: 'Resume',
		name: 'resume',
		componentType: 'file'
	},
	{
		label: 'Name',
		name: 'name',
		placeholder: 'Enter your name',
		componentType: 'input'
	},
	{
		label: 'Current Company',
		name: 'currentCompany',
		placeholder: 'Enter your current company',
		componentType: 'input'
	},
	{
		label: 'Current Job Location',
		name: 'currentJobLocation',
		placeholder: 'Enter your current job location',
		componentType: 'input'
	},
	{
		label: 'Preferred Job Location',
		name: 'preferredJobLocation',
		placeholder: 'Enter your preferred job location',
		componentType: 'input'
	},
	{
		label: 'Current Salary',
		name: 'currentSalary',
		placeholder: 'Enter your current salary',
		componentType: 'input'
	},
	{
		label: 'Notice Period',
		name: 'noticePeriod',
		placeholder: 'Enter your notice period',
		componentType: 'input'
	},
	{
		label: 'Skills',
		name: 'skills',
		placeholder: 'Enter your skills',
		componentType: 'input'
	},
	{
		label: 'Previous Companies',
		name: 'previousCompanies',
		placeholder: 'Enter your previous companies',
		componentType: 'input'
	},
	{
		label: 'Total Experience',
		name: 'totalExperience',
		placeholder: 'Enter your total experience',
		componentType: 'input'
	},
	{
		label: 'College',
		name: 'college',
		placeholder: 'Enter your college',
		componentType: 'input'
	},
	{
		label: 'College Location',
		name: 'collegeLocation',
		placeholder: 'Enter your college location',
		componentType: 'input'
	},
	{
		label: 'Graduated Year',
		name: 'graduatedYear',
		placeholder: 'Enter your graduated year',
		componentType: 'input'
	},
	{
		label: 'Linkedin Profile',
		name: 'linkedinProfile',
		placeholder: 'Enter your linkedin profile',
		componentType: 'input'
	},
	{
		label: 'Github Profile',
		name: 'githubProfile',
		placeholder: 'Enter your github profile',
		componentType: 'input'
	}
]

export const initialCandidateFormData = {
	resume: '',
	name: '',
	currentCompany: '',
	currentJobLocation: '',
	preferredJobLocation: '',
	currentSalary: '',
	noticePeriod: '',
	skills: '',
	previousCompanies: '',
	totalExperience: '',
	college: '',
	collegeLocation: '',
	graduatedYear: '',
	linkedinProfile: '',
	githubProfile: '',
}

export const initialCandidateAccountFormData = { // For updating, doing like this (easy way)
	name: '',
	currentCompany: '',
	currentJobLocation: '',
	preferredJobLocation: '',
	currentSalary: '',
	noticePeriod: '',
	skills: '',
	previousCompanies: '',
	totalExperience: '',
	college: '',
	collegeLocation: '',
	graduatedYear: '',
	linkedinProfile: '',
	githubProfile: '',
}

export const postNewJobFormControls = [
	{
		label: 'Company Name',
		name: 'companyName',
		placeholder: 'Company Name',
		componentType: 'input',
		disabled: true // as a recruiter, i will be getting company name from my profile. {Doing this because for ex: I am working in Google, then I can't post jobs of 'Microsoft', so populating it beforehand from profile of recruiter}
	},
	{
		label: 'Title',
		name: 'title',
		placeholder: 'Job Title',
		componentType: 'input'
	},
	{
		label: 'Type',
		name: 'type',
		placeholder: 'Job Type',
		componentType: 'input'
	},
	{
		label: 'Location',
		name: 'location',
		placeholder: 'Job Location',
		componentType: 'input'
	},
	{
		label: 'Experience',
		name: 'experience',
		placeholder: 'Experience',
		componentType: 'input'
	},
	{
		label: 'Description',
		name: 'description',
		placeholder: 'Description',
		componentType: 'input'
	},
	{
		label: 'Skills',
		name: 'skills',
		placeholder: 'Skills',
		componentType: 'input'
	},
	{
		label: 'Minimum Qualification',
		name: 'minimumQualification',
		placeholder: 'Minimum Qualification',
		componentType: 'input'
	}
]

export const initialPostNewJobFormData = {
	companyName: '',
	title: '',
	type: '',
	location: '',
	experience: '',
	description: '',
	skills: '',
	minimumQualification: ''
}

export const filterMenuDataArray = [
	{
		id: 'companyName',
		label: 'Company Name'
	},
	{
		id: 'title',
		label: 'Title'
	},
	{
		id: 'type',
		label: 'Type'
	},
	{
		id: 'location',
		label: 'Location'
	}
]

export function formUrlQuery({params, dataToAdd}){ // this will dynamically add in the url
	let currentURL = qs.parse(params)

	if(Object.keys(dataToAdd).length > 0){ // checking if any data to add to the URL
		Object.keys(dataToAdd).map((key) => {
			if(dataToAdd[key].length === 0){
				delete currentURL[key]
			}
			else{
				currentURL[key] = dataToAdd[key].join(',')
			}
		})
	}

	return qs.stringifyUrl( // helps in creation of new query string from the updated currentURL
		{ 
			url: window.location.pathname,
			query: currentURL
		},
		{ 
			skipNull: true 
		}
	)
}

export const membershipPlans = [
	{
		heading: 'Tier 1',
		price: 100,
		type: 'basic'
	},
	{
		heading: 'Tier 2',
		price: 1000,
		type: 'teams'
	},
	{
		heading: 'Tier 3',
		price: 5000,
		type: 'enterprise'
	}
]