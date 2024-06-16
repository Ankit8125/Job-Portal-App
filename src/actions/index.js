'use server'

import connectToDB from "@/database"
import Application from "@/models/application"
import Job from "@/models/job"
import Profile from "@/models/profile"
import { revalidatePath } from "next/cache"
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
// this will interact on server side

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// create profile action
export async function createProfileAction(formData, pathToRevalidate) {
	await connectToDB()
	await Profile.create(formData)
	revalidatePath(pathToRevalidate)
}

// fetch profile action
export async function fetchProfileAction(id) {
	await connectToDB()
	const result = await Profile.findOne({ userId: id })
	return JSON.parse(JSON.stringify(result))
}

// create job action
export async function postNewJobAction(formData, pathToRevalidate) { // this will save our job to database
	await connectToDB()
	await Job.create(formData)
	revalidatePath(pathToRevalidate)
}

// fetch job action -> for recruiter -> can see the jobs only posted by that particular recruiter
export async function fetchJobsForRecruiterAction(id) {
	await connectToDB()
	const result = await Job.find({ recruiterId: id })
	return JSON.parse(JSON.stringify(result))
}

// fetch job action -> for candidate -> can see all the jobs posted by all recruiters
export async function fetchJobsForCandidateAction(filterParams = {}) {
	await connectToDB()
	let updatedParams = {}
	Object.keys(filterParams).forEach((filterKey) => {
		updatedParams[filterKey] = { $in: filterParams[filterKey].split(',') } // finding in our mongoDB database
	})
	// console.log(updatedParams, "updated Params"); // outputs the query received in the URL
	/* ex:
	location: { '$in': [ 'Bangalore' ] },
	title: { '$in': [ 'Software Engineer III' ] }
	*/

	const result = await Job.find(
		filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
	) // gives me all the result
	return JSON.parse(JSON.stringify(result))
}

// create job application
export async function createJobApplicationAction(data, pathToRevalidate) {
	await connectToDB()
	await Application.create(data)
	revalidatePath(pathToRevalidate)
}

// fetch job application -> for candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
	await connectToDB()
	const result = await Application.find({ candidateUserID: candidateID })
	return JSON.parse(JSON.stringify(result))
}

// fetch job application -> for recruiter
export async function fetchJobApplicationsForRecruiter(recruiterID) {
	await connectToDB()
	const result = await Application.find({ recruiterUserID: recruiterID })
	return JSON.parse(JSON.stringify(result))
}

// update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
	await connectToDB()
	const {
		recruiterUserID,
		name,
		email,
		candidateUserID,
		status,
		jobID,
		jobAppliedDate,
		_id
	} = data // refer application.js
	await Application.findOneAndUpdate({
		_id: _id
	}, {
		recruiterUserID,
		name,
		email,
		candidateUserID,
		status,
		jobID,
		jobAppliedDate,
	}, {
		new: true
	})
	revalidatePath(pathToRevalidate)
}

// get candidate details by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
	await connectToDB()
	const result = await Profile.findOne({ userId: currentCandidateID })
	return JSON.parse(JSON.stringify(result))
}

// create filter categories
export async function createFilterCategoryAction() {
	await connectToDB()
	const result = await Job.find({}) // bringing all the jobs so that 'filter' functionality is applied on all of them 
	return JSON.parse(JSON.stringify(result))
}

// update profile section
export async function updateProfileAction(data, pathToRevalidate) {
	await connectToDB()
	const {
		userId,
		role,
		email,
		isPremiumUser,
		memberShipType,
		memberShipStartDate,
		memberShipEndDate,
		recruiterInfo,
		candidateInfo,
		_id
	} = data

	await Profile.findOneAndUpdate(
		{
			_id: _id
		},
		{
			userId,
			role,
			email,
			isPremiumUser,
			memberShipType,
			memberShipStartDate,
			memberShipEndDate,
			recruiterInfo,
			candidateInfo,
		},
		{ new: true }
	)

	revalidatePath(pathToRevalidate)
}

// { Created stripe instance above }

// create stripe price id based on tier selection
export async function createPriceIdAction(data) {
	const session = await stripe.prices.create({
		currency: 'usd', // 'usd'
		unit_amount: data?.amount * 100,
		recurring: {
			interval: 'year'
		},
		product_data: {
			name: 'Premium Plan'
		}
	})

	return {
		success: true,
		id: session?.id
	}
}

// create payment logic
export async function createStripePaymentAction(data){
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: data?.lineItems,
		mode: 'subscription',
		success_url: 'https://job-portal-app-liard.vercel.app/membership' + '?status=success',
		cancel_url: 'https://job-portal-app-liard.vercel.app/membership' + '?status=cancel'
	})

	return {
		success: true,
		id: session?.id
	}
}