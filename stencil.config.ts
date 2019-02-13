import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'mycomponent',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  copy: [{
    src: "**/*.i18n.*.json",
    dest: "i18n"
  }]
};
