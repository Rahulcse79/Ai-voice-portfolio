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
    id: "iso-9001-quality-certified",
    title: "ISO 9001:2015 Quality Management Certification",
    issuer: "International Organization for Standardization (ISO)",
    type: "Certification",
    year: 2024,
    link: "https://www.iso.org/iso-9001-quality-management.html",
  },
  {
    id: "trusted-seller-2024",
    title: "Trusted Online Seller Award",
    issuer: "National E-Commerce Association",
    type: "Achievement",
    year: 2024,
  },
  {
    id: "secure-payments-badge",
    title: "100% Secure Payments Badge",
    issuer: "PCI DSS Compliance Council",
    type: "Badge",
  },
  {
    id: "fast-delivery-excellence",
    title: "Fast & Reliable Delivery Excellence",
    issuer: "Logistics Partner Network",
    type: "Achievement",
    year: 2023,
  },
  {
    id: "customer-satisfaction-badge",
    title: "Top Customer Satisfaction Badge",
    issuer: "Verified Buyer Reviews Platform",
    type: "Badge",
  },
];
