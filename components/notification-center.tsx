"use client"

import * as React from "react"

import { DashboardNotification } from "types"
import { notifications as notificationData } from "@/config/notifications"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { NotificationItem } from "@/components/notification-item"

export function NotificationCenter() {
  const [notifications, setNotifications] =
    React.useState<DashboardNotification[]>(notificationData)
  const contentRef = React.useRef<React.ElementRef<typeof PopoverContent>>(
    null
  )

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length

  function markRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  function markAllRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true }))
    )
    // The "Mark all as read" button unmounts once unreadCount hits zero,
    // which would otherwise drop keyboard/AT focus to <body>.
    contentRef.current?.focus()
  }

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "relative h-9 w-9 px-0"
        )}
      >
        <Icons.bell className="h-5 w-5" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        )}
        <span className="sr-only">
          Open notifications
          {unreadCount > 0 ? `, ${unreadCount} unread` : ""}
        </span>
      </PopoverTrigger>
      <PopoverContent ref={contentRef} align="end" className="w-80 p-0 sm:w-96">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm font-medium">Notifications</p>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Mark all as read
            </button>
          )}
        </div>
        <Separator />
        {notifications.length > 0 ? (
          <ScrollArea className="h-80">
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={markRead}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
            <Icons.bell
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              You are all caught up.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
