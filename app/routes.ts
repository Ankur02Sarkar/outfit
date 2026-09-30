import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/shell.tsx", [
    index("routes/home.tsx"),
    route("wardrobe", "routes/wardrobe.tsx"),
    route("combos", "routes/combos.tsx"),
    route("builder", "routes/builder.tsx"),
    route("system", "routes/system.tsx"),
  ]),
] satisfies RouteConfig;
