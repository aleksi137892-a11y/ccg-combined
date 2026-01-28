export interface RegistryEntry {
  id: string;
  name: string;
  position: string;
  organization?: string;
  photo: string;
  complicity: {
    nature: string;
    severity: "high" | "medium" | "low";
    details: string;
  };
  dateAdded: string;
  sanctions: string[];
  sources?: {
    title: string;
    url: string;
  }[];
}
