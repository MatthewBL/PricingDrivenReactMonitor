import { NAryFunction } from "../../logic/model/NAryFunction";
import React from "react";
export declare function On({ children, expression, }: {
    children: React.ReactNode;
    expression: NAryFunction<boolean>;
}): React.JSX.Element;
export declare function Default({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function Loading({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function ErrorFallback({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function Feature({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
