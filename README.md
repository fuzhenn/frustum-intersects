# Frustum-Intersects

[![NPM Version](https://img.shields.io/npm/v/frustum-intersects.svg)](https://github.com/fuzhenn/frustum-intersects) [![CircleCI](https://circleci.com/gh/fuzhenn/frustum-intersects.svg?style=shield)](https://circleci.com/gh/fuzhenn/frustum-intersects)

A zero-dependency lib extracted from [THREE.js](https://github.com/mrdoob/three.js) to determine if camera's frustum intersects with given box or sphere.

## Usage

### npm
```shell
npm i frustum-intersects --save
```

```js
import { intersectsBox, intersectsSphere } from 'frustum-intersects';

const ret = intersectsBox([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
           [[-1,-1,-1], [1,1,1]]);

const ret2 = intersectsSphere([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
           [[0, 0, 0], 1]);
```

### Browser
```html
<script src="https://cdn.jsdelivr.net/npm/frustum-intersects/dist/frustum-intersects.js"></script>

<script>
const ret = frustum.intersectsBox(matrix, box);
</script>

```

## API

### intersectsBox(matrix, box, mask)

* `matrix` camera's 4x4 projection view matrix array, compatible with gl-matrix
* `box` the aabb box, [[minx, miny, minz], [maxx, maxy, maxz]]
* `mask` A 6 chars string mask (e.g. `"111111"`) of frustum planes, plane with mask of `0` will always return `true`

### intersectsSphere(matrix, sphere, mask)

* `matrix` camera's 4x4 projection view matrix array, compatible with gl-matrix
* `sphere` sphere, [[centerx, centery, centerz], radius]
* `mask` A 6 chars string mask (e.g. `"111111"`) of frustum planes, plane with mask of `0` will always return `true`

>> the planes' order of mask is `{right}{left}{bottom}{top}{z-far}{z-near}`,
