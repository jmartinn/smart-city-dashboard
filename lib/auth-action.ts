'use server';
import { signIn } from './auth';

export async function GitHubLogin() {
  return await signIn('github');
}
