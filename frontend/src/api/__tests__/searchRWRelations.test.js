import { searchRWRelations } from '../Search';

describe('test searchRWRelations function', () => {
    test('calling searchRWRelations with existing qid', async () => {
        const res = await searchRWRelations('1.2.2');
        expect(res).toEqual(
            {
                index: '1.2.2',
                domain: 'Substance, matter',
                hypernyms: [ { index: '1.2', domain: 'World' } ],
                hyponyms: [
                  { index: '1.2.2.1', domain: 'Soil, dirt' },
                  { index: '1.2.2.2', domain: 'Rock' },
                  { index: '1.2.2.3', domain: 'Metal' },
                  { index: '1.2.2.4', domain: 'Mineral' },
                  { index: '1.2.2.5', domain: 'Jewel' }
                ]
              }
        );
    });
    test('calling searchRWRelations with non-existing qid', async () => {
        const res = await searchRWRelations('0');
        expect(res).toEqual({});
    });
    test('calling searchRWRelations with no qid', async () => {
        const res = await searchRWRelations();
        expect(res).toBe(undefined);
    });
});
