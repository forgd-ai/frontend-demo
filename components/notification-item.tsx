import { DashboardNotification } from "types"
import { cn, formatDate } from "@/lib/utils"

interface NotificationItemProps {
  notification: DashboardNotification
  onMarkRead: (id: string) => void
}

export function NotificationItem({
  notification,
  onMarkRead,
}: NotificationItemProps) {
  return (
    <button
      type="button"
      onClick={() => onMarkRead(notification.id)}
      className="flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          notification.read ? "bg-transparent" : "bg-primary"
        )}
        aria-hidden="true"
      />
      <span className="flex flex-col gap-1">
        <span className="text-sm font-medium leading-none">
          {notification.title}
        </span>
        <span className="line-clamp-2 text-sm text-muted-foreground">
          {notification.body}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDate(notification.createdAt)}
        </span>
      </span>
    </button>
  )
}
