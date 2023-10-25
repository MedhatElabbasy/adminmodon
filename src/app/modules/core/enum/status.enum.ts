export enum OptionSet {
  PageType = 'PageType',
  IncidentType = 'IncidentType',
  OrderStatus = 'OrderStatus',
  Priority = 'Priority',
  LeaveType = 'LeaveType',
  LeaveDuration = 'LeaveDuration',
  VisitorType = 'VisitorType',
  ContractStatus = 'ContractStatus',
  ContractType = 'ContractType',
}

export enum ContractStatus {
  new = 1,
  accepted = 2,
  active = 3,
  suspended = 4,
  rejected = 5,
  acceptedByTakid = 6,
  rejectedByTakid = 7,
}

export enum OrderStatus {
  new = 1,
  approvedByMain = 2,
  approved = 3,
  contractCreated = 4,
}
