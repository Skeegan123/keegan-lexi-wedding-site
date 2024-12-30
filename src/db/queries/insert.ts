"use server";

import { db } from '../index';
import { InsertInvitation, InsertGuest, InsertMailingList, invitations, guests, mailingList } from '../schema';

export const insertInvitation = async (invitation: InsertInvitation) => {
  await db.insert(invitations).values(invitation);
};

export const insertGuest = async (guest: InsertGuest) => {
  await db.insert(guests).values(guest);
};

export const insertMailingList = async (data: InsertMailingList) => {
  await db.insert(mailingList).values(data);
};
