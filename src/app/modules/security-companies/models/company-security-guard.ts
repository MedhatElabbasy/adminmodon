import { SecurityGuard } from "../../accident/models/accident";




export interface CompanySecurityGuard {
    id: string;
    securityGuardId: number;
    securityGuard: SecurityGuard;
    isActive: boolean;
    guardStatusId: null;
    guardStatus: null;
    username?: string;
  }