/**
 * Created by victorlebron on 2/2/17.
 */

function Deque() {

    this.stac = [];

    this.popBack = function () {
        return this.stac.pop();
    }

    this.pushBack = function (item) {
        this.stac.push(item);
    }

    this.popFront = function () {
        return this.stac.shift();
    }

    this.pushFront = function (item) {
        this.stac.unshift(item);
    }

    this.peekFront = function () {

        if(this.stac.length > 0) {
            return this.stac[0];
        }
    }

    this.peekBack = function () {

        if(this.stac.length > 0) {
            return this.stac[this.stac.length -1];
        }

    }

    this.size = function () {
        return this.stac.length;
    }

    this.print = function () {
        console.log(this.stac);
    }

}

module.exports = Deque;
