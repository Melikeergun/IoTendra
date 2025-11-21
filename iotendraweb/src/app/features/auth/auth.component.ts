import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: false
})
export class AuthComponent {
  isLogin = true;
  signUpMode = false;
  userName = '';
  email = '';
  password = '';
  regUserName = '';
  regEmail = '';
  regPassword = '';
  error: string | null = null;
  success: string | null = null;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.signUpMode = !this.signUpMode;
    this.error = null;
    this.success = null;
  }

  login(): void {
    this.error = null;
    this.success = null;
    this.loading = true;
    if (!this.userName || !this.password) {
      this.error = 'Kullanıcı adı ve şifre gereklidir';
      this.loading = false;
      return;
    }

    console.log('Login attempt:', {
      userName: this.userName,
      password: this.password
    });
    
    this.authService.login({ userName: this.userName, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error details:', err);
          this.loading = false;
          
          if (err.status === 0) {
            this.error = 'API sunucusuna bağlanılamıyor. Lütfen API\'nin çalıştığını kontrol edin.';
          } else if (err?.error?.message) {
            this.error = err.error.message;
          } else if (typeof err?.error === 'string') {
            this.error = err.error;
          } else {
            this.error = `Giriş hatası: ${err.status} - ${err.statusText || 'Bilinmeyen hata'}`;
          }
        }
      });
  }

  register(): void {
    this.error = null;
    this.success = null;
    this.loading = true;
    if (!this.regUserName || !this.regEmail || !this.regPassword) {
      this.error = 'Tüm alanları doldurunuz';
      this.loading = false;
      return;
    }

    if (this.regPassword.length < 6) {
      this.error = 'Şifre en az 6 karakter olmalıdır';
      this.loading = false;
      return;
    }

    console.log('Register attempt:', {
      userName: this.regUserName,
      email: this.regEmail,
      password: this.regPassword
    });
    
    this.authService.register({
      userName: this.regUserName,
      email: this.regEmail,
      password: this.regPassword
    }).subscribe({
      next: () => {
        this.success = 'Kayıt başarılı! Otomatik giriş yapılıyor...';
        
        setTimeout(() => {
          this.authService.login({ userName: this.regUserName, password: this.regPassword })
            .subscribe({
              next: (loginRes) => {
                this.authService.saveToken(loginRes.token);
                this.loading = false;
                this.router.navigate(['/']);
              },
              error: () => {
                this.loading = false;
                this.isLogin = true;
                this.success = 'Kayıt başarılı! Giriş yapabilirsiniz.';
              }
            });
        }, 1000);
      },
      error: (err) => {
        console.error('Register error details:', err);
        this.loading = false;
        
        if (err.status === 0) {
          this.error = 'API sunucusuna bağlanılamıyor. Lütfen API\'nin çalıştığını kontrol edin.';
        } else if (err?.error?.message) {
          this.error = err.error.message;
        } else if (typeof err?.error === 'string') {
          this.error = err.error;
        } else {
          this.error = `Kayıt hatası: ${err.status} - ${err.statusText || 'Bilinmeyen hata'}`;
        }
      }
    });
  }
}