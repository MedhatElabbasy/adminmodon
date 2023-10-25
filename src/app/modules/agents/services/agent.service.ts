import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { agent } from '../models/agent';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private readonly url = environment.apiUrl;
  agent!:agent[];

  constructor(private _httpClient: HttpClient) { }

  getAllAgents(){
    return this._httpClient.get<agent[]>(
      this.url+ `api/Agent/GetAll`
    );
  }


  getAllCompanyAgent(companyId: number) {
    return this._httpClient.get<agent[]>(
      this.url +
        `api/Agent/GetAllCompanyAgent?companyId=${companyId}`
    );
  }


  Active(agentID:string){
  
    return this._httpClient.post(
      this.url + `api/Agent/Activate?id=${agentID}`,null).subscribe((res)=>{
       
        
      })
    
  }

  deActive(agentID:string){
 
    
    return this._httpClient.post(
      this.url + `api/Agent/DActivate?id=${agentID}`,null).subscribe((res)=>{
      
        
      })
  }
}
