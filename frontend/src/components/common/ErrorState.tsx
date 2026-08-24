import { Button } from "@/components/ui/button";

interface Props {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: Props) {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-xl font-semibold">
          ⚠ Error
        </h2>

        <p className="text-muted-foreground">
          {message}
        </p>

        {onRetry && (
          <Button onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}