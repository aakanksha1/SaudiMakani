/*=================================================================
@BEGIN: fn:create: printSeatsInSquareFn()
===================================================================*/
//fn:create: function printSeatsInSquareFn(domDisplayHolderId, rowQtyInputFieldId, colQtyInputFieldId, entranceXId, entranceYId, seatDia, seatSpace)
function printSeatsInSquareFn(domDisplayHolderId, rowQtyInputFieldId, colQtyInputFieldId, entranceXId, entranceYId, seatDia, seatSpace) {
    debugger;
    //increment/decrement by vars
    var edgeT = 0,
        edgeR = 0,
        edgeB = 0,
        edgeL = 0,
        edgeAll = 40,
        edgeAllHalf = edgeAll / 2;

    //read entered value
    var rowQty = Math.abs(doc.getElementById(rowQtyInputFieldId).value),
		colQty = Math.abs(doc.getElementById(colQtyInputFieldId).value),
		seatingEntranceX = doc.getElementById(entranceXId).value,
		seatingEntranceY = doc.getElementById(entranceYId).value;

    //notify: elms and values
    //--------------------------------------
    var thisBlockHolder = d3.select('#' + domDisplayHolderId),
		thisBlockHolderW = parseFloat($('#' + domDisplayHolderId).outerWidth()),
        thisBlockHolderH = parseFloat($('#' + domDisplayHolderId).outerHeight());
    //print svg on dom
    thisBlockHolder.html('<div class="wrapper"><div id="boardSvgForBlockScroll" class="wrap-in"><svg id="boardSvgForBlock"></svg></div></div>');
    //notify printed svg as parent of block
    var thisBlockParent = thisBlockHolder.select('svg'),
        thisBlockWrapper = thisBlockParent.select('.wrapper'),
        thisBlockParentScroll = $('#boardSvgForBlockScroll');

    //read selected block attrs
    var selectedBlock = boardDraw.select('.is-square-group.selected').select('.is-block'),
        selectedBlockId = selectedBlock.attr('id'),
        seatSpaceCounted = seatDia + (seatSpace * colQty),
		selectedBlockW = parseFloat(selectedBlock.attr('width')),
		selectedBlockH = parseFloat(selectedBlock.attr('height')),
        seatsTotalW = parseFloat((seatDia + seatSpace) * colQty),
        seatsTotalH = parseFloat((seatDia + seatSpace) * rowQty),
        countedBlockW = 0,
        countedBlockH = 0,
        rowClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
        seatDiaHalf = seatDia / 2;


    //count block width and height
    //--------------------------------------
    //check whether seatsTotalW heigher than selectedBlock width or what?
    if (seatsTotalW > selectedBlockW || seatsTotalH > selectedBlockH) {
        //increase counted width of this block
        countedBlockW = seatsTotalW + selectedBlockW;
        //increase counted height of this block
        countedBlockH = seatsTotalH + selectedBlockH;
    } else {
        //normalize counted width of this block
        countedBlockW = selectedBlockW;
        //normalize counted height of this block
        countedBlockH = selectedBlockH;
    }


    //reset and update thisBlockParentScroll
    if ((countedBlockW > thisBlockHolderW) || (countedBlockH > thisBlockHolderH)) {
        edgeT = edgeAllHalf;
        edgeR = edgeAllHalf;
        edgeB = edgeAllHalf;
        edgeL = edgeAllHalf;
        thisBlockParentScroll.css({
            'width': countedBlockW,
            'height': countedBlockH,
            'margin': edgeAll,
            'position': 'absolute'
        });

    } else {
        edgeT = 0;
        edgeR = 0;
        edgeB = 0;
        edgeL = 0;
        thisBlockParentScroll.css({
            'width': 'auto',
            'height': thisBlockHolderH - (edgeAll),
            'minHeight': thisBlockHolderH - (edgeAll),
            'margin': edgeAllHalf,
            'position': 'relative'
        });
    }


    //fn: create: gridData
    //--------------------------------------
    function gridData() {
        //debugger;
        //local vars
        var data = new Array();
        var xpos = seatDiaHalf;
        var ypos = seatDiaHalf;
        var width = seatDia;
        var height = seatDia;
        var click = 0;
        var Positon = seatingEntranceX;
        var RequiredVal = colQty;
        var Temp = colQty;
        var Dummy = 0;
        var requireBottom = colQty * rowQty;
        var seatQty = colQty * rowQty;

        var Count = seatingEntranceY == 'Top' ? 0 : (colQty * rowQty);
        var UnDefinedValue = 0;
        var rowClass = 0;
        var ColNumber = colQty;
        var RowNumber = rowQty;
        var requestedRowNumber;


        var definedXposVal = countedBlockW > seatsTotalW ? (countedBlockW - seatsTotalW) : seatsTotalW - countedBlockW;
        var definedYposVal = countedBlockH > seatsTotalH ? (countedBlockH - seatsTotalH) : seatsTotalH - countedBlockH;

        definedXposVal += (seatDiaHalf);
        definedYposVal += (seatDiaHalf);
        //Written By Kiran
        //Right Side Go Here
        //Begin: If(RIGHT)
        //------------------------------------------

        if (Positon === 'Right') {
            //debugger;
            //begin: if right & top
            //---------------------------
            if (Positon === "Right" && seatingEntranceY === "Top") {

                // reset the xpos for a row to Right
                xpos = definedXposVal;

                for (var row = 0; row < rowQty; row++) {
                    data.push(new Array());

                    //filter through cols
                    if (row != 0) {
                        if (seatingEntranceY === 'Top') {
                            RequiredVal = Temp;
                        }
                    }
                    for (var column = 0; column < colQty; column++) {
                        //debugger;
                        // requireBottom = requireBottom - 1;
                        RequiredVal = RequiredVal - 1;
                        if (RequiredVal < seatQty) {
                            // RequiredVal = RequiredVal - 1;
                            data[row].push({
                                x: xpos,
                                y: ypos,
                                r: width / 2,
                                colNumber: ColNumber,
                                rowNumber: row,
                                seatNumber: RequiredVal + 1,
                                row: rowClasses[rowClass],
                                click: click
                            });

                        }
                        //increse the xpos for the next row (by count it's width val).
                        xpos += (width + seatSpace);
                        ColNumber = ColNumber - 1;
                    }

                    Temp += colQty;
                    // reset the xpos for a row to Right
                    xpos = definedXposVal;
                    //increse the ypos for the next row (by count it's height val).
                    ypos += (height + seatSpace);
                    //increase reading of rowClasses
                    rowClass++;
                }
                //add position to this parent
                thisBlockParent
                .style({
                    'top': '-' + edgeT,
                    'right': '-' + edgeR
                });

                //end: if right & top
                //begin: else right & bottom
                //---------------------------
            } else {

                // reset the xpos for a row to Right
                xpos = definedXposVal;

                // reset the ypos for a row to Bottom
                ypos = definedYposVal;

                //  ////debugger;
                for (var row = 0; row < rowQty; row++) {
                    data.push(new Array());

                    //filter through cols
                    if (row != 0) {
                        if (seatingEntranceX === 'Bottom') {
                            RequiredVal = Temp;
                        } else {
                            RequiredVal = requireBottom;
                            //   RequiredVal = RequiredVal + Temp;
                        }
                    }
                    for (var column = 0; column < colQty; column++) {
                        //debugger;
                        if (seatingEntranceX === 'Bottom') {
                            RequiredVal = RequiredVal + 1;
                        } else {
                            requireBottom = requireBottom - 1;
                            RequiredVal = requireBottom;
                            // RequiredVal = RequiredVal - 1;
                        }
                        if (RequiredVal < seatQty) {
                            data[row].push({
                                x: xpos,
                                y: ypos,
                                r: width / 2,
                                colNumber: ColNumber,
                                rowNumber: RowNumber,
                                seatNumber: RequiredVal + 1,
                                row: rowClasses[rowClass],
                                click: click
                            });
                        }
                        //increse the xpos for the next row (by count it's width val).
                        xpos += (width + seatSpace);

                    }
                    ColNumber = ColNumber - 1;
                    Temp += colQty;
                    // reset the xpos for a row to Right
                    xpos = definedXposVal;
                    //increse the ypos for the next row (by count it's height val).
                    ypos += (height + seatSpace);
                    //increase reading of rowClasses
                    rowClass++;
                    RowNumber = RowNumber - 1;
                }

                //add position to this parent
                thisBlockParent
                .style({
                    'bottom': '-' + edgeB,
                    'right': '-' + edgeR
                });

            } //end: else right & bottom


            //end: if(RIGHT)
            //begin: else left
            //------------------------------------------
        } else {

            //filter through rows
            Count = 0;
            for (var row = 0; row < rowQty; row++) {
                data.push(new Array());
                if (seatingEntranceY != 'Top' && row === 0) {
                    // reset the ypos for a row to Bottom
                    ypos = definedYposVal;
                }
                //////debugger;
                //filter through cols
                for (var column = 0; column < colQty; column++) {
                    //////debugger;
                    if (seatingEntranceY === 'Top') {
                        Count += 1;

                        //add position to this parent
                        thisBlockParent
                        .style({
                            'top': '-' + edgeT,
                            'left': edgeL
                        });

                    } else {

                        //ButtomSeat,Dummy
                        //	////debugger;
                        Dummy = seatQty - RequiredVal;
                        //RequiredVal = seatQty - colQty;
                        Count = Dummy; //(RequiredVal == seatQty) ? seatQty : RequiredVal;

                        Temp = Dummy; //RequiredVal = Dummy;//Count - 1;



                    }
                    //debugger;
                    requestedRowNumber = (seatingEntranceY === 'Top') ? row : RowNumber;
                    if (Count <= seatQty) {
                        data[row].push({
                            x: xpos,
                            y: ypos,
                            r: width / 2,
                            colNumber: column,
                            rowNumber: requestedRowNumber, // 
                            seatNumber: Count,
                            row: rowClasses[rowClass],
                            click: click
                        })
                        //RequiredVal=RequiredVal-1;
                    }
                    UnDefinedValue = UnDefinedValue + 1;
                    RequiredVal = RequiredVal - 1;

                    //increse the xpos for the next row (by count it's width val).
                    xpos += (width + seatSpace);
                }
                if (seatingEntranceY != 'Top') {
                    seatQty = (colQty * rowQty) - UnDefinedValue; //UnDefinedValue;

                    //add position to this parent
                    thisBlockParent
                    .style({
                        'bottom': '-' + edgeB,
                        'left': edgeL
                    });

                }
                RequiredVal = colQty;
                // reset the xpos after a row is complete
                xpos = seatDiaHalf;
                //increse the ypos for the next row (by count it's height val).
                ypos += (height + seatSpace);
                //increase reading of rowClasses
                rowClass++;
                RowNumber = RowNumber - 1;
            }

        } //end: else LEFT
        // Ending Protion
        return data;
    }

    //instantiate gridData 
    //--------------------------------------
    var gridData = gridData();
    //testIt
    //console.log(gridData);

    //print rows/cols/txt
    //--------------------------------------
    //do empty blockHolder before print anything
    thisBlockParent
		.selectAll('g')
		.remove();

    //notify: blockHolder
    var grid = thisBlockParent;


    //print: rows
    var row = grid.selectAll('.row')
		.data(gridData)
		.enter().append('g')
		.classed('row', true);
    //print: cols
    var col = row.selectAll('.is-seat-base')
		.data(function (d) {
		    return d;
		})
		.enter()
		.append('g')
		.classed('col', true);

    //print: seat-real
    col
        .append('circle')
    	.classed('is-seat-real un-selected', true)
    	.attr({
    	    'cx': function (d) {
    	        return d.x;
    	    },
    	    'cy': function (d) {
    	        return d.y;
    	    },
    	    'r': function (d) {
    	        return d.r;
    	    },
    	    'id': function (d) {
    	        return 'seat-' + d.seatNumber;
    	    },
    	    'row': function (d) {
    	        return 'row-' + d.rowNumber;
    	    },
    	    'col': function (d) {
    	        return 'col-' + d.colNumber;
    	    }
    	})
    	.on('click', function (d) {
    	    d.click++;
    	    var selected = d3.select(this);
    	    selected.classed("selected", !selected.classed("selected"))
    	    .classed("un-selected", !selected.classed("un-selected"));

    	    //remove fill 
    	    if ((d.click) % 1 == 0) {
    	        selected
					.style('fill', null);
    	    }


    	});


    //update: dimension of thisBlockHolder
    //--------------------------------------
    //reset and update thisBlockParent
    thisBlockParent.attr({
        'width': countedBlockW,
        'height': countedBlockH,
        'id': selectedBlockId
    });


} //fn:end: printSeatsInSquareFn



/*@printSeats: fn: bind 
=============================================================*/
$('#btnUpdateRowsCols').click(function () {
    //debugger;
    //fn:execute: printSeatsInSquareFn(domDisplayHolderId, rowQtyInputFieldId, colQtyInputFieldId, entranceXId, entranceYId, seatDia, seatSpace)
    printSeatsInSquareFn('stadiumBlockHolder', 'defineRowQty', 'defineColQty', 'entranceX', 'entranceY', 30, 2);
});

/*=================================================================
@END: fn:create: printSeatsInSquareFn()
===================================================================*/


//*********** Written By Kiran***********//
//fn: create: FetchSeatsInSquareFn
//--------------------------------------


//*********** Written By Kiran***********//
//fn: create: FetchSeatsInSquareFn
//--------------------------------------
function FetchSeatsInSquareFn(domDisplayHolderId, rowQtyInteger, colQtyInteger, entranceXId, entranceYId, seatDia, seatSpace, selected) {
    //debugger;
    //increment/decrement by vars
    var increaseDimenBy = 4,
        addlPx = 5,
        edgeT = 0,
        edgeR = 0,
        edgeB = 0,
        edgeL = 0,
        edgeAll = 40,
        edgeAllHalf = edgeAll / 2,
        decreseDimenBy = 1.2,
        //increment/decrement by vars
        moveVBXby = -decreseDimenBy,
        moveVBYby = 0;

    //read entered value
    var rowQty = Math.abs(rowQtyInteger),
		colQty = Math.abs(colQtyInteger),
		seatingEntranceX = entranceXId,
		seatingEntranceY = entranceYId;

    //notify: elms and values
    //--------------------------------------
    var thisBlockHolder = d3.select('#' + domDisplayHolderId),
		thisBlockHolderW = parseFloat($('#' + domDisplayHolderId).outerWidth()),
        thisBlockHolderH = parseFloat($('#' + domDisplayHolderId).outerHeight());

    //testIt
    console.log('thisBlockHolderW: ' + thisBlockHolderW + ' || thisBlockHolderH: ' + thisBlockHolderH)

    //print svg on dom
    thisBlockHolder.html('<div class="wrapper"><div id="boardSvgForBlockScroll" class="wrap-in"><svg id="boardSvgForBlock"></svg></div></div>');
    //notify printed svg as parent of block
    var thisBlockParent = thisBlockHolder.select('svg'),
        thisBlockWrapper = thisBlockParent.select('.wrapper'),
        thisBlockParentScroll = $('#boardSvgForBlockScroll');

    //read selected block attrs
    var selectedBlock = boardDraw.select('.is-square-group.selected').select('.is-block'),
        selectedBlockId = "block-1", //selectedBlock.attr('id'),
        seatSpaceCounted = seatDia + (seatSpace * colQty),
		//selectedBlockW = (seatDia * colQty) + seatSpaceCounted,
		//selectedBlockH = (seatDia * rowQty) + seatSpaceCounted,
		selectedBlockW = 120,// parseFloat(selectedBlock.attr('width')),
		selectedBlockH = 80,//parseFloat(selectedBlock.attr('height')),
        seatsTotalW = parseFloat((seatDia + seatSpace) * colQty),
        seatsTotalH = parseFloat((seatDia + seatSpace) * rowQty),
        countedBlockW = 0,
        countedBlockH = 0,
        pushSeatsToRight = 0,
        pushSeatsToBottom = 0,
        rowClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z'],
        seatDiaHalf = seatDia / 2;


    //count block width and height
    //--------------------------------------
    //check whether seatsTotalW heigher than selectedBlock width or what?
    if (seatsTotalW > selectedBlockW || seatsTotalH > selectedBlockH) {
        //increase counted width of this block
        countedBlockW = seatsTotalW + selectedBlockW;
        console.log('seatsTotalW is greater than: ' + selectedBlockW);

        //increase counted height of this block
        countedBlockH = seatsTotalH + selectedBlockH;
        console.log('seatsTotalH is greater than: ' + selectedBlockH);

    } else {
        //normalize counted width of this block
        countedBlockW = selectedBlockW;
        console.log('seatsTotalW is lesser than: ' + selectedBlockW);

        //normalize counted height of this block
        countedBlockH = selectedBlockH;
        console.log('seatsTotalH is lesser than: ' + selectedBlockH);

    }


    //reset and update thisBlockParentScroll
    if ((countedBlockW > thisBlockHolderW) || (countedBlockH > thisBlockHolderH)) {
        edgeT = edgeAllHalf;
        edgeR = edgeAllHalf;
        edgeB = edgeAllHalf;
        edgeL = edgeAllHalf;
        thisBlockParentScroll.css({
            'width': countedBlockW,
            'height': countedBlockH,
            'margin': edgeAll,
            'position': 'absolute'
        });

    } else {
        edgeT = 0;
        edgeR = 0;
        edgeB = 0;
        edgeL = 0;
        thisBlockParentScroll.css({
            'width': 'auto',
            'height': thisBlockHolderH - (edgeAll),
            'minHeight': thisBlockHolderH - (edgeAll),
            'margin': edgeAllHalf,
            'position': 'relative'
        });
    }
    var reqvar = [];
    function checkBlockExist(value) {
        //debugger;
        var res = value.split('-');
        if (reqvar == parseInt(res[1])) {
            return "Gold";
        }
        else {
            return "Gray";
        }
        // else return
    }

    var intarray = [];
    function findingindex() {

        for (var i = 0; i < reqvar.length; i++) {
            var result = reqvar[i].id.split('-')
            intarray.push(result[1]);
        }
    }
    var color = "fill:Gray";
    function findvaluepos(value) {
        //debugger;
        for (var i = 0; i < intarray.length; i++) {

            if (parseInt(intarray[i]) == value) {
                //debugger;
                return color = "fill:Gold"

            }
            //else
            //{
            //    return color = "fill:Gray";
            //}
            console.log(color);
        }
    }

    //fn: create: gridData
    //--------------------------------------


    //instantiate gridData 
    //--------------------------------------

    //*********** Written By Kiran***********//
    //fn: create: gridData
    //--------------------------------------
    function FetchgridData(seatingEntranceX, seatingEntranceY, rowQty, colQty, blockId, selected) {
        //debugger;
        //local vars
        reqvar = selected;
        findingindex();
        var data = new Array();
        var xpos = seatDiaHalf;
        var ypos = seatDiaHalf;
        var width = seatDia;
        var height = seatDia;
        var rowNumber = 0;
        var colNumber = 0;
        var seatNumber = 0;
        var click = 0;
        var Positon = seatingEntranceX;
        var RequiredVal = colQty;
        var Temp = colQty;
        var Dummy = 0;
        var requireBottom = colQty * rowQty;
        var seatQty = colQty * rowQty;
        var actuvalSeatQty = colQty * rowQty;

        var Count = seatingEntranceY == 'Top' ? 0 : (colQty * rowQty);
        var ButtomSeat = colQty;
        var UnDefinedValue = 0;
        var rowClass = 0;
        var ColNumber = colQty;
        var RowNumber = rowQty;
        var requestedRowNumber;


        var definedXposVal = countedBlockW > seatsTotalW ? (countedBlockW - seatsTotalW) : seatsTotalW - countedBlockW;
        var definedYposVal = countedBlockH > seatsTotalH ? (countedBlockH - seatsTotalH) : seatsTotalH - countedBlockH;

        definedXposVal += (seatDiaHalf);
        definedYposVal += (seatDiaHalf);



        //Written By Kiran
        //Right Side Go Here
        //Begin: If(RIGHT)
        //------------------------------------------

        if (Positon === 'Right') {
            //debugger;
            //begin: if right & top
            //---------------------------
            if (Positon === "Right" && seatingEntranceY === "Top") {

                // reset the xpos for a row to Right
                xpos = definedXposVal;

                for (var row = 0; row < rowQty; row++) {
                    data.push(new Array());

                    //filter through cols
                    if (row != 0) {
                        if (seatingEntranceY === 'Top') {
                            RequiredVal = Temp;
                        }
                    }
                    for (var column = 0; column < colQty; column++) {
                        //debugger;
                        // requireBottom = requireBottom - 1;
                        color = findvaluepos(RequiredVal + 1);

                        RequiredVal = RequiredVal - 1;
                        if (RequiredVal < seatQty) {
                            // RequiredVal = RequiredVal - 1;
                            data[row].push({
                                x: xpos,
                                y: ypos,
                                r: width / 2,
                                width: width / decreseDimenBy,
                                height: height / decreseDimenBy,
                                colNumber: ColNumber,
                                rowNumber: row,
                                style: color,
                                seatNumber: RequiredVal + 1,
                                row: rowClasses[rowClass],
                                click: click
                            });

                        }
                        //increse the xpos for the next row (by count it's width val).
                        xpos += (width + seatSpace);
                        ColNumber = ColNumber - 1;
                    }

                    Temp += colQty;
                    // reset the xpos for a row to Right
                    xpos = definedXposVal;
                    //increse the ypos for the next row (by count it's height val).
                    ypos += (height + seatSpace);
                    //increase reading of rowClasses
                    rowClass++;
                }
                //add position to this parent
                thisBlockParent
                .style({
                    'top': '-' + edgeT,
                    'right': '-' + edgeR
                });

                //end: if right & top
                //begin: else right & bottom
                //---------------------------
            } else {

                // reset the xpos for a row to Right
                xpos = definedXposVal;

                // reset the ypos for a row to Bottom
                ypos = definedYposVal;

                //  ////debugger;
                for (var row = 0; row < rowQty; row++) {
                    data.push(new Array());

                    //filter through cols
                    if (row != 0) {
                        if (seatingEntranceX === 'Bottom') {
                            RequiredVal = Temp;
                        } else {
                            RequiredVal = requireBottom;
                            //   RequiredVal = RequiredVal + Temp;
                        }
                    }
                    for (var column = 0; column < colQty; column++) {
                        //debugger;
                        if (seatingEntranceX === 'Bottom') {
                            RequiredVal = RequiredVal + 1;
                        } else {
                            requireBottom = requireBottom - 1;
                            RequiredVal = requireBottom;
                            // RequiredVal = RequiredVal - 1;
                        }
                        color = findvaluepos(RequiredVal + 1);
                        if (RequiredVal < seatQty) {
                            data[row].push({
                                x: xpos,
                                y: ypos,
                                r: width / 2,
                                width: width / decreseDimenBy,
                                height: height / decreseDimenBy,
                                colNumber: ColNumber,
                                rowNumber: RowNumber,
                                style: color,
                                seatNumber: RequiredVal + 1,
                                row: rowClasses[rowClass],
                                click: click
                            });
                        }
                        //increse the xpos for the next row (by count it's width val).
                        xpos += (width + seatSpace);

                    }
                    ColNumber = ColNumber - 1;
                    Temp += colQty;
                    // reset the xpos for a row to Right
                    xpos = definedXposVal;
                    //increse the ypos for the next row (by count it's height val).
                    ypos += (height + seatSpace);
                    //increase reading of rowClasses
                    rowClass++;
                    RowNumber = RowNumber - 1;
                }

                //add position to this parent
                thisBlockParent
                .style({
                    'bottom': '-' + edgeB,
                    'right': '-' + edgeR
                });

            } //end: else right & bottom


            //end: if(RIGHT)
            //begin: else left
            //------------------------------------------
        } else {

            //filter through rows
            Count = 0;
            for (var row = 0; row < rowQty; row++) {
                data.push(new Array());
                if (seatingEntranceY != 'Top' && row === 0) {
                    // reset the ypos for a row to Bottom
                    ypos = definedYposVal;
                }
                //////debugger;
                //filter through cols
                for (var column = 0; column < colQty; column++) {
                    //////debugger;
                    if (seatingEntranceY === 'Top') {
                        Count += 1;

                        //add position to this parent
                        thisBlockParent
                        .style({
                            'top': '-' + edgeT,
                            'left': edgeL
                        });

                    } else {

                        //ButtomSeat,Dummy
                        //	////debugger;
                        Dummy = seatQty - RequiredVal;
                        //RequiredVal = seatQty - colQty;
                        Count = Dummy; //(RequiredVal == seatQty) ? seatQty : RequiredVal;

                        Temp = Dummy; //RequiredVal = Dummy;//Count - 1;



                    }
                    //debugger;
                    requestedRowNumber = (seatingEntranceY === 'Top') ? row : RowNumber;
                    color = findvaluepos(Count);
                    if (Count <= seatQty) {
                        data[row].push({
                            x: xpos,
                            y: ypos,
                            r: width / 2,
                            width: width / decreseDimenBy,
                            height: height / decreseDimenBy,
                            colNumber: column,
                            style: color,
                            rowNumber: requestedRowNumber, // 
                            seatNumber: Count,
                            row: rowClasses[rowClass],
                            click: click
                        })
                        //RequiredVal=RequiredVal-1;
                    }
                    UnDefinedValue = UnDefinedValue + 1;
                    RequiredVal = RequiredVal - 1;

                    //increse the xpos for the next row (by count it's width val).
                    xpos += (width + seatSpace);
                }
                if (seatingEntranceY != 'Top') {
                    seatQty = (colQty * rowQty) - UnDefinedValue; //UnDefinedValue;

                    //add position to this parent
                    thisBlockParent
                    .style({
                        'bottom': '-' + edgeB,
                        'left': edgeL
                    });

                }
                RequiredVal = colQty;
                // reset the xpos after a row is complete
                xpos = seatDiaHalf;
                //increse the ypos for the next row (by count it's height val).
                ypos += (height + seatSpace);
                //increase reading of rowClasses
                rowClass++;
                RowNumber = RowNumber - 1;
            }

        } //end: else LEFT
        // Ending Protion
        return data;
    }

    //**********End Region ***************//
    var gridData = FetchgridData(entranceXId, entranceYId, rowQtyInteger, colQtyInteger, "Block-1", selected);
    //testIt
    //console.log(gridData);

    //print rows/cols/txt
    //--------------------------------------
    //do empty blockHolder before print anything
    thisBlockParent
		.selectAll('g')
		.remove();

    //notify: blockHolder
    var grid = thisBlockParent;


    //print: rows
    var row = grid.selectAll('.row')
		.data(gridData)
		.enter().append('g')
		.classed('row', true);
    //print: cols
    var col = row.selectAll('.is-seat-base')
		.data(function (d) {
		    return d;
		})
		.enter()
		.append('g')
		.classed('col', true);

    //print: seat-real
    col
        .append('circle')
    	.classed('is-seat-real un-selected', true)
    	.attr({
    	    'cx': function (d) {
    	        return d.x;
    	    },
    	    'cy': function (d) {
    	        return d.y;
    	    },
    	    'r': function (d) {
    	        return d.r;
    	    },
    	    'id': function (d) {
    	        return 'seat-' + d.seatNumber;
    	    },
    	    'style': function (d) {
    	        return d.style;
    	    },
    	    'row': function (d) {
    	        return 'row-' + d.rowNumber;
    	    },
    	    'col': function (d) {
    	        return 'col-' + d.colNumber;
    	    }
    	})
    	.on('click', function (d) {
    	    d.click++;
    	    var selected = d3.select(this);
    	    selected.classed("selected", !selected.classed("selected"))
    	    .classed("un-selected", !selected.classed("un-selected"));
    	    //remove fill 
    	    if ((d.click) % 1 == 0) {
    	        selected
					.style('fill', null);
    	    }

    	});

    //update: dimension of thisBlockHolder
    //--------------------------------------
    //reset and update thisBlockParent
    thisBlockParent.attr({
        'width': countedBlockW,
        'height': countedBlockH,
        'id': selectedBlockId
    });

    //testIt
    //console.log('selectedBlockH: ' + selectedBlockH);

} //fn:end: FetchSeatsInSquareFn


//fn:create: callAndUpdateData
function callandpapulateData(RequestedSeatArray, blockId) {
    debugger;

    var BlockSeatsDetails = [];
    var rowSplit = [], ColSplit = [], cx, cy, id, r, BlockId;
    for (var i = 0; i < RequestedSeatArray.length; i++) {
        BlockId = RequestedSeatArray[i].id;

        if (BlockId == blockId) {
            for (var j = 0; j < RequestedSeatArray[i]["selected"].length; j++) {


                cx = RequestedSeatArray[i]["selected"][j].cx;
                cy = RequestedSeatArray[i]["selected"][j].cy;
                id = RequestedSeatArray[i]["selected"][j].id;
                r = RequestedSeatArray[i]["selected"][j].r;
                var dummyobj =
                    {
                        'cx': cx,
                        'cy': cy,
                        'id': id,
                        'r': r,
                    }
                BlockSeatsDetails.push(dummyobj);


            }

            for (var j = 0; j < RequestedSeatArray[i]["unselected"].length; j++) {
                //    BlockId = RequestedSeatArray[j].id;

                cx = RequestedSeatArray[i]["unselected"][j].cx;
                cy = RequestedSeatArray[i]["unselected"][j].cy;
                id = RequestedSeatArray[i]["unselected"][j].id;
                r = RequestedSeatArray[i]["unselected"][j].r;
                var dummyobj =
                    {
                        'cx': cx,
                        'cy': cy,
                        'id': id,
                        'r': r,
                    }
                BlockSeatsDetails.push(dummyobj);

            }

        }
    }

    //fn:execute: printFetchedSeatsInSquareFn(domDisplayHolderId, savedSeatsData)sss
    printFetchedSeatsInSquareFn('stadiumBlockHolder', BlockSeatsDetails);

}


var RequestedSeatArray = [];
function GetSeatDataFromAngular(RequestSeatObject) {
    //return selectedBlockDetailsArr;
    RequestedSeatArray.push(RequestSeatObject);
    return RequestedSeatArray;
}



/*=================================================================
@BEGIN: fn:create: printFetchedSeatsInSquareFn()
===================================================================*/
//fn:create: function printFetchedSeatsInSquareFn(domDisplayHolderId, savedSeatsData)
function printFetchedSeatsInSquareFn(domDisplayHolderId, savedSeatsData) {
    debugger;

    //@get seats data
    //-------------------------------------------------------------------------------------
    var slicedSeatsData = savedSeatsData.slice();

    //@structure the dom
    //-------------------------------------------------------------------------------------
    //notify elms and values
    var thisBlockHolder = d3.select('#' + domDisplayHolderId),
		thisBlockHolderW = stadiumBlockViewHolderW,//parseFloat($('#' + domDisplayHolderId).outerWidth()),
        thisBlockHolderH = stadiumBlockViewHolderH;//parseFloat($('#' + domDisplayHolderId).outerHeight());
    //print svg on dom
    thisBlockHolder.html('<div class="wrapper"><div id="boardSvgForBlockScroll" class="wrap-in"><svg id="boardSvgForBlock"></svg></div></div>');
    //notify printed svg as parent of block
    var thisBlockParentScroll = $('#boardSvgForBlockScroll'),
        thisBlockParent = thisBlockHolder.select('svg');
    //notify selected block attrs
    var selectedBlock = boardDraw.select('.is-square-group.selected').select('.is-block'),
        selectedBlockId = selectedBlock.attr('id'),
		selectedBlockW = parseFloat(selectedBlock.attr('width')),
		selectedBlockH = parseFloat(selectedBlock.attr('height'));
    //initialize 0 vals
    var seatDia = 0;

    //@print seats
    //-------------------------------------------------------------------------------------
    thisBlockParent
        .selectAll('circle')
        .data(slicedSeatsData)
        .enter().append('circle')
        .attr({
            'cx': function (d) {
                return d.cx;
            },
            'cy': function (d) {
                return d.cy;
            },
            'r': function (d) {
                //update: seatDia val
                seatDia = (d.r) * 2;
                //return to its val
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


    //@count seats and dimension
    //-------------------------------------------------------------------------------------
    //edge vals
    var edgeT = 0,
        edgeR = 0,
        edgeB = 0,
        edgeL = 0,
        edgeAll = 40,
        edgeAllHalf = edgeAll / 2;

    var allSeats = $('#boardSvgForBlock > circle'),
        firstSeat = $('#boardSvgForBlock > circle:first-child'),
        lastSeat = $('#boardSvgForBlock > circle:last-child'),
        firstColFirstSeatX = 0,
        firstColFirstSeatY = 0,
        firstSeatX = parseFloat(firstSeat.attr('cx')),
        firstSeatY = parseFloat(firstSeat.attr('cy')),
        secondSeatY = parseFloat(firstSeat.next('circle').attr('cy')),
        seatSpace = 2,//(secondSeatY - firstSeatY) - seatDia,
        colQtyArr = [],
        rowQtyArr = [],
        colQty = 0,
        rowQty = 0,
        seatingEntranceX = '',
		seatingEntranceY = '',
		seatDiaHalf = seatDia / 2;
    //xyArrs for to count firstColFirstSeatX/Y vals.
    var thiAllX = [], thiAllY = [];

    //get colQty and rowQty
    for (var i = 0; i < allSeats.length; i++) {
        var thiX = parseFloat(d3.select(allSeats[i]).attr('cx'));
        var thiY = parseFloat(d3.select(allSeats[i]).attr('cy'));
        //save all x
        thiAllX.push([thiX]);
        //save all y
        thiAllY.push([thiY]);
        //check if thiX match first SeatX
        if (thiX === firstSeatX) {
            rowQtyArr.push([thiX]);
        }
        //check if thiY match first SeatY
        if (thiY === firstSeatY) {
            colQtyArr.push([thiY]);
        }
        //save row and col length
        rowQty = rowQtyArr.length;
        colQty = colQtyArr.length;
        //notify min x and y
        firstColFirstSeatX = d3.min(thiAllX);
        firstColFirstSeatY = d3.min(thiAllY);
    }

    //count seat related vals
    var seatSpaceCounted = seatDia + (seatSpace * colQty),
        seatsTotalW = parseFloat((seatDia + seatSpace) * colQty),
        seatsTotalH = parseFloat((seatDia + seatSpace) * rowQty),
        thiCountedBlockW = 0,
        thiCountedBlockH = 0;

    ////get seatingEntranceX val of the block
    debugger;
    //get seatingEntranceX val of the block
    if (firstColFirstSeatX > seatDia) seatingEntranceX = 'Right';
    if (firstColFirstSeatX < seatDia) seatingEntranceX = 'Left';
    //get seatingEntranceX val of the block
    if (firstColFirstSeatY > seatDia) seatingEntranceY = 'Bottom';
    if (firstColFirstSeatY < seatDia) seatingEntranceY = 'Top';


    //@count block width and height
    //-------------------------------------------------------------------------------------
    //check whether seatsTotalW heigher than selectedBlock width or what?
    //increase counted width of this block
    thiCountedBlockW = seatsTotalW + selectedBlockW;
    //increase counted height of this block
    thiCountedBlockH = seatsTotalH + selectedBlockH;

    //reset and update thisBlockParentScroll
    if ((thiCountedBlockW >= thisBlockHolderW) || (thiCountedBlockH >= thisBlockHolderH)) {
        edgeT = edgeAllHalf;
        edgeR = edgeAllHalf;
        edgeB = edgeAllHalf;
        edgeL = edgeAllHalf;
        thisBlockParentScroll.css({
            'width': thiCountedBlockW,
            'height': thiCountedBlockH,
            'margin': edgeAll,
            'position': 'absolute'
        });

    } else {
        //if ((thiCountedBlockW < thisBlockHolderW) || (thiCountedBlockH < thisBlockHolderH)) {
        edgeT = 0;
        edgeR = 0;
        edgeB = 0;
        edgeL = 0;
        thisBlockParentScroll.css({
            'width': 'auto',
            'height': thisBlockHolderH - (edgeAll),
            'minHeight': thisBlockHolderH - (edgeAll),
            'margin': edgeAllHalf,
            'position': 'relative'
        });
    }

    //@check direction of entrance
    //-------------------------------------------------------------------------------------
    if (seatingEntranceX === 'Right') {
        if (seatingEntranceY === 'Top') {
            //add position to this parent for Right Top
            thisBlockParent
            .style({
                'top': '-' + edgeT,
                'right': '-' + edgeR
            });
        } else {
            //add position to this parent for Right Bottom
            thisBlockParent
            .style({
                'bottom': '-' + edgeB,
                'right': '-' + edgeR
            });
        }
    }
    if (seatingEntranceX === 'Left') {
        if (seatingEntranceY === 'Top') {
            //add position to this parent for Left Top
            thisBlockParent
            .style({
                'top': '-' + edgeT,
                'left': edgeL
            });
        } else {
            //add position to this parent for Left Bottom
            thisBlockParent
            .style({
                'bottom': '-' + edgeB,
                'left': edgeL
            });
        }
    }



    //@add dimension to this block holder and block parent
    //-------------------------------------------------------------------------------------
    //reset and update thisBlockParent
    thisBlockParent.attr({
        'width': thiCountedBlockW,
        'height': thiCountedBlockH,
        'id': selectedBlockId
    });


} //fn:end: printFetchedSeatsInSquareFn

/*=================================================================
@END: fn:create: printFetchedSeatsInSquareFn()
===================================================================*/


/*=================================================================
@BEGIN: fn:create: fetchSquareShapeFromDbFn()
===================================================================*/
//fn:create: function fetchSquareShapeFromDbFn(domDisplayHolderId, savedSeatsData, selectedBlockId, selectedBlockW, selectedBlockH)
function fetchSquareShapeFromDbFn(domDisplayHolderId, savedSeatsData, selectedBlockId, selectedBlockW, selectedBlockH) {
    debugger;

    //@get seats data
    //-------------------------------------------------------------------------------------
    var slicedSeatsData = savedSeatsData.slice();

    //@structure the dom
    //-------------------------------------------------------------------------------------
    //notify elms and values
    var thisBlockHolder = d3.select('#' + domDisplayHolderId),
		thisBlockHolderW = parseFloat($('#' + domDisplayHolderId).outerWidth()),
        thisBlockHolderH = parseFloat($('#' + domDisplayHolderId).outerHeight());
    //print svg on dom
    thisBlockHolder.html('<div class="wrapper"><div id="boardSvgForBlockScroll" class="wrap-in"><svg id="boardSvgForBlock"></svg></div></div>');
    //notify printed svg as parent of block
    var thisBlockParentScroll = $('#boardSvgForBlockScroll'),
        thisBlockParent = thisBlockHolder.select('svg');
    //notify selected block attrs
    var selectedBlock = boardDraw.select('.is-square-group.selected').select('.is-block'),
        //selectedBlockId = selectedBlock.attr('id'),
		selectedBlockW = parseFloat(selectedBlockW),//parseFloat(selectedBlock.attr('width')),
		selectedBlockH = parseFloat(selectedBlockH);//parseFloat(selectedBlock.attr('height'));
    //initialize 0 vals
    var seatDia = 0;

    //@print seats
    //-------------------------------------------------------------------------------------
    thisBlockParent
        .selectAll('circle')
        .data(slicedSeatsData)
        .enter().append('circle')
        .attr({
            'cx': function (d) {
                return d.cx;
            },
            'cy': function (d) {
                return d.cy;
            },
            'r': function (d) {
                //update: seatDia val
                seatDia = (d.r) * 2;
                //return to its val
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


    //@count seats and dimension
    //-------------------------------------------------------------------------------------
    //edge vals
    var edgeT = 0,
        edgeR = 0,
        edgeB = 0,
        edgeL = 0,
        edgeAll = 40,
        edgeAllHalf = edgeAll / 2;

    var allSeats = $('#boardSvgForBlock > circle'),
        firstSeat = $('#boardSvgForBlock > circle:first-child'),
        lastSeat = $('#boardSvgForBlock > circle:last-child'),
        firstColFirstSeatX = 0,
        firstColFirstSeatY = 0,
        firstSeatX = parseFloat(firstSeat.attr('cx')),
        firstSeatY = parseFloat(firstSeat.attr('cy')),
        secondSeatY = parseFloat(firstSeat.next('circle').attr('cy')),
        seatSpace = 2,//(secondSeatY - firstSeatY) - seatDia,
        colQtyArr = [],
        rowQtyArr = [],
        colQty = 0,
        rowQty = 0,
        seatingEntranceX = '',
		seatingEntranceY = '',
		seatDiaHalf = seatDia / 2;
    //xyArrs for to count firstColFirstSeatX/Y vals.
    var thiAllX = [], thiAllY = [];

    //get colQty and rowQty
    for (var i = 0; i < allSeats.length; i++) {
        var thiX = parseFloat(d3.select(allSeats[i]).attr('cx'));
        var thiY = parseFloat(d3.select(allSeats[i]).attr('cy'));
        //save all x
        thiAllX.push([thiX]);
        //save all y
        thiAllY.push([thiY]);
        //check if thiX match first SeatX
        if (thiX === firstSeatX) {
            rowQtyArr.push([thiX]);
        }
        //check if thiY match first SeatY
        if (thiY === firstSeatY) {
            colQtyArr.push([thiY]);
        }
        //save row and col length
        rowQty = rowQtyArr.length;
        colQty = colQtyArr.length;
        //notify min x and y
        firstColFirstSeatX = d3.min(thiAllX);
        firstColFirstSeatY = d3.min(thiAllY);
    }

    //count seat related vals
    var seatSpaceCounted = seatDia + (seatSpace * colQty),
        seatsTotalW = parseFloat((seatDia + seatSpace) * colQty),
        seatsTotalH = parseFloat((seatDia + seatSpace) * rowQty),
        thiCountedBlockW = 0,
        thiCountedBlockH = 0;

    ////get seatingEntranceX val of the block
    debugger;
    //get seatingEntranceX val of the block
    if (firstColFirstSeatX > seatDia) seatingEntranceX = 'Right';
    if (firstColFirstSeatX < seatDia) seatingEntranceX = 'Left';
    //get seatingEntranceX val of the block
    if (firstColFirstSeatY > seatDia) seatingEntranceY = 'Bottom';
    if (firstColFirstSeatY < seatDia) seatingEntranceY = 'Top';


    //@count block width and height
    //-------------------------------------------------------------------------------------
    //check whether seatsTotalW heigher than selectedBlock width or what?
    //increase counted width of this block
    thiCountedBlockW = seatsTotalW + selectedBlockW;
    //increase counted height of this block
    thiCountedBlockH = seatsTotalH + selectedBlockH;

    //reset and update thisBlockParentScroll
    if ((thiCountedBlockW >= thisBlockHolderW) || (thiCountedBlockH >= thisBlockHolderH)) {
        edgeT = edgeAllHalf;
        edgeR = edgeAllHalf;
        edgeB = edgeAllHalf;
        edgeL = edgeAllHalf;
        thisBlockParentScroll.css({
            'width': thiCountedBlockW,
            'height': thiCountedBlockH,
            'margin': edgeAll,
            'position': 'absolute'
        });

    } else {
        //if ((thiCountedBlockW < thisBlockHolderW) || (thiCountedBlockH < thisBlockHolderH)) {
        edgeT = 0;
        edgeR = 0;
        edgeB = 0;
        edgeL = 0;
        thisBlockParentScroll.css({
            'width': 'auto',
            'height': thisBlockHolderH - (edgeAll),
            'minHeight': thisBlockHolderH - (edgeAll),
            'margin': edgeAllHalf,
            'position': 'relative'
        });
    }

    //@check direction of entrance
    //-------------------------------------------------------------------------------------
    if (seatingEntranceX === 'Right') {
        if (seatingEntranceY === 'Top') {
            //add position to this parent for Right Top
            thisBlockParent
            .style({
                'top': '-' + edgeT,
                'right': '-' + edgeR
            });
        } else {
            //add position to this parent for Right Bottom
            thisBlockParent
            .style({
                'bottom': '-' + edgeB,
                'right': '-' + edgeR
            });
        }
    }
    if (seatingEntranceX === 'Left') {
        if (seatingEntranceY === 'Top') {
            //add position to this parent for Left Top
            thisBlockParent
            .style({
                'top': '-' + edgeT,
                'left': edgeL
            });
        } else {
            //add position to this parent for Left Bottom
            thisBlockParent
            .style({
                'bottom': '-' + edgeB,
                'left': edgeL
            });
        }
    }



    //@add dimension to this block holder and block parent
    //-------------------------------------------------------------------------------------
    //reset and update thisBlockParent
    thisBlockParent.attr({
        'width': thiCountedBlockW,
        'height': thiCountedBlockH,
        'id': selectedBlockId
    });


} //fn:end: fetchSquareShapeFromDbFn

/*=================================================================
@END: fn:create: fetchSquareShapeFromDbFn()
===================================================================*/
