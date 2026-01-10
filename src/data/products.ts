export interface Product {
  id: string;
  name: string;
  category: "Refrigerator" | "Washing Machine" | "TV";
  price: string;
  image: string;
  highlights: string[];
}

export const products: Product[] = [
  // ================= REFRIGERATORS =================
  {
    id: "lg-double-door-fridge",
    name: "LG 260L Double Door Refrigerator",
    category: "Refrigerator",
    price: "₹28,999",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=60",
    highlights: [
      "Smart Inverter Compressor",
      "Energy Efficient",
      "Spacious Storage",
    ],
  },
  {
    id: "whirlpool-single-door-fridge",
    name: "Whirlpool 190L Single Door Refrigerator",
    category: "Refrigerator",
    price: "₹21,490",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=60",
    highlights: [
      "Turbo Ice Technology",
      "Low Voltage Startup",
      "Fresh Cooling",
    ],
  },
  {
    id: "samsung-345l-fridge",
    name: "Samsung 345L Frost Free Refrigerator",
    category: "Refrigerator",
    price: "₹36,999",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=60",
    highlights: ["Digital Inverter", "Frost Free", "Convertible Freezer"],
  },
  {
    id: "haier-195l-fridge",
    name: "Haier 195L Direct Cool Refrigerator",
    category: "Refrigerator",
    price: "₹18,990",
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&q=60",
    highlights: ["Stabilizer Free", "Fast Ice Making", "Compact Design"],
  },
  {
    id: "godrej-236l-fridge",
    name: "Godrej 236L Frost Free Refrigerator",
    category: "Refrigerator",
    price: "₹29,500",
    image:
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=60",
    highlights: ["Eco Mode", "Large Vegetable Tray", "Low Noise"],
  },

  // ================= WASHING MACHINES =================
  {
    id: "samsung-front-load-wm",
    name: "Samsung 7kg Front Load Washing Machine",
    category: "Washing Machine",
    price: "₹32,490",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=60",
    highlights: ["Eco Bubble Technology", "Low Water Usage", "Powerful Wash"],
  },
  {
    id: "bosch-8kg-wash",
    name: "Bosch 8kg Front Load Washing Machine",
    category: "Washing Machine",
    price: "₹36,750",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=60",
    highlights: ["ActiveWater Plus", "Anti-Vibration Design", "Fast Cycles"],
  },
  {
    id: "lg-7kg-top-load",
    name: "LG 7kg Top Load Washing Machine",
    category: "Washing Machine",
    price: "₹18,999",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=60",
    highlights: ["Smart Motion", "Low Noise", "Quick Wash"],
  },
  {
    id: "whirlpool-6-5kg-wash",
    name: "Whirlpool 6.5kg Top Load Washing Machine",
    category: "Washing Machine",
    price: "₹16,490",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=60",
    highlights: ["Hard Water Wash", "Auto Tub Clean", "Power Scrub"],
  },
  {
    id: "ifb-7kg-front-load",
    name: "IFB 7kg Front Load Washing Machine",
    category: "Washing Machine",
    price: "₹29,999",
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400&q=60",
    highlights: ["Aqua Energie", "Cradle Wash", "Steam Wash"],
  },

  // ================= TELEVISIONS =================
  {
    id: "sony-55inch-smart-tv",
    name: "Sony 55” 4K Ultra HD Smart TV",
    category: "TV",
    price: "₹64,999",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=60",
    highlights: ["4K HDR Display", "Dolby Audio", "Android TV"],
  },
  {
    id: "mi-43inch-smart-tv",
    name: "Mi 43” Full HD Smart TV",
    category: "TV",
    price: "₹24,999",
    image:
      "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=400&q=60",
    highlights: ["Full HD Display", "Smart Features", "Powerful Speakers"],
  },
  {
    id: "samsung-50inch-4k-tv",
    name: "Samsung 50” 4K Crystal UHD TV",
    category: "TV",
    price: "₹46,990",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=60",
    highlights: ["Crystal Processor 4K", "HDR10+", "Slim Design"],
  },
  {
    id: "lg-43inch-4k-tv",
    name: "LG 43” 4K UHD Smart TV",
    category: "TV",
    price: "₹39,999",
    image:
      "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=400&q=60",
    highlights: ["AI ThinQ", "WebOS", "Ultra Surround Sound"],
  },
  {
    id: "oneplus-55inch-tv",
    name: "OnePlus 55” QLED Smart TV",
    category: "TV",
    price: "₹62,999",
    image:
      "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=400&q=60",
    highlights: ["QLED Panel", "120Hz Display", "Dolby Vision"],
  },
];
