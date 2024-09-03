export class ServiceBase64 {
  encodeBase64(input: string): string {
    return window.btoa(unescape(encodeURIComponent(input)));
  }

  decodeBase64(encoded: string): string {
    return decodeURIComponent(escape(window.atob(encoded)));
  }
}

