export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  formattedDate: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "smart-refrigerator-buying-guide",
    title: "Smart Refrigerator Buying Guide: Features That Actually Matter",
    summary:
      "A practical breakdown of modern refrigerator features—convertible modes, inverter compressors, energy ratings, and smart connectivity—so you can pick the right fridge for your kitchen and power bill.",
    date: "2025-05-10",
    formattedDate: "May 10, 2025",
    tags: ["Home Appliances", "Refrigerator", "Energy Efficiency"],
  },
  {
    id: "choosing-the-right-tv",
    title: "Choosing the Right TV in 2025: OLED vs QLED vs LED",
    summary:
      "Explains resolution, refresh rate, display technologies, and HDR formats in simple terms, helping you choose the best TV for movies, sports, and gaming without getting lost in marketing jargon.",
    date: "2025-04-18",
    formattedDate: "Apr 18, 2025",
    tags: ["TV", "Home Entertainment", "Buying Guide"],
  },
  {
    id: "washing-machine-guide",
    title:
      "Front Load vs Top Load Washing Machines: Which One Is Best for You?",
    summary:
      "Compares front-load and top-load washing machines on water usage, fabric care, wash programs, maintenance, and budget so you can confidently choose what fits your family and laundry habits.",
    date: "2025-03-05",
    formattedDate: "Mar 5, 2025",
    tags: ["Washing Machine", "Laundry", "Home Appliances"],
  },
];
