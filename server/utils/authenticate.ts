import type { IToken } from "./../models/token";
import { model } from "mongoose";
import type { HydratedDocument } from "mongoose";
import { Token } from "../models/token";
import { User } from "../models/user";
import { verifyToken } from "../services/jwt";
import { H3Event, createError } from "h3";

export type Roles = "owner" | "admin";

export interface Visiblity {
	visibility?: Roles;
	readonly?: boolean;
	hidden?: boolean;
}

export function getIdToken(event: H3Event) {
	return getCookie(event, useRuntimeConfig().public.cookieNamespace) ?? getHeader(event, "Authorization")?.replace("Bearer ", "") ?? (getQuery(event).token as string);
}

export async function authenticate(event: H3Event, adminOnly: boolean = false) {
	const idToken = getIdToken(event);

	if (!idToken || idToken?.length < 10) {
		throw createError({
			status: 401,
			statusText: `Token is missing`,
		});
	}

	// if token is valid, verify it
	await verifyToken(idToken).catch((error) => {
		throw createError({
			status: 401,
			statusText: `Invalid JWT token: ${idToken}`,
		});
	});

	// find token and check if it is valid
	const token = await Token.findOne({ value: idToken });

	if (!token) {
		throw createError({
			status: 401,
			statusText: `Token cannot be found: ${idToken}`,
		});
	}

	if (token.expires_at < new Date()) {
		throw createError({
			status: 401,
			statusText: `Token has expired: ${idToken}`,
		});
	}

	if (adminOnly && token!.role !== "admin") {
		throw createError({
			status: 401,
			statusText: `Token has no admin role: ${token.id}`,
		});
	}

	// load the user
	const owner = await User.findOne({ _id: token.owner }).exec();

	if (!owner) {
		throw createError({
			status: 401,
			statusText: `Invalid user. User: ${token.owner}`,
		});
	}

	return { owner: owner!, token: token! };
}

export async function checkDocumentOwner(event: H3Event, token: HydratedDocument<IToken>, modelName: string): Promise<boolean> {
	if (token.role === "admin") {
		return true;
	}

	const { id } = event.context.params as { id: string };

	// retreive document
	const document = await model(modelName).findById(id).select("owner");

	if (!document) {
		throw createError({
			status: 404,
			statusText: `Document '${modelName}:${id}' is not found. User: ${token.owner}`,
		});
	}

	return document.owner.toString() === token.owner.toString();
}

/* export async function validateOwnerBody(event: H3Event, token: HydratedDocument<IToken>) {
	if (token.role === "owner") {
		const body = await readBody<{ owner?: string }>(event);

		if (!body.owner) {
			throw createError({
				statusCode: 403,
				statusMessage: `Missing owner. User: ${token.owner}`,
			});
		}

		if (body.owner !== token.owner.toString()) {
			throw createError({
				statusCode: 403,
				statusMessage: `Invalid owner. User: ${token.owner}`,
			});
		}
	}
}



export async function checkDocumentOwnerOrRecipient(event: H3Event, token: HydratedDocument<IToken>, modelName: string): Promise<void> {
	if (token.role === "admin") {
		return;
	}

	const { id } = event.context.params as { id: string };

	// retreive document
	const document = await model(modelName).findById(id).select("owner");

	if (!document) {
		throw createError({
			status: 404,
			statusText: `Document '${modelName}:${id}' is not found. User: ${token.owner}`,
		});
	}

	// check if the owner is a match
	if ([document.owner.toString(), document.recipient.toString()].includes(token.owner.toString()) === false) {
		throw createError({
			status: 403,
			statusText: `User: ${token.owner} is not owner or recipient`,
		});
	}
} */
