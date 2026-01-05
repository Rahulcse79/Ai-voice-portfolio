export interface SocialLink {
  label: "LinkedIn" | "GitHub" | "LeetCode" | "Twitter";
  url: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  location: string;
  email?: string;
  phone?: string;
  summary: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
}

export const profile: Profile = {
  name: "Rahul Singh",
  role: "Software Engineer",
  headline: "Building scalable systems and real-time AI-driven products",
  location: "Noida, India",
  email: "rahul.singh.cse79@gmail.com",
  phone: "+91-9752079591",
  summary:
    "Software Engineer with nearly 2 years of hands-on experience in designing and developing scalable, high-performance web applications. Experienced in building reliable systems using modern web technologies and agile practices. Strong at translating business requirements into efficient technical solutions, with expertise in Go, TypeScript, Java, and JavaScript.",
  resumeUrl: "/resume/Rahul_Singh_Resume.pdf",
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/rahul-singh-a32261206/",
    },
    {
      label: "GitHub",
      url: "https://github.com/Rahulcse79",
    },
    {
      label: "LeetCode",
      url: "https://leetcode.com/u/rahulcse79/",
    },
  ],
};
