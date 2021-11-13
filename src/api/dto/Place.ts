export interface Address {
  city: string;
  addressLine: string;
}

export interface Place {
  id: string;
  name: string;
  address: Address;
}
