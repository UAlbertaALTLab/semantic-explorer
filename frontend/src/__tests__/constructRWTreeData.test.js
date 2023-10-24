import { constructRWTreeData } from '../components/WordTree/utils/constructRWTreeData';


describe('test constructRWTreeData function', () => {
  jest.setTimeout(15000); // Allow enough time for the API calls to finish, currently given 15 seconds
  
  // test('calling constructRWTreeData with existing domain', async () => {
  //   const res = await constructRWTreeData('1.2.2');
  //   expect(res).toEqual(
  //     sample_return
  //   );
  // });
  test('calling constructRWTreeData with non-existing domain', async () => {
    const res = await constructRWTreeData('asdf');
    expect(res).toEqual({});
  });
});
  

const sample_return = {
  name: 'World',
  creeWords: [
    'askihk',
    'asiskiy',
    'ispacinâs',
    'ispatinâw',
    'kikâwînaw',
    'akâmaskîhk',
    'kâsâpiskâw',
    'kaskitêwâpisk',
    'kihci-okâwîmâw'
  ],
  children: [
    {
      name: 'Substance, matter',
      creeWords: [
        "asiskiy",
        "kâsâpiskâw",
        "kaskitêwâpisk",
      ],
      children: [
        {
          name: 'Soil, dirt',
          creeWords: [ 'yêkaw', 'maskêk', 'asiskiy', 'yêkawan', 'pasakocêskiwakâw' ]
        },
        {
          name: 'Rock',
          creeWords: [
            'asinîs',
            'asinîs',
            'asinîsis',
            'asinîwan',
            'kâsâpiskâw',
            'ahkâmasiniy',
            'cahkâpiskâw',
            'cahkisêhikan',
            'kistâpiskâw',
            'asinîwacîwiw',
            'kisâpiskiwân',
            'cahkisêhikanasiniy'
          ]
        },
        {
          name: 'Metal',
          creeWords: [
            'osâwâpisk',        'tihkisikan',
            'kînâpiskâw',       'pîmâpiskâw',
            'wâkâpiskâw',       'tahkâpiskâw',
            'kinwâpiskâw',      'kisâpiskisam',
            'kisâpiskisow',     'tahkâpiskisiw',
            'kaskitêwâpisk',    'kisâpiskiswêw',
            'kispakâpiskâw',    'ayakaskâpiskâw',
            'kisâpiskisikêw',   'kispakâpiskisiw',
            'ayakaskâpiskisiw', 'kisâpiskisamawêw'
          ]
        },
        {
          name: 'Mineral',
          creeWords: [ 'kaskitêw', 'kaskaskisîhkân', 'asiniy kâ-kîsisot' ]
        },
        { name: 'Jewel', creeWords: [] }
      ]
    }
  ]
}

