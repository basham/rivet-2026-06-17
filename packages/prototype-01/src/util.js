export function getMenus(menus, Astro) {
	const pages = [];

	function getMenu(data, depth = 0, parent = null) {
		const { id: _id, label = "", items: _items = [], ...other } = data;
		const main = depth === 0;
		const id = _id ?? toSlug(label);
		const url = getUrl(id === "main" ? "" : id);
		const current = url === removeEnd(Astro?.url?.pathname, "/");
		const page = {
			...other,
			current,
			depth,
			getParent: () => pages.find((menu) => menu.id === parent?.id),
			id,
			label,
			main,
			url,
			items: [],
		};
		const items = _items.map((item) => getMenu(item, depth + 1, page));
		const hasCurrent = items.some((item) => item.current);
		const hasChildren = !!items.length;
		const menu = {
			...page,
			hasChildren,
			hasCurrent,
			items,
			get parent () {
				return this.getParent();
			}
		};
		pages.push(menu);
		return menu;
	}

	getMenu(menus);

	const all = pages.filter((menu) => menu.hasChildren);
	const main = pages.find((menu) => menu.main);
	const current = pages.find((menu) => menu.hasCurrent) || main;
	const page = pages.find((menu) => menu.current) || main;

	return {
		all,
		current,
		main,
		page,
		pages,
	};
}

export function getUrl(path = "") {
	const base = import.meta.env.BASE_URL || "/";
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	const trimmedPath = cleanPath.length === 1 ? "" : cleanPath;
	return `${base}${trimmedPath}`.replace(/\/+/g, "/");
}

export function removeEnd(str, end) {
	if (!str) {
		return null;
	}
	const endsWith = new RegExp(`${end}$`);
	return str.replace(endsWith, "");
}

export function toSlug(string) {
	return string
		.toString()
		.toLowerCase()
		.trim()
		.normalize("NFD")
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
