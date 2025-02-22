import { notFound } from 'next/navigation';
import RSVPForm from './RSVPForm';
import { getInvitationById, getGuestsByInvitationId } from '@/db/queries/select';

export default async function RSVPPage({ params }: { params: { invitationId: string } }) {
  const [invitation] = await getInvitationById(params.invitationId);
  
  if (!invitation) {
    notFound();
  }

  const guests = await getGuestsByInvitationId(invitation.id);

  return <RSVPForm invitation={invitation} guests={guests} />;
}

