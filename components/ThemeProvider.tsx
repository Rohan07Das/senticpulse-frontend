// components/ThemeProvider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: any) {
  // We remove the 'mounted' visibility logic here because 
  // it's conflicting with the Layout's server-render.
  return (
    <NextThemesProvider 
      {...props} 
      enableColorScheme={false} 
    >
      {children}
    </NextThemesProvider>
  );
}