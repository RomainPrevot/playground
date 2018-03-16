import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MqttMessage, MqttModule, MqttService } from 'ngx-mqtt';


@Injectable()
export class MqttServiceProvider {
  private service: MqttService;

  constructor() { }

  connect(clientName) {
    this.service = new MqttService({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      clientId: clientName,
      connectOnCreate: true
    });
    
  }

  isConnected() {
    return this.service !== undefined;
  }

  observe(topic): Observable<MqttMessage> {
    return this.service.observe(topic);
  }

  publish(topic: string, message: string) {
    this.service.unsafePublish(topic, message, { qos: 1, retain: true });
  }

}
