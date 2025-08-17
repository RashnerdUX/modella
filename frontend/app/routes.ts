import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("/login", "routes/login.tsx"),
  route("/register", "routes/register.tsx"),
  route("/pricing", "routes/pricing_page.tsx"),
  // The Dashboard Parent Route
  route("/dashboard", "routes/dashboard.tsx", [
    // The index for the dashboard
    index("routes/dashboard/home.tsx"),
    route("store", "routes/dashboard/store.tsx"),
    route("calendar", "routes/dashboard/calendar.tsx"),
    route("outfit", "routes/dashboard/outfit.tsx"),
    route("wardrobe", "routes/dashboard/wardrobe.tsx"),
    route("profile", "routes/dashboard/profile.tsx"),
    route("settings", "routes/dashboard/settings.tsx"),
    route("help", "routes/dashboard/help.tsx"),
  ]),
  route("/wardrobe", "routes/wardrobe.tsx"),
] satisfies RouteConfig;
