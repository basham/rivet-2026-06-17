export const site = "Indiana University Bloomington";

const applyMenu = [
	["Freshman Applicants"],
	["Graduate Applicants"],
	["Returning Applicants"],
	["Visiting & Non-degree Applicants"],
	["Transfer Applicants"],
	["Application Materials"],
	["Credits & Transfer"],
	["Manage Your Application"],
	["How to Apply"],
].map(mapToMenu);
const admissionsMenu = [
	["Apply", null, applyMenu],
	["Admissions Paths"],
	["Admissions Events"],
	["Visit IU"],
	["Meet Your Counselors"],
	["Precollege Programs"],
	["Planning for IU"],
	["Class Profile"],
	["After Admission"],
	["Admissions Viewbook"],
	["For Counselors"],
	["For Families"],
	["Request Information"],
].map(mapToMenu);
const homeMenu = [
	["Academics"],
	["Admissions", null, admissionsMenu],
	["Cost & Aid"],
	["Campus Life"],
	["Support & Services"],
	["Research"],
	["About IU"],
	["Alumni & Giving"],
].map(mapToMenu);
export const menus = mapToMenu([site, "", homeMenu]);

function mapToMenu([label, id, items = []]) {
	return { label, id, items };
}
