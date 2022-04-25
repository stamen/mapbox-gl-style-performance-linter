import { lintSingleMatchExpressions } from '../single-match';

describe('lintSingleMatchExpressions', () => {
  test('lint single match recursively', () => {
    const style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          filter: ['match', ['get', 'admin_level'], 4, true, false],
          paint: {
            'fill-color': ['match', ['get', 'class'], ['grass'], 'green', 'red']
          }
        },
        {
          id: 'layer-2',
          filter: [
            'interpolate',
            ['zoom'],
            2,
            ['match', ['get', 'class'], 'grass', true, false],
            4,
            true
          ]
        }
      ]
    };
    const actual = lintSingleMatchExpressions(style);
    const expected = [
      'layer-1: filter contains single match expression ["match",["get","admin_level"],4,true,false]',
      'layer-2: filter contains single match expression ["match",["get","class"],"grass",true,false]'
    ];
    expect(actual).toEqual(expected);
  });
});
