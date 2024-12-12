'use client';

import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Github } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { GitHubLogin, CredentialsLogin } from '@/lib/auth/auth-action';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, { message: 'Please enter a valid password' }),
});

export function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await CredentialsLogin(values);
  }

  async function onGitHubLogin() {
    setIsLoading(true);
    await GitHubLogin();
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-semibold">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Enter your email and password below to log in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4 text-gray-500" />
                        ) : (
                          <Eye className="size-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {!isLoading ? (
                'Login'
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          disabled={isLoading}
          type="button"
          onClick={() => onGitHubLogin()}
        >
          <Github className="mr-2 size-4" />
          GitHub
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our{' '}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
