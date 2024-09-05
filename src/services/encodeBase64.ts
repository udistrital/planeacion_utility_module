export class ServiceBase64 {
  encodeBase64(input: string): string {
    const encoded = window.btoa(unescape(encodeURIComponent(input)))
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}

