import { getExtraneousMinMaxZoom } from '../min-max-zoom';

describe('getExtraneousMinMaxZoom', () => {
  describe('unnecessary min and max zooms', () => {
    let style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          paint: {
            'fill-color': 'red'
          }
        }
      ]
    };
    test('minzoom redundant', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].minzoom = 0;
      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = ['layer-1: contains unnecessary minzoom'];

      expect(actual).toEqual(expected);
    });

    test('maxzoom redundant', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].maxzoom = 24;
      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = ['layer-1: contains unnecessary maxzoom'];

      expect(actual).toEqual(expected);
    });
  });

  describe('opacity 0 within min and max', () => {
    let style = {
      id: 'my-style',
      layers: [
        {
          id: 'layer-1',
          paint: {
            'fill-color': 'red',
            'fill-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              5,
              0.5,
              10,
              1,
              15,
              0
            ]
          }
        }
      ]
    };

    test('simple interpolate opacity 0 before maxzoom returns warning', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].maxzoom = 20;

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [
        'layer-1: fill-opacity is at zero opacity before the maxzoom - 0 opacity at zoom 15'
      ];

      expect(actual).toEqual(expected);
    });

    test('simple interpolate opacity 0 after minzoom returns warning', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].minzoom = 3;
      testStyle.layers[0].paint['fill-opacity'] = [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        10,
        1,
        15,
        0.5
      ];

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [
        'layer-1: fill-opacity is at zero opacity before the minzoom - 0 opacity at zoom 5'
      ];

      expect(actual).toEqual(expected);
    });

    test('interpolate opacity 0 after minzoom returns no warning with non-zero output below it', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].minzoom = 3;
      testStyle.layers[0].paint['fill-opacity'] = [
        'interpolate',
        ['linear'],
        ['zoom'],
        3,
        1,
        5,
        0,
        10,
        1,
        15,
        0.5
      ];

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [];

      expect(actual).toEqual(expected);
    });

    test('simple step opacity 0 before maxzoom returns warning', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].maxzoom = 16;
      testStyle.layers[0].paint['fill-opacity'] = [
        'step',
        ['zoom'],
        0.5,
        10,
        1,
        15,
        0
      ];

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [
        'layer-1: fill-opacity is at zero opacity before the maxzoom - 0 opacity at zoom 15'
      ];

      expect(actual).toEqual(expected);
    });

    test('simple step opacity 0 after minzoom returns warning', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].minzoom = 3;
      testStyle.layers[0].paint['fill-opacity'] = [
        'step',
        ['zoom'],
        0,
        10,
        1,
        15,
        0.5
      ];

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [
        'layer-1: fill-opacity is at zero opacity before the minzoom - 0 opacity at zoom 0'
      ];

      expect(actual).toEqual(expected);
    });

    test('simple step opacity 0 at maxzoom returns no warning', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].maxzoom = 16;
      testStyle.layers[0].paint['fill-opacity'] = [
        'step',
        ['zoom'],
        0.5,
        10,
        1,
        15,
        0
      ];

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [
        'layer-1: fill-opacity is at zero opacity before the maxzoom - 0 opacity at zoom 15'
      ];

      expect(actual).toEqual(expected);
    });

    test('interpolate opacity 0 after minzoom and opacity 0 before maxzoom returns two warnings', () => {
      const testStyle = JSON.parse(JSON.stringify(style));
      testStyle.layers[0].minzoom = 3;
      testStyle.layers[0].maxzoom = 19;
      testStyle.layers[0].paint['fill-opacity'] = [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        10,
        1,
        15,
        0.5,
        18,
        0
      ];

      const actual = getExtraneousMinMaxZoom(testStyle);
      const expected = [
        'layer-1: fill-opacity is at zero opacity before the minzoom - 0 opacity at zoom 5',
        'layer-1: fill-opacity is at zero opacity before the maxzoom - 0 opacity at zoom 18'
      ];

      expect(actual).toEqual(expected);
    });
  });
});
