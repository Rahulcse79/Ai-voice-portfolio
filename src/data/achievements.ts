export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  type: "Certification" | "Badge" | "Achievement";
  year?: number;
  description?: string;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: "leetcode-500-top-8",
    title: "500+ LeetCode problems · Top 8% globally",
    issuer: "LeetCode",
    type: "Achievement",
    link: "https://leetcode.com/u/rahulcse79/",
  },
  {
    id: "coral-top-engineer",
    title: "Top-performing engineer · AI-IVR delivered 2 weeks early",
    issuer: "Coral Telecom",
    type: "Achievement",
    year: 2024,
  },
  {
    id: "dsa-cpp-udemy",
    title: "Mastering Data Structures & Algorithms in C++",
    issuer: "Udemy",
    type: "Certification",
    year: 2023,
  },
  {
    id: "leetcode-dcc-jan-2023",
    title: "DCC January 2023 Badge · 31/31 daily challenges",
    issuer: "LeetCode",
    type: "Badge",
    year: 2023,
    link: "https://leetcode.com/u/rahulcse79/",
  },
  {
    id: "coding-ninjas-graph-bandage",
    title: "Graph Badge",
    issuer: "Coding Ninjas",
    type: "Badge",
  },
];
