export interface Education {
  id: string;
  level: "Bachelor" | "Higher Secondary" | "Secondary";
  qualification: string;
  institution: string;
  location: string;
  score: string;
  duration: string;
}

export const education: Education[] = [
  {
    id: "btech-cse-nri",
    level: "Bachelor",
    qualification: "B.Tech in Computer Science",
    institution: "NRI Institute of Science and Technology",
    location: "Bhopal, India",
    score: "CGPA: 8.0",
    duration: "2019 – 2023",
  },
  {
    id: "higher-secondary-time",
    level: "Higher Secondary",
    qualification: "Higher Secondary",
    institution: "Time Public School",
    location: "Shahdol, Madhya Pradesh, India",
    score: "68%",
    duration: "2019",
  },
  {
    id: "secondary-time",
    level: "Secondary",
    qualification: "Secondary",
    institution: "Time Public School",
    location: "Shahdol, Madhya Pradesh, India",
    score: "62%",
    duration: "2017",
  },
];
