import { 
  Headphones as Head, 
  Eye, 
  Wind as Throat, 
  Activity as Chest, 
  CircleDot as Stomach, 
  User as Back, 
  Move as Shoulder, 
  Hand, 
  Zap as Knee, 
  Footprints as Foot 
} from "lucide-react";

export interface SymptomArea {
  id: string;
  label: string;
  icon: any;
  symptoms: string[];
  // SVG coordinates for front/back hotspots
  front?: { cx: string; cy: string };
  back?: { cx: string; cy: string };
}

export const bodyAreas: SymptomArea[] = [
  {
    id: "head",
    label: "Head",
    icon: Head,
    symptoms: ["Headache", "Migraine", "Dizziness", "Stress", "Sinus issue"],
    front: { cx: "0", cy: "0" },
    back: { cx: "0", cy: "0" }
  },
  {
    id: "eyes",
    label: "Eyes",
    icon: Eye,
    symptoms: ["Blurry vision", "Eye strain", "Dryness", "Burning sensation", "Redness"],
    front: { cx: "0", cy: "0" }
  },
  {
    id: "throat",
    label: "Throat",
    icon: Throat,
    symptoms: ["Sore throat", "Cough", "Difficulty swallowing", "Dryness", "Hoarseness"],
    front: { cx: "0", cy: "65" }
  },
  {
    id: "chest",
    label: "Chest",
    icon: Chest,
    symptoms: ["Chest pain", "Palpitations", "Shortness of breath", "Tightness", "Acidity-related pain"],
    front: { cx: "0", cy: "135" }
  },
  {
    id: "stomach",
    label: "Stomach",
    icon: Stomach,
    symptoms: ["Acidity", "Gas", "Constipation", "Indigestion", "Bloating", "Abdominal Pain"],
    front: { cx: "0", cy: "220" }
  },
  {
    id: "back",
    label: "Back",
    icon: Back,
    symptoms: ["Upper back pain", "Lower back pain", "Stiffness", "Sciatica", "Spondylitis"],
    back: { cx: "0", cy: "180" }
  },
  {
    id: "shoulder",
    label: "Shoulders",
    icon: Shoulder,
    symptoms: ["Frozen shoulder", "Stiffness", "Muscle tension", "Joint pain"],
    front: { cx: "75", cy: "100" },
    back: { cx: "-75", cy: "100" }
  },
  {
    id: "arm",
    label: "Arms",
    icon: Hand,
    symptoms: ["Numbness", "Weakness", "Muscle pain", "Tingling"],
    front: { cx: "90", cy: "180" },
    back: { cx: "-90", cy: "180" }
  },
  {
    id: "hand",
    label: "Hands",
    icon: Hand,
    symptoms: ["Joint pain", "Tremors", "Numbness", "Skin issues"],
    front: { cx: "110", cy: "270" },
    back: { cx: "-110", cy: "270" }
  },
  {
    id: "knee",
    label: "Knees",
    icon: Knee,
    symptoms: ["Joint pain", "Swelling", "Creaking", "Stiffness", "Injury"],
    front: { cx: "30", cy: "430" },
    back: { cx: "-30", cy: "430" }
  },
  {
    id: "leg",
    label: "Legs",
    icon: Foot,
    symptoms: ["Varicose veins", "Cramps", "Weakness", "Sciatica pain", "Swelling"],
    front: { cx: "30", cy: "380" },
    back: { cx: "-30", cy: "380" }
  },
  {
    id: "foot",
    label: "Feet",
    icon: Foot,
    symptoms: ["Heel pain", "Corns", "Swelling", "Burning feet", "Numbness"],
    front: { cx: "30", cy: "525" },
    back: { cx: "-30", cy: "525" }
  }
];
