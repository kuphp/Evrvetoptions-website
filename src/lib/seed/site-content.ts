import type { CeoInfo, CompanyInfo, ContactInfo, SupportInfo } from "@/lib/types";

export const seedCompany: CompanyInfo = {
  name: "EVR Vet Options Corporation",
  short_name: "EVR Vet Options",
  tagline: "Advancing Animal Health Across the Philippines",
  intro:
    "EVR Vet Options Corporation is a Filipino-owned veterinary solutions company serving farms, clinics, and pet businesses nationwide. We bring together trusted animal health brands, science-backed products, and world-class equipment under one roof — backed by a team that genuinely cares about your animals and your business.",
  profile:
    "EVR Vet Options Corporation is a full-line distributor of veterinary products and solutions headquartered in Metro Manila, Philippines. Our portfolio spans three divisions — Livestock Solutions, Pet Consumables, and Machines & Equipment — allowing us to serve commercial farms, veterinary clinics, animal hospitals, pet shops, and agri-retailers with a single, reliable supply partner. From biologics and nutrition to digital imaging and laboratory systems, every product we carry is selected for proven quality, regulatory compliance, and real-world value.",
  history:
    "EVR Vet Options was founded by Elizardo V. Reyes, a veteran of the Philippine animal health industry, with a simple conviction: Filipino farms and clinics deserve world-class products with honest service. What began as a small distribution operation has grown into a nationwide network serving hundreds of farms, clinics, and retail partners across Luzon, Visayas, and Mindanao. Along the way, we expanded from livestock health into companion animal care and veterinary equipment — but our founding promise has never changed: Excellence, Value, and Reliability in everything we deliver.",
  mission:
    "To empower Filipino farmers, veterinarians, and pet care professionals with world-class animal health products, equipment, and support — delivered with integrity, expertise, and genuine care.",
  vision:
    "To be the Philippines' most trusted veterinary solutions company — the partner of choice for animal health, from backyard farms to nationwide enterprises.",
  core_values: [
    {
      title: "Excellence",
      description:
        "We hold every product, process, and person to the highest standard — because animal health leaves no room for shortcuts.",
    },
    {
      title: "Value",
      description:
        "We deliver honest pricing and real returns for our customers, helping farms and clinics grow sustainably.",
    },
    {
      title: "Reliability",
      description:
        "We show up, on time, every time — with stock you can count on and support that never disappears after the sale.",
    },
    {
      title: "Integrity",
      description:
        "We do business the right way: transparent, compliant, and accountable to our customers and partners.",
    },
    {
      title: "Compassion",
      description:
        "Animal welfare is at the heart of our work. Healthier animals mean better lives — for them and for the people who care for them.",
    },
    {
      title: "Partnership",
      description:
        "We grow together with our customers, principals, and communities — building relationships that last decades, not transactions.",
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
  name: "Elizardo V. Reyes",
  title: "President / CEO",
  quote:
    "Every animal we help care for represents a family, a farm, a livelihood. That is a responsibility we carry with pride.",
  message:
    "When we founded EVR Vet Options, we made a promise that our name would stand for Excellence, Value, and Reliability. Today, that promise guides every shipment we deliver, every clinic we equip, and every farmer we serve. The Philippine animal industry is filled with hardworking people who deserve a partner that treats their success as its own — and that is exactly the company we have built. Thank you for trusting EVR Vet Options. We look forward to growing with you.",
  photo_url: null,
};

export const seedContact: ContactInfo = {
  address:
    "EVR Corporate Center, 88 Quezon Avenue, Quezon City, Metro Manila 1103, Philippines",
  phone: "+63 (2) 8123 4567",
  phone_alt: "+63 917 123 4567",
  email: "info@evrvetoptions.com",
  email_sales: "sales@evrvetoptions.com",
  map_embed_url:
    "https://www.google.com/maps?q=Quezon+Avenue,+Quezon+City,+Metro+Manila,+Philippines&output=embed",
  business_hours: [
    { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
    { days: "Saturday", hours: "8:00 AM – 12:00 NN" },
    { days: "Sunday & Holidays", hours: "Closed" },
  ],
  socials: {
    facebook: "https://www.facebook.com/evrvetoptions",
    instagram: "https://www.instagram.com/evrvetoptions",
    linkedin: "https://www.linkedin.com/company/evrvetoptions",
    youtube: "https://www.youtube.com/@evrvetoptions",
    messenger: "https://m.me/evrvetoptions",
    whatsapp: "https://wa.me/639171234567",
  },
};

export const seedSupport: SupportInfo = {
  warranty:
    "All machines and equipment distributed by EVR Vet Options are covered by a standard manufacturer's warranty of at least one (1) year on parts and service, with extended warranty programs available on selected imaging and laboratory systems. Warranty coverage includes genuine replacement parts, on-site or depot service by factory-trained engineers, and priority turnaround for clinical equipment.",
  after_sales:
    "Our commitment does not end at delivery. Every equipment purchase includes installation, user training for your staff, preventive maintenance scheduling, and access to our technical support hotline. Consumable and pharmaceutical customers enjoy dedicated account officers, cold-chain compliant delivery, and product technical support from our licensed veterinarians.",
};
