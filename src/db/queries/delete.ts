"use server";

import { eq, sql } from 'drizzle-orm';
import { db } from '../index';
import { guests, invitations, mailingList } from '../schema';

export const deleteGuest = async (id: number) => {
  await db.delete(guests).where(eq(guests.id, id));
};

export const deleteInvitation = async (id: string) => {
  await db.delete(invitations).where(eq(invitations.id, id));
};

export const deleteMailingList = async (id: number) => {
  await db.delete(mailingList).where(eq(mailingList.id, id));
};

export const deleteManyGuests = async (ids: number[]) => {
  await db.delete(guests)
    .where(sql`id = ANY(${sql.raw(`ARRAY[${ids.join(',')}]`)})`);
};