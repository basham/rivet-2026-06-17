import { defineConfig } from "astro/config";
import rootPkg from "../../package.json";
import pkg from "./package.json";

const base = pkg.name.replace("@prototypes", rootPkg.name);

export default defineConfig({
	base,
	devToolbar: {
		enabled: false,
	},
});
