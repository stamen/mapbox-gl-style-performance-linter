import {
  getDuplicateOutputs,
  lintExpressionDuplicateOutputs
} from '../duplicate-output';

describe('getDuplicateOutputs', () => {
  let expression;
  test('simple match', () => {
    expression = ['match', ['get', 'class'], 'grass', 'green', 'green'];

    const actual = getDuplicateOutputs(expression);
    const expected = ['green'];

    expect(actual).toEqual(expected);
  });

  test('simple case', () => {
    expression = ['case', ['==', ['get', 'class'], 'grass'], 'green', 'green'];

    const actual = getDuplicateOutputs(expression);
    const expected = ['green'];

    expect(actual).toEqual(expected);
  });

  test('multiple duplicates match', () => {
    expression = [
      'match',
      ['get', 'class'],
      'grass',
      'green',
      'fire',
      'red',
      'lava',
      'red',
      'green'
    ];

    const actual = getDuplicateOutputs(expression);
    const expected = ['red', 'green'];

    expect(actual).toEqual(expected);
  });

  test('nested match', () => {
    expression = [
      'match',
      ['get', 'class'],
      'grass',
      'green',
      'land',
      ['match', ['get', 'type'], 'desert', 'brown', 'dirt', 'brown', 'tan'],
      'green'
    ];

    const actual = getDuplicateOutputs(expression);
    const expected = ['green', 'brown'];

    expect(actual).toEqual(expected);
  });

  test('does not consider duplicate inside nested match duplicate', () => {
    expression = [
      'match',
      ['get', 'class'],
      'grass',
      'green',
      'land',
      ['match', ['get', 'type'], 'desert', 'brown', 'green'],
      'red'
    ];

    const actual = getDuplicateOutputs(expression);
    const expected = [];

    expect(actual).toEqual(expected);
  });

  test('duplicate nested conditionals', () => {
    expression = [
      'match',
      ['get', 'class'],
      'grass',
      ['match', ['get', 'type'], 'desert', 'brown', 'green'],
      'land',
      ['match', ['get', 'type'], 'desert', 'brown', 'green'],
      'red'
    ];

    const actual = getDuplicateOutputs(expression);
    const expected = [['match', ['get', 'type'], 'desert', 'brown', 'green']];

    expect(actual).toEqual(expected);
  });

  test('simple interpolate', () => {
    expression = ['interpolate', ['linear'], ['zoom'], 5, 'green', 10, 'green'];

    const actual = getDuplicateOutputs(expression);
    const expected = ['green'];

    expect(actual).toEqual(expected);
  });

  test('simple step', () => {
    expression = ['step', ['zoom'], 'green', 10, 'green'];

    const actual = getDuplicateOutputs(expression);
    const expected = ['green'];

    expect(actual).toEqual(expected);
  });

  test('interpolate with nested conditional', () => {
    expression = [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      'green',
      10,
      'green',
      15,
      ['match', ['get', 'type'], 'desert', 'red', 'red']
    ];

    const actual = getDuplicateOutputs(expression);
    const expected = ['green', 'red'];

    expect(actual).toEqual(expected);
  });

  test('interpolate with deeply nested conditional', () => {
    expression = [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      'blue',
      10,
      'blue',
      15,
      [
        'match',
        ['get', 'class'],
        'grass',
        'green',
        'land',
        ['match', ['get', 'type'], 'desert', 'brown', 'dirt', 'brown', 'tan'],
        'green'
      ]
    ];

    const actual = getDuplicateOutputs(expression);
    const expected = ['blue', 'green', 'brown'];

    expect(actual).toEqual(expected);
  });
});

describe('lintExpressionDuplicateOutputs', () => {
  let style;

  test('lints duplicate outputs', () => {
    style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              'blue',
              10,
              'blue',
              15,
              [
                'match',
                ['get', 'class'],
                'grass',
                'green',
                'land',
                [
                  'match',
                  ['get', 'type'],
                  'desert',
                  'brown',
                  'dirt',
                  'brown',
                  'tan'
                ],
                'green'
              ]
            ]
          }
        }
      ]
    };
    const actual = lintExpressionDuplicateOutputs(style);
    const expected = [
      'layer-1: fill-color contains duplicate outputs - blue, green, brown'
    ];
    expect(actual).toEqual(expected);
  });

  test('lints duplicate outputs for multiple layers', () => {
    style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              'blue',
              10,
              'blue',
              15,
              [
                'match',
                ['get', 'class'],
                'grass',
                'green',
                'land',
                [
                  'match',
                  ['get', 'type'],
                  'desert',
                  'brown',
                  'dirt',
                  'brown',
                  'tan'
                ],
                'green'
              ]
            ]
          }
        },
        {
          id: 'layer-2',
          paint: {
            'fill-color': ['match', ['get', 'class'], 'grass', 'green', 'green']
          }
        }
      ]
    };
    const actual = lintExpressionDuplicateOutputs(style);
    const expected = [
      'layer-1: fill-color contains duplicate outputs - blue, green, brown',
      'layer-2: fill-color contains duplicate outputs - green'
    ];
    expect(actual).toEqual(expected);
  });

  test('returns empty array for expression without duplicate outputs', () => {
    style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              'blue',
              10,
              'green'
            ]
          }
        }
      ]
    };
    const actual = lintExpressionDuplicateOutputs(style);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
