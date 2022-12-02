import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: never, options: never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, options);
  }
}
