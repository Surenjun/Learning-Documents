import {IAllReducerProps} from './types';

export function store2Props({appsMainMain}: any): IAllReducerProps {
  return {
    main: appsMainMain,
  };
}