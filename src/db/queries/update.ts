"use server";

import { eq, sql } from 'drizzle-orm';
import { db } from '../index';
import { guests, InsertGuest, InsertInvitation, invitations } from '../schema';

export const updateGuest = async (id: number, data: Partial<InsertGuest>) => {
  await db.update(guests).set(data).where(eq(guests.id, id));
};

export const updateInvitation = async (id: string, data: Partial<InsertInvitation>) => {
  await db.update(invitations).set(data).where(eq(invitations.id, id));
};

export const addPlusOnes = async (uuid: string, count: number = 1) => {
  await db.update(invitations).set({ maxPlusOnes: sql`max_plus_ones + ${count}` }).where(eq(invitations.id, uuid));
};

export const updateManyGuests = async (ids: number[], data: Partial<InsertGuest>) => {
  await db.update(guests)
    .set(data)
    .where(sql`id = ANY(${sql.raw(`ARRAY[${ids.join(',')}]`)})`);
};
