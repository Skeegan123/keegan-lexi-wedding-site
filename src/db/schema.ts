import { pgTable, serial, text, uuid, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

export const invitations = pgTable('invitations', {
  id: uuid('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
  name: text('name'),
  address: text('address'),
  maxPlusOnes: integer('max_plus_ones').default(0),
});

export const guests = pgTable('guests', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
  invitationId: uuid('invitation_id').references(() => invitations.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  firstName: text('first_name'),
  lastName: text('last_name'),
  isAttending: boolean('is_attending'),
  dietaryRestrictions: text('dietary_restrictions'),
  isPlusOne: boolean('is_plus_one').default(false),
});

export const mailingList = pgTable('mailing_list', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  email: text('email').notNull(),
});

export type InsertInvitation = typeof invitations.$inferInsert;
export type InsertGuest = typeof guests.$inferInsert;
export type InsertMailingList = typeof mailingList.$inferInsert;

export type SelectInvitation = typeof invitations.$inferSelect;
export type SelectGuest = typeof guests.$inferSelect;
export type SelectMailingList = typeof mailingList.$inferSelect;