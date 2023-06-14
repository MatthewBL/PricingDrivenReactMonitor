import { NAryFunction } from "../../logic/model/NAryFunction";
import React from "react";
export interface GenericFeatureHookOptions {
    key?: string;
    on: {
        expression: NAryFunction<boolean>;
        on: React.ReactNode;
    }[];
    default?: React.ReactNode;
    loading?: React.ReactNode;
    error?: React.ReactNode;
}
export type FeatureResponse = JSX.Element;
export default function useGenericFeature(options: GenericFeatureHookOptions): FeatureResponse;
