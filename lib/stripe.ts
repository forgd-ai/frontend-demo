import Stripe from "stripe"

// Placeholder key for local workshop use. Any real Stripe API call fails
// with an auth error; the labs do not exercise billing.
export const stripe = new Stripe("sk_test_workshop_placeholder", {
  apiVersion: "2022-11-15",
  typescript: true,
})
