/**
 * store/index.ts
 * 스토어 통합 export
 */

export {
  useUserInputStore,
  genderOptions,
  bodySizeOptions,
  preferenceOptions,
  budgetOptions,
} from './userInput';

export type {
  Gender,
  BodySize,
  Budget,
  Preference,
  UserInput,
} from './userInput';
