import fs from "node:fs/promises";
import path from "node:path";
import { parseHTML } from "linkedom";
import { toSlug } from "./util.js";

export async function getData() {
	const filePath = path.resolve("./data.html");
	const rawHtml = await fs.readFile(filePath, "utf-8");
	const { document } = parseHTML(rawHtml);
	const pages = document.querySelectorAll("article.page").map((el) => {
		const label = el.querySelector("h3").textContent;
		const id = toSlug(label);
		const location = `main.${el.querySelector(".pnum").textContent}`;
		const content = parseDL(el.querySelector("dl"));
		return { id, label, location, content };
	});
	const groups = Object.groupBy(pages, (page) =>
		page.location.replace(/\.\d+$/, "")
	);
	const pagesWithItems = pages.map((page) => {
		const items = groups[page.location] || [];
		return { ...page, items };
	})
	return pagesWithItems;
}

function parseDL(dl) {
	const result = {};
	let currentKey = null;

	for (const child of dl.children) {
		const tagName = toSlug(child.tagName);
		if (tagName === "dt") {
			currentKey = toSlug(child.textContent);
		} else if (tagName === "dd" && currentKey) {
			result[currentKey] = child.textContent.trim();
			currentKey = null;
		}
	}

	return result;
}

export const menus = await getData();

export const site = "Indiana Zoouniversity";

