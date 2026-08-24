import { defineConfig } from "astro/config";
import rootPkg from "../../package.json";
import pkg from "./package.json";

const name = pkg.name.replace("@repo", "");
const base = rootPkg.name + name;
const outDir = "../main/public" + name;

export default defineConfig({
	base,
	devToolbar: {
		enabled: false,
	},
	outDir
});
