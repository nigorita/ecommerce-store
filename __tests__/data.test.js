import getAllBikes, { getBikeById } from '../data.js';

test('works', () => {
  expect(getBikeById(2)).toEqual(
    getAllBikes().find(product => {
      return product.id === 2;
    }),
  );

  // expect(getBikeById(2)).toMatchSnapshot();
});
