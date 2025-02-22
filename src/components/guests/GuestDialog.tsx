import { Dialog, DialogContent, DialogFooter, DialogHeader, 
         DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { InsertGuest, SelectInvitation, SelectGuest } from "@/db/schema";

type GuestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingGuest: SelectGuest | null; // null => new guest
  onSave: (data: Partial<InsertGuest>) => Promise<void>;
  invitations?: SelectInvitation[]; // optional if you want to allow picking invitation
};

export function GuestDialog({
  open,
  onOpenChange,
  existingGuest,
  onSave,
  invitations = [],
}: GuestDialogProps) {
  const [guestData, setGuestData] = useState<Partial<InsertGuest>>({});

  useEffect(() => {
    // On open or when existingGuest changes, copy fields in
    if (existingGuest) {
      setGuestData({
        firstName: existingGuest.firstName,
        lastName: existingGuest.lastName,
        isAttending: existingGuest.isAttending,
        dietaryRestrictions: existingGuest.dietaryRestrictions,
        isPlusOne: existingGuest.isPlusOne,
        invitationId: existingGuest.invitationId,
      });
    } else {
      // new guest defaults
      setGuestData({
        firstName: "",
        lastName: "",
        isAttending: null,
        dietaryRestrictions: "",
        isPlusOne: false,
        invitationId: "",
      });
    }
  }, [existingGuest, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existingGuest ? "Edit Guest" : "Add Guest"}</DialogTitle>
          <DialogDescription>
            {existingGuest ? "Modify this guest." : "Enter new guest details."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">First Name</Label>
            <Input
              value={guestData.firstName ?? ""}
              onChange={(e) => setGuestData({ ...guestData, firstName: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Last Name</Label>
            <Input
              value={guestData.lastName ?? ""}
              onChange={(e) => setGuestData({ ...guestData, lastName: e.target.value })}
              className="col-span-3"
            />
          </div>
          {/* Additional fields: isAttending, dietaryRestrictions, etc. */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Is Plus One</Label>
            <Checkbox
              checked={guestData.isPlusOne ?? false}
              onCheckedChange={(checked) =>
                setGuestData({ ...guestData, isPlusOne: checked ? true : false })
              }
            />
          </div>
          {/* Optional: Invitation dropdown */}
          {invitations.length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Invitation</Label>
              <select
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
                value={guestData.invitationId || ""}
                onChange={(e) =>
                  setGuestData({ ...guestData, invitationId: e.target.value })
                }
              >
                <option value="">None</option>
                {invitations.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              await onSave(guestData);
              onOpenChange(false);
            }}
          >
            {existingGuest ? "Save Changes" : "Add Guest"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 