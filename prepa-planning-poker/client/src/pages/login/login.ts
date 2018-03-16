import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MqttServiceProvider } from '../../providers/mqtt-service/mqtt-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: String;

  constructor(
    public navCtrl: NavController,
    public mqttService: MqttServiceProvider
  ) {
  }

  ionViewDidLoad() {

  }

  login() {
    this.mqttService.connect(this.username);
    this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });

  }

}
