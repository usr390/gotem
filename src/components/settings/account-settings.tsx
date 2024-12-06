import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-hooks';
import { toast } from 'sonner';

const accountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  badgeNumber: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

export function AccountSettings() {
  const { user } = useAuth();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      badgeNumber: '',
    },
  });

  function onSubmit(data: AccountFormValues) {
    toast.success('Account settings updated successfully');
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Update your account information and credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormDescription>
                      Used for important notifications and two-factor authentication
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="badgeNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Badge/ID Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your official identification number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </motion.div>
      </CardContent>
    </Card>
  );
}