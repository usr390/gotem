import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export function SignUpForm() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '' as 'police_officer' | 'prosecutor' | 'admin' | ''
  })
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      // Step 1: Create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('No user returned after signup')

      // Step 2: Create the profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            name: formData.name,
            role: formData.role,
          }
        ])

      if (profileError) throw profileError

      toast.success('Account created successfully! Please check your email for verification.')
      navigate('/login')
      
    } catch (error: any) {
      console.error('Error:', error)
      toast.error(error.message || 'Error signing up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full"
          required
        />
        
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="w-full"
          required
        />

        <Input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full"
          required
        />

        <Select 
          value={formData.role}
          onValueChange={(value) => setFormData(prev => ({ 
            ...prev, 
            role: value as typeof formData.role 
          }))}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="police_officer">Police Officer</SelectItem>
            <SelectItem value="prosecutor">Prosecutor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </form>
  )
}