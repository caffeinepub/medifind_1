import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Medicine {
    name: string;
    dosageNotes: string;
}
export interface Disease {
    name: string;
    description: string;
    medicines: Array<Medicine>;
}
export interface backendInterface {
    getAllDiseases(): Promise<Array<Disease>>;
    getDisease(name: string): Promise<Disease>;
    initialize(): Promise<void>;
}
