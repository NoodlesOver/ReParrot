import { lazy } from "react";
const AnalyticsDashboards = lazy(() =>
  import("../components/dashboard/analytics/Analytics")
);

const PricingAdd = lazy(() => import("../components/pricing/PricingForm"));
const BlogsForm = lazy(() => import("../components/blogs/BlogsForm"));
const PricingEdit = lazy(() => import("../components/pricing/PricingForm"));
const PricingImport = lazy(() => import("../components/pricing/PricingImport"));
const Comments = lazy(() => import("../components/comments/Comments"));

const PageNotFound = lazy(() => import("../components/error/Error404"));
const FileUpload = lazy(() =>
  import("../components/fileupload/ExampleFileUploadForm")
);
const Checkout = lazy(() => import("../components/checkout/Checkout"));
const BeforeCheckoutSuccess = lazy(() =>
  import("../components/checkout/BeforeCheckoutSuccess")
);
const Subscriptions = lazy(() =>
  import("../components/subscriptions/Subscriptions")
);
const PurchaseSuccess = lazy(() =>
  import("../components/subscriptions/PurchaseSuccess")
);
const BeforeSuccess = lazy(() =>
  import("../components/checkout/BeforeSuccess")
);
const AddPaymentAccount = lazy(() =>
  import("../components/paymentaccounts/AddPaymentAccount")
);
const ScheduleAddEdit = lazy(() => import("../components/schedules/ScheduleAddEdit"));
const ScheduleView = lazy(() => import("../components/schedules/ScheduleView"))
const Organization = lazy(() => import("../components/organizations/Organization"));
const Organizations = lazy(() =>
  import("../components/organizations/OrganizationList")
);
const AppointmentAddOrEdit = lazy(() =>
  import("../components/appointments/AppointmentAddOrEdit")
);
const AppointmentList = lazy(() =>
  import("../components/appointments/AppointmentList")
);
const OrgAppointmentList = lazy(() =>
  import("../components/appointments/OrgAppointmentList")
);
const AutoServiceAddEdit = lazy(() =>
  import("../components/autoservices/AutoServiceAddEdit")
);

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboards",
    icon: "uil-home-alt",
    header: "Navigation",
    children: [
      {
        path: "/dashboard/analytics",
        name: "Analytics",
        element: AnalyticsDashboards,
        roles: ["SysAdmin"],
        exact: true,
        isAnonymous: false,
      },
    ],
  },
];

const blogs = [
  {
    path: "/blogs/add",
    name: "blog creation",
    exact: true,
    element: BlogsForm,
    roles: ["SysAdmin", "Blogger"],
    isAnonymous: false,
  },

  {
    path: "/blogs/edit/:id",
    name: "blog edit",
    exact: true,
    element: BlogsForm,
    roles: ["SysAdmin", "Blogger"],
    isAnonymous: false,
  },
];

const comments = [
  {
    path: "/comments",
    name: "Comments",
    element: Comments,
    roles: ["SysAdmin", "OrgAdmin", "OrgMember", "Customer", "Blogger"],
    exact: true,
    isAnonymous: false,
  },
];

const stripeRoutes = [
  {
    path: "/checkout",
    name: "Checkout",
    exact: true,
    element: Checkout,
    roles: ["Customer"],
    isAnonymous: false,
  },
  {
    path: "/checkoutsuccess",
    name: "Checkout Success",
    exact: true,
    element: BeforeCheckoutSuccess,
    roles: ["Customer"],
    isAnonymous: false,
  },
  {
    path: "/subscribe",
    name: "Subscriptions",
    exact: true,
    element: Subscriptions,
    roles: ["Customer"],
    isAnonymous: false,
  },
  {
    path: "/success",
    name: "BeforeSuccess",
    exact: true,
    element: BeforeSuccess,
    roles: ["Customer", "OrgAdmin"],
    isAnonymous: false,
  },
  {
    path: "/invoice",
    name: "CheckoutSuccess",
    exact: true,
    element: PurchaseSuccess,
    roles: ["Customer", "OrgAdmin"],
    isAnonymous: false,
  },
  {
    path: "/addpaymentaccount",
    name: "AddPaymentAccount",
    exact: true,
    element: AddPaymentAccount,
    roles: ["OrgAdmin"],
    isAnonymous: false,
  },
];

const test = [
  {
    path: "/test",
    name: "Test",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["Fail"],
    isAnonymous: false,
  },
  {
    path: "/secured2",
    name: "A Secured Route",
    exact: true,
    element: AnalyticsDashboards,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];

const pricingRoutes = [
  {
    path: "/pricings/edit/:priceId",
    name: "Edit Pricing",
    exact: true,
    element: PricingEdit,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/pricings/add",
    name: "Add Pricing",
    exact: true,
    element: PricingAdd,
    roles: ["SysAdmin"],
    isAnonymous: false,
  },
  {
    path: "/pricings/import",
    name: "Pricing Import",
    exact: "true",
    element: PricingImport,
    roles: ["SysAdmin", "OrgAdmin"],
    isAnonymous: false,
  },
];

const uploadFiles = [
  {
    path: "/upload",
    name: "Upload Files",
    element: FileUpload,
    roles: ["SysAdmin", "OrgAdmin", "OrgMember"],
    exact: true,
    isAnonymous: false,
  },
];

const schedule = [
  {
    path: "/schedules/add",
    name: "Add Schedules",
    element: ScheduleAddEdit,
    roles: ["OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/schedules/edit/:orgId",
    name: "Edit Schedules",
    element: ScheduleAddEdit,
    roles: ["OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/schedules/view",
    name: "View Schedules",
    element: ScheduleView,
    roles: ["OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const organization = [
  {
    path: "/organization/add",
    name: "Organization",
    element: Organization,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/organization/:orgId/edit",
    name: "Organization",
    element: Organization,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
{
    path: "/organizations",
    name: "Organizations List",
    element: Organizations,
    roles: ["SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const appointment = [
  {
    path: "/organization/:orgId/appointments",
    name: "Client appointment list by organization",
    element: AppointmentList,
    roles: ["Customer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointments",
    name: "Client full appointment list",
    element: AppointmentList,
    roles: ["Customer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointments",
    name: "SysAdmin/OrgAdmin full appointment list",
    element: OrgAppointmentList,
    roles: ["SysAdmin", "OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointment/add",
    name: "Add appointment",
    element: AppointmentAddOrEdit,
    roles: ["SysAdmin", "OrgAdmin", "Customer"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/appointment/:apptId",
    name: "Update appointment",
    element: AppointmentAddOrEdit,
    roles: ["SysAdmin", "OrgAdmin", "Customer"],
    exact: true,
    isAnonymous: false,
  }
];

const autoServiceRoutes = [
  {
    path: "/autoservices/add",
    name: "Add Auto Service",
    element: AutoServiceAddEdit,
    roles: ["OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: `/autoservices/:autoServiceId/edit`,
    name: "Edit Auto Service",
    element: AutoServiceAddEdit,
    roles: ["OrgAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

const allRoutes = [
  ...dashboardRoutes,
  ...test,
  ...errorRoutes,
  ...uploadFiles,
  ...pricingRoutes,
  ...blogs,
  ...stripeRoutes,
  ...comments,
  ...organization,
  ...schedule,
  ...appointment,
  ...autoServiceRoutes,
];

export default allRoutes;
