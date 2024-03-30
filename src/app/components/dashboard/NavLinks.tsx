// Map of links to display in the side navigation.

import Link from 'next/link'

const links = [
  { name: 'Dashboard', href: '/dashboard', emoji: '📈' },
  {
    name: 'Links',
    href: '/dashboard/links',
    emoji: '🔗'
  }
]

export default function NavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {links.map(link => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              pathname === link.href ? 'bg-sky-100 text-blue-600' : ''
            }`}
          >
            <span>{link.emoji}</span>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
