import Actions from './actions';

export interface IMainReducer {
  isReady: boolean;
  info: IMainInfo;
}

export type ActionType = ReturnType<typeof Actions>;
export type IAllReducerProps = {
  main: IMainReducer;
};

//默认是全部的属性,可以自定义
export type IProps = IAllReducerProps & ActionType;
export interface IMainInfo {
  [k: string]: any;
}
