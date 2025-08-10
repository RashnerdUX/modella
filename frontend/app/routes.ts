import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
	index("routes/home"),
	{ path: "login", file: "routes/login.tsx" },
	{ path: "register", file: "routes/register.tsx" },
	{ path: "dashboard", file: "routes/dashboard.tsx" },
	{ path: "wardrobe", file: "routes/wardrobe.tsx" },
] satisfies RouteConfig;
