'use client'

import { membershipPlans } from "@/utils"
import CommonCard from "../common-card"
import JobIcon from "../job-icon"
import { Button } from "../ui/button"
import { createPriceIdAction, createStripePaymentAction, updateProfileAction } from "@/actions"
import { loadStripe } from "@stripe/stripe-js"
import dotenv from 'dotenv';
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

dotenv.config({ path: '.env.local' });

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Membership({ profileInfo }) {
  const pathName = useSearchParams()

  async function handlePayment(getCurrentPlan) {

    const stripe = await stripePromise
    const extractPriceId = await createPriceIdAction({
      amount: Number(getCurrentPlan?.price) // sends the number to createPriceIdAction
    })

    if (extractPriceId) {
      sessionStorage.setItem('currentPlan', JSON.stringify(getCurrentPlan))
      const result = await createStripePaymentAction({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1
          }
        ]
      })
      console.log(result); // this is my payment ID ; output = {success: true, id: 'cs_test_a1RWN6hKy3MZmVxuTD5bD4C8Xwj7qYaNkmWAN9pUfVVTDbkr28UHOGWf3p'} , not necessarily same

      await stripe.redirectToCheckout({
        sessionId: result?.id
      })
    }

    console.log(extractPriceId); // output = {success: true, id: 'price_1PSB8TP0Pwl7MVblMk7IwrKR'}, we are getting success message and priceId , not necessarily same
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    )

    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() +
            fetchCurrentPlanFromSessionStorage?.type === "basic"
            ? 1 : fetchCurrentPlanFromSessionStorage?.plan === "teams" ? 2 : 5, // If basic -> year + 1, If teams ->year + 2 else year + 5
          new Date().getMonth(),
          new Date().getDay()
        )
      },
      "/membership"
    )
  }

  useEffect(() => {
    if (pathName.get('status') === 'success') {
      updateProfile()
    }
  }, [pathName])

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          {
            profileInfo?.isPremiumUser ? 'You are a premium user' : 'Choose Your Best Plan'
          }
        </h1>
        <div>
          {
            profileInfo?.isPremiumUser ?
              <Button className='flex h-11 items-center justify-center px-5'>
                {
                  membershipPlans.find(
                    (planItem) => planItem.type === profileInfo?.memberShipType
                  ).heading
                }
              </Button>
              : null
          }
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {
              membershipPlans.map((plan, index) => { // if we use '()' in mapping, we are implicitly returning the value. If we use '{}' in mapping, we need to explicitly return the value
                let additionalContent;
                switch (plan.type.toLowerCase()) {
                  case 'basic':
                    additionalContent = (
                      <ul>
                        <li>Candidate can apply for 2 jobs</li>
                        <li>Recruiter can post only 2 jobs</li>
                      </ul>
                    );
                    break;
                  case 'teams':
                    additionalContent = (
                      <ul>
                        <li>Candidate can apply for 5 jobs</li>
                        <li>Recruiter can post only 5 jobs</li>
                      </ul>
                    );
                    break;
                  case 'enterprise':
                    additionalContent = (
                      <ul>
                        <li>Candidate can apply for unlimited jobs</li>
                        <li>Recruiter can post unlimited jobs</li>
                      </ul>
                    );
                    break;
                  default:
                    additionalContent = null;
                }

                return (
                  <CommonCard
                    icon={
                      <div className="flex justify-between">
                        <div>
                          <JobIcon />
                        </div>
                        <h1 className="font-bold text-2xl"> {plan.heading} </h1>
                      </div>
                    }
                    title={`$ ${plan.price} /yr`}
                    description={plan.type}
                    footerContent={
                      profileInfo?.memberShipType === 'enterprise' ||
                      (profileInfo?.memberShipType === 'basic' && index == 0) || // index will give us the 0-basic, 1-teams, 2-enterprise
                      (profileInfo?.memberShipType === 'teams' &&
                        index >= 0 &&
                        index < 2 ? null : (
                        <Button
                          onClick={() => handlePayment(plan)}
                          className='disabled:opacity-65 flex h-11 items-center justify-center px-5'
                        >
                          {
                            profileInfo?.memberShipType === 'basic' ||
                              profileInfo?.memberShipType === 'teams' ? 'Update Plan' : 'Get Premium'
                          }
                        </Button>
                      )
                      )
                    }
                    additionalContent={additionalContent}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}