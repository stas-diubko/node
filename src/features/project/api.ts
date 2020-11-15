export interface ProjectCreate {
    name: string;
    description: string;
    features: Array<FeatureView>;
}

export interface FeatureView {
    title: string;
    level: string;
    estimate: string;
}