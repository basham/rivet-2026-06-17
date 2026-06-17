import { defineConfig } from "astro/config";
import pkg from "./package.json";

const { name: base } = pkg;

export default defineConfig({
	base,
	devToolbar: {
		enabled: false,
	},
});
