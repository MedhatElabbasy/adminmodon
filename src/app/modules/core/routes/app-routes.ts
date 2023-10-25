import { AgentsRoutes } from '../../agents/routes/agents-routes.enum';
import { AuthRoutes } from '../../auth/routes/auth-routes.enum';
import { ContractsRoutes } from '../../contracts/routes/contracts-routes';
import { DashboardRoutes } from '../../dashboard/routes/dashboard-routes.enum';
import { IndividualsRoutes } from '../../individuals/routes/individuals-routes.enum';

import { LookupsRoutes } from '../../lookups/routes/lookups-routes';
import { SecurityCompaniesRoutes } from '../../security-companies/routes/security-companies-routes.enum';
import { SubscriptionsRoutes } from '../../subscriptions/routes/subscription-routes.enum';
import { UsersRoutes } from '../../users/routes/users-routes.enum';

export interface RoutingConfiguration {
  module: string;
  children: any;
}

export const Routing = {
  auth: {
    module: 'auth',
    children: AuthRoutes,
  },
  lookups: {
    module: 'lookups',
    children: LookupsRoutes,
  },
  dashboard: {
    module: 'dashboard',
    children: DashboardRoutes,
  },
  
  companies: {
    module: 'security-companies',
    children: SecurityCompaniesRoutes,
  },
  users: {
    module: 'users',
    children: UsersRoutes,
  },
  individuals:{
    module:'individuals',
    children:IndividualsRoutes,
  },
  agents:{
    module:'agents',
    children:AgentsRoutes,
  },
  subscription:{
    module:'subscription',
    children:SubscriptionsRoutes,
  },
  contracts: {
    module: 'contracts',
    children: ContractsRoutes,
  },
  accident: {
    module: 'accident',
    children: null,
  },
  settings: 'settings',
  home: 'home',
  clients: 'clients',
  unauthorized: '401',
  underConstruction: 'under-construction',
  notFound: '404',
};
