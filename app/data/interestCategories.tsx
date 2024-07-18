import { ReactNode } from "react";
import {
  House,
  Plane,
  Utensils,
  Heart,
  Laptop,
  Palette,
  GraduationCap,
  Briefcase,
  Dumbbell,
  Shirt,
  Film,
  BookOpen,
  Music,
  Gamepad,
} from "lucide-react";

export interface InterestCategory {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
}

export const interestCategories: InterestCategory[] = [
  {
    id: "lifestyle",
    name: "일상/라이프스타일",
    icon: <House size={18} />,
    color: "#4CAF50",
  },
  { id: "travel", name: "여행", icon: <Plane size={18} />, color: "#03A9F4" },
  {
    id: "food",
    name: "음식/요리",
    icon: <Utensils size={18} />,
    color: "#FF5722",
  },
  {
    id: "health",
    name: "건강/웰빙",
    icon: <Heart size={18} />,
    color: "#E91E63",
  },
  { id: "tech", name: "기술/IT", icon: <Laptop size={18} />, color: "#2196F3" },
  {
    id: "culture",
    name: "문화/예술",
    icon: <Palette size={18} />,
    color: "#9C27B0",
  },
  {
    id: "education",
    name: "교육/학습",
    icon: <GraduationCap size={18} />,
    color: "#FFC107",
  },
  {
    id: "business",
    name: "비즈니스/경제",
    icon: <Briefcase size={18} />,
    color: "#795548",
  },
  {
    id: "sports",
    name: "스포츠/피트니스",
    icon: <Dumbbell size={18} />,
    color: "#FF9800",
  },
  {
    id: "fashion",
    name: "패션/뷰티",
    icon: <Shirt size={18} />,
    color: "#F06292",
  },
  {
    id: "entertainment",
    name: "영화/TV/엔터테인먼트",
    icon: <Film size={18} />,
    color: "#673AB7",
  },
  {
    id: "books",
    name: "책/독서",
    icon: <BookOpen size={18} />,
    color: "#8BC34A",
  },
  { id: "music", name: "음악", icon: <Music size={18} />, color: "#3F51B5" },
  { id: "games", name: "게임", icon: <Gamepad size={18} />, color: "#607D8B" },
];
