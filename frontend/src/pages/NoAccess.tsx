import { ShieldAlert } from "lucide-react";

export default function NoAccess() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md text-center">
        <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-destructive" />

        <h1 className="text-3xl font-bold">
          Access Restricted
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your current role does not have access to
          the available ERP modules.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Please contact your administrator if you
          believe this is an error.
        </p>
      </div>
    </div>
  );
}