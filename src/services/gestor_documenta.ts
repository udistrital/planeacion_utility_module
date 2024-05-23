export class GestorDocumentalMethods {
  getUrlFile(base64: any, minetype: any) {
    return new Promise<string>((resolve) => {
      const url = `data:${minetype};base64,${base64}`;
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: minetype });
          const url = URL.createObjectURL(file);
          resolve(url);
        });
    });
  }

  fileToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result!.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }
}
