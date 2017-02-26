/*@block:initial
=============================================================*/
//block vars
var pointsFound = [],
	colrSeatSelected = 'rgb(44, 147, 232)',
	colrSeat = '#bbb',
	colrSeatBase = 'rgba(0,0,0,0)',
	colrSeatLabel = 'rgba(255,255,255,0.2)',
	rowClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
	DrawnBlock = function () {
	    return this;
	};
//assigning structure to drawn block
DrawnBlock.prototype = {
    id: function (idIt) {
        return idIt;
    },
    name: function (nameIt) {
        return nameIt;
    },
    pins: function (pinsIt) {
        return pinsIt;
    }
};

/*@pickBlock:fn:bind
=============================================================*/
var selectedBlockPoints;

boardDraw.on('mouseover', function () {
    console.log('You have mouseovered on boardDraw');
    //check: if target is-block
    ////debugger;
    if (d3.event.target.hasAttribute('is-block')) {
        //notify target
        var self = d3.select(d3.event.target);
        console.log('What type of this?:  ' + d3.event.target);
        //fn:bind: onclick
        self.on('click', defineBlockDataFn);
        //fn:execute: colrPickerToBlockElmsFn(colrPickerElmId, colrParentClassName, colrChildClassName);
        colrPickerToBlockElmsFn('#colorPickerForStadium', '.drawn-block.selected > .is-block');
    } else if (d3.event.target.hasAttribute('is-block-saved')) {
        //notify target
        var self = d3.select(d3.event.target);
        //fn:bind: onclick
        self.on('click', editBlockDataFn);
        //tested here
        console.log('clicked here');
    }
    
});
boardBg.on('click', function () {
    deselectOtherBlocksFn();
});

/*@pickBlock:fn:create
=============================================================*/
//fn:create: deselectOtherBlocksFn
function deselectOtherBlocksFn() {
    //////debugger;
    var otherBlocks;
    //check is it square group?
    if (d3.selectAll('.is-square-group.selected')) {
        otherBlocks = d3.selectAll('.is-square-group.selected');
        otherBlocks.attr('class', 'drawn-block saved is-square-group');
        //check is it poly group?
    }
    if (d3.selectAll('.is-poly-group.selected')) {
        otherBlocks = d3.selectAll('.is-poly-group.selected');
        otherBlocks.attr('class', 'drawn-block saved is-poly-group');
    }
    return otherBlocks;
    //var otherBlocks = d3.selectAll('.drawn-block.selected');
    //otherBlocks.attr('class', 'drawn-block');
}

//fn:create: defineBlockDataFn
function defineBlockDataFn() {
    //fn:execute: deselectOtherBlocksFn
    deselectOtherBlocksFn();
    ////debugger;
    //localvars
    var self, selfParent, selfId, selfParentId, selfX, selfY, selfW, selfH;
    var thi = this;
    //notify self
    self = d3.select(this);
    //if: it is polygon, get points
    if (d3.event.target.tagName === 'polygon') {
        selectedBlockPoints = self.attr('points');
    }
    //testIt
    console.log('selectedBlockPoints: ' + selectedBlockPoints);

    //notify self's parent
    selfParent = d3.select(this.parentNode);
    //add class to self's parent
    selfParent.classed('selected', true);
    //notify target's id
    selfId = self.attr('id');
    //notify taget's block-set
    selfParentId = selfParent.attr('id');
    //notify selfX pos
    selfX = self.attr('x');
    //notify selfY pos
    selfY = self.attr('y');
    //notify self width
    selfW = self.attr('width');
    //notify self height
    selfH = self.attr('height');

    //testIt
    console.log('selfW: ' + selfW + 'selfH: ' + selfH);

    //////debugger;
    //begin: ganta's code
    //-----------------------
    //fn:execute
    GetCurrentCordinate1();
    //console.log('First Completed');
    GetCurrentCordinate2();
    //console.log('Second Completed');
    GetCurrentCordinate3();
    //console.log('Thired Completed');
    GetCurrentCordinate4();
    //console.log('Fourth Completed');
    //-----------------------
    //end: ganta's code

    //doEmpty
    selectedBlockPoints = null;


    /*@fn:bind: blockOverBlock
	=============================================================*/
    //begin: Ganta's code
    //=================================================
    //gloabl vars
    var actualDrawnBlock, actualBlockSavedX, actualBlockSavedY, actualBlockSavedW,
		actualUpperBoundX, actualUpperBoundY, actualBlockSavedH, actualDrawnBlock;
    //fn:create: GetCordinates1
    function GetCurrentCordinate1() {
        actualDrawnBlock = self;
        //curX, curY;

        actualBlockSavedX = Math.round(parseFloat(actualDrawnBlock.attr('x')));
        actualBlockSavedY = Math.round(parseFloat(actualDrawnBlock.attr('y')));
        actualBlockSavedW = Math.round(parseFloat(actualDrawnBlock.attr('width')));
        actualBlockSavedH = Math.round(parseFloat(actualDrawnBlock.attr('height')));
        actualUpperBoundX = Math.round(parseFloat(actualBlockSavedW + actualBlockSavedX));
        actualUpperBoundY = Math.round(parseFloat(actualBlockSavedY + actualBlockSavedH));
        //update coord values
        //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
        ////console.log(xAxis);
        //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
        var COdX;
        var cody = actualBlockSavedY;
        for (var i = actualBlockSavedX; i < actualUpperBoundX; i++) {
            COdX = i;
            GetCordinates1(COdX, cody);
            GetCordinates2(COdX, cody);
            GetCordinates3(COdX, cody);
            GetCordinates4(COdX, cody);
            //if (COdX == xit && cody == yit) {
            //    //Todo
            //    ////debugger;
            //    $('.is-square').parent('.is-square-group').remove();
            //    //remove existing custom shape
            //    $('.is-poly').parent('.is-poly-group').remove();
            //}
        }
        //testIt
        // //console.log('GetCordinates are updateing! x: ' + xit + ' || y: ' + yit);

    }

    function GetCurrentCordinate2() {
        actualDrawnBlock = self;
        //curX, curY;


        actualBlockSavedX = Math.round(parseFloat(actualDrawnBlock.attr('x')));
        actualBlockSavedY = Math.round(parseFloat(actualDrawnBlock.attr('y')));
        actualBlockSavedW = Math.round(parseFloat(actualDrawnBlock.attr('width')));
        actualBlockSavedH = Math.round(parseFloat(actualDrawnBlock.attr('height')));
        actualUpperBoundX = Math.round(parseFloat(actualBlockSavedW + actualBlockSavedX));
        actualUpperBoundY = Math.round(parseFloat(actualBlockSavedY + actualBlockSavedH));
        //update coord values
        //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
        ////console.log(xAxis);
        //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
        var COdX = actualBlockSavedX;
        var cody;
        for (var i = actualBlockSavedY; i < actualUpperBoundY; i++) {
            cody = i;
            GetCordinates1(COdX, cody);
            GetCordinates2(COdX, cody);
            GetCordinates3(COdX, cody);
            GetCordinates4(COdX, cody);
            //if (COdX == xit && cody == yit) {
            //    //Todo
            //    ////debugger;
            //    $('.is-square').parent('.is-square-group').remove();
            //    //remove existing custom shape
            //    $('.is-poly').parent('.is-poly-group').remove();
            //}
        }
        //testIt
        // //console.log('GetCordinates are updateing! x: ' + xit + ' || y: ' + yit);

    }

    function GetCurrentCordinate3() {
        actualDrawnBlock = self;
        //curX, curY;

        actualBlockSavedX = Math.round(parseFloat(actualDrawnBlock.attr('x')));
        actualBlockSavedY = Math.round(parseFloat(actualDrawnBlock.attr('y')));
        actualBlockSavedW = Math.round(parseFloat(actualDrawnBlock.attr('width')));
        actualBlockSavedH = Math.round(parseFloat(actualDrawnBlock.attr('height')));
        actualUpperBoundX = Math.round(parseFloat(actualBlockSavedW + actualBlockSavedX));
        actualUpperBoundY = Math.round(parseFloat(actualBlockSavedY + actualBlockSavedH));
        //update coord values
        //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
        ////console.log(xAxis);
        //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
        var COdX; //= actualBlockSavedX;
        var cody = actualUpperBoundY;
        for (var i = actualBlockSavedX; i < actualUpperBoundX; i++) {
            cody = i;
            GetCordinates1(COdX, cody);
            GetCordinates2(COdX, cody);
            GetCordinates3(COdX, cody);
            GetCordinates4(COdX, cody);
            //if (COdX == xit && cody == yit) {
            //    //Todo
            //    ////debugger;
            //    $('.is-square').parent('.is-square-group').remove();
            //    //remove existing custom shape
            //    $('.is-poly').parent('.is-poly-group').remove();
            //}
        }
        //testIt
        // //console.log('GetCordinates are updateing! x: ' + xit + ' || y: ' + yit);

    }

    function GetCurrentCordinate4() {
        actualDrawnBlock = self;
        //curX, curY;

        actualBlockSavedX = Math.round(parseFloat(actualDrawnBlock.attr('x')));
        actualBlockSavedY = Math.round(parseFloat(actualDrawnBlock.attr('y')));
        actualBlockSavedW = Math.round(parseFloat(actualDrawnBlock.attr('width')));
        actualBlockSavedH = Math.round(parseFloat(actualDrawnBlock.attr('height')));
        actualUpperBoundX = Math.round(parseFloat(actualBlockSavedW + actualBlockSavedX));
        actualUpperBoundY = Math.round(parseFloat(actualBlockSavedY + actualBlockSavedH));

        //update coord values
        //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
        ////console.log(xAxis);
        //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
        var COdX = actualUpperBoundX; //= actualBlockSavedX;
        var cody;
        for (var i = actualBlockSavedY; i < actualUpperBoundY; i++) {
            cody = i;
            GetCordinates1(COdX, cody);
            GetCordinates2(COdX, cody);
            GetCordinates3(COdX, cody);
            GetCordinates4(COdX, cody);
            //if (COdX == xit && cody == yit) {
            //    //Todo
            //    ////debugger;
            //    $('.is-square').parent('.is-square-group').remove();
            //    //remove existing custom shape
            //    $('.is-poly').parent('.is-poly-group').remove();
            //}
        }
        //testIt
        // //console.log('GetCordinates are updateing! x: ' + xit + ' || y: ' + yit);

    }

    var isBlockSaved = [];
    var isCustrBblock = [];
    var isCustPoint;
    function GetCordinates1(xit, yit) {
        //debugger;
        isBlockSaved = d3.selectAll('.is-block-saved');
        isCustrBblock = d3.selectAll('.is-poly.is-block-saved');
        for (var j = 0; j < isBlockSaved[0].length;j++)
        {
          //  var j = i;
            ////debugger;
            isBlockSavedX = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('x')));
            isBlockSavedY = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('y')));
            isBlockSavedW = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('width')));
            isBlockSavedH = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('height')));
            
            var UpperBoundX = isBlockSavedX + isBlockSavedW;
            var UpperBoundY = isBlockSavedH + isBlockSavedY;
            var COdX;
            var cody = isBlockSavedY;
            for (var i = isBlockSavedX; i < UpperBoundX; i++) {
                COdX = i;
                if (COdX == xit && cody == yit) {
                    //Todo
                    ////debugger;
                    //remove this
                    $('.drawn-block.selected').remove();
                    //WE NEED TO REMOVE FROM THE ARRAY
                    break;
                }
              // i = i + isBlockSavedX;
            }
            //testIt
          //  ////debugger;
            //console.log('GetCordinates are updateing! x: ' + xit + ' || y: ' + yit);
          //  i = j + 1;
        }

        //isBlockSavedX = Math.round(parseFloat(isBlockSaved.attr('x')));
        //isBlockSavedY = Math.round(parseFloat(isBlockSaved.attr('y')));
        //isBlockSavedW =Math.round(parseFloat(isBlockSaved.attr('width')));
        //isBlockSavedH =Math.round(parseFloat(isBlockSaved.attr('height')));
        //var UpperBoundX = isBlockSavedX + isBlockSavedW;
        //var UpperBoundY = isBlockSavedH + isBlockSavedY;

        //update coord values
        //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
        ////console.log(xAxis);
        //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
        //var COdX;
        //var cody = isBlockSavedY;
        //for (var i = isBlockSavedX; i < UpperBoundX; i++) {
        //    COdX = i;
        //    if (COdX == xit && cody == yit) {
        //        //Todo
        //        //////debugger;
        //        //remove this
        //        $('.drawn-block.selected').remove();
        //    }
        //}
        ////testIt
        ////console.log('GetCordinates are updateing! x: ' + xit + ' || y: ' + yit);
    }

    function GetCordinates2(xit, yit) {
        //isBlockSaved = d3.select('.isBlockSaved');
        //isBlockSavedX = Math.round(parseFloat(isBlockSaved.attr('x')));
        //isBlockSavedY =Math.round( parseFloat(isBlockSaved.attr('y')));
        //isBlockSavedW =Math.round( parseFloat(isBlockSaved.attr('width')));
        //isBlockSavedH =Math.round( parseFloat(isBlockSaved.attr('height')));
        //var UpperBoundX = isBlockSavedX + isBlockSavedW;
        //var UpperBoundY = isBlockSavedY + isBlockSavedH;
        isBlockSaved = d3.selectAll('.is-block-saved');
        for (var j = 0; j < isBlockSaved[0].length; j++) {
            //  var j = i;
           // ////debugger;
            isBlockSavedX = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('x')));
            isBlockSavedY = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('y')));
            isBlockSavedW = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('width')));
            isBlockSavedH = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('height')));
            var UpperBoundX = isBlockSavedX + isBlockSavedW;
            var UpperBoundY = isBlockSavedH + isBlockSavedY;

            //update coord values
            //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
            ////console.log(xAxis);
            //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
            var COdX = isBlockSavedX;
            var cody;
            for (var i = isBlockSavedY; i < UpperBoundY; i++) {
                cody = i;
                if (COdX == xit && cody == yit) {
                    //Todo
                    ////debugger;
                    //remove this
                    $('.drawn-block.selected').remove();
                    //WE NEED TO REMOVE FROM THE ARRAY
                    break;
                }
             //   i = i + isBlockSavedX;
            }
            //testIt
            //console.log('GetCordinates are updateing!  2 x: ' + xit + ' || y: ' + yit);
         //   i = j + 1;
        }
    }
    
   // }

    function GetCordinates3(xit, yit) {
        
        isBlockSaved = d3.selectAll('.is-block-saved');
        for (var j = 0; j < isBlockSaved[0].length; j++) {
            //  var j = i;
           // ////debugger;
            isBlockSavedX = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('x')));
            isBlockSavedY = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('y')));
            isBlockSavedW = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('width')));
            isBlockSavedH = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('height')));
            var UpperBoundX = isBlockSavedX + isBlockSavedW;
            var UpperBoundY = isBlockSavedH + isBlockSavedY;
            //update coord values
            //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
            ////console.log(xAxis);
            //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
            var COdX;
            var cody = UpperBoundY;
            var resultvalue = isBlockSavedX > isBlockSavedY ? isBlockSavedY - isBlockSavedX : isBlockSavedX - isBlockSavedY;
            for (var i = isBlockSavedX; i < UpperBoundX; i++) {

                COdX = i;
                if (COdX == xit && cody == yit) {
                    //Todo
               //     ////debugger;
                    //remove this
                    $('.drawn-block.selected').remove();
                    //WE NEED TO REMOVE FROM THE ARRAY
                    break;
                }
               // i = i + isBlockSavedX;
            }
            //testIt
            //console.log('GetCordinates 3 are updateing! x: ' + xit + ' || y: ' + yit);
           // i = j + 1;
        }
    }


    function GetCordinates4(xit, yit) {

        isBlockSaved = d3.selectAll('.is-block-saved');
        for (var j = 0; j < isBlockSaved[0].length; j++) {
            //  var j = i;
            ////debugger;
            isBlockSavedX = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('x')));
            isBlockSavedY = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('y')));
            isBlockSavedW = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('width')));
            isBlockSavedH = Math.round(parseFloat(isBlockSaved[0][j].getAttribute('height')));
            var UpperBoundX = isBlockSavedX + isBlockSavedW;
            var UpperBoundY = isBlockSavedH + isBlockSavedY;
            //update coord values
            //xAxis = xAxis;//d3.select(".is-square-group.selected").selectAll('rect').attr("x");
            ////console.log(xAxis);
            //yAxis = yAxis//d3.select(".is-square-group.selected").selectAll('rect').attr("y");
            var COdX = UpperBoundX;
            var cody;
            var resultvalue = isBlockSavedX > isBlockSavedY ? isBlockSavedY - isBlockSavedX : isBlockSavedX - isBlockSavedY;
            for (var i = isBlockSavedY; i < UpperBoundY; i++) {
                //////debugger;
                cody = i;
                if (COdX == xit && cody == yit) {
                    //Todo
                    //////debugger;
                    //remove this
                    $('.drawn-block.selected').remove();
                    //WE NEED TO REMOVE FROM THE ARRAY
                    //break;
                }
               // i = i + isBlockSavedX;
            }
            //testIt
            //console.log('GetCordinates 4 are updateing! x: ' + xit + ' || y: ' + yit);
          //  i = j + 1;
        }
    }
    //================================================= */
    //end: Ganta's code


}


//fn:create: editBlockDataFn
function editBlockDataFn() {
    //fn:execute: deselectOtherBlocksFn
    deselectOtherBlocksFn();
    ////debugger;
    //notify this elm
    var self = d3.event.target,
        selfParent = d3.select(this.parentNode);
    //testIt
    if (self.hasAttribute('is-poly')) {
        selfParent
            .classed('is-poly-group drawn-block selected', true);
    }
    if(self.hasAttribute('is-rect')){
        selfParent
            .classed('is-square-group drawn-block selected', true);
    }
}


//fn:create: doEmptySeatSet
function doEmptySeatSet() {
    document.getElementById('stadiumBlockHolder').innerHTML = '';
    //var self = this;
    //$(document).on('click', self, function () {
    //    document.getElementById('stadiumBlockHolder').innerHTML = '';
    //});
}

//fn: execute: doEmptySeatSet(triggerId)
//doEmptySeatSet('seatDetails');


//fn:create: colrPickerToBlockElmsFn()
function colrPickerToBlockElmsFn(colrPickerId, colrToElmsClassName) {
    
    //fn:bind:onchange
    $(colrPickerId)
		.change(function () {
		   
		    //local var
		    var str = '';
		    //filter through children
		    $(colrPickerId + ' option:selected').each(function () {
		        //save it's text into str
		        str += $(this).text() + ' ';
		    });
		    //notify target element and change its color
		    $(colrToElmsClassName).css('fill', str);
		    //testIt
		    //console.log(str);
		})
		.change();
				
}

//colr: to seats
//----------------------------
//fn:execute: colrPickerToBlockElmsFn(colrPickerId, colrChildClassName);
colrPickerToBlockElmsFn('#defineColorToSeatSelected', '.is-seat-real.selected');



/*@remove fns: 
=============================================================*/
//fn:create: removeThisBlockFn
function removeThisBlockFn(elmToBeRemoved) {
    //blockNumber--;
    //remove this
    elmToBeRemoved.remove();
    //WE NEED TO REMOVE FROM THE ARRAY
}

//fn:bind:exectue: removeThisBlockFn
$(document).on('click', '.btn-remove-block', function () {
    //notify this parent
    var self = d3.select(this.parentNode);
    //testIt
    //console.log('this Parent: ' + self);
    //fn:execute remove this parent
    removeThisBlockFn(self);
});


/*@savedDrawn Block:
=============================================================*/




