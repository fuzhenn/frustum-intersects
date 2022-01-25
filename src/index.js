/*!
* Contains code from THREE.js
* MIT License
* https://github.com/mrdoob/three.js
*/

var planes = [];
for (var i = 0; i < 6; i++) {
    planes[i] = [];
}

export function intersectsSphere(matrix, sphere, mask) {
    setPlanes(matrix);
    var center = sphere[0];
    var negRadius = -sphere[1];
    for (var i = 0; i < 6; i++) {
        if (mask && mask.charAt(i) === '0') {
            continue;
        }
        var distance = distanceToPoint(planes[i], center);
        if (distance < negRadius) {
            return false;
        }
    }
    return true;
}

var p = [];

export function intersectsBox(matrix, box, mask) {
    setPlanes(matrix);
    for (var i = 0; i < 6; i++) {
        if (mask && mask.charAt(i) === '0') {
            continue;
        }
        var plane = planes[i];
        // corner at max distance
        p[0] = plane[0] > 0 ? box[1][0] : box[0][0];
        p[1] = plane[1] > 0 ? box[1][1] : box[0][1];
        p[2] = plane[2] > 0 ? box[1][2] : box[0][2];

        if (distanceToPoint(plane, p) < 0) {
            return false;
        }
    }

    return true;
}

export function intersectsOrientedBox(matrix, box, mask) {
    setPlanes(matrix);
    for (var i = 0; i < 6; i++) {
        if (mask && mask.charAt(i) === '0') {
            continue;
        }
        var plane = planes[i];
        if (!intersectsPlane(plane, box)) {
            return false;
        }
    }

    return true;
}

var COLUMN0ROW0 = 0 + 3, COLUMN0ROW1 = 3 + 3, COLUMN0ROW2 = 6 + 3, COLUMN1ROW0 = 1 + 3, COLUMN1ROW1 = 4 + 3, COLUMN1ROW2 = 7 + 3, COLUMN2ROW0 = 2 + 3, COLUMN2ROW1 = 5 + 3, COLUMN2ROW2 = 8 + 3;
// const COLUMN0ROW0 = 0, COLUMN0ROW1 = 1, COLUMN0ROW2 = 2, COLUMN1ROW0 = 3, COLUMN1ROW1 = 4, COLUMN1ROW2 = 5, COLUMN2ROW0 = 6, COLUMN2ROW1 = 7, COLUMN2ROW2 = 8;
var BOX_CENTER = [];
var HALF_AXES = [];

function intersectsPlane(plane, box) {
    var center = box;
    var normal = plane;
    var halfAxes = box;
    var normalX = normal[0], normalY = normal[1], normalZ = normal[2];
    // plane is used as if it is its normal; the first three components are assumed to be normalized
    var radEffective = Math.abs(normalX * halfAxes[COLUMN0ROW0] + normalY * halfAxes[COLUMN0ROW1] + normalZ * halfAxes[COLUMN0ROW2]) +
                       Math.abs(normalX * halfAxes[COLUMN1ROW0] + normalY * halfAxes[COLUMN1ROW1] + normalZ * halfAxes[COLUMN1ROW2]) +
                       Math.abs(normalX * halfAxes[COLUMN2ROW0] + normalY * halfAxes[COLUMN2ROW1] + normalZ * halfAxes[COLUMN2ROW2]);
    var distanceToPlane = distanceToPoint(plane, center);

    if (distanceToPlane <= -radEffective) {
        // The entire box is on the negative side of the plane normal
        // return Intersect.OUTSIDE;
        return false;
    } else if (distanceToPlane >= radEffective) {
        // The entire box is on the positive side of the plane normal
        // return Intersect.INSIDE;
        return true;
    }
    return true;
    // return Intersect.INTERSECTING;
}

function setPlanes(m) {
    var me = m;
    var me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
    var me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
    var me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
    var me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

    //right
    setComponents(planes[0], me3 - me0, me7 - me4, me11 - me8, me15 - me12);
    //left
    setComponents(planes[1], me3 + me0, me7 + me4, me11 + me8, me15 + me12);
    //bottom
    setComponents(planes[2], me3 + me1, me7 + me5, me11 + me9, me15 + me13);
    //top
    setComponents(planes[3], me3 - me1, me7 - me5, me11 - me9, me15 - me13);
    //z-far
    setComponents(planes[4], me3 - me2, me7 - me6, me11 - me10, me15 - me14);
    //z-near
    setComponents(planes[5], me3 + me2, me7 + me6, me11 + me10, me15 + me14);
}

function setComponents(out, x, y, z, w) {
    // THREE.js Plane.js
    var inverseNormalLength = 1 / Math.sqrt(x * x + y * y + z * z);
    out[0] = x * inverseNormalLength;
    out[1] = y * inverseNormalLength;
    out[2] = z * inverseNormalLength;
    out[3] = w * inverseNormalLength;
    return out;
}

function distanceToPoint(plane, p) {
    return plane[0] * p[0] + plane[1] * p[1] + plane[2] * p[2] + plane[3];
}
