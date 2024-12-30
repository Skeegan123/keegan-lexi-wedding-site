import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { SignedIn } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import '../../globals.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ClerkProvider>
          <SignedIn>
            <div className="hidden flex-col md:flex">
              <div className="border-b">
                <div className="flex h-16 items-center px-4">
                  <MainNav className="mx-6" />
                  <div className="ml-auto flex items-center space-x-4">
                    <UserNav />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4 p-8 pt-6">
                {children}
              </div>
            </div>
          </SignedIn>
        </ClerkProvider>
      </body>
    </html>
  );
}

