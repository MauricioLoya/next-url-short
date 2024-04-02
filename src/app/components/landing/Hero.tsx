import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 mt-10">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2">
            NEW!
          </span>
          <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
            Shorten. Share. Analyze with daLink.
          </h1>
          <h3 className="text-gray-900 dark:text-white text-xl md:text-xl font-extrabold mb-2">
            Take your link analysis to the next level with daLink.
          </h3>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
            Transform your long links into short, sleek, and measurable
            versions. Gain valuable insights to optimize your digital content
            and communication strategies.
          </p>
          <Link
            target="_blank"
            href="https://dalink.xyz/Mauricio"
            className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Read more about its creator
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
              </svg>
              About
            </span>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
              Meet daLink
            </h2>
            <h3 className="text-gray-900 dark:text-white text-xl font-extrabold mb-2">
              Don’t just shorten, understand your links
            </h3>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
              daLink goes beyond just shortening links, providing you with a
              robust platform to analyze the performance of each of your links.
              Discover where your clicks are coming from, which strategies work
              best, and how your audience interacts with your content.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                />
              </svg>
              Features
            </span>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
              Empower Your Links With Data Intelligence
            </h2>
            <ul className="list-disc text-gray-500 dark:text-gray-400 text-lg font-normal mb-4">
              <li>
                <b>Elegant Shortening</b>: Create shorter, more memorable links
                that reflect your brand and message.
              </li>
              <li>
                <b>In-depth Analysis</b>: Get real-time insights on your links’
                performance, including clicks, user geolocation, devices, and
                more.
              </li>
              <li>
                <b>Easy Integration</b>: Effortlessly integrate daLink into your
                existing workflow with our API and plugins.
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
              </svg>
              How It Works
            </span>
            <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
              In Three Simple Steps
            </h2>

            <ol className="list-decimal text-gray-500 dark:text-gray-400 text-lg font-normal mb-4">
              <li>
                <b>Shorten</b>: Enter your long link to instantly get a shorter,
                more manageable version.
              </li>
              <li>
                <b>Share</b>: Use your short links on social media, emails, or
                any digital channel.
              </li>
              <li>
                <b>Analyze</b>: Access your dashboard to see detailed statistics
                and gain valuable insights.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
