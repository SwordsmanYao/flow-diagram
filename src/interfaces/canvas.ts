import { Position } from './generics';
import { RefObject } from 'react';

export interface Canvas {
  position: Position;
  zoom: number;
  ref: RefObject<HTMLElement>;
}