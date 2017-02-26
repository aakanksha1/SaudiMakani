/*@initial:assign
=============================================================*/
var dragIt = false,
	drawIt = false,
	beginPoint,
	pinStrokeColr = 'rgba(0,0,0,0.8)',
	pinColrInitial = '#ccc',
	pinColrMouseOut = 'rgba(0,0,0,0)',
	blockHoverColr = 'rgba(0,0,0,1)',
	blockNormalColr = 'rgba(0,0,0,0.5)',
	colrBlack = 'rgba(0,0,0,0.8)',
	pinSize = '1%',
	points = [],
	g,
	blockQty = [],
	blockNumber = [],
	moveStep = 100,
	nodes, nodesData,
	zoomableLayer,
	zoomMin = 1,
	zoomMax = 5,
	//instanciate zoom
	zoom = d3.behavior.zoom().scaleExtent([zoomMin, zoomMax]),
	strokeSize = 0.4;

/*@zoom
=============================================================*/
var zoomStep = 0.2;
var actualZoomLevel = 1.0;
//fn:bind:zoomed
var zoomedIt = zoom.on('zoom', zoomed);
//fn:create:zoomed
function zoomed() {
    var self = d3.select(this);
    self.attr('transform', 'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')');
}
//call:bind:zoomed: for multipleBlock Display board
board.call(zoomedIt).on('mousedown.zoom', null).on('dblclick.zoom', null);

//call:bind:zoomed: for singleBlock Display board
boardForSingleBlock = boardForSingleBlock
	.selectAll('g')
	.data([0])
	.enter().append('g')
	.call(zoomedIt).on('mousedown.zoom', null).on('dblclick.zoom', null);

/*@function: count drawn-block qty
=============================================================*/
function isBlockQty() {
    var isBlocks = boardDraw.selectAll('.drawn-block.saved');
    var isBlocksLen = isBlocks[0].length;
    //console.log(isBlocks);
    //blockNumber.push(isBlocksLen);
    return isBlocks[0].length; //blockNumber.length;
}

/*@addRectangular:block
=============================================================*/
//fn:create:RectangleFn
function RectangleFn(yes) {
    if (yes) {

        //notify: locals
        var self = this,
			rect, rectData = [],
			isDown = false,
			m1, m2, isDrag = false;

        //increase blockNumber
        //blockNumber++;
        //fn:bind:creating rect
        board.on('mousedown', function () {
            //notify first click val	
            m1 = d3.mouse(this);
            if (!isDown && !isDrag) {
                self.rectData = [{
                    x: m1[0],
                    y: m1[1]
                }, {
                    x: m1[0],
                    y: m1[1]
                }];
                selfParent = boardDraw.append('g')
                    .classed('is-square-group drawn-block', true)
                    .attr({
                        'id': function () {
                            return 'blockGroup-' + blockNumber;
                        }
                    });
                self.rectangleElement = selfParent.append('rect')
                    .attr({
                        'id': 'block-' + blockNumber,
                        'is-block': true,
                        'is-rect': true
                    })
                    .classed('is-block is-square', true)
                    .call(dragR);
                self.pin1 = selfParent.append('circle')
                    .attr('is-handle', true).call(dragC1);
                self.pin2 = selfParent.append('circle')
                    .attr('is-handle', true).call(dragC2);
                self.pin3 = selfParent.append('circle')
                    .attr('is-handle', true).call(dragC3);
                self.pin4 = selfParent.append('circle')
                    .attr('is-handle', true).call(dragC4);
                updateRect();
                isDrag = false;
            } else {
                isDrag = true;
            }
            isDown = !isDown;
        })
			.on('mousemove', function () {
			    m2 = d3.mouse(this);
			    if (isDown && !isDrag) {
			        self.rectData[1] = {
			            x: m2[0],
			            y: m2[1]
			        };
			        updateRect();
			    }
			});

        function updateRect() {
            rect = d3.select(self.rectangleElement[0][0]);
            rect.attr({
                x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x : self.rectData[1].x,
                y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y : self.rectData[1].y,
                width: Math.abs(self.rectData[1].x - self.rectData[0].x),
                height: Math.abs(self.rectData[1].y - self.rectData[0].y)
            });
            var point1 = d3.select(self.pin1[0][0]).data(self.rectData);
            point1.attr('r', pinSize)
				.attr('cx', self.rectData[0].x)
				.attr('cy', self.rectData[0].y);
            var point2 = d3.select(self.pin2[0][0]).data(self.rectData);
            point2.attr('r', pinSize)
				.attr('cx', self.rectData[1].x)
				.attr('cy', self.rectData[1].y);
            var point3 = d3.select(self.pin3[0][0]).data(self.rectData);
            point3.attr('r', pinSize)
				.attr('cx', self.rectData[1].x)
				.attr('cy', self.rectData[0].y);
            var point3 = d3.select(self.pin4[0][0]).data(self.rectData);
            point3.attr('r', pinSize)
				.attr('cx', self.rectData[0].x)
				.attr('cy', self.rectData[1].y);
        }

        var dragR = d3.behavior.drag().on('drag', dragRect);

        function dragRect(d) {
            var e = d3.event;
            if (self.rectData[0].x >= 0 && self.rectData[0].y >= 0 && self.rectData[1].x >= 0 && self.rectData[1].y >= 0) {
                if (self.rectData[1].x <= boardWidth && self.rectData[1].y <= boardHeight) {
                    for (var i = 0; i < self.rectData.length; i++) {

                        d3.select(self.rectangleElement[0][0])
                            .attr('x', self.rectData[i].x += e.dx)
                            .attr('y', self.rectData[i].y += e.dy);
                        //console.log(self.rectData);

                    }

                    rect.style('cursor', 'move');
                    updateRect();
                } else {
                    self.rectData[0].x = self.rectData[0].x - 1;
                    self.rectData[0].y = self.rectData[0].y - 1;
                    self.rectData[1].x = self.rectData[1].x - 1;
                    self.rectData[1].y = self.rectData[1].y - 1;
                }

            }
            else {
                self.rectData[0].x = self.rectData[0].x + 1;
                self.rectData[0].y = self.rectData[0].y + 1;
                self.rectData[1].x = self.rectData[1].x + 1;
                self.rectData[1].y = self.rectData[1].y + 1;
            }
        }

        var dragC1 = d3.behavior.drag().on('drag', dragPoint1);
        var dragC2 = d3.behavior.drag().on('drag', dragPoint2);
        var dragC3 = d3.behavior.drag().on('drag', dragPoint3);
        var dragC4 = d3.behavior.drag().on('drag', dragPoint4);

        function dragPoint1() {
            var e = d3.event;
            d3.select(self.pin1[0][0])
				.attr('cx', function (d) {
				    return d.x += e.dx;
				})
				.attr('cy', function (d) {
				    return d.y += e.dy;
				});
            updateRect();
        }

        function dragPoint2() {
            var e = d3.event;
            d3.select(self.pin2[0][0])
				.attr('cx', self.rectData[1].x += e.dx)
				.attr('cy', self.rectData[1].y += e.dy);
            updateRect();
        }

        function dragPoint3() {
            var e = d3.event;
            d3.select(self.pin3[0][0])
				.attr('cx', self.rectData[1].x += e.dx)
				.attr('cy', self.rectData[0].y += e.dy);
            updateRect();
        }

        function dragPoint4() {
            var e = d3.event;
            d3.select(self.pin4[0][0])
				.attr('cx', self.rectData[0].x += e.dx)
				.attr('cy', self.rectData[1].y += e.dy);
            updateRect();
        }

    } else {
        board.on('mousedown', null)
			.on('mousemove', null);
    }

    //testIt
    //console.log('RectangleFn has been executed!');
} //end Rectangle

/*@addPolygon:block
=============================================================*/
//fn:create:PolygonFn
function PolygonFn(yes) {
    ////debugger;
    //begin: dragNDraw
    //--------------------------------------
    //check true, continue
    if (yes) {

        //fn:bind:dragHandlerFn
        //-----------------------------------
        var dragHandler = d3.behavior.drag()
			.on('drag', dragHandlerFn)
			.on('dragend', function (d) {
			    dragIt = false;
			});
        //fn:drag:create
        //-----------------------------------
        board.on('mouseup', function () {
            //fn:execute 
            deselectOtherBlocksFn();
            //check true, return
            if (dragIt) return;
            //make drawIt as true
            drawIt = true;
            //check:target is-block?
            if (d3.event.target.hasAttribute('is-block') || d3.event.target.hasAttribute('is-btn-remove')) return;

            //notify coords
            beginPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
            //check drawPoly is empty, then print new group
            if (boardDraw.select('g.drawPoly').empty()) g = boardDraw.append('g').attr('class', 'drawPoly');
            //close end points if target is-handle
            if (d3.event.target.hasAttribute('is-handle')) {
                //fn:execute
                closePolygonFn();
                return;
            };

            //save coords
            points.push(d3.mouse(this));
            //remove existing polyline
            g.select('polyline').remove();
            //create new polyline
            var polyline = g.append('polyline').attr('points', points)
				.style({
				    'fill': 'none',
				    'stroke-width': strokeSize,
				    'stroke': '#000'
				});
            //filter through points and print new pin
            for (var i = 0; i < points.length; i++) {
                g.append('circle')
					.attr('cx', points[i][0])
					.attr('cy', points[i][1])
					.attr('r', pinSize)
					.attr('is-handle', 'true')
					.style({
					    cursor: 'pointer'
					});
            }
        });
        //fn:create:
        function closePolygonFn() {
            //increase blockNumber
            //blockNumber++;
            //save block number
            blockQty.push(blockNumber);
            //remove existing group .drawPoly
            boardDraw.select('g.drawPoly').remove();
            //create new group for block
            var g = boardDraw
				.append('g')
				.classed('is-poly-group drawn-block', true)
				.attr('id', function (d) {
				    return 'blockGroup-' + blockNumber;
				});
            //create new polygon
            g.append('polygon')
				.attr({
				    'points': points,
				    'is-block': true,
				    'is-poly': true,
				    'id': function (d) {
				        return 'block-' + blockNumber;
				    }
				})
				.classed('is-block is-poly', true)
				.call(dragElm);

            //@btnRemove
            //g.append('rect')
            //	.attr({
            //	    'rx': 100,
            //	    'ry': 100,
            //	    'x': points[0][0] - (pinSize * 3),
            //	    'y': points[0][1] - (pinSize * 3),
            //	    'width': pinSize * 3,
            //	    'height': pinSize * 3,
            //	    'is-btn-remove': true
            //	})
            //	.classed('btn-remove-block', true);


            //filter through points and print new pin
            for (var i = 0; i < points.length; i++) {
                var circle = g.selectAll('circles')
					.data([points[i]])
					.enter()
					.append('circle')
					.attr('cx', points[i][0])
					.attr('cy', points[i][1])
					.attr('r', pinSize)
					.attr('is-handle', 'true')
					.style({
					    cursor: 'move'
					})
					.call(dragHandler);
            }
            //do splice points
            points.splice(0);
            //make drawIt as false
            drawIt = false;
        }

        boardDraw.on('mousemove', function () {
            //check: drawIt-false, return
            if (!drawIt) return;
            //select existing drawPoly
            var g = d3.select('g.drawPoly');
            //select existing line and remove it
            g.select('line').remove();
            //print new line
            var line = g.append('line')
				.attr('x1', beginPoint[0])
				.attr('y1', beginPoint[1])
				.attr('x2', d3.mouse(this)[0] + 2)
				.attr('y2', d3.mouse(this)[1])
				.attr('stroke', pinStrokeColr)
				.attr('stroke-width', strokeSize);
        });
        //fn:create
        function dragHandlerFn() {
            //check true, return
            if (drawIt) return;
            //local vars
            var dragpin = d3.select(this),
				newPoints = [],
				pin;
            //make dragIt as true
            dragIt = true;

            //notify elms
            var poly = d3.select(this.parentNode).select('polygon');
            var pins = d3.select(this.parentNode).selectAll('circle');
            var btnRemoveBlock = d3.select(this.parentNode).select('.btn-remove-block');
            //update it's coords
            dragpin
				.attr('cx', d3.event.x)
				.attr('cy', d3.event.y);


            //update btn's coords
            var firstPin = d3.select(pins[0][0]);
            btnRemoveBlock
				.attr({
				    'x': firstPin.attr('cx') - (pinSize * 3),
				    'y': firstPin.attr('cy') - (pinSize * 3)
				});
            //filter through points
            //notify pin, take it's coord val
            //save coords for further use
            for (var i = 0; i < pins[0].length; i++) {
                pin = d3.select(pins[0][i]);
                newPoints.push([pin.attr('cx'), pin.attr('cy')]);
            }
            //update its coords
            poly.attr('points', newPoints);
        }

    } else {
        //fn:bind: false
        //-----------------------------------
        var dragHandler = d3.behavior.drag()
			.on('drag', null)
			.on('dragend', function (d) {
			    dragIt = true;
			});
        //fn:drag: false
        //-----------------------------------
        board.on('mouseup', null);
        boardDraw.on('mousemove', null);
    }
    //--------------------------------------
    //end: dragNDraw

    //begin: dragElm
    //--------------------------------------

    /*@dragElm
	=============================================================*/
    function dragElm() {
        //Create the drag and drop behavior to set for the objects crated
        var dragElm = d3.behavior.drag()
			.origin(function (d) {
			    return d;
			})
			.on('dragstart', dragElmstarted)
			.on('drag', draggedElm)
			.on('dragend', function () {
			    //console.log('dragEnded!');
			});

        //Called when drag event starts. It stop the propagation of the click event
        function dragElmstarted(d) {
            d3.event.sourceEvent.stopPropagation();
        }

        //Called when the drag event occurs (object should be moved)
        function draggedElm(d) {
            d.x = d3.event.x;
            d.y = d3.event.y;
            //notify this elm
            var self = d3.select(this);
            //Translate the object on the actual moved point
            self.attr({
                transform: 'translate(' + d.x + ',' + d.y + ')'
            });
        }

        //Matrix containing the x and y coordinates of the created objects (used for draggable events)
        nodesData = [
			{
			    x: 0,
			    y: 0
			}, {
			    x: 0,
			    y: 0
			}, {
			    x: 0,
			    y: 0
			}
        ];
        //set the position of .draggable on drag and set pos on viewport (by nodesData)
        boardDraw.selectAll('.is-poly-group').call(dragElm).data(nodesData);
    }
    //--------------------------------------
    //end: dragElm

    //testIt
    //console.log('PolygonFn has been executed!');
} //fn:end: PolygonFn()


/*@fn:bind: SquareShape || execute on event and stop second draw
//=============================================================*/
var obj = false;
d3.select('#addRectangularBlock').on('click', function () {
    ////debugger;
    //remove existing rect shape
    $('.is-square').parent('.is-square-group').remove();
    //remove existing custom shape
    $('.is-poly').parent('.is-poly-group').remove();
    //off: PolygonFn
    PolygonFn(false);
    //on: RectangleFn
    RectangleFn(true);
    //count blocks on boardDraw
    blockNumber = isBlockQty();
});

///*@fn:bind: Custom Shap || execute on event and stop second draw
//=============================================================*/
d3.select('#addCustomBlock').on('click', function () {
    ////debugger;
    //////remove existing rect shape
    $('.is-square').parent('.is-square-group').remove();
    //remove existing custom shape
    $('.is-poly').parent('.is-poly-group').remove();
    //on: PolygonFn();
    PolygonFn(true);
    //off: RectangleFn
    RectangleFn(false);
    //count blocks on boardDraw
    blockNumber = isBlockQty();
    //testIt
    console.log('blockNumber: ' + blockNumber);
});

//Off: the Polygon draw, when we select a polygon on board
$(document).on('click', '.is-poly-group.drawn-block', function () {
    //off: PolygonFn();
    PolygonFn(false);
});


