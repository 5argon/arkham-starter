import { sync } from "./sync.ts";

const args = Deno.args;
if (args.length !== 2) {
  console.log("Requires 2 arguments, the path of input and output folder.");
  Deno.exit();
}
const input = args[0];
const output = args[1];

console.log("sveltekit-stories-watcher started.");

await sync(input, output);
const watcher = Deno.watchFs(input);
for await (const _ of watcher) {
  // TODO: Do better than this by actually looking at the event.
  await sync(input, output);
}
