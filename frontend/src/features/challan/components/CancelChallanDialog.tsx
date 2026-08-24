import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useCancelChallan } from "../hooks/useChallanMutations";

import type { Challan } from "../types";

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  challan: Challan | null;
}

export default function CancelChallanDialog({
  open,
  onOpenChange,
  challan,
}: Props) {
  const cancel = useCancelChallan();

  const handleCancel = () => {
    if (!challan) return;

    cancel.mutate(
      {
        id: challan.id,

        payload: {
          status: "CANCELLED",
        },
      },
      {
        onSuccess: () =>
          onOpenChange(false),
      }
    );
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Cancel Challan
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to
            cancel
            <strong>
              {" "}
              {challan?.challanNumber}
            </strong>
            ?

            <br />
            <br />

            Inventory will be restored
            automatically.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Close
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleCancel}
            disabled={cancel.isPending}
          >
            {cancel.isPending
              ? "Cancelling..."
              : "Cancel Challan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}