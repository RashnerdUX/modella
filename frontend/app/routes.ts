import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("/login", "routes/login.tsx"),
  route("/register", "routes/register.tsx"),
  route("/pricing", "routes/pricing_page.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/wardrobe", "routes/wardrobe.tsx"),
] satisfies RouteConfig;
