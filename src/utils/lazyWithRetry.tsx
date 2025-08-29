import { lazy, ComponentType, LazyExoticComponent } from 'react';

type ComponentImport<T> = () => Promise<{ default: ComponentType<T> }>;

export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: ComponentImport<T>,
  retries = 3
): LazyExoticComponent<T> {
  return lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      return await componentImport();
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed && retries > 0) {
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        return window.location.reload() as any;
      }

      throw error;
    }
  });
}

export default lazyWithRetry;