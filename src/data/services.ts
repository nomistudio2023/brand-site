export type ServiceId = 'photography' | 'wordpress' | 'other';

export interface Service {
  id: ServiceId;
  titleKey: ServiceId;
  descKey: string;
  priceKey: string;
  featureKeys: string[];
}

export const services: Service[] = [
  {
    id: 'photography',
    titleKey: 'photography',
    descKey: 'photographyDesc',
    priceKey: 'photographyPrice',
    featureKeys: ['photoFeature1', 'photoFeature2', 'photoFeature3'],
  },
  {
    id: 'wordpress',
    titleKey: 'wordpress',
    descKey: 'wordpressDesc',
    priceKey: 'wordpressPrice',
    featureKeys: ['wpFeature1', 'wpFeature2', 'wpFeature3'],
  },
  {
    id: 'other',
    titleKey: 'other',
    descKey: 'otherDesc',
    priceKey: 'otherPrice',
    featureKeys: ['otherFeature1', 'otherFeature2'],
  },
];
