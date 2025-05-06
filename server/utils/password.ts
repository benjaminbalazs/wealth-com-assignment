import { createHmac } from "crypto";
import { JWT_SECRET } from "../services/jwt";

// encrypt the password based on JWT_SECRET
export function encrypt(password: string) {
	return createHmac("sha256", JWT_SECRET).update(password).digest("hex");
}
