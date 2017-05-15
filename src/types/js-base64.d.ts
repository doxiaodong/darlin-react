interface IBase64 {
  VERSION: string
  encode(a: string): string
  encodeURI(a: string): string
  decode(a: string): string
}

interface IJSBase64 {
  Base64: IBase64
}

declare const base64: IJSBase64

declare module 'js-base64' {
  export = base64
}
