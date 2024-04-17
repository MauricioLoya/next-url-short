

import NavBar from './components/landing/NavBar'
import Hero from './components/landing/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />

      <section className="bg-white dark:bg-gray-900 pb-20">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Start Shortening and Analyzing Today
          </h2>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Join daLink and elevate your links to the next level. Sign up now
            and transform the way you share and understand your links. It&apos;s
            fast, easy, and free to get started.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              href="/api/auth/signin"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white  shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="flex items-center gap-2 text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <img
              src="logo.png"
              className="dark:hidden h-12"
              alt="daLink Logo"
            />
            <img
              src="white-logo.png"
              className="hidden dark:block h-12"
              alt="daLink Logo"
            />
            © 2023{' All rights reserved.'}
          </span>
        </div>
      </footer>
    </main>
  )
}
