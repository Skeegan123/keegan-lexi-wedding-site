"use server";

import { NextResponse } from "next/server";
import { insertGuest, insertInvitation } from "@/db/queries/insert";
import type { InsertGuest, InsertInvitation } from "@/db/schema";
import { parse } from "csv-parse/sync";
import { randomUUID } from "crypto";
import { addPlusOnes } from "@/db/queries/update";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const csvFile = formData.get("file");
    if (!csvFile || !(csvFile instanceof File)) {
      return NextResponse.json(
        { error: "CSV file is required" },
        { status: 400 }
      );
    }

    // Read the file as text
    const fileContent = await csvFile.text();

    // Parse the CSV file; this uses the first row as the header.
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { error: "CSV file does not contain any data rows" },
        { status: 400 }
      );
    }

    // Create a Map to hold the CSV invitation IDs and their corresponding generated UUIDs.
    const invitationIdMapping: Map<string, string> = new Map();
    const guests: InsertGuest[] = [];

    for (const record of records) {
      // Assume the CSV may have either "InvitationId" or "Invitation ID" as the column
      const csvInvitationId = record["Invitation ID"];
      if (!csvInvitationId) {
        // Optionally, handle or skip records that don't have an invitation id.
        continue;
      }

      let invitationUuid: string;
      if (invitationIdMapping.has(csvInvitationId)) {
        // Reuse the generated UUID if we've seen this invitation before.
        invitationUuid = invitationIdMapping.get(csvInvitationId)!;
      } else {
        // Generate a new UUID using Node's crypto.randomUUID() and store it in the Map.
        invitationUuid = randomUUID();
        invitationIdMapping.set(csvInvitationId, invitationUuid);

        const invitationData: InsertInvitation = {
          id: invitationUuid,
          name: record["Invitation Name"] || "",
          address: record["Mailing Address"] || "",
          maxPlusOnes: 0,
        };

        await insertInvitation(invitationData);
      }

      if (record["# Plus Ones"] !== "") {
        await addPlusOnes(invitationUuid, parseInt(record["# Plus Ones"]));
      }

      // Build the guest object.
      const guestData: InsertGuest = {
        invitationId: invitationUuid,
        // Map additional CSV fields to your guest schema as needed.
        firstName: record["First Name"] || "",
        lastName: record["Last Name"] || "",
        isAttending: null,
        dietaryRestrictions: "",
        isPlusOne: false,
      };

      guests.push(guestData);
      console.log(guestData);
    }

    // Insert guests into database
    await Promise.all(guests.map(guest => insertGuest(guest)));

    return NextResponse.json({ success: true, inserted: guests.length });
  } catch (error: unknown) {
    console.error("CSV Import error:", error);
    return NextResponse.json(
      {
        error: "Failed to import CSV",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
} 