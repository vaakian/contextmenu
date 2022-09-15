export default {
  subPackages: {
    'shared': {
      iife: {
        enabled: false,
        name: 'contextMenu',
        globals: {},
        externals: [],
      },
      folder: 'packages/shared',
      globals: {
      },
      externals: [
      ],
    },
    'core': {
      iife: {
        enabled: true,
        name: 'contextMenu',
        globals: {
        },
        externals: [
        ],
      },
      folder: 'packages/core',
      globals: {
        '@contextmenu/shared': 'contextMenu',
      },
      externals: [
        '@contextmenu/shared',
      ],
    },
    'vue': {
      iife: {
        enabled: true,
        name: 'vueContextMenu',
        globals: {
          '@contextmenu/core': 'contextMenu',
          '@contextmenu/shared': 'contextMenu',
          'vue-demi': 'VueDemi',
        },
        externals: [
          '@contextmenu/core',
          'vue-demi',
          '@contextmenu/shared',
        ],
      },
      folder: 'packages/vue',
      globals: {
        '@contextmenu/shared': 'contextMenu',
        '@contextmenu/core': 'contextMenu',
        'vue-demi': 'VueDemi',
      },
      externals: [
        '@contextmenu/shared',
        '@contextmenu/core',
        'vue-demi',
      ],
    },
    'react': {
      iife: {
        enabled: true,
        name: 'reactContextMenu',
        globals: {
          '@contextmenu/core': 'contextMenu',
          'react': 'React',
        },
        externals: [
          '@contextmenu/core',
          'react',
        ],
      },
      folder: 'packages/react',
      globals: {
        '@contextmenu/shared': 'contextMenu',
        '@contextmenu/core': 'contextMenu',
        'react': 'React',
      },
      externals: [
        '@contextmenu/shared',
        '@contextmenu/core',
        'react',
      ],
    },
    'web-component': {
      iife: {
        enabled: true,
        name: 'wcContextMenu',
        globals: {
        },
        externals: [
        ],
      },
      folder: 'packages/web-component',
      globals: {
      },
      externals: [
      ],
    },
    'angular': {
      iife: {
        enabled: true,
        name: 'ngContextMenu',
        globals: {
        },
        externals: [
        ],
      },
      folder: 'packages/web-component',
      globals: {
      },
      externals: [
      ],
    },
  },
} as const
