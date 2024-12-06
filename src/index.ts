import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";

const schema = T.Object({
	name: T.String(),
	age: T.Number(),
});

const app = new Hono();

app.post("/user", tbValidator("json", schema), (c) => {
	const user = c.req.valid("json");
	return c.json({ success: true, message: `${user.name} is ${user.age}` });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
