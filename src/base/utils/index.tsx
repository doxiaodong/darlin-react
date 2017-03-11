export * from './get-aes-token'
export * from './get-cookie'
export * from './param-post-body'
export * from './picture-url'
export * from './load-script'

export function replaceMethod(replacer) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = replacer(descriptor.value)
    return descriptor
  }
}
