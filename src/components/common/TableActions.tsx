// C:\dev\ordenes-saas-frontend\src\components\common\TableActions.tsx

import {
  Check,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onApprove?: () => void;

  disableApprove?: boolean;
}

export function TableActions({
  onView,
  onEdit,
  onDelete,
  onApprove,
  disableApprove = false,
}: Props) {

  return (
    <div className="flex justify-end gap-1">

      {onView && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onView}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {onEdit && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onEdit}
        >
        <Pencil className="h-4 w-4" />
        </Button>
      )}

      {onApprove && (
        <Button
          size="icon"
          variant="ghost"
          disabled={disableApprove}
          onClick={onApprove}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}

      {onDelete && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

    </div>
  );
}