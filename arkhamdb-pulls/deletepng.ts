import { walk } from "./mod.ts"

// Do this after using external program to batch create the WEBP.
const path = "pulls/card"
for await (const entry of walk(path)) {
  if (entry.isFile && entry.name.endsWith(".png")) {
    console.log("Deleting", entry.name)
    await Deno.remove(entry.path)
  }
}
