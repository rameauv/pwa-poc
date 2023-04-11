import {Injectable} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  constructor(private swUpdate: SwUpdate) {
    const f = async () => {
      const sw = await navigator.serviceWorker.getRegistration('/');
      if (!sw) {
        return;
      }
      sw.addEventListener('install', async evt => {
        console.log('install')
        const workers = await navigator.serviceWorker.getRegistrations();
        console.log(workers);
        const pushSw = workers.find(worker => worker.scope.includes('__'));
        pushSw?.update();
      })
    }
    f();
  }
}
