export interface CompanyProfile {
  name: string;
  role: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  catalogUrl?: string;
  socialLinks: Array<{
    label: string;
    url: string;
  }>;
}

export const companyProfile: CompanyProfile = {
  name: "SmartHome Appliances",
  role: "Authorized Home Appliance Seller",
  headline: "Trusted store for Refrigerators, Washing Machines & Smart TVs",
  location: "Noida, India",

  email: "support@smarthomeappliances.in",
  phone: "+91-9876543210",

  summary:
    "SmartHome Appliances is a trusted retailer of premium home appliances, offering a wide range of refrigerators, washing machines, and smart TVs from leading brands. We focus on delivering genuine products, competitive pricing, fast doorstep delivery, and reliable after-sales support to ensure complete customer satisfaction.",

  catalogUrl: "/catalog/home-appliances.tickets.json",

  socialLinks: [
    {
      label: "WhatsApp",
      url: "https://wa.me/919876543210?text=Hi%20I%20want%20to%20buy%20home%20appliances",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/smarthomeappliances",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/smarthomeappliances",
    },
    {
      label: "GoogleMaps",
      url: "https://maps.google.com/?q=SmartHome+Appliances+Noida",
    },
  ],
};

// Backward-compatible alias for older imports.
export const profile = companyProfile;
