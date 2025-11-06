
export enum KnowledgeLevel {
  NOVICE = "Just starting out",
  BEGINNER = "I know a little",
  INTERMEDIATE = "I'm experienced",
}

export enum LearningStyle {
  READING = "Reading",
  WATCHING = "Watching Videos",
  DOING = "Hands-on Projects",
  LISTENING = "Listening to Podcasts",
}

export interface Resource {
  type: 'Article' | 'Video' | 'Project' | 'Podcast' | 'Documentation' | 'Course';
  title: string;
  description: string;
}

export interface LearningStep {
  step: number;
  title: string;
  description: string;
  resources: Resource[];
}

export interface LearningPlan {
  title: string;
  plan: LearningStep[];
}
