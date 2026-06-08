export interface IProps {
  height: number
}

export interface IEmit {
  (e: 'update:height', value: number): void;
}
