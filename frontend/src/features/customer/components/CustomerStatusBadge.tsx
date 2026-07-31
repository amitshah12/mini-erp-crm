import { Badge } from "@/components/ui/badge";
import type { CustomerStatus } from "../types";

interface Props {
  status: CustomerStatus;
}

export default function CustomerStatusBadge({ status }: Props) {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Active
        </Badge>
      );

    case "LEAD":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          Lead
        </Badge>
      );

    case "INACTIVE":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          Inactive
        </Badge>
      );

    default:
      return <Badge>{status}</Badge>;
  }
}