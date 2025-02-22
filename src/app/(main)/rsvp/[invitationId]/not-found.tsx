import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Invitation Not Found</h2>
      <p className="mb-4">We couldn&apos;t find the invitation you&apos;re looking for. It may have been removed or you might have mistyped the address.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}

