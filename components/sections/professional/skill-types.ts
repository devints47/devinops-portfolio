import { ReactNode } from "react";

export type SkillLevel = "Expert" | "Advanced" | "Intermediate" | "Beginner";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  name: string;
  icon: ReactNode;
  skills: Skill[];
} 