'use server';

import { signIn } from './auth';

export async function GitHubLogin() {
  return await signIn('github');
}

export async function CredentialsLogin(formData: {
  email: string;
  password: string;
}) {
  return await signIn('credentials', formData);
}
