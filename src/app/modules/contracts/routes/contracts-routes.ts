import { MenuItem } from '../../core/models/menu-models';

export enum ContractsRoutes {
  allContracts = 'all-contracts',
  accepted = 'accepted',
  rejected = 'rejected',
}

export const ContractsRoutesList: MenuItem[] = [
  {
    name: 'contracts.all_contracts',
    link: ContractsRoutes.allContracts,
    icon: null,
    image: null,
    children: null,
  },
  {
    name: 'contracts.accepted_contracts',
    link: ContractsRoutes.accepted,
    icon: null,
    image: null,
    children: null,
  },
  {
    name: 'contracts.rejected_contracts',
    link: ContractsRoutes.rejected,
    icon: null,
    image: null,
    children: null,
  },
];
