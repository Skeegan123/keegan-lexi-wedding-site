'use client';

import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  const router = useRouter();
  const { invitationId } = useParams();

  const handleEditRSVP = () => {
    if (invitationId) {
      // Force a full page reload to ensure updated data is fetched
      window.location.href = `/rsvp/${invitationId}`;
    }
  };

  const handleMainWebsite = () => {
    // Navigates to the main website (homepage)
    router.push("/");
  };

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Thank You for RSVPing!</h1>
      <p className="text-lg mb-8">Your RSVP was successfully saved.</p>
      <div className="flex space-x-4">
        <Button onClick={handleEditRSVP} variant="outline">
          Edit RSVP
        </Button>
        <Button onClick={handleMainWebsite}>
          Main Website
        </Button>
      </div>
    </div>
  );
} 