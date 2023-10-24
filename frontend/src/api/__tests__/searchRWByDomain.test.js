import { searchRWByDomain } from '../Search';

describe('test searchRWByDomain function', () => {
    test('calling searchRWByDomain with existing domain', async () => {
        const res = await searchRWByDomain('Matter');
        expect(res).toBeInstanceOf(Array);
        expect(res.length).toBe(1);

        res.forEach((item) => {
            expect(item).toHaveProperty('word');
            expect(item).toHaveProperty('slug');
            expect(item).toHaveProperty('definition', undefined);
        });
    });
    test('calling searchRWByDomain with non-existing domain', async () => {
        const res = await searchRWByDomain('asdf');
        expect(res).toEqual([]);
    });
    test('calling searchRWByDomain with no domain', async () => {
        const res = await searchRWByDomain();
        expect(res).toBe(undefined);
    });
});