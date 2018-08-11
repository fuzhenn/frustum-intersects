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

var normalLength = 1.0 / 6;
function setComponents(out, x, y, z, w) {
    out[0] = x * normalLength;
    out[1] = y * normalLength;
    out[2] = z * normalLength;
    out[3] = w * normalLength;
    return out;
}

function distanceToPoint(plane, p) {
    return plane[0] * p[0] + plane[1] * p[1] + plane[2] * p[2] + plane[3];
}
