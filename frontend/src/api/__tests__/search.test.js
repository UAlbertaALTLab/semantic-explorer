import { search } from '../Search'

describe('test search function', () => {
    test('calling search with valid search term', async () => {
        const res = await search('test');
        //expect length of results to be greater than 0
        expect(res['search_results'].length).toBeGreaterThan(0)
    })
    test('calling search with invalid search term', async () => {
        const res = await search('1234567890');
        //expect length of results to be 0
        expect(res['search_results'].length).toEqual(0)
        expect(res['did_search']).toEqual(true) //did_search is true because the search was attempted
    })
    test('calling search with no search term', async () => {
        const res = await search();
        //expect length of results to be 0
        expect(res['search_results'].length).toEqual(0) 
        //did_search is false because the search was not attempted since no query param
        expect(res['did_search']).toEqual(false)
    })
});
