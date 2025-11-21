import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css'],
  standalone: false
})
export class SensorsComponent implements OnInit {

  // Sensör verilerini ve ikonlarını tutan yapı
  // 'icon' yolu, asset klasöründeki ikonlara işaret ediyor.
  sensors = [
    { id: 1, name: 'Lighting', icon: 'fas fa-lightbulb', status: 'ON', value: 75, isActive: true, color: '#FFD700' },
    { id: 2, name: 'Security', icon: 'fas fa-shield-alt', status: 'ARMED', value: 1, isActive: true, color: '#FF6B6B' },
    { id: 3, name: 'Heating', icon: 'fas fa-fire', status: '22°C', value: 22, isActive: true, color: '#FF8C42' },
    { id: 4, name: 'Hot Water', icon: 'fas fa-tint', status: '60°C', value: 60, isActive: true, color: '#4ECDC4' },
    { id: 5, name: 'Temperature', icon: 'fas fa-thermometer-half', status: '24°C', value: 24, isActive: true, color: '#45B7D1' },
    { id: 6, name: 'Camera', icon: 'fas fa-video', status: 'LIVE', value: 1, isActive: true, color: '#96CEB4' },
    { id: 7, name: 'Motion', icon: 'fas fa-running', status: 'IDLE', value: 0, isActive: false, color: '#FFEAA7' },
    { id: 8, name: 'Smart Plug', icon: 'fas fa-plug', status: 'OFF', value: 0, isActive: false, color: '#DDA0DD' },
    { id: 9, name: 'Smoke', icon: 'fas fa-smoke', status: 'NORMAL', value: 0, isActive: true, color: '#98D8C8' }
  ];

  // Arka plan resminin yolu (dosya yapınıza göre ayarlandı)
  backgroundImagePath: string = 'assets/images/smart-home-bg.jpg';

  constructor() { }

  ngOnInit(): void {
    // Burada sensör verilerini API'den çekme gibi işlemler yapılabilir.
  }

  // Sensör butonuna tıklandığında çalışacak örnek metod
  onSensorClick(sensor: any): void {
    sensor.isActive = !sensor.isActive;
    console.log(`${sensor.name} sensörü ${sensor.isActive ? 'açıldı' : 'kapatıldı'}.`);
  }

  toggleSensor(sensor: any): void {
    sensor.isActive = !sensor.isActive;
  }
}