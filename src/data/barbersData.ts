import type { GalleryImage } from "../components/LightboxGallery";

export interface Barber {
  id: string;
  nameKey: "alayoubiName" | "khalilName";
  roleKey: "alayoubiRole" | "khalilRole";
  descKey: "alayoubiBio" | "khalilBio";
  specialtyKey: "alayoubiSpecialty" | "khalilSpecialty";
  experienceKey: "alayoubiExperience" | "khalilExperience";
  isMaster: boolean;
  profileImage: string;
  galleryImages: GalleryImage[];
}

const barbersData: Barber[] = [
  {
    id: "alayoubi",
    nameKey: "alayoubiName",
    roleKey: "alayoubiRole",
    descKey: "alayoubiBio",
    specialtyKey: "alayoubiSpecialty",
    experienceKey: "alayoubiExperience",
    isMaster: true,
    profileImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHNuY4eS0cfJuNXyl8EJh-IczBf9gM1RLsXlKljWkkPEHM7n7e6g4_TLZu-WPKxKcOskkqRuXsRPNFOquSTqqhuXzLQVosyz_zq9s9iBjSkXmZ3FyKAS_nupA3xaslMWqjHDkYQ2YlioCkL6bCZkPF6vFa18-jiZHn9i71I2_gI56hgJ71GTEeIEWUq60vjk62YBZ8jUqv7NOZ8nWPnbsbbNJOPTqL1ej0a_-7oUHa-BEr0L1WyZhjz3HmjFIyDomz3NPM4CmN0G4",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
        alt: "Fade haircut",
      },
      {
        src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
        alt: "Classic taper",
      },
      {
        src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
        alt: "Beard sculpting",
      },
      {
        src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
        alt: "Precision line-up",
      },
      {
        src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&q=80",
        alt: "Textured crop",
      },
      {
        src: "https://images.unsplash.com/photo-1585747860019-8005b2f45a82?w=800&q=80",
        alt: "Gentleman cut",
      },
    ],
  },
  {
    id: "khalil",
    nameKey: "khalilName",
    roleKey: "khalilRole",
    descKey: "khalilBio",
    specialtyKey: "khalilSpecialty",
    experienceKey: "khalilExperience",
    isMaster: false,
    profileImage:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
        alt: "Classic cut",
      },
      {
        src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800&q=80",
        alt: "Straight razor shave",
      },
      {
        src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
        alt: "Skin fade",
      },
      {
        src: "https://images.unsplash.com/photo-1634297097498-e52a4dc09e63?w=800&q=80",
        alt: "Modern pompadour",
      },
      {
        src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=800&q=80",
        alt: "Beard trim",
      },
      {
        src: "https://images.unsplash.com/photo-1519019121350-21d2e9b3ed1c?w=800&q=80",
        alt: "Precision styling",
      },
    ],
  },
];

export default barbersData;
