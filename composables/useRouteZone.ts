export interface RouteZone {
  id: string;
  code: string;
  label: string;
  color: string;
}

const ZONES: Record<string, Omit<RouteZone, "code"> & { codePrefix: string }> = {
  home: {
    id: "H",
    codePrefix: "H",
    label: "首页",
    color: "#c53030",
  },
  posts: {
    id: "P",
    codePrefix: "P",
    label: "文章",
    color: "#2b4c7e",
  },
  about: {
    id: "A",
    codePrefix: "A",
    label: "关于",
    color: "#4a4a4a",
  },
};

export function formatStationCode(id: string, index: number) {
  return `${id}—${String(index).padStart(2, "0")}`;
}

export function useRouteZone(postIndex?: Ref<number> | number) {
  const route = useRoute();

  const zone = computed<RouteZone>(() => {
    const path = route.path;

    if (path === "/") {
      return { ...ZONES.home, code: formatStationCode("H", 1) };
    }

    if (path === "/about") {
      return { ...ZONES.about, code: formatStationCode("A", 1) };
    }

    if (path === "/posts" || path === "/posts/") {
      return { ...ZONES.posts, code: formatStationCode("P", 0) };
    }

    if (path.startsWith("/posts/")) {
      const idx = typeof postIndex === "number"
        ? postIndex
        : postIndex?.value ?? 0;
      return { ...ZONES.posts, code: formatStationCode("P", Math.max(1, idx)) };
    }

    return { ...ZONES.home, code: formatStationCode("H", 1) };
  });

  return { zone };
}
