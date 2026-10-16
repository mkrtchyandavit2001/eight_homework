import type { Material } from "@/types/dashboard";

// TODO: "#" url-ները փոխարինել backend-ի իրական հղումներով
export const MATERIALS: Material[] = [
  {
    id: "m-flashcards",
    unit: 1,
    size: { value: 2.4, unit: "MB" },
    highlighted: true,
    viewUrl: "#",
    videoUrl: "#",
    exerciseUrl: "#",
  },
  {
    id: "m-family-vocab",
    unit: 2,
    size: { value: 4.1, unit: "MB" },
    viewUrl: "#",
    videoUrl: "#",
    exerciseUrl: "#",
  },
  {
    id: "m-family-sentences",
    unit: 2,
    size: { value: 3.2, unit: "MB" },
    viewUrl: "#",
    videoUrl: "#",
    exerciseUrl: "#",
  },
  {
    id: "m-numbers",
    unit: 3,
    size: { value: 820, unit: "KB" },
    viewUrl: "#",
    videoUrl: "#",
    exerciseUrl: "#",
  },
  {
    id: "m-colors",
    unit: 3,
    size: { value: 640, unit: "KB" },
    viewUrl: "#",
    exerciseUrl: "#",
  },
  {
    id: "m-song",
    unit: 1,
    size: { value: 5.2, unit: "MB" },
    viewUrl: "#",
    videoUrl: "#",
    exerciseUrl: "#",
  },
];