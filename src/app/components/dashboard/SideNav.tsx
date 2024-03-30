'use client'
import Link from 'next/link'
import NavLinks from './NavLinks'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function SideNav() {
  const pathname = usePathname()
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md  p-4 md:h-40 border-dashed border-2"
        href="/"
      >
        <div className="w-32 text-dark font-bold md:w-40">daLink</div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks pathname={pathname} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button
            type="button"
            onClick={() => signOut()}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}
