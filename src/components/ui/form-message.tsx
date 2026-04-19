export function FormMessage({ message }: { message?: string }) {
  return message ? <p className="text-sm font-medium text-red-600">{message}</p> : null
}
