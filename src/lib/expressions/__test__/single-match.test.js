import { lintSingleMatchExpressions } from '../single-match';

describe('lintSingleMatchExpressions', () => {
  let style;
  test('lint single match recursively', () => {
    style = {
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

  test('linter returns empty array when no single matches found', () => {
    style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          filter: ['==', ['get', 'admin_level'], 4],
          paint: {
            'fill-color': ['match', ['get', 'class'], ['grass'], 'green', 'red']
          }
        }
      ]
    };
    const actual = lintSingleMatchExpressions(style);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
