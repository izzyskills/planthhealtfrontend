import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  layout("pages/RequireAuth.tsx", [
    route("classify", "routes/classify.tsx"),
    route("predictions", "routes/previousClassifications.tsx"),
  ]),
] satisfies RouteConfig;
