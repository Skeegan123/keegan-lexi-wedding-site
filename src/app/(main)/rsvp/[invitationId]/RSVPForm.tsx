'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { SelectGuest, SelectInvitation } from '@/db/schema';
import { updateGuest } from '@/db/queries/update';
import { insertGuest } from '@/db/queries/insert';
import { deleteGuest } from '@/db/queries/delete';
import { X } from 'lucide-react';

interface RSVPFormProps {
  invitation: SelectInvitation;
  guests: SelectGuest[];
}

export default function RSVPForm({ invitation, guests }: RSVPFormProps) {
  const [currentGuests, setCurrentGuests] = useState(guests);
  const [newGuests, setNewGuests] = useState<Partial<SelectGuest>[]>([]);
  const [localDietary, setLocalDietary] = useState<{ [key: number]: string }>({});
  const [localAttendance, setLocalAttendance] = useState<{ [key: number]: boolean }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [editingDietaryGuest, setEditingDietaryGuest] = useState<number | null>(null);
  const [editingDietarySelections, setEditingDietarySelections] = useState<{ glutenFree: boolean; dairyFree: boolean }>({
    glutenFree: false,
    dairyFree: false
  });
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initialDietary = guests.reduce((acc, guest) => ({
      ...acc,
      [guest.id]: guest.dietaryRestrictions || ''
    }), {});
    const initialAttendance = guests.reduce((acc, guest) => ({
      ...acc,
      [guest.id]: guest.isAttending == null ? true : guest.isAttending
    }), {});
    setLocalDietary(initialDietary);
    setLocalAttendance(initialAttendance);
  }, [guests]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href) {
          const url = new URL(href, window.location.href);
          if (url.origin === window.location.origin) {
            if (isDirty && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            }
          }
        }
      }
    };
    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, [isDirty]);

  const markAllAttendance = (attendance: boolean) => {
    const newAttendance = { ...localAttendance };
    currentGuests.forEach(guest => {
      newAttendance[guest.id] = attendance;
    });
    setLocalAttendance(newAttendance);
    setIsDirty(true);
  };

  const handleAttendanceChange = (id: number, isAttending: boolean) => {
    setLocalAttendance(prev => ({ ...prev, [id]: isAttending }));
    setIsDirty(true);
  };

  const handleSaveRSVP = async () => {
    setIsSaving(true);
    try {
      // Save all guest changes
      for (const guest of currentGuests) {
        const updates: Partial<SelectGuest> = {};
        
        if (localAttendance[guest.id] !== guest.isAttending) {
          updates.isAttending = localAttendance[guest.id];
        }
        
        if (localDietary[guest.id] !== guest.dietaryRestrictions) {
          updates.dietaryRestrictions = localDietary[guest.id];
        }

        if (Object.keys(updates).length > 0) {
          await updateGuest(guest.id, updates);
        }
      }

      // Save all new plus ones in one go
      for (const guest of newGuests) {
        const selectedRestrictions: string[] = [];
        if (guest.dietaryRestrictions?.includes("Gluten Free")) selectedRestrictions.push("Gluten Free");
        if (guest.dietaryRestrictions?.includes("Dairy Free")) selectedRestrictions.push("Dairy Free"); 
        const guestData = {
          firstName: guest.firstName && guest.firstName.trim() !== '' ? guest.firstName : "Plus One",
          lastName: guest.lastName || "",
          isAttending: true,
          dietaryRestrictions: selectedRestrictions.join(", "),
          isPlusOne: true,
          invitationId: invitation.id
        };
        await insertGuest(guestData);
      }

      // Clear unsaved changes after a successful save
      setIsDirty(false);
      // Navigate to the Thank You page after saving RSVP
      router.push(`/rsvp/${invitation.id}/thank-you`);
    } catch (error) {
      console.error('Error saving RSVP:', error);
      alert('There was an error saving your RSVP. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePlusOne = async (guestId: number) => {
    if (confirm("Are you sure you want to remove this plus one?")) {
      try {
        await deleteGuest(guestId);
        setCurrentGuests(prev => prev.filter(g => g.id !== guestId));
      } catch (error) {
        console.error("Error deleting plus one:", error);
        alert("Failed to delete plus one. Please try again.");
      }
    }
  };

  // Create a sorted guests array based on a desired criterion (here, the guest id)
  const sortedGuests = [...currentGuests].sort((a, b) => a.id - b.id);

  // Calculate the number of already saved plus ones
  const currentPlusOneCount = currentGuests.filter(g => g.isPlusOne).length;
  const remainingPlusOnes = invitation.maxPlusOnes != null 
    ? invitation.maxPlusOnes - currentPlusOneCount - newGuests.length 
    : 0;

  return (
    <form className="container mx-auto px-2 sm:px-4 py-4" onSubmit={(e) => e.preventDefault()}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">{invitation.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Global attendance control */}
          <div className="mb-4 sm:mb-6 flex flex-wrap justify-center sm:justify-end gap-2">
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-none" 
                variant="secondary" 
                onClick={() => markAllAttendance(true)}
              >
                All Attending
              </Button>
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white flex-1 sm:flex-none" 
                variant="secondary" 
                onClick={() => markAllAttendance(false)}
              >
                None Attending
              </Button>
          </div>

          {/* Mobile-friendly guest cards instead of a table */}
          <div className="space-y-4">
            {sortedGuests.map(guest => (
              <Card key={guest.id} className="p-3 sm:p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{guest.firstName} {guest.lastName}</h3>
                    {guest.isPlusOne && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeletePlusOne(guest.id)}
                        className="text-red-500 p-1 h-auto"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Attendance</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handleAttendanceChange(guest.id, true)}
                        className={`w-full sm:w-auto ${localAttendance[guest.id] ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white border border-green-500 text-green-500 hover:bg-green-500 hover:text-white'}`}
                      >
                        Attending
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAttendanceChange(guest.id, false)}
                        className={`w-full sm:w-auto ${!localAttendance[guest.id] ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}
                      >
                        Not Attending
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Dietary Restrictions</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => {
                        setEditingDietaryGuest(guest.id);
                        const restrictions = localDietary[guest.id] || '';
                        setEditingDietarySelections({
                          glutenFree: restrictions.toLowerCase().includes("gluten free"),
                          dairyFree: restrictions.toLowerCase().includes("dairy free")
                        });
                      }}
                    >
                      {localDietary[guest.id] ? 
                        `${localDietary[guest.id]}` : 
                        'Add Dietary Restrictions'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {editingDietaryGuest !== null && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
              <div className="bg-white p-4 rounded shadow-lg w-full max-w-xs sm:max-w-md">
                <h2 className="text-xl font-bold mb-4">Dietary Restrictions</h2>
                <div className="mb-4">
                  <Label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingDietarySelections.glutenFree}
                      onChange={(e) => setEditingDietarySelections(prev => ({ ...prev, glutenFree: e.target.checked }))}
                      className="mr-2 h-5 w-5"
                    />
                    <span className="text-base">Gluten Free</span>
                  </Label>
                </div>
                <div className="mb-4">
                  <Label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingDietarySelections.dairyFree}
                      onChange={(e) => setEditingDietarySelections(prev => ({ ...prev, dairyFree: e.target.checked }))}
                      className="mr-2 h-5 w-5"
                    />
                    <span className="text-base">Dairy Free</span>
                  </Label>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
                  <Button 
                    variant="secondary" 
                    className="w-full sm:w-auto" 
                    onClick={() => setEditingDietaryGuest(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={() => {
                      if (editingDietaryGuest !== null) {
                        const selectedRestrictions: string[] = [];
                        if (editingDietarySelections.glutenFree) selectedRestrictions.push("Gluten Free");
                        if (editingDietarySelections.dairyFree) selectedRestrictions.push("Dairy Free");
                        setLocalDietary(prev => ({ ...prev, [editingDietaryGuest]: selectedRestrictions.join(", ") }));
                        setIsDirty(true);
                      }
                      setEditingDietaryGuest(null);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Plus ones section */}
          {invitation.maxPlusOnes != null && invitation.maxPlusOnes > 0 && (newGuests.length > 0 || remainingPlusOnes > 0) && (
            <div className="mt-6 pb-4">
              <h3 className="text-xl font-semibold mb-4">Plus Ones</h3>
              <div className="space-y-4">
                {newGuests.map((guest, index) => (
                  <Card key={index} className="p-3 sm:p-4 relative">
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 text-red-500"
                      onClick={() => {
                        const newArray = [...newGuests];
                        newArray.splice(index, 1);
                        setNewGuests(newArray);
                        setIsDirty(true);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`plusOneFirstName-${index}`} className="block mb-1">First Name</Label>
                        <Input
                          id={`plusOneFirstName-${index}`}
                          value={guest.firstName || ''}
                          onChange={(e) => {
                            const newArray = [...newGuests];
                            newArray[index] = { ...newArray[index], firstName: e.target.value };
                            setNewGuests(newArray);
                            setIsDirty(true);
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`plusOneLastName-${index}`} className="block mb-1">Last Name</Label>
                        <Input
                          id={`plusOneLastName-${index}`}
                          value={guest.lastName || ''}
                          onChange={(e) => {
                            const newArray = [...newGuests];
                            newArray[index] = { ...newArray[index], lastName: e.target.value };
                            setNewGuests(newArray);
                            setIsDirty(true);
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Dietary Restrictions</p>
                        <div className="flex flex-col space-y-2">
                          <Label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={!!guest.dietaryRestrictions?.includes('Gluten Free')}
                              onChange={(e) => {
                                const newArray = [...newGuests];
                                const restrictions = guest.dietaryRestrictions?.split(',').filter(r => r.trim()) || [];
                                if (e.target.checked) {
                                  restrictions.push('Gluten Free');
                                } else {
                                  const idx = restrictions.indexOf('Gluten Free');
                                  if (idx >= 0) restrictions.splice(idx, 1);
                                }
                                newArray[index] = { ...newArray[index], dietaryRestrictions: restrictions.join(',') };
                                setNewGuests(newArray);
                                setIsDirty(true);
                              }}
                              className="mr-2 h-5 w-5"
                            />
                            <span>Gluten Free</span>
                          </Label>
                          <Label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={!!guest.dietaryRestrictions?.includes('Dairy Free')}
                              onChange={(e) => {
                                const newArray = [...newGuests];
                                const restrictions = guest.dietaryRestrictions?.split(',').filter(r => r.trim()) || [];
                                if (e.target.checked) {
                                  restrictions.push('Dairy Free');
                                } else {
                                  const idx = restrictions.indexOf('Dairy Free');
                                  if (idx >= 0) restrictions.splice(idx, 1);
                                }
                                newArray[index] = { ...newArray[index], dietaryRestrictions: restrictions.join(',') };
                                setNewGuests(newArray);
                                setIsDirty(true);
                              }}
                              className="mr-2 h-5 w-5"
                            />
                            <span>Dairy Free</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {remainingPlusOnes > 0 && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setNewGuests([...newGuests, { dietaryRestrictions: '' }])}
                  >
                    Add Plus One
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Submit button */}
          <div className="mt-6">
            <Button 
              type="button"
              onClick={handleSaveRSVP}
              disabled={isSaving}
              className="w-full py-6 text-lg"
            >
              {isSaving ? 'Submitting...' : 'Save RSVP'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

