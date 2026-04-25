export type StateInfo = {
  code: string;
  name: string;
  districts: string[];
  ceo: string; // Chief Electoral Officer website
};

export const states: StateInfo[] = [
  {
    code: "AP",
    name: "Andhra Pradesh",
    districts: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool"],
    ceo: "https://ceoandhra.nic.in/",
  },
  {
    code: "AR",
    name: "Arunachal Pradesh",
    districts: ["Itanagar", "Tawang", "Ziro", "Bomdila", "Pasighat"],
    ceo: "https://ceoarunachal.nic.in/",
  },
  {
    code: "AS",
    name: "Assam",
    districts: ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur"],
    ceo: "https://ceoassam.nic.in/",
  },
  {
    code: "BR",
    name: "Bihar",
    districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    ceo: "https://ceobihar.nic.in/",
  },
  {
    code: "CG",
    name: "Chhattisgarh",
    districts: ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
    ceo: "https://ceochhattisgarh.nic.in/",
  },
  {
    code: "GA",
    name: "Goa",
    districts: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    ceo: "https://ceogoa.nic.in/",
  },
  {
    code: "GJ",
    name: "Gujarat",
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    ceo: "https://ceo.gujarat.gov.in/",
  },
  {
    code: "HR",
    name: "Haryana",
    districts: ["Gurugram", "Faridabad", "Ambala", "Hisar", "Rohtak"],
    ceo: "https://ceoharyana.gov.in/",
  },
  {
    code: "HP",
    name: "Himachal Pradesh",
    districts: ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi"],
    ceo: "https://himachal.nic.in/ceo/",
  },
  {
    code: "JH",
    name: "Jharkhand",
    districts: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    ceo: "https://ceo.jharkhand.gov.in/",
  },
  {
    code: "KA",
    name: "Karnataka",
    districts: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli-Dharwad", "Belagavi"],
    ceo: "https://ceokarnataka.kar.nic.in/",
  },
  {
    code: "KL",
    name: "Kerala",
    districts: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    ceo: "https://www.ceo.kerala.gov.in/",
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    districts: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    ceo: "https://ceomadhyapradesh.nic.in/",
  },
  {
    code: "MH",
    name: "Maharashtra",
    districts: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    ceo: "https://ceo.maharashtra.gov.in/",
  },
  {
    code: "MN",
    name: "Manipur",
    districts: ["Imphal", "Churachandpur", "Ukhrul", "Senapati", "Thoubal"],
    ceo: "https://ceomanipur.nic.in/",
  },
  {
    code: "ML",
    name: "Meghalaya",
    districts: ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara"],
    ceo: "https://ceomeghalaya.nic.in/",
  },
  {
    code: "MZ",
    name: "Mizoram",
    districts: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Saiha"],
    ceo: "https://ceomizoram.nic.in/",
  },
  {
    code: "NL",
    name: "Nagaland",
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    ceo: "https://ceonagaland.nic.in/",
  },
  {
    code: "OD",
    name: "Odisha",
    districts: ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"],
    ceo: "https://ceoorissa.nic.in/",
  },
  {
    code: "PB",
    name: "Punjab",
    districts: ["Amritsar", "Ludhiana", "Chandigarh", "Jalandhar", "Patiala"],
    ceo: "https://ceopunjab.nic.in/",
  },
  {
    code: "RJ",
    name: "Rajasthan",
    districts: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota"],
    ceo: "https://ceo.rajasthan.gov.in/",
  },
  {
    code: "SK",
    name: "Sikkim",
    districts: ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Soreng"],
    ceo: "https://ceosikkim.nic.in/",
  },
  {
    code: "TN",
    name: "Tamil Nadu",
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    ceo: "https://www.elections.tn.gov.in/",
  },
  {
    code: "TS",
    name: "Telangana",
    districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    ceo: "https://ceotelangana.nic.in/",
  },
  {
    code: "TR",
    name: "Tripura",
    districts: ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Belonia"],
    ceo: "https://ceotripura.nic.in/",
  },
  {
    code: "UP",
    name: "Uttar Pradesh",
    districts: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad"],
    ceo: "https://ceouttarpradesh.nic.in/",
  },
  {
    code: "UK",
    name: "Uttarakhand",
    districts: ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Haldwani"],
    ceo: "https://ceo.uk.gov.in/",
  },
  {
    code: "WB",
    name: "West Bengal",
    districts: ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur"],
    ceo: "https://ceowestbengal.nic.in/",
  },
  // Union Territories
  {
    code: "AN",
    name: "Andaman & Nicobar Islands",
    districts: ["Port Blair", "Mayabunder", "Car Nicobar"],
    ceo: "https://ceoandaman.nic.in/",
  },
  {
    code: "CH",
    name: "Chandigarh",
    districts: ["Chandigarh"],
    ceo: "https://ceochandigarh.nic.in/",
  },
  {
    code: "DN",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    districts: ["Silvassa", "Daman", "Diu"],
    ceo: "https://dnhdd.gov.in/",
  },
  {
    code: "DL",
    name: "Delhi",
    districts: ["New Delhi", "South Delhi", "East Delhi", "West Delhi", "North Delhi"],
    ceo: "https://ceodelhi.gov.in/",
  },
  {
    code: "JK",
    name: "Jammu & Kashmir",
    districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
    ceo: "https://ceojammukashmir.nic.in/",
  },
  {
    code: "LA",
    name: "Ladakh",
    districts: ["Leh", "Kargil"],
    ceo: "https://ceoladakh.nic.in/",
  },
  {
    code: "LD",
    name: "Lakshadweep",
    districts: ["Kavaratti", "Agatti", "Minicoy"],
    ceo: "https://ceolakshadweep.gov.in/",
  },
  {
    code: "PY",
    name: "Puducherry",
    districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    ceo: "https://ceodaman.nic.in/",
  },
];

export const getStateByCode = (code: string): StateInfo | undefined =>
  states.find((s) => s.code === code);
