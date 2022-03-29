/**
* Descarga automáticamente por default (sin options) archivos .pdf
* esto se puede configurar mediante options
* @param {options?} options {} Opciones adicionales
* @param {extension} extension  options.extension - Descargar con determinada extensión Ejemplo: (.txt)
* @param {extension} mimeType  options.mimeType - Tipo de archivo Ejemplo: (text/plain)
*/
export function downloadFile(value: Blob, name: string, options? : {extension: string, mimeType: string}): void {

  const newBlob = new Blob([value], { type: options?.mimeType ? options.mimeType : 'application/pdf' });
    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(newBlob);
    //     return;
    // }
    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;

    if(options?.extension){
      link.download = name + options.extension;
    }
    else{
      link.download = name + '.pdf';
    }

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}
