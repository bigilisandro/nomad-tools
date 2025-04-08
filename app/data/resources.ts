export interface Category {
  id: string
  name: string
}

export interface Resource {
  id: string
  name: string
  description: string
  url: string
  category: string
  color: string
  imageUrl: string // Changed from logo to imageUrl
  featured: boolean
}

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "insurance", name: "Insurance" },
  { id: "banking", name: "Banking & Finance" },
  { id: "remote-work", name: "Remote Work" },
  { id: "accommodation", name: "Accommodation" },
  { id: "health", name: "Health & Wellness" },
  { id: "security", name: "Security & VPN" },
  { id: "connectivity", name: "Connectivity" },
  { id: "community", name: "Community" },
]

export const resources: Resource[] = [
  {
    id: "nomad-list",
    name: "Nomad List",
    description:
      "The biggest network of nomads in the world. Data on 1,500+ cities with cost of living, internet speed, weather and other metrics.",
    url: "https://nomadlist.com",
    category: "community",
    color: "#FF4742",
    imageUrl: "/images/logos/nomadlist.png", // Placeholder URL
    featured: true,
  },
  {
    id: "remote-ok",
    name: "Remote OK",
    description: "Find remote jobs for digital nomads. The largest remote work community in the world.",
    url: "https://remoteok.com",
    category: "remote-work",
    color: "#000000",
    imageUrl: "/images/logos/remoteok.png", // Placeholder URL
    featured: true,
  },
  {
    id: "safety-wing",
    name: "SafetyWing",
    description:
      "Global travel medical insurance for nomads. Coverage in 175+ countries with affordable monthly payments.",
    url: "https://safetywing.com",
    category: "insurance",
    color: "#5ECBC1",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4D0BAQHeJ7jA01xljA/company-logo_200_200/company-logo_200_200/0/1630571752283/safetywing_logo?e=2147483647&v=beta&t=X2arnYCzItESugFJtqXztjCS5vNyH1Y5Nyzv9egmiO0", // Placeholder URL
    featured: true,
  },
  {
    id: "wise",
    name: "Wise",
    description:
      "International banking without fees. Send, receive, and spend money internationally at the real exchange rate.",
    url: "https://wise.com",
    category: "banking",
    color: "#00B9FF",
    imageUrl: "/images/logos/wise.png", // Placeholder URL
    featured: true,
  },
  {
    id: "revolut",
    name: "Revolut",
    description: "Global money app with multi-currency accounts, no hidden fees, and built-in budgeting tools.",
    url: "https://revolut.com",
    category: "banking",
    color: "#2C67FF",
    imageUrl: "/images/logos/revolut.png", // Placeholder URL
    featured: true,
  },
  {
    id: "deel",
    name: "Deel",
    description: "Hire, pay and manage contractors and employees in 150+ countries. Compliant contracts and payments.",
    url: "https://deel.com",
    category: "remote-work",
    color: "#5C50E8",
    imageUrl: "/images/logos/deel.png", // Placeholder URL
    featured: false,
  },
  {
    id: "airalo",
    name: "Airalo",
    description: "Digital eSIMs for 200+ countries and regions. Stay connected globally with affordable data plans.",
    url: "https://airalo.com",
    category: "connectivity",
    color: "#48AC98",
    imageUrl: "/images/logos/airalo.png", // Placeholder URL
    featured: false,
  },
  {
    id: "express-vpn",
    name: "ExpressVPN",
    description: "High-speed, ultra-secure VPN with servers in 94 countries. Protect your privacy online.",
    url: "https://expressvpn.com",
    category: "security",
    color: "#DA3940",
    imageUrl: "/images/logos/expressvpn.png", // Placeholder URL
    featured: false,
  },
  {
    id: "world-nomads",
    name: "World Nomads",
    description: "Comprehensive travel insurance for adventurous travelers. Coverage for medical emergencies and gear.",
    url: "https://worldnomads.com",
    category: "insurance",
    color: "#26C6DA",
    imageUrl: "/images/logos/worldnomads.png", // Placeholder URL
    featured: false,
  },
  {
    id: "n26",
    name: "N26",
    description:
      "Mobile banking with no hidden fees. Open a 100% mobile bank account in minutes with free ATM withdrawals.",
    url: "https://n26.com",
    category: "banking",
    color: "#20D5A4",
    imageUrl: "/images/logos/n26.png", // Placeholder URL
    featured: false,
  },
  {
    id: "workaway",
    name: "Workaway",
    description:
      "Connect with hosts worldwide for cultural exchange. Work a few hours daily in exchange for accommodation.",
    url: "https://workaway.info",
    category: "accommodation",
    color: "#F15A29",
    imageUrl: "/images/logos/workaway.png", // Placeholder URL
    featured: false,
  },
  {
    id: "trusted-housesitters",
    name: "Trusted Housesitters",
    description: "Stay for free in homes worldwide by caring for pets while their owners are away.",
    url: "https://trustedhousesitters.com",
    category: "accommodation",
    color: "#1DBEC8",
    imageUrl: "/images/logos/trustedhousesitters.png", // Placeholder URL
    featured: false,
  },
]
