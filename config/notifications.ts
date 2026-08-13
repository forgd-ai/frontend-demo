import { DashboardNotification } from "types"

// Sample data for the notification center. The feature reads from this
// fixture so it needs no backend; read state lives in component state.
// Timestamps are fixed so server and client render identically.
export const notifications: DashboardNotification[] = [
  {
    id: "n-1",
    title: "Your post was published",
    body: "Deploying Next.js applications is now live on your blog.",
    createdAt: "2026-08-07T15:10:00.000Z",
    read: false,
  },
  {
    id: "n-2",
    title: "New comment",
    body: "A reader left a comment on Server and client components.",
    createdAt: "2026-08-07T09:45:00.000Z",
    read: false,
  },
  {
    id: "n-3",
    title: "Draft reminder",
    body: "Your draft About static exports has not been edited in a week.",
    createdAt: "2026-08-06T18:20:00.000Z",
    read: false,
  },
  {
    id: "n-4",
    title: "Welcome",
    body: "Thanks for signing up. Create your first post to get started.",
    createdAt: "2026-08-05T12:00:00.000Z",
    read: true,
  },
]
