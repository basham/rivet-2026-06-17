import fs from "node:fs/promises";
import path from "node:path";
import { parseHTML } from "linkedom";
import { toSlug } from "./util.js";

export const site = "Indiana Zooniversity";
export const menus = await getData();

async function getData() {
	const MAIN = "main";
	const filePath = path.resolve("./data.html");
	const rawHtml = await fs.readFile(filePath, "utf-8");
	const { document } = parseHTML(rawHtml);

	let groups = {};

	const pages = document.querySelectorAll("article.page").map((el) => {
		const label = el.querySelector("h3").textContent;
		const id = toSlug(label);
		const location = `${MAIN}.${el.querySelector(".pnum").textContent}`;
		const content = parseDL(el.querySelector("dl"));
		return {
			id,
			label,
			location,
			content,
			get items() {
				return groups[location] || [];
			},
		};
	});

	groups = Object.groupBy(pages, (page) =>
		page.location.replace(/\.\d+$/, "")
	);

	return {
		id: MAIN,
		label: site,
		items: groups[MAIN],
	};
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
