import type { CeoInfo, CompanyInfo, ContactInfo, SupportInfo } from "@/lib/types";

export const seedCompany: CompanyInfo = {
  name: "EVR Vet Options Corporation",
  short_name: "EVR Vet Options",
  tagline: "Advancing Animal Health Across the Philippines",
  intro:
    "EVR Vet Options Corporation is a Filipino-owned veterinary solutions company serving farms, clinics, and pet businesses nationwide. We bring together trusted animal health brands, science-backed products, and world-class equipment under one roof — backed by a team that genuinely cares about your animals and your business.",
  profile:
    "EVR Vet Options Corporation is a full-line distributor of veterinary products and solutions headquartered in Mabalacat, Pampanga, Philippines, and part of the EVR Group of Companies. Our portfolio spans Livestock Solutions and Pet Consumables — with veterinary machines & equipment served by our dedicated division, Pet Multilines — allowing us to serve commercial farms, veterinary clinics, animal hospitals, pet shops, and agri-retailers with a single, reliable supply partner. From biologics and nutrition to digital imaging and laboratory systems, every product we carry is selected for proven quality, regulatory compliance, and real-world value.",
  history:
    "Founded in 1996 by Dr. Elizardo V. Reyes, the EVR Group of Companies began with the establishment of EVCOR Marketing, driven by a vision to provide quality animal healthcare products and professional veterinary solutions across the Philippines. The company steadily expanded with the opening of the first Angeles Pet Care Center (APCC) in 1997, followed by additional branches in Tarlac (1998) and San Fernando (2003). In 2009, EVR Vet Options Corporation was officially incorporated, strengthening its role as a trusted distributor of animal health products, veterinary medicines, biologics, feeds, and equipment.\n\nAs the organization continued to grow, it diversified into several business sectors — including Angeles Pet Care Center (APCC), Animal Wellness Hospital, Tinang Concepcion Farms, and Pet Multilines — while expanding its offices, warehouses, clinics, and distribution network across the country. By 2021, EVR had established operations in key locations throughout Luzon, Visayas, and Mindanao.\n\nToday, the EVR Group of Companies continues to build on the vision of Dr. Elizardo V. Reyes, serving veterinarians, livestock producers, pet owners, dealers, and business partners through its nationwide network. With over 25 years of excellence, the company remains committed to delivering innovative products, reliable service, and sustainable growth in the Philippine animal health industry.",
  mission:
    "To deliver quality animal health products and services promptly and accurately — investing in our people through continuous development, honoring our commitments to business partners, and empowering the customers and communities we serve across the Philippines.",
  vision:
    "To be the Leading, Reliable, and Most Trusted National Distributor of Quality and Innovative Animal Health Care Products.",
  core_values: [
    {
      title: "Our Employees",
      description:
        "We strike a work-life balance for our employees through continuous professional development, training and seminars, and competitive compensation and benefits.",
    },
    {
      title: "Our Customers",
      description:
        "We commit to deliver quality services and products promptly and accurately.",
    },
    {
      title: "Our Business Partners",
      description:
        "We are committed to fulfill our duties to our business partners by complying with mutually agreed standards, terms, and conditions.",
    },
    {
      title: "Our Community",
      description:
        "We participate in our community by providing technical know-how to help customers improve their productivity and efficiency, and to promote the safety of farm personnel and the surrounding community.",
    },
  ],
  stats: [
    { value: "3", label: "Business Divisions" },
    { value: "1,000+", label: "Products in Portfolio" },
    { value: "500+", label: "Farms, Clinics & Retail Partners" },
    { value: "17", label: "Regions Served Nationwide" },
  ],
};

export const seedCeo: CeoInfo = {
  name: "Dr. Elizardo V. Reyes",
  title: "President / CEO",
  quote:
    "Every animal we help care for represents a family, a farm, a livelihood. That is a responsibility we carry with pride.",
  message:
    "When we founded EVR Vet Options, we made a promise that our name would stand for Excellence, Value, and Reliability. Today, that promise guides every shipment we deliver, every clinic we equip, and every farmer we serve. The Philippine animal industry is filled with hardworking people who deserve a partner that treats their success as its own — and that is exactly the company we have built. Thank you for trusting EVR Vet Options. We look forward to growing with you.",
  photo_url: "/images/dr-elizardo-reyes.png",
};

export const seedContact: ContactInfo = {
  address:
    "Vivape Center, Lot 2 Block 6, Brgy. Camachiles, MacArthur Highway, Mabalacat City, Pampanga, Philippines",
  phone: "+63 (2) 8123 4567",
  phone_alt: "+63 917 123 4567",
  email: "info@evrvetoptions.com",
  email_sales: "sales@evrvetoptions.com",
  map_embed_url:
    "https://www.google.com/maps?q=Vivape+Center,+Camachiles,+MacArthur+Highway,+Mabalacat+City,+Pampanga&output=embed",
  business_hours: [
    { days: "Monday – Saturday", hours: "8:00 AM – 5:00 PM" },
    { days: "Sunday & Holidays", hours: "Closed" },
  ],
  socials: {
    facebook: "https://www.facebook.com/officialevrvetoptions",
    linkedin:
      "https://www.linkedin.com/company/evr-vet-options-corporation/",
    messenger: "https://m.me/officialevrvetoptions",
  },
};

export const seedSupport: SupportInfo = {
  warranty:
    "All machines and equipment distributed by EVR Vet Options are covered by a standard manufacturer's warranty of at least one (1) year on parts and service, with extended warranty programs available on selected imaging and laboratory systems. Warranty coverage includes genuine replacement parts, on-site or depot service by factory-trained engineers, and priority turnaround for clinical equipment.",
  after_sales:
    "Our commitment does not end at delivery. Every equipment purchase includes installation, user training for your staff, preventive maintenance scheduling, and access to our technical support hotline. Consumable and pharmaceutical customers enjoy dedicated account officers, cold-chain compliant delivery, and product technical support from our licensed veterinarians.",
};
