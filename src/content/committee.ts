import type { CommitteeMember } from "./types";

// Only name + role are published here — home address, age, education,
// occupation, and personal phone/email were supplied for the trust's own
// records but deliberately kept out of the public site. Full details are in
// internal/committee-records.md (gitignored, not shipped to the site).
// Committee photos are still pending.
export const committeeMembers: CommitteeMember[] = [
  {
    id: "1",
    fullName: "सुरेश अंकुश डामरे",
    fullNameEn: "Suresh Ankush Damare",
    positionKey: "adhyaksh",
    photoPath: null,
    displayOrder: 1,
  },
  {
    id: "2",
    fullName: "शिवाजी सुरबा डामरे",
    fullNameEn: "Shivaji Surba Damare",
    positionKey: "upadhyaksh",
    photoPath: null,
    displayOrder: 2,
  },
  {
    id: "3",
    fullName: "स्वप्निल श्रीधर डामरे",
    fullNameEn: "Swapnil Shridhar Damare",
    positionKey: "sachiv",
    photoPath: null,
    displayOrder: 3,
  },
  {
    id: "4",
    fullName: "राजन रामचंद्र मालवणकर",
    fullNameEn: "Rajan Ramchandra Malvankar",
    positionKey: "up_sachiv",
    photoPath: null,
    displayOrder: 4,
  },
  {
    id: "5",
    fullName: "प्रथमेश मनोहर डामरे",
    fullNameEn: "Prathamesh Manohar Damare",
    positionKey: "khajindaar",
    photoPath: null,
    displayOrder: 5,
  },
  {
    id: "6",
    fullName: "युवराज सुरेश डामरे",
    fullNameEn: "Yuvraj Suresh Damare",
    positionKey: "up_khajindaar",
    photoPath: null,
    displayOrder: 6,
  },
  {
    id: "8",
    fullName: "केशव चंद्रकांत डामरे",
    fullNameEn: "Keshav Chandrakant Damare",
    positionKey: "sadasya",
    photoPath: null,
    displayOrder: 7,
  },
  {
    id: "9",
    fullName: "मनिष ठाकोजी डामरे",
    fullNameEn: "Manish Thakoji Damare",
    positionKey: "sadasya",
    photoPath: null,
    displayOrder: 8,
  },
  {
    id: "7",
    fullName: "उदित सत्यविजय डामरे",
    fullNameEn: "Udit Satyavijay Damare",
    positionKey: "sadasya",
    photoPath: null,
    displayOrder: 9,
  },
];
