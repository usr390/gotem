import { motion } from 'framer-motion'
import { SignUpForm } from '@/components/sign-up-form'

export function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-muted-foreground">
            Sign up to join the case management system
          </p>
        </div>

        <SignUpForm />
      </motion.div>
    </div>
  )
}