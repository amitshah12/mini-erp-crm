import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="text-5xl">
          📦
        </div>

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-muted-foreground">
          {description}
        </p>

        {actionLabel && onAction && (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}