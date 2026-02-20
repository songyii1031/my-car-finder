/**
 * zustand.d.ts
 * Zustand 타입 선언 파일
 * npm install 전에 타입 에러를 방지합니다.
 */

declare module 'zustand' {
  type SetState<T> = {
    (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: boolean): void;
  };

  type GetState<T> = () => T;

  type StoreApi<T> = {
    setState: SetState<T>;
    getState: GetState<T>;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
  };

  type StateCreator<T> = (
    set: SetState<T>,
    get: GetState<T>,
    api: StoreApi<T>
  ) => T;

  export function create<T>(
    createState: StateCreator<T>
  ): () => T & StoreApi<T>;

  export function create<T>(): (
    createState: StateCreator<T>
  ) => () => T & StoreApi<T>;
}
