import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MqttMessage } from 'ngx-mqtt';
import { MqttServiceProvider } from '../../providers/mqtt-service/mqtt-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public message: String;
  public myOtherMessage$: Observable<MqttMessage>;

  private clients = new Array<String>();

  constructor(
    public navCtrl: NavController,
    private mqttService: MqttServiceProvider
  ) {

  }

  public ionViewDidEnter() {
    if (!this.mqttService.isConnected()) {
      this.navCtrl.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
    } else {
      this.initListening();
    }
  }

  private initListening() {

    this.mqttService.observe('clients').subscribe((message: MqttMessage) => {
      this.clients = JSON.parse(message.payload.toString());
    });

    this.mqttService.observe('my/topic').subscribe((message: MqttMessage) => {
      this.message = message.payload.toString();
    });

    this.myOtherMessage$ = this.mqttService.observe('my/other/topic');
  }

  public coucou() {
    console.log('saying couocu');
    this.mqttService.publish('my/topic', 'coucou les batards');
  }

}
