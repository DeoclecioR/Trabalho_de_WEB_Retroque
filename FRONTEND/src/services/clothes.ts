type serviceClothesType = {
  (): {
    id: string;
    imageUrl: string;
    name: string;
    link: string;
  }[]
}

export const serviceClothes: serviceClothesType = () => [
  {
    id: '1',
    imageUrl: '/roupa1.png',
    name: 'Camisa bege feminina',
    link: '/produto/camisa-bege-feminina-1'
  },
  {
    id: '2',
    imageUrl: '/roupa2.png',
    name: 'Tênis Nike feminino',
    link: '/produto/tenis-nike-feminino-2'
  },
  {
    id: '3',
    imageUrl: '/roupa3.png',
    name: 'Camisa listrada unisex',
    link: '/produto/camisa-listrada-unisex-3'
  },
  {
    id: '4',
    imageUrl: '/roupa4.png',
    name: 'Camisa vermelha unisex',
    link: '/produto/camisa-vermelha-unisex-4'
  },
  {
    id: '5',
    imageUrl: '/roupa5.png',
    name: 'Camisa colorida feminina',
    link: '/produto/camisa-colorida-feminina-5'
  },
  {
    id: '6',
    imageUrl: '/roupa6.png',
    name: 'casaco rosa',
    link: '/produto/casaco-rosa-6'
  },
]