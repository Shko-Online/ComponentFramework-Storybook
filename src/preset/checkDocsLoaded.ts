/*
    Copyright (c) 2023 Betim Beja and Shko Online LLC
    Licensed under the MIT license.
*/

import { checkAddonOrder, serverRequire } from '@storybook/core-common';
import path from 'path';

// candidate to inject telemetry?
console.log('Docs Loaded?')
export const checkDocsLoaded = (configDir: string) => {
  checkAddonOrder({
    before: {
      name: '@storybook/addon-docs',
      inEssentials: true,
    },
    after: {
      name: '@shko.online/componentframework-storybook',
      inEssentials: true,
    },
    configFile: path.isAbsolute(configDir)
      ? path.join(configDir, 'main')
      : path.join(process.cwd(), configDir, 'main'),
    getConfig: (configFile) => serverRequire(configFile),
  });
};