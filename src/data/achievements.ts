export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  type: "Certification" | "Badge" | "Achievement";
  year?: number;
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: "dsa-cpp-udemy",
    title: "Mastering Data Structures & Algorithms using C++",
    issuer: "Udemy",
    type: "Certification",
    year: 2023,
  },
  {
    id: "leetcode-dcc-jan-2023",
    title: "DCC January 2023 Coin",
    issuer: "LeetCode",
    type: "Achievement",
    year: 2023,
  },
  {
    id: "coding-ninjas-graph-bandage",
    title: "Graph Bandage",
    issuer: "Coding Ninjas",
    type: "Badge",
  },
];
