import typography from "@tailwindcss/typography";

export default {
  theme: {
    extend: {
      colors: {
        paper: "#fafafa",
        surface: "#ffffff",
        "surface-muted": "#f2f2f2",
        ink: "#0c0c0c",
        "ink-soft": "#3d3d3d",
        "ink-subtle": "#8b8b8b",
        outline: "#e5e5e5",
        "outline-strong": "#c0c0c0",
        accent: "#c53030",
        "accent-soft": "#fef2f2",
        "zone-home": "#c53030",
        "zone-posts": "#2b4c7e",
        "zone-about": "#4a4a4a",
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"Noto Sans CJK SC"',
          '"Source Han Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        serif: [
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          '"Songti SC"',
          '"STSong"',
          "serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"Sarasa Mono SC"',
          '"Cascadia Code"',
          "ui-monospace",
          "monospace",
        ],
        reading: [
          '"Noto Sans SC"',
          '"Noto Sans CJK SC"',
          '"Source Han Sans SC"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
      },
      maxWidth: {
        shell: "80rem",
        layout: "68rem",
        reading: "44rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04)",
      },
      typography: ({
        theme,
      }: {
        theme: (path: string) => string | string[];
      }) => ({
        journal: {
          css: {
            "--tw-prose-body": theme("colors.ink-soft") as string,
            "--tw-prose-headings": theme("colors.ink") as string,
            "--tw-prose-lead": theme("colors.ink-soft") as string,
            "--tw-prose-links": theme("colors.ink") as string,
            "--tw-prose-bold": theme("colors.ink") as string,
            "--tw-prose-counters": theme("colors.ink-subtle") as string,
            "--tw-prose-bullets": theme("colors.outline-strong") as string,
            "--tw-prose-hr": theme("colors.outline") as string,
            "--tw-prose-quotes": theme("colors.ink-soft") as string,
            "--tw-prose-quote-borders": theme("colors.accent") as string,
            "--tw-prose-captions": theme("colors.ink-subtle") as string,
            "--tw-prose-code": theme("colors.ink") as string,
            "--tw-prose-pre-code": "#0c0c0c",
            "--tw-prose-pre-bg": "#f2f2f2",
            "--tw-prose-th-borders": theme("colors.outline") as string,
            "--tw-prose-td-borders": theme("colors.outline") as string,
            color: theme("colors.ink-soft") as string,
            fontFamily: (theme("fontFamily.reading") as string[]).join(", "),
            fontSize: "1.0625rem",
            lineHeight: "1.9",
            letterSpacing: "0",
            "> *": {
              marginTop: "0",
              marginBottom: "0",
            },
            "> * + *": {
              marginTop: "1.5em",
            },
            p: {
              lineHeight: "1.9",
              fontWeight: "400",
            },
            '[class~="lead"]': {
              color: theme("colors.ink-soft") as string,
              fontSize: "1.125rem",
              lineHeight: "1.85",
            },
            "h2, h3": {
              fontFamily: (theme("fontFamily.serif") as string[]).join(", "),
              letterSpacing: "-0.02em",
              color: theme("colors.ink") as string,
              fontWeight: "500",
            },
            h2: {
              marginTop: "3.5rem",
              marginBottom: "1rem",
              fontSize: "1.75rem",
              lineHeight: "1.2",
            },
            h3: {
              marginTop: "2.5rem",
              marginBottom: "0.75rem",
              fontSize: "1.375rem",
              lineHeight: "1.3",
            },
            h4: {
              marginTop: "2rem",
              marginBottom: "0.5rem",
              color: theme("colors.ink") as string,
              fontWeight: "500",
            },
            a: {
              color: theme("colors.ink") as string,
              textDecorationColor: theme("colors.outline-strong") as string,
              textUnderlineOffset: "0.2em",
              textDecorationThickness: "1px",
              transition: "color 150ms ease, text-decoration-color 150ms ease",
            },
            "a:hover": {
              color: theme("colors.accent") as string,
              textDecorationColor: theme("colors.accent") as string,
            },
            strong: {
              fontWeight: "500",
            },
            blockquote: {
              borderLeftWidth: "2px",
              borderLeftColor: theme("colors.accent") as string,
              backgroundColor: "#f2f2f2",
              borderRadius: "0.25rem",
              padding: "1rem 1.25rem",
              color: theme("colors.ink-soft") as string,
              fontWeight: "400",
              quotes: "none",
            },
            "blockquote p:first-of-type::before, blockquote p:last-of-type::after":
              {
                content: "none",
              },
            code: {
              fontFamily: (theme("fontFamily.mono") as string[]).join(", "),
              fontWeight: "400",
            },
            ":not(pre) > code": {
              backgroundColor: "#f2f2f2",
              border: "1px solid #e5e5e5",
              borderRadius: "0.25rem",
              padding: "0.15rem 0.4rem",
              fontSize: "0.88em",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              padding: "0",
              color: "#0c0c0c",
            },
            pre: {
              borderRadius: "0.25rem",
              border: "1px solid #e5e5e5",
              padding: "1.15rem 1.25rem",
              boxShadow: "none",
            },
            hr: {
              marginTop: "3rem",
              marginBottom: "3rem",
            },
            figure: {
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            figcaption: {
              marginTop: "0.75rem",
              textAlign: "center",
              fontSize: "0.875rem",
            },
            img: {
              borderRadius: "0.25rem",
            },
            thead: {
              backgroundColor: "#f2f2f2",
            },
            "thead th": {
              color: theme("colors.ink") as string,
              fontWeight: "600",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
