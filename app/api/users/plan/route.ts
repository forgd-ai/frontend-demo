import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getUserSubscriptionPlan } from "@/lib/subscription"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    // Toggle between the free and pro plans. Plan state is stored locally
    // and no payment is processed.
    if (subscriptionPlan.isPro) {
      await db.user.update({
        where: { id: session.user.id },
        data: {
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
        },
      })
    } else {
      await db.user.update({
        where: { id: session.user.id },
        data: {
          stripePriceId: "pro-local",
          stripeCurrentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ),
        },
      })
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}
