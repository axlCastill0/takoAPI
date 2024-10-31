import * as mysql from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import "jsr:@std/dotenv/load";

export const client = new mysql.Client();

try {
	client.connect({
		hostname: Deno.env.get("beaver_host"),
		username: Deno.env.get("beaver_user"),
		db: Deno.env.get("beaver_db"),
		password: Deno.env.get("beaver_pw"),
	});
} catch {
	console.log("mistakes were made");
}
