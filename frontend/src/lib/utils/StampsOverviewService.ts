// Define what a park consists of
export interface Park {
	code: string;
	name: string;
	city: string;
	stamp: string;
}

// Information on all of the parks
export const parks: Park[] = [
	{
		code: "CABE",
		name: "Carolina Beach State Park",
		city: "Carolina Beach",
		stamp: "./stamps/CABE.svg",
	},
	{
		code: "CACR",
		name: "Carvers Creek State Park",
		city: "Spring Lake",
		stamp: "./stamps/CACR.svg",
	},
	{
		code: "CHRO",
		name: "Chimney Rock State Park",
		city: "Chimney Rock",
		stamp: "./stamps/CHRO.svg",
	},
	{
		code: "CLNE",
		name: "Cliffs of the Neuse State Park",
		city: "Seven Springs",
		stamp: "./stamps/CLNE.svg",
	},
	{
		code: "CRMO",
		name: "Crowders Mountain State Park",
		city: "Kings Mountain",
		stamp: "./stamps/CRMO.svg",
	},
	{
		code: "DISW",
		name: "Dismal Swamp State Park",
		city: "South Mills",
		stamp: "./stamps/DISW.svg",
	},
	{
		code: "ELKN",
		name: "Elk Knob State Park",
		city: "Todd",
		stamp: "./stamps/ELKN.svg",
	},
	{
		code: "ENRI",
		name: "Eno River State Park",
		city: "Durham",
		stamp: "./stamps/ENRI.svg",
	},
	{
		code: "FALA",
		name: "Falls Lake State Recreation Area",
		city: "Wake Forest",
		stamp: "./stamps/FALA.svg",
	},
	{
		code: "FOFI",
		name: "Fort Fisher State Recreation Area",
		city: "Kure Beach",
		stamp: "./stamps/FOFI.svg",
	},
	{
		code: "FOMA",
		name: "Fort Macon State Park",
		city: "Atlantic Beach",
		stamp: "./stamps/FOMA.svg",
	},
	{
		code: "GOCR",
		name: "Goose Creek State Park",
		city: "Washington",
		stamp: "./stamps/GOCR.svg",
	},
	{
		code: "GORG",
		name: "Gorges State Park",
		city: "Sapphire",
		stamp: "./stamps/GORG.svg",
	},
	{
		code: "GRMO",
		name: "Grandfather Mountain State Park",
		city: "Banner Elk",
		stamp: "./stamps/GRMO.svg",
	},
	{
		code: "HABE",
		name: "Hammocks Beach State Park",
		city: "Swansboro",
		stamp: "./stamps/HABE.svg",
	},
	{
		code: "HARO",
		name: "Hanging Rock State Park",
		city: "Danbury",
		stamp: "./stamps/HARO.svg",
	},
	{
		code: "HARI",
		name: "Haw River State Park",
		city: "Browns Summit",
		stamp: "./stamps/HARI.svg",
	},
	{
		code: "JORI",
		name: "Jockey's Ridge State Park",
		city: "Nags Head",
		stamp: "./stamps/JORI.svg",
	},
	{
		code: "JONE",
		name: "Jones Lake State Park",
		city: "Elizabethtown",
		stamp: "./stamps/JONE.svg",
	},
	{
		code: "JORD",
		name: "Jordan Lake State Recreation Area",
		city: "Apex",
		stamp: "./stamps/JORD.svg",
	},
	{
		code: "KELA",
		name: "Kerr Lake State Recreation Area",
		city: "Henderson",
		stamp: "./stamps/KELA.svg",
	},
	{
		code: "LAJA",
		name: "Lake James State Park",
		city: "Nebo",
		stamp: "./stamps/LAJA.svg",
	},
	{
		code: "LANO",
		name: "Lake Norman State Park",
		city: "Troutman",
		stamp: "./stamps/LANO.svg",
	},
	{
		code: "LAWA",
		name: "Lake Waccamaw State Park",
		city: "Lake Waccamaw",
		stamp: "./stamps/LAWA.svg",
	},
	{
		code: "LURI",
		name: "Lumber River State Park",
		city: "Orrum",
		stamp: "./stamps/LURI.svg",
	},
	{
		code: "MARI",
		name: "Mayo River State Park",
		city: "Mayodan",
		stamp: "./stamps/MARI.svg",
	},
	{
		code: "MEMO",
		name: "Medoc Mountain State Park",
		city: "Hollister",
		stamp: "./stamps/MEMO.svg",
	},
	{
		code: "MEMI",
		name: "Merchants Millpond State Park",
		city: "Gatesville",
		stamp: "./stamps/MEMI.svg",
	},
	{
		code: "MOMO",
		name: "Morrow Mountain State Park",
		city: "Albemarle",
		stamp: "./stamps/MOMO.svg",
	},
	{
		code: "MOJE",
		name: "Mount Jefferson State Natural Area",
		city: "West Jefferson",
		stamp: "./stamps/MOJE.svg",
	},
	{
		code: "MOMI",
		name: "Mount Mitchell State Park",
		city: "Burnsville",
		stamp: "./stamps/CABE.svg",
	}, // Assuming a placeholder for Mount Mitchell
	{
		code: "NERI",
		name: "New River State Park",
		city: "Laurel Springs",
		stamp: "./stamps/CABE.svg",
	}, // Assuming a placeholder for New River
	{
		code: "OCMO",
		name: "Occoneechee Mountain State Natural Area",
		city: "Hillsborough",
		stamp: "./stamps/CABE.svg",
	}, // Placeholder
	{
		code: "PETT",
		name: "Pettigrew State Park",
		city: "Creswell",
		stamp: "./stamps/PETT.svg",
	},
	{
		code: "PIMO",
		name: "Pilot Mountain State Park",
		city: "Pinnacle",
		stamp: "./stamps/CABE.svg",
	}, // Placeholder
	{
		code: "RARO",
		name: "Raven Rock State Park",
		city: "Lillington",
		stamp: "./stamps/CABE.svg",
	}, // Placeholder
	{
		code: "REMO",
		name: "Rendezvous Mountain",
		city: "Purlear",
		stamp: "./stamps/REMO.svg",
	},
	{
		code: "SILA",
		name: "Singletary Lake State Park",
		city: "Kelly",
		stamp: "./stamps/SILA.svg",
	},
	{
		code: "SOMO",
		name: "South Mountains State Park",
		city: "Connelly Springs",
		stamp: "./stamps/CABE.svg",
	}, // Placeholder
	{
		code: "STMO",
		name: "Stone Mountain State Park",
		city: "Roaring Gap",
		stamp: "./stamps/CABE.svg",
	}, // Placeholder
	{
		code: "WEWO",
		name: "Weymouth Woods Sandhills Nature Preserve",
		city: "Southern Pines",
		stamp: "./stamps/WEWO.svg",
	},
	{
		code: "WIUM",
		name: "William B. Umstead State Park",
		city: "Raleigh",
		stamp: "./stamps/WIUM.svg",
	},
];

export interface UserStamp {
	code: string;
	date: Date;
	location: string;
	method: string;
}

const date = (s: string) => new Date(s);

// The array of parks where a stamp is already achieved
export const userStamps: UserStamp[] = [
	{
		code: "MARI",
		date: date("2025-01-01T12:00-05:00"),
		location: "Coordinates",
		method: "location",
	},
	{
		code: "CACR",
		date: date("2025-01-01T03:00-05:00"),
		location: "Coordinates",
		method: "location",
	},
	{
		code: "JONE",
		date: date("2025-01-01T04:00-05:00"),
		location: "Coordinates",
		method: "manual",
	},
	{
		code: "ENRI",
		date: date("2025-01-01T02:00-05:00"),
		location: "Coordinates",
		method: "location",
	},
];

export const userParkVisits = [
	{ parkCode: "MARI", visitDate: "01/2025" },
	{ parkCode: "PETTI", visitDate: "01/2025" },
	{ parkCode: "GOCR", visitDate: "01/2025" },
];
