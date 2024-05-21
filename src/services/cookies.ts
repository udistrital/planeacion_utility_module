import { AES, enc } from 'crypto-js'
import { environment } from '../environments/environment';

export class ServiceCookies {
  desencriptar(textoEncriptado: string, clave: string): string {
    const bytes = AES.decrypt(textoEncriptado, clave);
    return bytes.toString(enc.Utf8);
  }

  getCookie(name: string): string | undefined {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length == 2) {
      let encrypValue = parts.pop()?.split(';').shift()!;
      return this.desencriptar(encrypValue, environment.SECRET_KEY);
    }
    return undefined
  }

  deleteCookie(name: string) {
    const date = new Date();
    // Set the expiration date in the past
    date.setTime(date.getTime() - 1);
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
  }
}


