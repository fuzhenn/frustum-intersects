import { intersectsBox, intersectsSphere } from '../src/index.js';
import assert from 'assert';

describe('frustum intersection specs', () => {
    it('box intersects', () => {
        assert(intersectsBox([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
           [[-1,-1,-1], [1,1,1]]));
    });

    it('sphere intersects', () => {
        assert(intersectsSphere([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
           [[0, 0, 0], 1]));
    });

    it('box not intersects', () => {
        assert(!intersectsBox([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
           [[100, 100, 100], [200, 200, 200]]));
    });

    it('sphere not intersects', () => {
        assert(!intersectsSphere([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1],
           [[10, 0, 0], 1]));
    });
});