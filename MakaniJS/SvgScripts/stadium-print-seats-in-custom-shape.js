//localVars
//---------------------------------------------
var selectedCustomBlockPointsArr = [],
    selectedCustomBlockW,
    selectedCustomBlockH,
    blockHolderForSingleSelectedBlock;

//0 of 5:
/*@polyBlock: read attrs
==============================================================*/
//read attrs from selected
//------------------------------------------
function readAttrsOfPolyBlock() {
    //poly block attrs
    var selectedPolyBlock,// = d3.select(this),
        thisBlock,
        thisPoints,
        thisId,
        pointsTotal = [],
        objectObj = {},
        splittedPointsArr,
        resultOfSelectedCustomBlockPoints,
        arrx = [],
        arry = [],
        xarrMinVal,
        xarrMaxVal,
        yarrMaxVal,
        yarrMinVal,

    //debugger;
    //notify selected block and this attrs
    //---------------------------------------------
    //var selectedPolyBlock = boardDraw.select('.is-poly-group.selected').select('.is-block'),

    selectedPolyBlock = d3.select('.is-poly-group.selected > .is-block');
    thisBlock = selectedPolyBlock;
    thisPoints = thisBlock.attr('points');
    thisId = thisBlock.attr('id');
    splittedPointsArr = thisPoints.split(',');
    //testIt
    console.log('split numbers: ' + splittedPointsArr);
    console.log('thisId: ' + thisId);
    //		console.log('boxOfCustomShape: ' + boxOfCustomShape);

    //filter through splittedPointsArr
    for (var i = 1; i <= splittedPointsArr.length; i += 2) {
        //record xy vals
        var x = splittedPointsArr[i - 1];
        var y = splittedPointsArr[i];
        //save recorded xy vals
        arrx.push(parseFloat(x));
        arry.push(parseFloat(y));
        objectObj = {
            'x': parseFloat(x),
            'y': parseFloat(y)
        };
        //convert recorded val as json and store it into resultOfSelectedCustomBlockPoints
        resultOfSelectedCustomBlockPoints = JSON.parse(JSON.stringify(objectObj));
        //save recorded objs into selectedCustomBlockPointsArr
        selectedCustomBlockPointsArr.push(resultOfSelectedCustomBlockPoints);
    }
    //testIt
    console.log('selectedCustomBlockPointsArr: ' + selectedCustomBlockPointsArr);

    //pick min and max vals from recorded xy vals
    //---------------------------------------------
    xarrMinVal = Math.min.apply(null, arrx);
    xarrMaxVal = Math.max.apply(null, arrx);
    yarrMinVal = Math.min.apply(null, arry);
    yarrMaxVal = Math.max.apply(null, arry);

    console.log('xarrMinVal: ' + xarrMinVal + ' || xarrMaxVal: ' + xarrMaxVal);
    console.log('yarrMinVal: ' + yarrMinVal + ' || yarrMaxVal: ' + yarrMaxVal);

    //pick dimen vals from picked min and max vals
    //---------------------------------------------
    selectedCustomBlockW = xarrMaxVal - xarrMinVal;
    selectedCustomBlockH = yarrMaxVal - yarrMinVal;

    //testIt
    console.log('selectedCustomBlockW: ' + selectedCustomBlockW + ' || selectedCustomBlockH: ' + selectedCustomBlockH);
}//fn:end readAttrsOfPolyBlock

//read attrs from db
//------------------------------------------
function readAttrsOfPolyBlockFromDb(thiBlockId, thiBlockPoints) {
    //poly block attrs
    var pointsTotal = [],
        objectObj = {},
        splittedPointsArr,
        resultOfSelectedCustomBlockPoints,
        arrx = [],
        arry = [],
        xarrMinVal,
        xarrMaxVal,
        yarrMaxVal,
        yarrMinVal,
        //debugger;
        //notify selected block and this attrs
        //---------------------------------------------
        thisPoints = thiBlockPoints,
        thisId = thiBlockId,
        splittedPointsArr = thisPoints.split(',');
    //filter through splittedPointsArr
    for (var i = 1; i <= splittedPointsArr.length; i += 2) {
        //record xy vals
        var x = splittedPointsArr[i - 1];
        var y = splittedPointsArr[i];
        //save recorded xy vals
        arrx.push(parseFloat(x));
        arry.push(parseFloat(y));
        objectObj = {
            'x': parseFloat(x),
            'y': parseFloat(y)
        };
        //convert recorded val as json and store it into resultOfSelectedCustomBlockPoints
        resultOfSelectedCustomBlockPoints = JSON.parse(JSON.stringify(objectObj));
        //save recorded objs into selectedCustomBlockPointsArr
        selectedCustomBlockPointsArr.push(resultOfSelectedCustomBlockPoints);
    }

    //pick min and max vals from recorded xy vals
    //---------------------------------------------
    xarrMinVal = Math.min.apply(null, arrx);
    xarrMaxVal = Math.max.apply(null, arrx);
    yarrMinVal = Math.min.apply(null, arry);
    yarrMaxVal = Math.max.apply(null, arry);

    //pick dimen vals from picked min and max vals
    //---------------------------------------------
    selectedCustomBlockW = xarrMaxVal - xarrMinVal;
    selectedCustomBlockH = yarrMaxVal - yarrMinVal;

}//fn:end readAttrsOfPolyBlock



//1 of 5:
/*@polyBlock: print custom shape
=============================================================*/
//fn:create printCustomShapeFn(boardForSingleBlockHolderId, seatDimension, seatSpace)
function printCustomShapeFn(boardForSingleBlockHolderId, seatDimension, seatSpace) {

    debugger;

    //fn:execute: read attrs of selected custom shape
    checkAndreadAttrsOfPolyBlock();

    //@print selected custom shape
    //========================================================= 
    var blockHolder = $('#' + boardForSingleBlockHolderId),
        blockHolderW = blockHolder.innerWidth(),
        blockHolderH = blockHolder.innerHeight();

    //blockHolderW = boardWidth,
    //blockHolderH = boardHeight;

    //print svg to the single block holder
    blockHolder.html('<svg>');
    //notify blockHolder
    //---------------------------------------------
    var boardForSingleBlock = d3.select('#' + boardForSingleBlockHolderId).select('svg');
    var boardScaleX = d3.scale.linear()
                    .domain([100, boardWidth])
                    .range([0, blockHolderW]);
    var boardScaleY = d3.scale.linear()
                .domain([100, boardHeight])
                .range([blockHolderH, 0]);



    //update dimension for boardForSingleBlock
    //---------------------------------------------
    boardForSingleBlock
        .attr({
            'width': boardWidth,
            'height': boardHeight
            //'width': function () {
            //    return boardScaleX(boardWidth);
            //},
            //'height': function () {
            //    return boardScaleY(boardHeight);
            //},
            //'is-board': true,
            //'preserveAspectRatio': 'xMidYMid meet',
            //'viewBox': '0 0 ' + boardScaleX(boardWidth) + ' ' + boardScaleY(boardHeight)
        });



    //print group for custom shape
    //---------------------------------------------		
    boardForSingleBlock
        .selectAll('g')
        .data([0])
        .enter().append('g')
        .attr('id', 'blockHolderForSingleSelectedBlock')
        .classed('custom-block', true)
        .call(zoomedIt).on('dblclick.zoom', null).on('mousedown.zoom', null);

    //notify blockHolder for single selected block
    //----------------------------------------------
    blockHolderForSingleSelectedBlock = d3.select('#blockHolderForSingleSelectedBlock');
    //print custom shape
    //---------------------------------------------		
    blockHolderForSingleSelectedBlock
        .selectAll('polygon')
        .data([selectedCustomBlockPointsArr])
        .enter().append('polygon')
        .attr('points', function (d) {
            return d.map(function (d) {
                return [d.x, d.y].join(',');
            }).join(',');
        })
        .style('fill', colrBlack);


    //@fn:execute custom seats by mouse click
    //-------------------------------------------------
    //printSeatsByMouseClickFn(seatsHolderId, seatDia, seatSpace);
    printSeatsByMouseClickFn('blockHolderForSingleSelectedBlock', seatDimension, seatSpace);

    //doempty: "selectedCustomBlockPointsArr" after print this block:
    selectedCustomBlockPointsArr = [];
    //debugger;
} //fn:end print custom shape fn


//2 of 5:
//@print: seats by mouse click for custom single selected block
//=========================================================
//function printSeatsByMouseClickFn(seatsHolderId, entraceXId, entranceYId, seatDia, seatSpace) {
function printSeatsByMouseClickFn(seatsHolderId, seatDia, seatSpace) {
    //local vars 
    var seatsHolder = d3.select('#' + seatsHolderId),
        seatNumber = 0,
        seatPos,
        seatPosX,
        seatPosY,
        seatDiaSpace = seatDia + seatSpace,
        seatDiaHalf = seatDia / 2;
    //fn:bind
    seatsHolder
        .on('mouseover', function () {
            //testIt
            console.log('you are in "mouseover" area of seatsHolder');
            //notify this as self
            var self = d3.select(this);
            //bind: to self
            self
                .on('click', function () {
                    //increase seatNumber val
                    seatNumber++;

                    //update vals of local position 
                    seatPos = d3.mouse(this);
                    seatPosX = seatPos[0];
                    seatPosY = seatPos[1];
                    //check: if is block?
                    if (d3.event.target.tagName === 'polygon') {
                        //print seat group
                        var seatGroup = seatsHolder
                            .append('g')
                            .attr({
                                'is-seat-group': true
                            })
                            .classed('is-seat-group', true);
                        //print seat base
                        seatGroup
                            .append('circle')
                            .attr({
                                'cx': seatPosX,
                                'cy': seatPosY,
                                'r': seatDiaSpace,
                                'is-seat-base': true
                            })
                            .classed('is-seat-base', true);
                        //print seat real
                        seatGroup
                            .append('circle')
                            .classed('is-seat-real un-selected', true)
                            .attr({
                                'cx': seatPosX,
                                'cy': seatPosY,
                                'r': seatDiaHalf,
                                'id': 'seat-' + seatNumber,
                                'is-seat-real': true
                            })
                            .on('click', function (d) {
                                d.click++;
                                var selected = d3.select(this);
                                selected.classed("selected", !selected.classed("selected"))
                                .classed("un-selected", !selected.classed("un-selected"));
                                //remove exsting style color
                                if ((d.click) % 1 == 0) {
                                    selected
                                        .style('fill', null);
                                }
                            });
                        //.call(d3.behavior.drag()
                        //.on("start", dragstarted)
                        //.on("drag", dragged)
                        //.on("end", dragended));



                        //.on('dblclick', function () {
                        //    var seatSelfParent = d3.select(this.parentNode)
                        //    //d3.select(this).remove();
                        //    seatSelfParent.remove();
                        //    //decrease seatNumber val
                        //    seatNumber--;
                        //});

                        //begin: custom drag fn
                        //----------------------------------
                        function dragstarted(d) {
                            d3.select(this).raise().classed("active", true);
                        }

                        function dragged(d) {
                            d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
                        }

                        function dragended(d) {
                            d3.select(this).classed("active", false);
                        }
                        //----------------------------------
                        //end: custom drag fn

                    } //end: if is block?
                }); //end: onclick of block
        });
} //end: fn: printSeatsByMouseClickFn();


//3 of 5:
/*@polyBlock: fetch custom shape
=============================================================*/
//fn: create: fetchCustomShapeFn(boardForSingleBlockHolderId, seatDimension, seatSpace, thisSavedSeatsJson) {
function fetchCustomShapeFn(boardForSingleBlockHolderId, seatDimension, seatSpace, thisSavedSeatsJson) {
    debugger;
    //fn:execute: read attrs of selected custom shape
    checkAndreadAttrsOfPolyBlock();

    //@print selected custom shape
    //========================================================= 
    var blockHolder = $('#' + boardForSingleBlockHolderId),
        blockHolderW = boardWidth, //'100%',//blockHolder.innerWidth(),
        blockHolderH = boardHeight; //blockHolder.innerHeight();


    //print svg to the single block holder
    blockHolder.html('<svg>');
    //notify blockHolder
    //---------------------------------------------
    var boardForSingleBlock = d3.select('#' + boardForSingleBlockHolderId).select('svg'),
        scaleX = d3.scale.linear()
        .domain([-30, 30])
        .range([0, 600]),
        scaleY = d3.scale.linear()
        .domain([0, 50])
        .range([500, 0]);

    //update dimension for boardForSingleBlock
    //---------------------------------------------
    boardForSingleBlock
        .attr({
            'width': boardWidth,
            'height': boardHeight,
            'is-board': true,
            'preserveAspectRatio': 'xMidYMid meet',
            'viewBox': '0 0 ' + boardWidth + ' ' + boardHeight
        });



    //print group for custom shape
    //---------------------------------------------		
    boardForSingleBlock
        .selectAll('g')
        .data([0])
        .enter().append('g')
        .attr('id', 'blockHolderForSingleSelectedBlock')
        .classed('custom-block', true)
        .call(zoomedIt).on('dblclick.zoom', null).on('mousedown.zoom', null);

    //notify blockHolder for single selected block
    //----------------------------------------------
    blockHolderForSingleSelectedBlock = d3.select('#blockHolderForSingleSelectedBlock');
    //print custom shape
    //---------------------------------------------		
    blockHolderForSingleSelectedBlock
        .selectAll('polygon')
        .data([selectedCustomBlockPointsArr])
        .enter().append('polygon')
        .attr('points', function (d) {
            return d.map(function (d) {
                return [d.x, d.y].join(',');
            }).join(',');
        })
        .style('fill', colrBlack);


    //@fn:execute custom seats by mouse click
    //-------------------------------------------------
    //printSeatsByMouseClickFn(seatsHolderId, seatDia, seatSpace);
    printSeatsByMouseClickFn('blockHolderForSingleSelectedBlock', seatDimension, seatSpace);

    //@fn:execute print saved seats
    //-------------------------------------------------
    //printSavedSeats(seatHolderId, savedSeatsData)
    printSavedSeats('blockHolderForSingleSelectedBlock', thisSavedSeatsJson);

    //doempty: "selectedCustomBlockPointsArr" after print this block:
    selectedCustomBlockPointsArr = [];
    //debugger;
} //fn:end fetch custom shape fn


//4 of 5:
/*@polyBlock: print saved seats
=============================================================*/
function printSavedSeats(seatHolderId, savedSeatsData) {
    //debugger;
    var slicedSeatsData = savedSeatsData.slice();
    //notify seatHolder
    var seatHolder = d3.select('#' + seatHolderId);


    //print seat group
    var seatGroup = seatHolder
        .selectAll('g')
        .data(slicedSeatsData)
        .enter().append('g')
        .attr({
            'is-seat-group': true
        })
        .classed('is-seat-group', true);
    //print seat base
    seatGroup
        .append('circle')
        .attr({
            'cx': function (d) {
                return d.cx;
            },
            'cy': function (d) {
                return d.cy;
            },
            'r': function (d) {
                return (d.r) * 2;
            },
            'is-seat-base': true
        })
        .classed('is-seat-base', true);

    //print seats
    //seatHolder
    //.selectAll('circle')
    //.data(slicedSeatsData)
    //.enter().append('circle')

    seatGroup
        .append('circle')
        .attr({
            'cx': function (d) {
                return d.cx;
            },
            'cy': function (d) {
                return d.cy;
            },
            'r': function (d) {
                return d.r;
            },
            'id': function (d) {
                return d.id;
            },
            'class': function (d) {
                //return d.class;
                return 'is-seat-real un-selected';
            },
            'is-seat-real': function (d) {
                //return d.isSeatReal;
                return true;
            },
            'style': function (d) {
                return d.style;
            }
        })
        .on('click', function (d) {
            debugger;
            var selected = d3.select(this);
            //check if it is un-selected?
            if (selected.classed("un-selected")) {
                selected.classed("selected", true);
                selected.classed("un-selected", false);
                //doempty it's style
                selected.attr({
                    'style': null
                });
            } else {
                selected.classed("selected", false);
                selected.classed("un-selected", true);
                //fill it's style
                selected.attr({
                    'style': d.style
                });
            }
        });

}//end: fn: printSavedSeats();


//5 of 5:
/*@polyBlock: fetch custom shape
=============================================================*/
//fn: create: fetchCustomShapeFromDbFn(boardForSingleBlockHolderId, seatDimension, seatSpace, thisSavedSeatsJson, thiBlockId, thiBlockPoints)
function fetchCustomShapeFromDbFn(boardForSingleBlockHolderId, seatDimension, seatSpace, thisSavedSeatsJson, thiBlockId, thiBlockPoints) {
    debugger;
    //fn:execute: read attrs of selected custom shape from db
    readAttrsOfPolyBlockFromDb(thiBlockId, thiBlockPoints);
    //@print selected custom shape
    //========================================================= 
    var blockHolder = $('#' + boardForSingleBlockHolderId),
        blockHolderW = boardWidth, //'100%',//blockHolder.innerWidth(),
        blockHolderH = boardHeight; //blockHolder.innerHeight();


    //print svg to the single block holder
    blockHolder.html('<svg>');
    //notify blockHolder
    //---------------------------------------------
    var boardForSingleBlock = d3.select('#' + boardForSingleBlockHolderId).select('svg'),
        scaleX = d3.scale.linear()
        .domain([-30, 30])
        .range([0, 600]),
        scaleY = d3.scale.linear()
        .domain([0, 50])
        .range([500, 0]);

    //update dimension for boardForSingleBlock
    //---------------------------------------------
    boardForSingleBlock
        .attr({
            'width': boardWidth,
            'height': boardHeight,
            'is-board': true,
            'preserveAspectRatio': 'xMidYMid meet',
            'viewBox': '0 0 ' + boardWidth + ' ' + boardHeight
        });



    //print group for custom shape
    //---------------------------------------------		
    boardForSingleBlock
        .selectAll('g')
        .data([0])
        .enter().append('g')
        .attr('id', 'blockHolderForSingleSelectedBlock')
        .classed('custom-block', true)
        .call(zoomedIt).on('dblclick.zoom', null).on('mousedown.zoom', null);

    //notify blockHolder for single selected block
    //----------------------------------------------
    blockHolderForSingleSelectedBlock = d3.select('#blockHolderForSingleSelectedBlock');
    //print custom shape
    //---------------------------------------------		
    blockHolderForSingleSelectedBlock
        .selectAll('polygon')
        .data([selectedCustomBlockPointsArr])
        .enter().append('polygon')
        .attr('points', function (d) {
            return d.map(function (d) {
                return [d.x, d.y].join(',');
            }).join(',');
        })
        .style('fill', colrBlack);


    //@fn:execute custom seats by mouse click
    //-------------------------------------------------
    //printSeatsByMouseClickFn(seatsHolderId, seatDia, seatSpace);
    //printSeatsByMouseClickFn('blockHolderForSingleSelectedBlock', seatDimension, seatSpace);

    //@fn:execute print saved seats
    //-------------------------------------------------
    //printSavedSeats(seatHolderId, savedSeatsData)
    printSavedSeats('blockHolderForSingleSelectedBlock', thisSavedSeatsJson);

    //doempty: "selectedCustomBlockPointsArr" after print this block:
    selectedCustomBlockPointsArr = [];
    //debugger;
} //fn:end fetchCustomShapeFromDbFn()

//fn: bind
//=============================================================
//=============================================================

//fn:execute: readAttrsOfPolyBlock();
//--------------------------------------------------
function checkAndreadAttrsOfPolyBlock() {
    //debugger;
    var drawnBlock = $('.drawn-block');
    if (drawnBlock.is('.is-poly-group.selected')) {
        readAttrsOfPolyBlock();
    }//end if ($('.is-poly-group.selected'))
}

//fn:bind: readAttrsOfPolyBlock
$('#btnSaveBlockDetails').click(checkAndreadAttrsOfPolyBlock);

//fn:bind printSeatsInCustomShapeFn(seatsHolderId, rowQtyInputFieldId, colQtyInputFieldId, entraceXId, entranceYId)
//-----------------------------------------------------
//fn:bind: prentSeatsInCustomShapeFn
$(document).on('click', '#btnUpdateRowsColsForCustomShape', function () {
    //@fn:execute custom shape fn
    //-------------------------------------------------
    //printCustomShapeFn('stadiumBlockHolder', seatDimension, seatSpace);
    printCustomShapeFn('stadiumBlockHolder', 30, 2);
});

//fn: create customBlockPointsFn
//------------------------------------------------------
var reqCustomSeatsArray = [];
function fetchedCustomBlockPointsFn(seatResopnseObject) {
    debugger;
    var cx, cy, r, id, isSeatReal, style;
    reqCustomSeatsArray = [];
    for (var i = 0; i < seatResopnseObject[0]['selected'].length; i++) {
        id = seatResopnseObject[0]['selected'][i].id;
        cx = parseFloat(seatResopnseObject[0]['selected'][i].cx);
        cy = parseFloat(seatResopnseObject[0]['selected'][i].cy);
        r = parseFloat(seatResopnseObject[0]['selected'][i].r);
        var seatJson =
            {
                'cx': cx,
                'cy': cy,
                'r': r,
                'id': id,
                'style': 'fill: gold'
            };
        reqCustomSeatsArray.push(seatJson);
    }
    for (var i = 0; i < seatResopnseObject[0]['unselected'].length; i++) {
        id = seatResopnseObject[0]['unselected'][i].id;
        cx = parseFloat(seatResopnseObject[0]['unselected'][i].cx);
        cy = parseFloat(seatResopnseObject[0]['unselected'][i].cy);
        r = parseFloat(seatResopnseObject[0]['unselected'][i].r);
        var seatJson =
            {
                'cx': cx,
                'cy': cy,
                'r': r,
                'id': id,
                'style': 'fill: red'
            };
        reqCustomSeatsArray.push(seatJson);
    }
    fetchCustomShapeFn('stadiumBlockHolder', 5, 2, reqCustomSeatsArray);
    //reqCustomSeatsArray.push(seatResopnseObject);
    //console.log(reqCustomSeatsArray);
};



$(document).on('mouseover', '#defineSeats', function () {
    debugger;

    //create temporary json for square block seats
    //------------------------------------------------------
    var sampleSeatJsonForSquare = [
        {
            'cx': 15,
            'cy': 44.301025390625,
            'r': 15,
            'id': 'seat-6',
            'row': 'row-3',
            'col': 'col-0',
            'class': 'is-seat-real un-selected',
            'isSeatReal': true,
            'style': ''
        },
        {
            'cx': 47,
            'cy': 44.301025390625,
            'r': 15,
            'id': 'seat-7',
            'row': 'row-3',
            'col': 'col-1',
            'class': 'is-seat-real un-selected',
            'isSeatReal': true,
            'style': ''
        },
        {
            'cx': 79,
            'cy': 44.301025390625,
            'r': 15,
            'id': 'seat-8',
            'row': 'row-3',
            'col': 'col-2',
            'class': 'is-seat-real un-selected',
            'isSeatReal': true,
            'style': ''
        }
    ];
    //create temporary json for custom block seats, points
    //------------------------------------------------------
    var sampleSeatJsonForPoly = [
            {
                'cx': 447.890625,
                'cy': 175,
                'r': 15,
                'id': "seat-1",
                'class': 'is-seat-real un-selected',
                'isSeatReal': true,
                'style': ''
            },
            {
                'cx': 423.890625,
                'cy': 197,
                'r': 15,
                'id': "seat-2",
                'class': 'is-seat-real un-selected',
                'isSeatReal': true,
                'style': ''
            },
            {
                'cx': 399.890625,
                'cy': 223,
                'r': 15,
                'id': "seat-3",
                'class': 'is-seat-real un-selected',
                'isSeatReal': true,
                'style': ''
            }
            
    ];
    var sampleBlockPoints = '439.2923583984375,127.31280517578125,293.8958740234375,317.6285095214844,512.5816040039062,399.1923522949219,588.2350463867188,293.9867858886719';

   
    ////check: if is square block
    ////---------------------------------
    //if ($('.drawn-block.is-square-group.selected')) {
    //    //@fn:execute: fetchSquareShapeFromDbFn(domDisplayHolderId, savedSeatsData, selectedBlockId, selectedBlockW, selectedBlockH)
    //    fetchSquareShapeFromDbFn('defineSeatsView', sampleSeatJsonForSquare, 'block-0', 149, 164);
    //}
    ////check: if is square block
    ////---------------------------------
    //if ($('.drawn-block.is-poly-group.selected')) {
    //    //@fn:execute: fetchCustomShapeFromDbFn(boardForSingleBlockHolderId, seatDimension, seatSpace, thisSavedSeatsJson, thiBlockId, thiBlockPoints)
       fetchCustomShapeFromDbFn('defineSeatsView', 5, 2, sampleSeatJsonForPoly, 'block-1', sampleBlockPoints);
    //}
});
