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
import { Checkbox } from "@/components/ui/checkbox";
import { getGuests } from "@/db/queries/select";
import { insertGuest } from "@/db/queries/insert";
import { deleteGuest, deleteManyGuests } from "@/db/queries/delete";
import { updateGuest, updateManyGuests } from "@/db/queries/update";
import { InsertGuest, SelectGuest } from "@/db/schema";
import { Badge } from "@/components/ui/badge";

export default function GuestsPage() {
  const [guests, setGuests] = useState<SelectGuest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<number[]>([]);
  const [editingGuest, setEditingGuest] = useState<SelectGuest | null>(null);
  const [newGuest, setNewGuest] = useState<Partial<InsertGuest>>({
    firstName: "",
    lastName: "",
    isAttending: null,
    dietaryRestrictions: "",
    isPlusOne: false,
  });
  const [bulkEditValue, setBulkEditValue] = useState<string>("");

  const refreshGuests = async () => {
    const updatedGuests = await getGuests();
    setGuests(updatedGuests);
  };

  useEffect(() => {
    refreshGuests();
  }, []);

  const addGuest = async () => {
    await insertGuest(newGuest);
    setNewGuest({
      firstName: "",
      lastName: "",
      isAttending: null,
      dietaryRestrictions: "",
      isPlusOne: false,
    });
    await refreshGuests();
  };

  const deleteGuestHandler = async (id: number) => {
    await deleteGuest(id);
    await refreshGuests();
  };

  const bulkUpdateHandler = async (data: Partial<InsertGuest>) => {
    await updateManyGuests(selectedGuests, data);
    setSelectedGuests([]);
    await refreshGuests();
  };

  const bulkDeleteHandler = async () => {
    await deleteManyGuests(selectedGuests);
    setSelectedGuests([]);
    await refreshGuests();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Heading title="Guests" description="Manage guests for your wedding" />
        <div className="flex gap-2">
          {selectedGuests.length > 0 && (
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Bulk Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Selected Guests</DialogTitle>
                    <DialogDescription>
                      Update details for {selectedGuests.length} selected guest(s)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">RSVP Status</Label>
                      <select
                        className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
                        value={bulkEditValue}
                        onChange={(e) => setBulkEditValue(e.target.value)}
                      >
                        <option value="">Undecided</option>
                        <option value="true">Attending</option>
                        <option value="false">Not Attending</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => {
                      bulkUpdateHandler({
                        isAttending: bulkEditValue === "" ? null : bulkEditValue === "true"
                      });
                      setBulkEditValue("");
                    }}>
                      Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Bulk Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Selected Guests</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete {selectedGuests.length} selected guest(s)? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedGuests([])}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={bulkDeleteHandler}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Guest</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Guest</DialogTitle>
                <DialogDescription>
                  Enter the details of the new guest here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstName" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={newGuest.firstName ?? ""}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, firstName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={newGuest.lastName ?? ""}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, lastName: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dietary" className="text-right">
                    Dietary Restrictions
                  </Label>
                  <Input
                    id="dietary"
                    value={newGuest.dietaryRestrictions ?? ""}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, dietaryRestrictions: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Is Plus One</Label>
                  <Checkbox
                    checked={newGuest.isPlusOne ?? false}
                    onCheckedChange={(checked) =>
                      setNewGuest({ ...newGuest, isPlusOne: checked ? true : false })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addGuest}>Add Guest</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="my-6" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedGuests.length === guests.length}
                onCheckedChange={(checked) => {
                  setSelectedGuests(
                    checked ? guests.map((guest) => guest.id) : []
                  );
                }}
              />
            </TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>RSVP Status</TableHead>
            <TableHead>Dietary Restrictions</TableHead>
            <TableHead>Plus One</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>
                <Checkbox
                  checked={selectedGuests.includes(guest.id)}
                  onCheckedChange={(checked) => {
                    setSelectedGuests(
                      checked
                        ? [...selectedGuests, guest.id]
                        : selectedGuests.filter((id) => id !== guest.id)
                    );
                  }}
                />
              </TableCell>
              <TableCell>{guest.firstName}</TableCell>
              <TableCell>{guest.lastName}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    guest.isAttending === true
                      ? "success"
                      : guest.isAttending === false
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {guest.isAttending === true
                    ? "Attending"
                    : guest.isAttending === false
                    ? "Declined"
                    : "Undecided"}
                </Badge>
              </TableCell>
              <TableCell>{guest.dietaryRestrictions}</TableCell>
              <TableCell>
                <Badge variant={guest.isPlusOne ? "success" : "secondary"}>
                  {guest.isPlusOne ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingGuest(guest)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Guest</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-firstName" className="text-right">First Name</Label>
                          <Input
                            id="edit-firstName"
                            value={editingGuest?.firstName || ""}
                            onChange={(e) =>
                              setEditingGuest(prev => 
                                prev ? { ...prev, firstName: e.target.value } : null
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-lastName" className="text-right">Last Name</Label>
                          <Input
                            id="edit-lastName"
                            value={editingGuest?.lastName || ""}
                            onChange={(e) =>
                              setEditingGuest(prev => 
                                prev ? { ...prev, lastName: e.target.value } : null
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">RSVP Status</Label>
                          <select
                            className="col-span-3 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
                            value={editingGuest?.isAttending === null ? "" : editingGuest?.isAttending?.toString()}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditingGuest(prev =>
                                prev ? {
                                  ...prev,
                                  isAttending: value === "" ? null : value === "true"
                                } : null
                              );
                            }}
                          >
                            <option value="">Undecided</option>
                            <option value="true">Attending</option>
                            <option value="false">Not Attending</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-dietary" className="text-right">Dietary Restrictions</Label>
                          <Input
                            id="edit-dietary"
                            value={editingGuest?.dietaryRestrictions || ""}
                            onChange={(e) =>
                              setEditingGuest(prev => 
                                prev ? { ...prev, dietaryRestrictions: e.target.value } : null
                              )
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Is Plus One</Label>
                          <Checkbox
                            checked={editingGuest?.isPlusOne || false}
                            onCheckedChange={(checked) =>
                              setEditingGuest(prev =>
                                prev ? { ...prev, isPlusOne: !!checked } : null
                              )
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={async () => {
                          if (editingGuest) {
                            await updateGuest(editingGuest.id, {
                              firstName: editingGuest.firstName,
                              lastName: editingGuest.lastName,
                              isAttending: editingGuest.isAttending,
                              dietaryRestrictions: editingGuest.dietaryRestrictions,
                              isPlusOne: editingGuest.isPlusOne,
                            });
                            setEditingGuest(null);
                            await refreshGuests();
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
                    onClick={() => deleteGuestHandler(guest.id)}
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

