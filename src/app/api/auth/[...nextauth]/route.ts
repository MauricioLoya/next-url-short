export const runtime = 'edge'

import NextAuth, { Account, Profile, User } from 'next-auth'
// import Discord from 'next-auth/providers/discord'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { createUserByProvider, findUserByEmail } from '@/app/lib/users/sql/user'

interface SignInArgs {
  user: User
  account: Account | null
  profile?: Profile
}
const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? '',
    //   clientSecret: process.env.GITHUB_SECRET ?? ''
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn(data: SignInArgs): Promise<boolean> {
      if (!data.account) return false
      try {
        const { email, name } = data.user
        const { provider } = data.account

        if (!email || !name || !provider) return false
        const userFound = await findUserByEmail(email)
        if (!userFound) {
          const userCreated = await createUserByProvider({
            email,
            provider,
            first_name: name
          })
          if (!userCreated) return false
        }
      } catch (error) {
        return false
      }
      return true
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
