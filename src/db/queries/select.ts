"use server";

import { eq, isNotNull, not, sql } from 'drizzle-orm';
import { db } from '../index';
import { invitations, guests, mailingList } from '../schema';

export const getAllInvitations = async () => {
  return await db.select().from(invitations);
};

export const getInvitationById = async (id: string) => {
  return await db.select().from(invitations).where(eq(invitations.id, id));
};

export const getInvitationByName = async (name: string) => {
  return await db.select().from(invitations).where(eq(invitations.name, name));
};

export const getInvitationByAddress = async (address: string) => {
  return await db.select().from(invitations).where(eq(invitations.address, address));
};

export const getGuests = async () => {
  return await db.select().from(guests);
};

export const getGuestsByInvitationId = async (invitationId: string) => {
  return await db.select().from(guests).where(eq(guests.invitationId, invitationId));
};

export const getGuestsByFirstName = async (firstName: string) => {
  return await db.select().from(guests).where(eq(guests.firstName, firstName));
};

export const getGuestsByLastName = async (lastName: string) => {
  return await db.select().from(guests).where(eq(guests.lastName, lastName));
};

export const getGuestsByIsAttending = async (isAttending: boolean) => {
  return await db.select().from(guests).where(eq(guests.isAttending, isAttending));
};

export const getGuestsByIsPlusOne = async (isPlusOne: boolean) => {
  return await db.select().from(guests).where(eq(guests.isPlusOne, isPlusOne));
};

export const getMailingList = async () => {
  return await db.select().from(mailingList);
};  

export const getDashboardStats = async () => {
  // Query total guests
  const totalGuests = await db
    .select({ count: sql`COUNT(*)`.as('count') })
    .from(guests);

  // Query RSVP'd Yes
  const rsvpdYes = await db
    .select({ count: sql`COUNT(*)`.as('count') })
    .from(guests)
    .where(eq(guests.isAttending, true));

  // Query RSVP'd No
  const rsvpdNo = await db
    .select({ count: sql`COUNT(*)`.as('count') })
    .from(guests)
    .where(eq(guests.isAttending, false));

  // Query Pending RSVP
  const pendingRsvp = await db
    .select({ count: sql`COUNT(*)`.as('count') })
    .from(guests)
    .where(not(isNotNull(guests.isAttending)));

  return {
    totalGuests: Number(totalGuests[0].count),
    rsvpdYes: Number(rsvpdYes[0].count),
    rsvpdNo: Number(rsvpdNo[0].count),
    pendingRsvp: Number(pendingRsvp[0].count),
  };
};