'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

export default function Header({ user, profileInfo }) {

  const menuItems = [
    {
      label: 'Home', // name which is shown
      path: '/', // path which it leads to, when clicked
      show: true // whether we want to show or not
    },
    {
      label: 'Login',
      path: '/sign-in',
      show: !user // only shown when user is not authenticated
    },
    {
      label: 'Register',
      path: '/sign-up',
      show: !user // only shown when user is not authenticated
    },
    {
      label: 'Activity',
      path: '/activity',
      show: profileInfo?.role === 'candidate'
    },
    {
      label: 'Jobs',
      path: '/jobs',
      show: user
    },
    {
      label: 'Membership',
      path: '/membership',
      show: user
    },
    {
      label: 'Account',
      path: '/account',
      show: user
    }
  ]

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link 
            href={'/'} 
            className="hidden mr-6 lg:flex"
            >
              <h3>SKILLX</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {/* Here, below we will render all the menu items that we will be having */}
              {
                menuItems.map((menuItem) =>
                  menuItem.show ?
                    <Link 
                    href={menuItem.path} 
                    onClick={() => sessionStorage.removeItem('filterParams')}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    >
                      {menuItem.label}
                    </Link>
                    : null
                )
              }
              <UserButton afterSignOutUrl="/" />
            </div>
          </SheetContent>
        </Sheet>
        {/* Above 'Sheet' will basically handle the mobile version */}

        <Link href={'/'} className="hidden font-bold text-3xl lg:flex mr-6">SKILLX</Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {
            menuItems.map((menuItem) => menuItem.show ?
              <Link href={menuItem.path}
                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">
                {menuItem.label}
              </Link>
              : null)
          }
          <UserButton afterSignOutUrl="/" />
          {/* We will ge sign out option i.e. the small profile icon is due to the above button. After signing out, we will be redirected to '/' url */}

        </nav>
      </header>
    </div>
  )
}