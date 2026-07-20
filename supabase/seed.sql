-- ============================================================
-- EVR Vet Options Corporation — Starter Content
-- Run AFTER schema.sql. Safe to re-run (products/events skip
-- duplicates by slug; site_content upserts; other tables only
-- insert when empty).
-- ============================================================

-- ── Site content (company / ceo / contact / support) ────────
insert into public.site_content (key, value) values
('company', $json$
{
  "name": "EVR Vet Options Corporation",
  "short_name": "EVR Vet Options",
  "tagline": "Advancing Animal Health Across the Philippines",
  "intro": "EVR Vet Options Corporation is a Filipino-owned veterinary solutions company serving farms, clinics, and pet businesses nationwide. We bring together trusted animal health brands, science-backed products, and world-class equipment under one roof — backed by a team that genuinely cares about your animals and your business.",
  "profile": "EVR Vet Options Corporation is a full-line distributor of veterinary products and solutions headquartered in Metro Manila, Philippines. Our portfolio spans three divisions — Livestock Solutions, Pet Consumables, and Machines & Equipment — allowing us to serve commercial farms, veterinary clinics, animal hospitals, pet shops, and agri-retailers with a single, reliable supply partner. From biologics and nutrition to digital imaging and laboratory systems, every product we carry is selected for proven quality, regulatory compliance, and real-world value.",
  "history": "EVR Vet Options was founded by Elizardo V. Reyes, a veteran of the Philippine animal health industry, with a simple conviction: Filipino farms and clinics deserve world-class products with honest service. What began as a small distribution operation has grown into a nationwide network serving hundreds of farms, clinics, and retail partners across Luzon, Visayas, and Mindanao. Along the way, we expanded from livestock health into companion animal care and veterinary equipment — but our founding promise has never changed: Excellence, Value, and Reliability in everything we deliver.",
  "mission": "To empower Filipino farmers, veterinarians, and pet care professionals with world-class animal health products, equipment, and support — delivered with integrity, expertise, and genuine care.",
  "vision": "To be the Philippines' most trusted veterinary solutions company — the partner of choice for animal health, from backyard farms to nationwide enterprises.",
  "core_values": [
    { "title": "Excellence", "description": "We hold every product, process, and person to the highest standard — because animal health leaves no room for shortcuts." },
    { "title": "Value", "description": "We deliver honest pricing and real returns for our customers, helping farms and clinics grow sustainably." },
    { "title": "Reliability", "description": "We show up, on time, every time — with stock you can count on and support that never disappears after the sale." },
    { "title": "Integrity", "description": "We do business the right way: transparent, compliant, and accountable to our customers and partners." },
    { "title": "Compassion", "description": "Animal welfare is at the heart of our work. Healthier animals mean better lives — for them and for the people who care for them." },
    { "title": "Partnership", "description": "We grow together with our customers, principals, and communities — building relationships that last decades, not transactions." }
  ],
  "stats": [
    { "value": "3", "label": "Business Divisions" },
    { "value": "1,000+", "label": "Products in Portfolio" },
    { "value": "500+", "label": "Farms, Clinics & Retail Partners" },
    { "value": "17", "label": "Regions Served Nationwide" }
  ]
}
$json$::jsonb),
('ceo', $json$
{
  "name": "Dr. Elizardo V. Reyes",
  "title": "President / CEO",
  "quote": "Every animal we help care for represents a family, a farm, a livelihood. That is a responsibility we carry with pride.",
  "message": "When we founded EVR Vet Options, we made a promise that our name would stand for Excellence, Value, and Reliability. Today, that promise guides every shipment we deliver, every clinic we equip, and every farmer we serve. The Philippine animal industry is filled with hardworking people who deserve a partner that treats their success as its own — and that is exactly the company we have built. Thank you for trusting EVR Vet Options. We look forward to growing with you.",
  "photo_url": "/images/dr-elizardo-reyes.png"
}
$json$::jsonb),
('contact', $json$
{
  "address": "EVR Corporate Center, 88 Quezon Avenue, Quezon City, Metro Manila 1103, Philippines",
  "phone": "+63 (2) 8123 4567",
  "phone_alt": "+63 917 123 4567",
  "email": "info@evrvetoptions.com",
  "email_sales": "sales@evrvetoptions.com",
  "map_embed_url": "https://www.google.com/maps?q=Quezon+Avenue,+Quezon+City,+Metro+Manila,+Philippines&output=embed",
  "business_hours": [
    { "days": "Monday – Friday", "hours": "8:00 AM – 5:00 PM" },
    { "days": "Saturday", "hours": "8:00 AM – 12:00 NN" },
    { "days": "Sunday & Holidays", "hours": "Closed" }
  ],
  "socials": {
    "facebook": "https://www.facebook.com/evrvetoptions",
    "instagram": "https://www.instagram.com/evrvetoptions",
    "linkedin": "https://www.linkedin.com/company/evrvetoptions",
    "youtube": "https://www.youtube.com/@evrvetoptions",
    "messenger": "https://m.me/evrvetoptions",
    "whatsapp": "https://wa.me/639171234567"
  }
}
$json$::jsonb),
('support', $json$
{
  "warranty": "All machines and equipment distributed by EVR Vet Options are covered by a standard manufacturer's warranty of at least one (1) year on parts and service, with extended warranty programs available on selected imaging and laboratory systems. Warranty coverage includes genuine replacement parts, on-site or depot service by factory-trained engineers, and priority turnaround for clinical equipment.",
  "after_sales": "Our commitment does not end at delivery. Every equipment purchase includes installation, user training for your staff, preventive maintenance scheduling, and access to our technical support hotline. Consumable and pharmaceutical customers enjoy dedicated account officers, cold-chain compliant delivery, and product technical support from our licensed veterinarians."
}
$json$::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();

-- ── Hero slides ──────────────────────────────────────────────
insert into public.hero_slides (title, subtitle, cta_label, cta_href, cta_secondary_label, cta_secondary_href, image_url, sort_order, active)
select * from (values
  ('Advancing Animal Health Across the Philippines',
   'Excellence. Value. Reliability. World-class veterinary products, consumables, and equipment for farms, clinics, and pet businesses nationwide.',
   'Explore Our Products', '/products', 'Get in Touch', '/contact', null, 1, true),
  ('Complete Solutions for Modern Livestock Farms',
   'Biologics, nutrition, and farm management essentials for poultry, swine, cattle, and goats — backed by licensed veterinarians and nationwide delivery.',
   'Livestock Solutions', '/products/livestock', 'Talk to Our Team', '/contact', '/images/hero-livestock.jpg', 2, true),
  ('Everything Your Companion Animals Deserve',
   'From anti-tick treatments and dewormers to premium nutrition and grooming lines — trusted pet consumables for clinics, groomers, and pet shops.',
   'Pet Consumables', '/products/pet-consumables', 'View Promotions', '/promotions', '/images/hero-pets.jpg', 3, true),
  ('World-Class Veterinary Machines & Equipment',
   'Digital X-ray, ultrasound, CT imaging, and laboratory systems — served by Pet Multilines, our dedicated equipment division, with installation, training, and after-sales service.',
   'Visit Pet Multilines', '/petmultilines', 'Request a Demo', '/petmultilines/contact', '/images/hero-equipment.jpg', 4, true)
) as v(title, subtitle, cta_label, cta_href, cta_secondary_label, cta_secondary_href, image_url, sort_order, active)
where not exists (select 1 from public.hero_slides);

-- ── Brands ───────────────────────────────────────────────────
insert into public.brands (name, categories)
select * from (values
  ('AgriVax Biologics', array['livestock']),
  ('VetNova Animal Health', array['livestock', 'pet-consumables']),
  ('PhilFarm Nutrition', array['livestock']),
  ('BioShield Animal Health', array['livestock']),
  ('PetVital', array['pet-consumables']),
  ('NutriPaws', array['pet-consumables']),
  ('GroomPro', array['pet-consumables']),
  ('MedVet Imaging', array['equipment']),
  ('ProVet Diagnostics', array['equipment']),
  ('LabCore Systems', array['equipment']),
  ('VetTech Instruments', array['equipment'])
) as v(name, categories)
where not exists (select 1 from public.brands);

-- ── Products ─────────────────────────────────────────────────
insert into public.products (slug, name, category, subcategory, brand, short_description, description, specs, featured, best_seller) values
('agrivax-nd-ib-vaccine', 'AgriVax ND-IB Live Vaccine', 'livestock', 'Poultry', 'AgriVax Biologics',
 'Combined Newcastle Disease and Infectious Bronchitis live vaccine for broilers and layers.',
 'AgriVax ND-IB is a freeze-dried live vaccine providing early, reliable protection against Newcastle Disease and Infectious Bronchitis in commercial poultry. Suitable for day-old chicks via spray or eye-drop administration, with booster programs for layers and breeders. Supplied in 1,000-dose and 2,500-dose vials with full cold-chain handling from our warehouse to your farm.',
 '[{"label":"Presentation","value":"Freeze-dried vial, 1,000 / 2,500 doses"},{"label":"Administration","value":"Spray, eye-drop, or drinking water"},{"label":"Target Species","value":"Broilers, layers, breeders"},{"label":"Storage","value":"2–8°C, protect from light"}]'::jsonb,
 true, false),
('vetnova-amoxi-pro-500', 'VetNova Amoxi-Pro 500 WSP', 'livestock', 'Swine', 'VetNova Animal Health',
 'Amoxicillin 500 mg/g water-soluble powder for respiratory and enteric infections in swine and poultry.',
 'Amoxi-Pro 500 is a broad-spectrum amoxicillin water-soluble powder trusted by commercial swine and poultry operations for the treatment of susceptible respiratory, enteric, and systemic bacterial infections. Highly stable in drinking water systems and available in 100 g sachets and 1 kg tubs. Always use under the supervision of a licensed veterinarian and observe withdrawal periods.',
 '[{"label":"Active Ingredient","value":"Amoxicillin trihydrate 500 mg/g"},{"label":"Presentation","value":"100 g sachet / 1 kg tub"},{"label":"Administration","value":"Drinking water"},{"label":"Target Species","value":"Swine, poultry"}]'::jsonb,
 false, true),
('philfarm-vitaboost-ade-forte', 'PhilFarm VitaBoost ADE Forte Injectable', 'livestock', 'Cattle', 'PhilFarm Nutrition',
 'High-potency Vitamin A, D3, and E injectable for growth, fertility, and stress recovery in large animals.',
 'VitaBoost ADE Forte delivers concentrated vitamins A, D3, and E in a single well-tolerated injection — supporting growth performance, reproductive efficiency, immune response, and recovery from transport or disease stress in cattle, carabao, goats, and swine. A staple in breeding and fattening programs nationwide.',
 '[{"label":"Composition","value":"Vit. A 500,000 IU, D3 75,000 IU, E 50 mg per mL"},{"label":"Presentation","value":"100 mL multi-dose vial"},{"label":"Administration","value":"Intramuscular injection"},{"label":"Target Species","value":"Cattle, carabao, goats, swine"}]'::jsonb,
 true, true),
('bioshield-ferro-plus-b12', 'BioShield Ferro-Plus B12 Injectable', 'livestock', 'Swine', 'BioShield Animal Health',
 'Iron dextran with Vitamin B12 for the prevention of piglet anemia and stronger early growth.',
 'Ferro-Plus B12 combines 200 mg/mL iron dextran with Vitamin B12 to prevent iron-deficiency anemia in newborn piglets and support vigorous early growth. Smooth, fast-absorbing formulation with excellent injection-site tolerance. A foundational product for every farrowing program.',
 '[{"label":"Composition","value":"Iron (as dextran) 200 mg/mL + Vit. B12"},{"label":"Presentation","value":"100 mL vial"},{"label":"Dosage","value":"1–2 mL IM on day 3 of life"},{"label":"Target Species","value":"Piglets, calves"}]'::jsonb,
 false, false),
('philfarm-electrolyte-plus', 'PhilFarm ElectroLyte Plus', 'livestock', 'Poultry', 'PhilFarm Nutrition',
 'Electrolytes with Vitamin C for heat stress, transport stress, and post-vaccination recovery.',
 'ElectroLyte Plus rapidly replaces electrolytes lost during heat stress, transport, and disease challenge, with added Vitamin C and dextrose for energy support. Essential during the Philippine summer months and any stress event — mixing readily in drinking water for poultry, swine, and ruminants.',
 '[{"label":"Composition","value":"Na, K, Mg, Cl electrolytes + Vit. C + dextrose"},{"label":"Presentation","value":"250 g / 1 kg pouch"},{"label":"Administration","value":"Drinking water"},{"label":"Target Species","value":"Poultry, swine, ruminants"}]'::jsonb,
 false, true),
('vetnova-levaclear-drench', 'VetNova LevaClear Oral Drench', 'livestock', 'Goats', 'VetNova Animal Health',
 'Levamisole HCl broad-spectrum dewormer for goats, sheep, and cattle.',
 'LevaClear is a ready-to-use levamisole oral drench effective against mature and immature gastrointestinal roundworms and lungworms in goats, sheep, and cattle. Accurate dosing syringe included with every bottle. An affordable cornerstone of small-ruminant parasite control programs.',
 '[{"label":"Active Ingredient","value":"Levamisole HCl 75 mg/mL"},{"label":"Presentation","value":"500 mL / 1 L bottle"},{"label":"Administration","value":"Oral drench"},{"label":"Target Species","value":"Goats, sheep, cattle"}]'::jsonb,
 false, false),
('bioshield-farmguard-disinfectant', 'BioShield FarmGuard Broad-Spectrum Disinfectant', 'livestock', 'Farm Management', 'BioShield Animal Health',
 'Glutaraldehyde + quaternary ammonium disinfectant for housing, equipment, footbaths, and vehicles.',
 'FarmGuard is a professional-grade biosecurity disinfectant combining glutaraldehyde and quaternary ammonium compounds, proven effective against major viral, bacterial, and fungal pathogens of poultry and swine — including those relevant to ASF and AI biosecurity protocols. For housing, equipment, footbaths, wheel dips, and vehicle spraying.',
 '[{"label":"Composition","value":"Glutaraldehyde 15% + QAC 10%"},{"label":"Dilution","value":"1:200 – 1:400 depending on application"},{"label":"Presentation","value":"1 L / 5 L container"},{"label":"Applications","value":"Housing, footbaths, vehicles, hatcheries"}]'::jsonb,
 true, false),
('philfarm-proboost-premix', 'PhilFarm ProBoost Performance Premix', 'livestock', 'Cattle', 'PhilFarm Nutrition',
 'Vitamin-mineral feed premix that maximizes growth and feed efficiency in fattening programs.',
 'ProBoost is a complete vitamin and trace-mineral premix formulated for Philippine feeding conditions, supporting optimal daily gain, feed conversion, and overall herd vitality in cattle and swine fattening programs. Blends uniformly in home-mixed and commercial rations.',
 '[{"label":"Composition","value":"Vitamins A, D3, E, K, B-complex + chelated minerals"},{"label":"Inclusion Rate","value":"2.5 kg per ton of feed"},{"label":"Presentation","value":"25 kg bag"},{"label":"Target Species","value":"Cattle, swine"}]'::jsonb,
 false, false),
('petvital-tickaway-spot-on', 'PetVital TickAway Spot-On', 'pet-consumables', 'Anti-tick & Flea', 'PetVital',
 'Fast-acting fipronil spot-on treatment against ticks, fleas, and lice for dogs and cats.',
 'TickAway Spot-On delivers month-long protection against ticks, fleas, and biting lice with a single easy application. Waterproof after 48 hours and safe for puppies and kittens from 8 weeks of age. Available in size-specific pipettes for accurate, stress-free dosing — a bestseller in clinics and grooming salons nationwide.',
 '[{"label":"Active Ingredient","value":"Fipronil 10% w/v"},{"label":"Presentation","value":"Pipettes for S / M / L / XL dogs & cats"},{"label":"Protection","value":"Up to 4 weeks per application"},{"label":"Minimum Age","value":"8 weeks"}]'::jsonb,
 true, true),
('nutripaws-total-dewormer', 'NutriPaws Total Dewormer Tablets', 'pet-consumables', 'Dewormers', 'NutriPaws',
 'Broad-spectrum deworming tablets covering roundworms, hookworms, whipworms, and tapeworms.',
 'NutriPaws Total is a palatable, scored deworming tablet combining pyrantel, praziquantel, and febantel for complete coverage of the most common intestinal parasites of dogs. Simple weight-based dosing makes it ideal for clinic dispensing and retail. Liver-flavored for easy acceptance.',
 '[{"label":"Composition","value":"Pyrantel + Praziquantel + Febantel"},{"label":"Dosage","value":"1 tablet per 10 kg body weight"},{"label":"Presentation","value":"Blister of 4 / box of 100"},{"label":"Target Species","value":"Dogs"}]'::jsonb,
 false, true),
('petvital-multivit-syrup', 'PetVital MultiVit Syrup', 'pet-consumables', 'Vitamins', 'PetVital',
 'Complete daily multivitamin syrup with taurine and lysine for dogs and cats of all ages.',
 'MultiVit Syrup supports appetite, immunity, coat quality, and recovery with a complete B-complex plus vitamins A, D3, E, taurine, and lysine. The chicken-flavored syrup is readily accepted by both dogs and cats, making daily supplementation effortless for pet owners.',
 '[{"label":"Composition","value":"Vitamins A, D3, E, B-complex, taurine, lysine"},{"label":"Presentation","value":"60 mL / 120 mL bottle with dropper"},{"label":"Dosage","value":"1 mL per 5 kg body weight daily"},{"label":"Target Species","value":"Dogs & cats, all life stages"}]'::jsonb,
 true, false),
('groompro-oatmeal-aloe-shampoo', 'GroomPro Oatmeal & Aloe Shampoo', 'pet-consumables', 'Grooming', 'GroomPro',
 'Soap-free soothing shampoo for sensitive and itchy skin, salon-grade lather and scent.',
 'GroomPro Oatmeal & Aloe is a pH-balanced, soap-free shampoo that gently cleanses while soothing dry, itchy, or sensitive skin. Colloidal oatmeal and aloe vera calm irritation while pro-vitamin B5 leaves coats soft and glossy. The salon-size gallon format is a favorite of professional groomers.',
 '[{"label":"Key Ingredients","value":"Colloidal oatmeal, aloe vera, pro-vitamin B5"},{"label":"Presentation","value":"500 mL retail / 1 gal salon size"},{"label":"pH","value":"Balanced for canine & feline skin"},{"label":"Target Species","value":"Dogs & cats"}]'::jsonb,
 false, false),
('nutripaws-prime-adult-dog-food', 'NutriPaws Prime Adult Dog Food', 'pet-consumables', 'Pet Food', 'NutriPaws',
 'Premium chicken-and-rice complete nutrition with 26% protein for adult dogs.',
 'NutriPaws Prime delivers complete and balanced nutrition built on real chicken as the first ingredient, wholesome rice, and added omega-3 & 6 fatty acids for skin and coat health. Fortified with glucosamine for joint support and prebiotics for digestive health. Proudly formulated for the tropics with excellent palatability and stool quality.',
 '[{"label":"Protein / Fat","value":"26% / 15%"},{"label":"First Ingredient","value":"Real chicken"},{"label":"Presentation","value":"3 kg / 10 kg / 20 kg bags"},{"label":"Life Stage","value":"Adult, all breeds"}]'::jsonb,
 false, true),
('petvital-joint-plus-chews', 'PetVital Joint+ Glucosamine Chews', 'pet-consumables', 'Supplements', 'PetVital',
 'Tasty daily chews with glucosamine, chondroitin, and MSM for mobility and joint comfort.',
 'Joint+ combines glucosamine HCl, chondroitin sulfate, and MSM in a soft, liver-flavored chew dogs love. Supports cartilage health, mobility, and comfort in senior dogs, large breeds, and active working dogs. Visible results typically within 4–6 weeks of daily use.',
 '[{"label":"Composition","value":"Glucosamine 500 mg, Chondroitin 200 mg, MSM 150 mg per chew"},{"label":"Presentation","value":"Jar of 60 soft chews"},{"label":"Dosage","value":"1 chew per 15 kg daily"},{"label":"Target Species","value":"Dogs"}]'::jsonb,
 true, false),
('groompro-ear-care-solution', 'GroomPro Ear Care Solution', 'pet-consumables', 'Grooming', 'GroomPro',
 'Gentle ear cleansing solution that dissolves wax and keeps ears fresh between grooms.',
 'GroomPro Ear Care gently dissolves wax and debris while drying excess moisture — helping prevent the odor and irritation that lead to ear problems. Alcohol-free, sting-free formula suitable for routine use in dogs and cats, especially floppy-eared and swimming breeds.',
 '[{"label":"Formula","value":"Alcohol-free cleansing & drying agents"},{"label":"Presentation","value":"120 mL flip-top bottle"},{"label":"Use","value":"Routine cleaning 1–2x weekly"},{"label":"Target Species","value":"Dogs & cats"}]'::jsonb,
 false, false),
('petvital-calm-coat-omega-oil', 'PetVital Calm & Coat Omega Oil', 'pet-consumables', 'Supplements', 'PetVital',
 'Omega-3 rich fish oil blend for glossy coats, healthy skin, and heart support.',
 'Calm & Coat is a pure, molecularly distilled fish oil blend rich in EPA and DHA, supporting skin health, a brilliant coat, joint comfort, and cardiovascular function. Convenient pump bottle mixes easily into any meal. A simple daily upgrade recommended by veterinarians.',
 '[{"label":"Composition","value":"EPA 180 mg + DHA 120 mg per pump"},{"label":"Presentation","value":"250 mL pump bottle"},{"label":"Dosage","value":"1 pump per 10 kg daily with food"},{"label":"Target Species","value":"Dogs & cats"}]'::jsonb,
 false, false),
('medvet-dr900-digital-xray', 'MedVet DR-900 Digital X-ray System', 'equipment', 'Imaging', 'MedVet Imaging',
 'High-frequency digital radiography system with flat-panel detector, built for busy small-animal practices.',
 'The DR-900 brings hospital-grade digital radiography to veterinary practice: a 32 kW high-frequency generator, 17-inch square cesium flat-panel detector, and veterinary-specific acquisition software with breed-based exposure presets. Images appear in under 3 seconds, with one-click DICOM export and cloud PACS integration. Includes installation, staff training, and a comprehensive local service warranty.',
 '[{"label":"Generator","value":"32 kW high-frequency, 40–125 kVp"},{"label":"Detector","value":"17 x 17 inch CsI flat panel, 140 μm pixel pitch"},{"label":"Image Preview","value":"< 3 seconds"},{"label":"Software","value":"Vet acquisition suite, DICOM 3.0, PACS-ready"},{"label":"Table","value":"Floating 4-way table, 150 kg capacity"},{"label":"Warranty","value":"2 years parts & service"}]'::jsonb,
 true, false),
('medvet-vetscan-ct16', 'MedVet VetScan CT-16 Computed Tomography', 'equipment', 'CT Imaging', 'MedVet Imaging',
 '16-slice veterinary CT scanner with rapid low-dose protocols for advanced diagnostic imaging.',
 'The VetScan CT-16 makes advanced cross-sectional imaging practical for referral hospitals and specialty practices. Sixteen-slice acquisition with veterinary low-dose protocols, a wide 70 cm bore for large-breed patients, and automated 3D reconstruction for orthopedic, oncologic, and neurologic cases. Full project support available: site planning, shielding guidance, installation, and radiologist workflow setup.',
 '[{"label":"Slices","value":"16-slice helical acquisition"},{"label":"Bore / Table","value":"70 cm bore, 200 kg carbon-fiber table"},{"label":"Rotation","value":"0.75 s full rotation"},{"label":"Reconstruction","value":"Real-time 3D / MPR workstation included"},{"label":"Site Support","value":"Planning, shielding & installation included"},{"label":"Warranty","value":"2 years parts & service, extendable"}]'::jsonb,
 true, false),
('provet-sonoview-60-ultrasound', 'ProVet SonoView 60 Color Doppler Ultrasound', 'equipment', 'Imaging', 'ProVet Diagnostics',
 'Portable color Doppler ultrasound with veterinary presets for abdominal, cardiac, and reproductive scanning.',
 'The SonoView 60 packs a 15.6-inch full-HD display, advanced color and pulsed-wave Doppler, and species-specific presets into a 6.5 kg portable unit. Micro-convex, linear, and phased-array probes cover everything from canine abdominal studies to bovine reproductive work. Four-hour battery and one-touch image sharing make it equally at home in clinic and field.',
 '[{"label":"Display","value":"15.6 inch full-HD LED"},{"label":"Modes","value":"B, M, Color, PW Doppler"},{"label":"Probes","value":"Micro-convex, linear, phased array"},{"label":"Battery","value":"Up to 4 hours field use"},{"label":"Weight","value":"6.5 kg with battery"},{"label":"Warranty","value":"1 year, extendable to 3"}]'::jsonb,
 false, true),
('labcore-hemacount-5', 'LabCore HemaCount 5 Hematology Analyzer', 'equipment', 'Laboratory', 'LabCore Systems',
 '5-part differential veterinary hematology analyzer — 23 parameters from a 15 μL sample in 60 seconds.',
 'HemaCount 5 delivers reference-lab quality CBCs at the point of care: a true 5-part differential across 23 parameters, from just 15 μL of whole blood, in 60 seconds. Pre-calibrated for 13 species with automatic flagging and cloud QC. Reagent bundles and preventive maintenance plans keep your cost-per-test predictable.',
 '[{"label":"Differential","value":"True 5-part, 23 parameters"},{"label":"Sample Volume","value":"15 μL whole blood"},{"label":"Throughput","value":"60 samples/hour"},{"label":"Species","value":"13 pre-calibrated species profiles"},{"label":"Connectivity","value":"LIS / cloud QC, USB, LAN"},{"label":"Warranty","value":"1 year + PM plans available"}]'::jsonb,
 true, false),
('labcore-chempro-240', 'LabCore ChemPro 240 Chemistry Analyzer', 'equipment', 'Laboratory', 'LabCore Systems',
 'Compact dry-chemistry analyzer for fast in-clinic organ profiles with single-slide economy.',
 'The ChemPro 240 runs comprehensive organ profiles, electrolytes, and single-test add-ons on stable dry-chemistry slides — no reagent prep, no plumbing, results in minutes. Ideal for clinics stepping up to in-house diagnostics, with pay-per-test economics and automatic result interpretation against species reference ranges.',
 '[{"label":"Technology","value":"Dry-slide chemistry"},{"label":"Menu","value":"25+ analytes, pre-bundled profiles"},{"label":"Time to Result","value":"~ 8 minutes per panel"},{"label":"Sample","value":"100 μL serum / plasma"},{"label":"Footprint","value":"Benchtop, 12 kg"},{"label":"Warranty","value":"1 year parts & service"}]'::jsonb,
 false, false),
('vettech-autoclave-s50', 'VetTech AutoClave S-50 Class B Sterilizer', 'equipment', 'Clinic Essentials', 'VetTech Instruments',
 '23 L Class B vacuum autoclave with automatic cycles for surgical packs and instruments.',
 'The AutoClave S-50 provides true Class B sterilization with fractionated pre-vacuum, ensuring complete penetration of wrapped instruments, hollow items, and textile packs. Five preset cycles, built-in printer for compliance records, and dual safety interlocks. The dependable heart of any surgical suite.',
 '[{"label":"Chamber","value":"23 L stainless, Class B vacuum"},{"label":"Cycles","value":"5 preset + custom programs"},{"label":"Documentation","value":"Built-in thermal printer, USB log"},{"label":"Safety","value":"Dual door interlock, over-pressure valve"},{"label":"Warranty","value":"1 year parts & service"}]'::jsonb,
 false, false),
('provet-vitaltrack-monitor', 'ProVet VitalTrack Multi-Parameter Patient Monitor', 'equipment', 'Diagnostics', 'ProVet Diagnostics',
 'Veterinary patient monitor with ECG, SpO2, NIBP, temperature, and capnography options.',
 'VitalTrack keeps every anesthetic procedure safer with continuous ECG, SpO2, NIBP, respiration, and temperature monitoring — with optional sidestream capnography. Veterinary-specific algorithms and cuff sizes, 12-inch touch display, adjustable alarms, and 72-hour trend memory. Trolley and wall mounts included.',
 '[{"label":"Parameters","value":"ECG, SpO2, NIBP, RESP, TEMP (+ EtCO2 option)"},{"label":"Display","value":"12 inch color touch screen"},{"label":"Trends","value":"72-hour graphical & tabular"},{"label":"Power","value":"Mains + 4-hour battery backup"},{"label":"Warranty","value":"1 year parts & service"}]'::jsonb,
 false, true),
('vettech-anesthiacare-v2', 'VetTech AnesthiaCare V2 Anesthesia Machine', 'equipment', 'Clinic Essentials', 'VetTech Instruments',
 'Precision isoflurane/sevoflurane anesthesia system with ventilator-ready circuit for small animals.',
 'AnesthiaCare V2 delivers smooth, precise anesthesia with a calibrated dual-agent vaporizer mount, fine-control flowmeters, and both rebreathing and non-rebreathing circuits for patients from 200 g to 100 kg. Ventilator-ready with standard connections and an integrated safety pop-off with manometer. Trusted in hundreds of Philippine surgical suites.',
 '[{"label":"Vaporizer","value":"Isoflurane or Sevoflurane, TEC-compatible"},{"label":"Patient Range","value":"200 g – 100 kg"},{"label":"Circuits","value":"Rebreathing + Bain non-rebreathing"},{"label":"Safety","value":"Pop-off valve with manometer, O2 flush"},{"label":"Warranty","value":"1 year parts & service"}]'::jsonb,
 true, false)
on conflict (slug) do nothing;

-- ── Promotions ───────────────────────────────────────────────
insert into public.promotions (title, description, type, starts_at, ends_at, items, active)
select * from (values
  ('Rainy Season Farm Protection Bundle',
   'Keep your flock and herd protected through the wet months. Every bundle includes FarmGuard disinfectant, ElectroLyte Plus, and VitaBoost ADE Forte at a special package price — plus free biosecurity assessment for orders of 5 bundles and up.',
   'bundle', date '2026-07-01', date '2026-09-30',
   array['BioShield FarmGuard Disinfectant 5 L × 2', 'PhilFarm ElectroLyte Plus 1 kg × 5', 'PhilFarm VitaBoost ADE Forte 100 mL × 3', 'FREE biosecurity farm assessment (5+ bundles)'], true),
  ('Pet Wellness Month: Buy 10 + 2 Free Dewormers',
   'Stock up for Pet Wellness Month! For every 10 boxes of NutriPaws Total Dewormer, get 2 boxes free — plus point-of-sale materials for your clinic or shop while supplies last.',
   'seasonal', date '2026-07-15', date '2026-08-31',
   array['NutriPaws Total Dewormer — Buy 10 boxes, get 2 FREE', 'FREE counter display & poster kit', 'Applies to boxes of 100 tablets'], true),
  ('Clinic Starter Equipment Package',
   'Opening or upgrading a practice? Get the SonoView 60 ultrasound, VitalTrack monitor, and AutoClave S-50 as a package with zero-interest installment terms, free installation, and staff training included.',
   'bundle', date '2026-08-01', date '2026-12-31',
   array['ProVet SonoView 60 Color Doppler Ultrasound', 'ProVet VitalTrack Patient Monitor', 'VetTech AutoClave S-50', 'FREE installation + staff training', '0% installment up to 12 months'], true),
  ('Anniversary Sale — Up to 20% Off Grooming Lines',
   'Our anniversary treat for groomers and pet shops: up to 20% off the entire GroomPro line, including salon-size formats. Thank you for growing with EVR Vet Options!',
   'banner', date '2026-03-01', date '2026-03-31',
   array['GroomPro shampoos & conditioners — 20% off', 'GroomPro Ear Care Solution — 15% off', 'Minimum order of 1 case per SKU'], true)
) as v(title, description, type, starts_at, ends_at, items, active)
where not exists (select 1 from public.promotions);

-- ── Events ───────────────────────────────────────────────────
insert into public.events (slug, title, type, date, end_date, location, description) values
('philippine-veterinary-expo-2026', 'Philippine Veterinary Expo 2026', 'expo', date '2026-08-26', date '2026-08-28', 'SMX Convention Center, Pasay City',
 'Visit the EVR Vet Options booth at the country''s biggest veterinary trade event! Experience live demos of the MedVet DR-900 digital X-ray and SonoView 60 ultrasound, exclusive expo-only equipment deals, and daily raffle draws. Our licensed veterinarians and product specialists will be on site all three days.'),
('poultry-health-biosecurity-summit-2026', 'Poultry Health & Biosecurity Summit', 'seminar', date '2026-10-08', null, 'Seda Vertis North, Quezon City',
 'A full-day technical seminar for commercial poultry raisers and farm veterinarians. Topics include updated vaccination programs, water sanitation, and practical biosecurity against avian influenza — featuring speakers from our principal partners and the academe. Includes lunch, certificates, and product starter kits for all attendees.'),
('small-animal-ultrasound-training-2026', 'Hands-On Ultrasound Training for Small Animal Practitioners', 'training', date '2026-11-14', null, 'EVR Training Center, Quezon City',
 'Limited-slot, hands-on abdominal ultrasound workshop for veterinarians using the ProVet SonoView 60. Morning lectures on scanning technique and image interpretation, afternoon supervised live scanning in small groups. Certificate of completion and exclusive equipment offers for participants.'),
('swine-production-efficiency-seminar-2026', 'Swine Production Efficiency Seminar', 'seminar', date '2026-03-12', null, 'San Fernando, Pampanga',
 'Over 120 hog raisers from Central Luzon joined our technical team for a morning of practical talks on feed efficiency, herd health programs, and African Swine Fever recovery strategies — followed by farm consultations and a product showcase.'),
('evr-dealers-conference-2025', 'EVR Dealers'' Conference 2025', 'conference', date '2025-11-21', date '2025-11-22', 'Taal Vista Hotel, Tagaytay',
 'Our annual gathering of dealer partners from across the country — two days of business reviews, new product launches, awarding of top-performing dealers, and a whole lot of celebration. Thank you to all our partners for another record year!'),
('agrilivestock-philippines-2025', 'AgriLivestock Philippines Expo 2025', 'expo', date '2025-06-04', date '2025-06-06', 'World Trade Center, Pasay City',
 'Three energetic days at the premier livestock industry expo. Our booth featured the full PhilFarm nutrition line and AgriVax biologics range, with our veterinarians conducting free farm program consultations for hundreds of visitors.')
on conflict (slug) do nothing;

-- ── Partners ─────────────────────────────────────────────────
insert into public.partners (name, sort_order)
select * from (values
  ('AgriVax Biologics', 1), ('VetNova Animal Health', 2), ('PhilFarm Nutrition', 3),
  ('BioShield Animal Health', 4), ('PetVital', 5), ('NutriPaws', 6), ('GroomPro', 7),
  ('MedVet Imaging', 8), ('ProVet Diagnostics', 9), ('LabCore Systems', 10), ('VetTech Instruments', 11)
) as v(name, sort_order)
where not exists (select 1 from public.partners);

-- ── Testimonials ─────────────────────────────────────────────
insert into public.testimonials (name, role, company, quote, rating)
select * from (values
  ('Dr. Maria Katrina Santos, DVM', 'Owner & Head Veterinarian', 'Santos Veterinary Clinic, Quezon City',
   'From the DR-900 X-ray installation to staff training and every service call since, EVR has been outstanding. Their after-sales support is the reason we bought our second machine from them without even canvassing elsewhere.', 5),
  ('Ramon dela Cruz', 'Operations Manager', 'Golden Harvest Poultry Farms, Bulacan',
   'Our mortality rates dropped significantly after we adopted the health program their vets designed around AgriVax and ElectroLyte Plus. Deliveries always arrive on schedule — even during typhoon season. That reliability matters to a farm our size.', 5),
  ('Dr. Paolo Mendoza, DVM', 'Chief Veterinarian', 'Mendoza Animal Hospital, Cebu City',
   'The SonoView 60 has transformed our diagnostic workflow. EVR flew a specialist to Cebu for our training and still checks in regularly. You can tell they treat provincial clinics as true partners, not just accounts.', 5),
  ('Angelica Reyes-Tan', 'Owner', 'Pawsome Pet Shop & Grooming, Makati',
   'PetVital and GroomPro consistently move off our shelves, and the margins are healthy. Their account officer visits monthly, keeps our stock balanced, and their promos always come with marketing materials. Easiest supplier we work with.', 4),
  ('Edgardo Villanueva', 'Farm Owner', 'Villanueva Cattle Ranch, Bukidnon',
   'Even out here in Mindanao, EVR never makes us feel far away. VitaBoost ADE has been part of our breeding program for years, and their team answers our questions any time of day. Excellence, value, reliability — they live up to it.', 5)
) as v(name, role, company, quote, rating)
where not exists (select 1 from public.testimonials);

-- ── Certificates & awards ────────────────────────────────────
insert into public.certificates (title, type, issued_by, year)
select * from (values
  ('FDA License to Operate — Veterinary Drug Distributor', 'certificate', 'Philippine Food and Drug Administration', 2025),
  ('ISO 9001:2015 Quality Management System', 'certificate', 'International Certification Body', 2024),
  ('Certificate of Product Registration — Veterinary Products', 'certificate', 'Bureau of Animal Industry', 2025),
  ('Top Veterinary Distributor of the Year', 'award', 'Philippine Animal Health Industry Awards', 2025),
  ('Excellence in After-Sales Service', 'award', 'Veterinary Equipment Suppliers Guild', 2024),
  ('Outstanding SME — Animal Health Category', 'award', 'Philippine Chamber of Commerce & Industry', 2023)
) as v(title, type, issued_by, year)
where not exists (select 1 from public.certificates);

-- ── FAQs ─────────────────────────────────────────────────────
insert into public.faqs (question, answer, sort_order)
select * from (values
  ('How do I place an order?',
   'You can order through your assigned account officer, by calling our office, or by sending your purchase order to sales@evrvetoptions.com. New customers are welcome — send us a message through the Contact page and our team will set up your account within one business day.', 1),
  ('Do you deliver nationwide?',
   'Yes. We deliver across Luzon, Visayas, and Mindanao through our own fleet and accredited logistics partners. Cold-chain products are shipped in validated coolers with temperature monitoring from our warehouse to your door.', 2),
  ('Do I need a prescription for veterinary drugs?',
   'Certain products, such as antibiotics, are regulated and require a valid veterinary prescription in accordance with FDA and Bureau of Animal Industry regulations. Our in-house licensed veterinarians can also assist your farm or clinic with proper documentation and responsible-use programs.', 3),
  ('Can we request a demo before buying equipment?',
   'Absolutely. We offer live demonstrations at our Quezon City showroom, and for select equipment we can arrange an on-site demo at your clinic or hospital. Contact us to schedule with one of our biomedical specialists.', 4),
  ('What warranty comes with machines and equipment?',
   'All equipment includes at least a one-year manufacturer''s warranty on parts and service, with extended coverage available on imaging and laboratory systems. Warranty service is performed by our factory-trained engineers using genuine parts.', 5),
  ('What after-sales support do you provide?',
   'Every equipment purchase includes installation, staff training, preventive maintenance scheduling, and access to our technical support hotline. For consumables, our licensed veterinarians provide product technical support and farm program consultations.', 6),
  ('How can my store become an EVR dealer or reseller?',
   'We are always looking for dealer partners in growing areas. Send us your business details through the Contact page, and our business development team will get in touch regarding dealership requirements, pricing tiers, and marketing support.', 7),
  ('What payment terms do you offer?',
   'We accept bank transfer, checks, and major payment channels. Qualified accounts may apply for credit terms, and select equipment purchases can be arranged with installment plans — including 0% interest promos during selected periods.', 8)
) as v(question, answer, sort_order)
where not exists (select 1 from public.faqs);

-- ── Gallery ──────────────────────────────────────────────────
insert into public.gallery (title, category)
select * from (values
  ('Head Office Reception', 'office'),
  ('Customer Care Team', 'office'),
  ('Main Distribution Warehouse', 'warehouse'),
  ('Cold Chain Storage Facility', 'warehouse'),
  ('Equipment Showroom', 'showroom'),
  ('Imaging Demo Suite', 'showroom'),
  ('Sales & Veterinary Services Team', 'team'),
  ('Team Building 2025', 'team'),
  ('EVR Booth — PhilVet Expo', 'events'),
  ('Dealer Awards Night', 'events')
) as v(title, category)
where not exists (select 1 from public.gallery);
