import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModalStore }
  from "@/store/modalStore";

export default function GlobalModal() {
  const {
    open,
    title,
    content,
    closeModal,
  } = useModalStore();

  return (
    <Dialog
      open={open}
      onOpenChange={closeModal}
    >
      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>

        {content}

      </DialogContent>
    </Dialog>
  );
}