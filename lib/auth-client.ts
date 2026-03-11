<<<<<<< HEAD
import { twoFactorClient, magicLinkClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
=======
import { createAuthClient } from "better-auth/react"
import { emailOTPClient } from "better-auth/client/plugins"
>>>>>>> 0808b0a (edit register)

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
<<<<<<< HEAD
        twoFactorClient(),
        magicLinkClient()
=======
        emailOTPClient()
>>>>>>> 0808b0a (edit register)
    ]
})