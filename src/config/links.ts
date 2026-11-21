export const ZUPPO_LINKS = {
  brandName: 'Zuppo',
  city: 'Ambikapur, Chhattisgarh',
  supportEmail: 'help.zuppo@gmail.com',
  supportPhoneDisplay: '+91 78289 50968',
  supportPhoneRaw: '917828950968',
  whatsappRiderUrl:
    'https://wa.me/917828950968?text=Hi%20Zuppo%20Team%2C%20I%20want%20to%20join%20as%20a%20Zuppo%20Delivery%20Partner%20in%20Ambikapur.',
  whatsappPartnerUrl:
    'https://wa.me/917828950968?text=Hi%20Zuppo%20Team%2C%20I%20want%20to%20list%20my%20restaurant%20on%20Zuppo%20in%20Ambikapur.',
  whatsappSupportUrl:
    'https://wa.me/917828950968?text=Hi%20Zuppo%20Support%2C%20I%20need%20help%20with%20Zuppo.',
  apk: {
    customer: 'https://expo.dev/artifacts/eas/hvPMEk3AhRt0-O5_W7JwTnqe-LYcQZJH3kQJHlW29LM.apk',
    rider: 'https://expo.dev/artifacts/eas/ZhO4oKy_y1ssZwpz0y6r3GLSJFgqV8MkkA6wY_ygasM.apk',
    partner: 'https://expo.dev/artifacts/eas/VMUx-y38q4O7FGy4pbtIJai7kr_gVMhJI7Er04AHAQ4.apk',
  },
};

export type AppRoute =
  | '/'
  | '/rider'
  | '/partner'
  | '/privacy-policy'
  | '/terms'
  | '/refund-policy'
  | '/delete-account'
  | '/support'
  | '/admin';
