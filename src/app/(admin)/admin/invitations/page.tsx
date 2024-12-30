"use client";

import { useState, useEffect } from "react";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllInvitations } from "@/db/queries/select";
import { insertInvitation } from "@/db/queries/insert";
import { deleteInvitation } from "@/db/queries/delete";
import { updateInvitation } from "@/db/queries/update";
import { InsertInvitation, SelectInvitation } from "@/db/schema";

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<SelectInvitation[]>([]);
  const [editingInvitation, setEditingInvitation] = useState<SelectInvitation | null>(null);
  const [newInvitation, setNewInvitation] = useState<Partial<InsertInvitation>>({
    name: "",
    address: "",
    maxPlusOnes: 0,
  });

  const refreshInvitations = async () => {
    const updatedInvitations = await getAllInvitations();
    setInvitations(updatedInvitations);
  };

  useEffect(() => {
    refreshInvitations();
  }, []);

  const addInvitation = async () => {
    await insertInvitation({
      ...newInvitation,
      id: crypto.randomUUID()
    });
    setNewInvitation({
      name: "",
      address: "",
      maxPlusOnes: 0,
    });
    await refreshInvitations();
  };

  const deleteInvitationHandler = async (id: string) => {
    await deleteInvitation(id);
    await refreshInvitations();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading title="Invitations" description="Manage invitations for your wedding" />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Invitation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Invitation</DialogTitle>
              <DialogDescription>
                Enter the details of the new invitation here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newInvitation.name ?? ""}
                  onChange={(e) =>
                    setNewInvitation({ ...newInvitation, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={newInvitation.address ?? ""}
                  onChange={(e) =>
                    setNewInvitation({ ...newInvitation, address: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxPlusOnes" className="text-right">
                  Max Plus Ones
                </Label>
                <Input
                  id="maxPlusOnes"
                  type="number"
                  value={newInvitation.maxPlusOnes ?? 0}
                  onChange={(e) =>
                    setNewInvitation({ ...newInvitation, maxPlusOnes: parseInt(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addInvitation}>Add Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="my-6" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Max Plus Ones</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.name}</TableCell>
              <TableCell>{invitation.address}</TableCell>
              <TableCell>{invitation.maxPlusOnes}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingInvitation(invitation)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Invitation</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-name" className="text-right">Name</Label>
                          <Input
                            id="edit-name"
                            value={editingInvitation?.name || ""}
                            onChange={(e) =>
                              setEditingInvitation(prev => 
                                prev ? { ...prev, name: e.target.value } : null
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-address" className="text-right">Address</Label>
                          <Input
                            id="edit-address"
                            value={editingInvitation?.address || ""}
                            onChange={(e) =>
                              setEditingInvitation(prev => 
                                prev ? { ...prev, address: e.target.value } : null
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-maxPlusOnes" className="text-right">Max Plus Ones</Label>
                          <Input
                            id="edit-maxPlusOnes"
                            type="number"
                            value={editingInvitation?.maxPlusOnes || 0}
                            onChange={(e) =>
                              setEditingInvitation(prev => 
                                prev ? { ...prev, maxPlusOnes: parseInt(e.target.value) } : null
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={async () => {
                          if (editingInvitation) {
                            await updateInvitation(editingInvitation.id, {
                              name: editingInvitation.name,
                              address: editingInvitation.address,
                              maxPlusOnes: editingInvitation.maxPlusOnes,
                            });
                            setEditingInvitation(null);
                            await refreshInvitations();
                          }
                        }}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteInvitationHandler(invitation.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

