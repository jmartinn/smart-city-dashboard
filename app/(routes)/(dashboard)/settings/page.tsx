import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth/auth';

import { AccountForm } from './components/account-form';

export default async function SettingsAccountPage() {
  const session = await auth();

  const defaultValues = {
    name: session?.user?.name!,
    email: session?.user?.email!,
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your email, name and more.
        </p>
      </div>
      <Separator />
      <AccountForm defaultValues={defaultValues} />
    </div>
  );
}
