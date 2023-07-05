import {useDispatch} 									from "react-redux";
import type {Dispatch as CustomDispatch, GetState} 		from "ui/shared/Model/Redux";

export type Action = (d: CustomDispatch, g: GetState) => void;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const typedUseDispatch: () => (a: Action) => void = useDispatch;

export default typedUseDispatch;