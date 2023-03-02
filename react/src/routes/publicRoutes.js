import { lazy } from "react";
const Landing = lazy(() => import("../components/landing/Landing"));
const PageNotFound = lazy(() => import("../components/error/Error404"));

const ContactUs = lazy(() => import("../components/contact/ContactUs"));
const Register = lazy(() => import("../components/auth/Register"));
const Login = lazy(() => import("../components/auth/Login"));
const LostPassword = lazy(() => import("../components/auth/LostPassword"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const ConfirmUser = lazy(() =>
  import("../components/auth/ConfirmUserRegisteration")
);
const Chat = lazy(() => import("../components/chat/ChatExample"));

const LocationExample = lazy(() =>
  import("../components/location/LocationExample")
);
const PricingList = lazy(() => import("../components/pricing/PricingList"));

const AutoServices = lazy(() =>
  import("../components/autoservices/AutoServices")
);
const AutoServiceViewMore = lazy(() =>
  import("../components/autoservices/AutoServiceViewMore")
);

const BlogsPreviewPage = lazy(() => import("../components/blogs/BlogsPage"));

const Organizations = lazy(() =>
  import("../components/organizations/OrganizationList")
);
const OrganizationPage = lazy(() =>
  import("../components/organizations/OrganizationPage")
);

const blogs = [
  {
    path: "/blogs",
    name: "blog page",
    exact: true,
    element: BlogsPreviewPage,
    roles: [],
    isAnonymous: true,
  },
];



const routes = [
  {
    path: "/",
    name: "Landing",
    exact: true,
    element: Landing,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/register",
    name: "Register",
    exact: true,
    element: Register,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    element: Login,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/lostpassword",
    name: "LostPassword",
    exact: true,
    element: LostPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/resetpassword/:id",
    name: "ResetPassword",
    exact: true,
    element: ResetPassword,
    roles: [],
    isAnonymous: true,
  },
  {
    path: `/confirm/:id`,
    name: "ConfirmUser",
    exact: true,
    element: ConfirmUser,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/contactus",
    name: "Contact Us",
    exact: true,
    element: ContactUs,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/pricings",
    name: "Pricing List",
    exact: true,
    element: PricingList,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/locationexample",
    name: "LocationExample",
    exact: true,
    element: LocationExample,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/chat",
    name: "Chat",
    exact: true,
    element: Chat,
    roles: [],
    isAnonymous: true,
  },
];

const autoServiceRoutes = [
  {
    path: "/autoservices",
    name: "Auto Services",
    element: AutoServices,
    roles: [],
    exact: true,
    isAnonymous: true,
  },

  {
    path: `/autoservices/:autoServiceId`,
    name: "About Auto Service",
    element: AutoServiceViewMore,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

const organizationList = [
  {
    path: "/organizations",
    name: "Organizations List",
    element: Organizations,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
    {
    path: "/organization/:orgId",
    name: "Organization Info Page",
    element: OrganizationPage,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

var allRoutes = [
  ...routes,
  ...autoServiceRoutes,
  ...errorRoutes,
  ...blogs,
  ...organizationList,
];

export default allRoutes;
