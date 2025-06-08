export const featuresConfig = {
    i18n: {
      include: [
        {
          file: "App.tsx",
          markers: { start: "// i18n:start", end: "// i18n:end" },
        },
        {
          file: "src/i18n/index.ts",
        },
        {
          file: "src/i18n/locales/en.json",
        },
        {
          file: "src/i18n/locales/he.json",
        },
      ],
    },
    theme: {
      include: [
        {
          file: "App.tsx",
          markers: { start: "// theme:start", end: "// theme:end" },
        },
        {
          file: "src/hooks/useTheme.ts",
        },
      ],
    },
  };
  