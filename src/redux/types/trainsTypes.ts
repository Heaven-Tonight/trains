export type AppState = {
    trains: Train[];
    activeTrainId: number | null;
};

export type Train = {
    name: string;
    description: string;
    characteristics: {
        speed: number;
        force: number;
        engineAmperage: number;
    }[];
};

export type Characteristic = {
    speed: number;
    force: number;
    engineAmperage: number;
};
