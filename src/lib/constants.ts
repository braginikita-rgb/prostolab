export interface TagData {
    id: string;
    label: string;
    top: number;
    left: number;
    // Direction to move when scrolling (will be normalized)
    dirX: number;
    dirY: number;
}

export const TAGS_DESKTOP: TagData[] = [
    { id: "t1", label: "React", top: 15, left: 15, dirX: -1, dirY: -0.5 },
    { id: "t2", label: "Next.js", top: 10, left: 50, dirX: 0, dirY: -1 },
    { id: "t3", label: "TypeScript", top: 18, left: 85, dirX: 1, dirY: -0.5 },
    { id: "t4", label: "Tailwind", top: 35, left: 8, dirX: -1, dirY: 0 },
    { id: "t5", label: "Motion", top: 30, left: 92, dirX: 1, dirY: -0.2 },
    { id: "t6", label: "WebGL", top: 50, left: 5, dirX: -1, dirY: 0.2 },
    { id: "t7", label: "UI/UX", top: 55, left: 95, dirX: 1, dirY: 0.2 },
    { id: "t8", label: "Performance", top: 70, left: 10, dirX: -1, dirY: 0.5 },
    { id: "t9", label: "Strategy", top: 72, left: 90, dirX: 1, dirY: 0.4 },
    { id: "t10", label: "Design", top: 85, left: 20, dirX: -0.7, dirY: 1 },
    { id: "t11", label: "Mobile", top: 88, left: 50, dirX: 0, dirY: 1 },
    { id: "t12", label: "SEO", top: 82, left: 80, dirX: 0.7, dirY: 1 },
];

export const TAGS_MOBILE: TagData[] = [
    { id: "tm1", label: "React", top: 12, left: 15, dirX: -1, dirY: -0.8 },
    { id: "tm2", label: "Next.js", top: 15, left: 85, dirX: 1, dirY: -0.7 },
    { id: "tm3", label: "UI/UX", top: 38, left: 8, dirX: -1, dirY: 0 },
    { id: "tm4", label: "Motion", top: 42, left: 92, dirX: 1, dirY: 0 },
    { id: "tm5", label: "Design", top: 68, left: 10, dirX: -1, dirY: 0.5 },
    { id: "tm6", label: "Mobile", top: 72, left: 90, dirX: 1, dirY: 0.5 },
    { id: "tm7", label: "Code", top: 88, left: 25, dirX: -0.6, dirY: 1 },
    { id: "tm8", label: "Web", top: 90, left: 75, dirX: 0.6, dirY: 1 },
];
