import { MenuItem } from '../models/menu-models';
import { Routing } from '../routes/app-routes';

export const SIDEBAR_LIST: MenuItem[] = [
  {
    name: 'dashboard',
    link: Routing.dashboard.module,
    icon: null,
    image: 'assets/images/svgs/Group_1452.svg',
    children: null,
  },
  {
    name: 'security_companies',
    link: Routing.companies.module,
    icon: null,
    image: 'assets/images/svgs/building.svg',
    children: null,
  },
    {
    name: 'users_management',
    link: Routing.users.module,
    icon: null,
    image: 'assets/images/svgs/user.svg',
    children: null,
  },
   {
    name: 'Individuals',
    link: Routing.individuals.module,
    icon: null,
    image: 'assets/images/svgs/user.svg',
    children: null,
  },
  {
    name: 'Agents',
    link: Routing.agents.module,
    icon: null,
    image: 'assets/images/svgs/user.svg',
    children: null,
  },

  {
    name: 'clients',
    link: Routing.clients,
    icon: 'people',
    image: null,
    children: null,
  },
  {
    name: 'contracts',
    link: Routing.contracts.module,
    icon: null,
    image: 'assets/images/svgs/contracts.svg',
    children: null,
  },
  {
    name: 'accident',
    link: Routing.accident.module,
    icon: null,
    image: 'assets/images/svgs/accident.svg',
    children: null,
  },
  {
    name: 'subscriptions',
    link: Routing.subscription.module,
    icon: null,
    image: 'assets/images/svgs/accident.svg',
    children: null,
  },
  {
    name: 'monitor',
    link: Routing.lookups.module,
    icon: null,
    image: 'assets/images/svgs/rasd.svg',
    children: [
      {
        name: 'Monitor_clients',
        link: Routing.lookups.children.customerManagement,
        icon: 'person',
        image: null,
        children: null,
      },
      {
        name: 'MonitoringComplaints',
        link: Routing.lookups.children.MonitoringComplaints,
        icon: 'aperture',
        image: null,
        children: null,
      },
    ],
  },
  {
    name: 'general_settings',
    link: Routing.lookups.module,
    icon: null,
    image: 'assets/images/svgs/settings.svg',
    children: [
      {
        name: 'countries',
        link: Routing.lookups.children.countries,
        icon: 'globe-outline',
        image: null,
        children: null,
      },
      {
        name: 'cities',
        link: Routing.lookups.children.cities,
        icon: 'map-outline',
        image: null,
        children: null,
      },
      {
        name: 'areas',
        link: Routing.lookups.children.areas,
        icon: 'navigate-circle',
        image: null,
        children: null,
      },
      {
        name: 'Package_Items',
        link: Routing.lookups.children.packageItems,
        icon: null,
        image: 'assets/images/svgs/packaging.svg',
        children: null,
      },
      {
        name: 'company_scale',
        link: Routing.lookups.children.companyScale,
        icon: 'bar-chart-outline',
        image: null,
        children: null,
      },
      {
        name: 'company_type',
        link: Routing.lookups.children.CompanyType,
        icon: 'business-outline',
        image: null,
        children: null,
      },

      {
        name: 'available_service',
        link: Routing.lookups.children.availableservices,
        icon: 'dice-outline',
        image: null,
        children: null,
      },
      {
        name: 'shift_type',
        link: Routing.lookups.children.shiftType,
        icon: 'calendar-outline',
        image: null,
        children: null,
      },
      {
        name: 'time_type',
        link: Routing.lookups.children.timeType,
        icon: 'hourglass-outline',
        image: null,
        children: null,
      },
      {
        name: 'blood_type',
        link: Routing.lookups.children.BloodType,
        icon: 'water-outline',
        image: null,
        children: null,
      },

      {
        name: 'business_type',
        link: Routing.lookups.children.BusinessType,
        icon: 'briefcase-outline',
        image: null,
        children: null,
      },
      {
        name: 'time_zone',
        link: Routing.lookups.children.timeZone,
        icon: 'time-outline',
        image: null,
        children: null,
      },
      {
        name: 'finance-year',
        link: Routing.lookups.children.FinanceYear,
        icon: 'wallet-outline',
        image: null,
        children: null,
      },

      {
        name: 'nationality',
        link: Routing.lookups.children.Nationality,
        icon: 'planet-outline',
        image: null,
        children: null,
      },

      {
        name: 'job_type',
        link: Routing.lookups.children.jobtype,
        icon: 'shield-half-outline',
        image: null,
        children: null,
      },

      {
        name: 'gender',
        link: Routing.lookups.children.Gender,
        icon: 'transgender-outline',
        image: null,
        children: null,
      },

      {
        name: 'optionset',
        link: Routing.lookups.children.optionSet,
        icon: 'grid-outline',
        image: null,
        children: null,
      },

      {
        name: 'optionsetitem',
        link: Routing.lookups.children.optionSetItems,
        icon: 'reorder-two-outline',
        image: null,
        children: null,
      },

      {
        name: 'static-pages',
        link: Routing.lookups.children.staticPages,
        icon: 'copy-outline',
        image: null,
        children: null,
      },
      {
        name: 'manage-setting',
        link: Routing.lookups.children.manageSetting,
        icon: null,
        image: 'assets/images/svgs/settings.svg',
        children: null,
      },

      {
        name: 'test-numbers',
        link: Routing.lookups.children.testNumber,
        icon: 'call-outline',
        image: null,
        children: null,
      },
    ],
  },
];
