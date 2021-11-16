import { isNullOrUndefined } from '../../utils/types';
export interface Address {
  city: string;
  addressLine: string;
}

export interface Place {
  id?: string;
  name: string;
  address: Address;
}

const serializeAddress = (address: Address) =>
  `${address.city} ${address.addressLine}`;

export const serializePlace = (place: Place) =>
  isNullOrUndefined(place) ? null : (
    <>
      {place.name} <br /> {serializeAddress(place.address)}
    </>
  );

export const serializePlaceRaw = (place: Place) =>
  isNullOrUndefined(place)
    ? ''
    : `${place.name}, ${serializeAddress(place.address)}`;
