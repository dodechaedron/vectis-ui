export function IntlAddress(address: string): string {
  return address.slice(0, 16).concat("...") + address.substring(address.length - 8);
}

export function IntlAddressCustom(address: string, slice: number): string {
  return address.slice(0, slice).concat("...") + address.substring(address.length - slice / 2);
}
