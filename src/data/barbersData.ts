import type { GalleryImage } from "../components/LightboxGallery";
import { barberGalleryMap, beforeAfterMap } from "./generatedGallery";

import khalilPhoto from "../../public/khalil.jpg";

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
  beforeAfterPairs: { before: GalleryImage; after: GalleryImage }[];
}

/* ─── Gallery images are auto-generated from /public/barbers/<name>/ folders ─── */
/* Run: node scripts/generate-gallery-data.js to refresh after adding photos */

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
    galleryImages: barberGalleryMap.alayoubi ?? [],
    beforeAfterPairs: beforeAfterMap.alayoubi ?? [],
  },
  {
    id: "khalil",
    nameKey: "khalilName",
    roleKey: "khalilRole",
    descKey: "khalilBio",
    specialtyKey: "khalilSpecialty",
    experienceKey: "khalilExperience",
    isMaster: false,
    profileImage: khalilPhoto,
    galleryImages: barberGalleryMap.khalil ?? [],
    beforeAfterPairs: beforeAfterMap.khalil ?? [],
  },
];

export default barbersData;
