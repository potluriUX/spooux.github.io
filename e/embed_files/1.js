(function() {
    var
        initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    this.Class = function() {};
    Class.extend = function(prop) {
        var
            _super = this.prototype;
        initializing = true;
        var
            prototype = new
        this();
        initializing = false;
        for (var
                name in
                prop) {
            prototype[name] = typeof
            prop[name] == "function" && typeof
            _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var
                        tmp = this._super;
                    this._super = _super[name];
                    var
                        ret = fn.apply(this, arguments);
                    this._super = tmp;
                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        function
        Class() {
            if (!initializing && this.init) this.init.apply(this, arguments);
        }
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
})();
var
    Drawing = Class.extend({
        _jCanvasLayer: null,
        _layer: null,
        init: function(layer) {
            this._layer = layer;
        },
        bringToFront: function() {
            var
                canvasElement = App().getCanvas().getElement(),
                jCanvasLayers = canvasElement.getLayers(),
                jCanvasLayerIndex = canvasElement.getLayerIndex(this._jCanvasLayer);
            if (jCanvasLayerIndex !== -1) {
                jCanvasLayers.splice(jCanvasLayerIndex, 1);
                jCanvasLayers.push(this._jCanvasLayer);
                canvasElement.drawLayers();
            }
        },
        draw: function() {
            this._jCanvasLayer = App().getCanvas().getElement().getLayer(-1);
        },
        getDimensions: function() {
            return {
                height: this._layer.getStyle('height'),
                width: this._layer.getStyle('width')
            };
        },
        getJCanvasLayer: function() {
            return this._jCanvasLayer;
        },
        getXPosition: function() {
            var
                dimensions = this.getDimensions(),
                canvasWidth = App().getCanvas().getElement().attr('width');
            if (this._layer.getStyle('x') === 'center') {
                return Math.floor((canvasWidth - dimensions.width) / 2);
            }
            if (this._layer.getStyle('x') === 'left') {
                return 0;
            }
            if (this._layer.getStyle('x') === 'right') {
                return canvasWidth - dimensions.width;
            }
            if (this._layer.getStyle('x').toStr().indexOf('%') >= 0) {
                var
                    rounded = Math.round(canvasWidth * this._layer.getStyle('x').toFloat() * 100 / 100) / 100;
                return rounded;
            }
            return this._layer.getStyle('x');
        },
        getYPosition: function() {
            var
                dimensions = this.getDimensions(),
                canvasHeight = App().getCanvas().getElement().attr('height');
            if (this._layer.getStyle('y') === 'center') {
                return Math.floor((canvasHeight - dimensions.height) / 2);
            }
            if (this._layer.getStyle('y') === 'top') {
                return 0;
            }
            if (this._layer.getStyle('y') === 'bottom') {
                return canvasHeight - dimensions.height;
            }
            if (this._layer.getStyle('y').toStr().indexOf('%') >= 0) {
                var
                    rounded = Math.round(canvasHeight * this._layer.getStyle('y').toFloat() * 100 / 100) / 100;
                return rounded;
            }
            return this._layer.getStyle('y');
        },
        refreshStyle: function(name) {
            var
                changed = {};
            changed[name] = this._layer.getStyle(name);
            App().getCanvas().getElement().setLayer(this._jCanvasLayer, changed).drawLayers();
        },
        refreshStyles: function(styles) {
            var
                changed = {},
                possible = this._layer.getStyles();
            $(styles).each(function(key, val) {
                if (typeof possible[val] !== 'undefined') {
                    changed[val] = possible[val];
                }
            });
            App().getCanvas().getElement().setLayer(this._jCanvasLayer, changed).drawLayers();
        },
        removeFromCanvas: function() {
            this._layer.setStyle('visible', false);
            this.refreshStyle('visible');
            var
                canvasElement = App().getCanvas().getElement();
            canvasElement.removeLayer(this._jCanvasLayer);
            canvasElement.drawLayers();
        },
        sendToBack: function() {
            var
                canvasElement = App().getCanvas().getElement(),
                jCanvasLayers = canvasElement.getLayers(),
                jCanvasLayerIndex = canvasElement.getLayerIndex(this._jCanvasLayer);
            jCanvasLayers.splice(jCanvasLayerIndex, 1);
            jCanvasLayers.unshift(this._jCanvasLayer);
            canvasElement.drawLayers();
        }
    });
var
    ImageDrawing = Drawing.extend({
        _rawImageData: null,
        _rawImageString: '',
        init: function(imageLayer) {
            this._super(imageLayer);
        },
        _getFilteredRawImage: function(callback) {
            var
                filters = this._layer.getProperty('filters');
            if (filters.length === 0) {
                callback(this._rawImageString);
            } else {
                var
                    _this = this,
                    canvas = document.createElement('canvas'),
                    context = canvas.getContext('2d'),
                    img = (new Image());
                img.onload = function() {
                    canvas.width = _this._rawImageData.width;
                    canvas.height = _this._rawImageData.height;
                    context.drawImage(img, 0, 0);
                    var
                        jCanvasElement = $(canvas);
                    var
                        clone = jQuery.extend(true, [], filters),
                        filterObj, renderer = function() {
                            if (clone.length === 0) {
                                var
                                    canvasImage;
                                canvasImage = jCanvasElement.getCanvasImage('png');
                                callback(canvasImage);
                            } else {
                                filterObj = clone.shift();
                                (new Filter(jCanvasElement, filterObj.type, filterObj.properties)).render(renderer);
                            }
                        };
                    renderer();
                };
                img.src = this._rawImageString;
            }
        },
        _loadRawImage: function(callback) {
            var
                _this = this,
                rawDataLoading = function(img) {
                    var
                        canvas = document.createElement('canvas'),
                        context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                    _this._rawImageString = canvas.toDataURL();
                    _this._rawImageData = context.getImageData(0, 0, img.width, img.height);
                    callback();
                };
            if (App().isIe() === false && App().isSafari5x() === false) {
                var
                    img = (new Image());
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                    rawDataLoading(img)
                };
                img.onerror = function(event) {
                    App().showErrorModal('Please try again later', 'u3i1', 'Temporary issue');
                };
                img.src = this._layer.getProperty('resizedSrc');
            } else {
                App().trackView('/app/proxy');
                App().mpTrackEvent('Image proxy request made');
                jQuery.post('/proxy', {
                    url: encodeURIComponent(this._layer.getProperty('resizedSrc')),
                    csrfToken: Thu.get('csrfToken')
                }, function(response) {
                    if (response.success === true) {
                        var
                            img = (new Image());
                        img.onload = function() {
                            rawDataLoading(img);
                        };
                        img.src = response.data.encoded;
                    } else {
                        if (App().siteHasBeenLocked(response)) {
                            App().showLockedModal();
                        } else {
                            App().showErrorModal('Please try another browser', response.failedRules[0].error.reference);
                        }
                    }
                }, 'json').fail(function() {
                    App().showErrorModal('Please try another browser', '7lj1');
                });
            }
        },
        draw: function(callback) {
            var
                parent = this._super,
                _this = this,
                click = function(jCanvasLayer) {
                    if (Thu.get('publisher') === false) {
                        if (App().userIsPro() === false) {
                            if (_this._layer.getProperties().isWatermark) {
                                App().showUpsellModal('watermark');
                            }
                        }
                    }
                },
                styles = jQuery.extend(true, {}, this._layer.getStyles(), {
                    click: click,
                    layer: true,
                    fromCenter: false,
                    x: this.getXPosition(),
                    y: this.getYPosition()
                });
            var
                properties = this._layer.getProperties();
            if (Thu.get('publisher') === false && properties.isWatermark) {
                styles.cursors = {
                    mouseover: 'move',
                    mousedown: 'move',
                    mouseup: 'move'
                };
            }
            this._loadRawImage(function() {
                _this._getFilteredRawImage(function(data) {
                    var
                        img = (new Image());
                    img.onload = function() {
                        styles.source = img;
                        App().getCanvas().getElement().drawImage(styles);
                        jQuery.proxy(parent, _this)();
                        callback();
                    };
                    img.src = data;
                });
            });
        },
        makeDraggable: function() {
            var
                _this = this,
                dragCallback = function(jCanvasLayer) {
                    _this._layer.setRelativePosition();
                    App().getImageDocument().getWatermarkLayer().saveSettings();
                },
                dragProperties = {
                    cursors: {
                        mouseover: 'move',
                        mousedown: 'move',
                        mouseup: 'move'
                    },
                    draggable: true,
                    dragstop: dragCallback,
                    dragcancel: dragCallback
                };
            App().getCanvas().getElement().setLayer(this._jCanvasLayer, dragProperties).drawLayers();
        },
        refreshImage: function(reloadRawImageData, callback) {
            var
                _this = this,
                refreshFunction = function() {
                    _this._getFilteredRawImage(function(data) {
                        var
                            img = (new Image());
                        img.onload = function() {
                            App().getCanvas().getElement().setLayer(_this._jCanvasLayer, {
                                source: img
                            }).drawLayers();
                            callback && callback();
                        };
                        img.src = data;
                    });
                };
            if (reloadRawImageData === true) {
                this._loadRawImage(refreshFunction);
            } else {
                refreshFunction();
            }
        }
    });
var
    RectangleDrawing = Drawing.extend({
        init: function(rectangleLayer) {
            this._super(rectangleLayer)
        },
        draw: function() {
            var
                defaultProperties = jQuery.extend(true, {}, this._layer.getStyles(), {
                    layer: true,
                    fromCenter: false
                });
            App().getCanvas().getElement().drawRect(defaultProperties);
            this._super();
        }
    });
var
    PlaneRectangleDrawing = RectangleDrawing.extend({
        _paddingRatio: 0.2,
        _maxPadding: 16,
        init: function(rectangleLayer) {
            this._super(rectangleLayer)
        },
        redraw: function() {
            var
                fillStyle = this._layer.getTextLayer().getProperty('plane'),
                textDrawing = this._layer.getTextLayer().getDrawing(),
                height = textDrawing.getDimensions().height * (1 + this._paddingRatio * 2),
                y = textDrawing.getJCanvasLayer().y - (height * this._paddingRatio / (1 + this._paddingRatio * 2)),
                width = App().getMaximumCanvasDimensions().width;
            if (App().isGhost() === true) {
                width = App().getImageDocument().getBackgroundLayer().getStyle('width');
            }
            this._layer.setStyle('height', height);
            this._layer.setStyle('y', y);
            this._layer.setStyle('width', width);
            this.refreshStyle('height');
            this.refreshStyle('y');
            this.refreshStyle('width');
        }
    });
var
    OverlayRectangleDrawing = RectangleDrawing.extend({
        init: function(overlayRectangleLayer) {
            this._super(overlayRectangleLayer)
        },
        _alignInstagramOverlayRectangle: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                height = backgroundLayer.getStyle('height');
            if (width !== height) {
                if (width > height) {
                    var
                        cutWidth = Math.ceil((width - height) / 2);
                    if (this._layer.getProperty('order') === 1) {
                        this._layer.setStyle('height', height);
                        this._layer.setStyle('width', cutWidth);
                        this._layer.setStyle('x', 0);
                        this._layer.setStyle('y', 0);
                        this.refreshStyles(['height', 'width', 'x', 'y']);
                    } else {
                        this._layer.setStyle('height', height);
                        this._layer.setStyle('width', cutWidth);
                        this._layer.setStyle('x', width - cutWidth);
                        this._layer.setStyle('y', 0);
                        this.refreshStyles(['height', 'width', 'x', 'y']);
                    }
                } else {
                    var
                        overlayHeight = Math.ceil((height - width) / 2);
                    if (this._layer.getProperty('order') === 1) {
                        this._layer.setStyle('height', overlayHeight);
                        this._layer.setStyle('width', width);
                        this._layer.setStyle('x', 0);
                        this._layer.setStyle('y', 0);
                        this.refreshStyles(['height', 'width', 'x', 'y']);
                    } else {
                        this._layer.setStyle('height', overlayHeight);
                        this._layer.setStyle('width', width);
                        this._layer.setStyle('x', 0);
                        this._layer.setStyle('y', height - overlayHeight);
                        this.refreshStyles(['height', 'width', 'x', 'y']);
                    }
                }
            } else {
                this._layer.setStyle('visible', false);
                this.refreshStyle('visible');
            }
        },
        _alignTwitterOverlayRectangle: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                height = backgroundLayer.getStyle('height');
            var
                ratio = width / 526,
                secretSauce = 100 / 48,
                offset = Math.round(((height / ratio) - 263) / secretSauce),
                previewHeight = 260 * ratio;
            if (this._layer.getProperty('order') === 1) {
                offset = (offset + 1) * ratio;
                var
                    overlayHeight = offset;
                this._layer.setStyle('height', overlayHeight);
                this._layer.setStyle('width', width);
                this.refreshStyles(['height', 'width']);
            } else {
                offset = (offset) * ratio;
                var
                    overlayHeight = offset + height - offset * 2 - previewHeight;
                this._layer.setStyle('height', overlayHeight);
                this._layer.setStyle('width', width);
                this._layer.setStyle('y', height - overlayHeight);
                this.refreshStyles(['height', 'width', 'y']);
            }
        },
        align: function() {
            if (this._layer.getProperty('type') === 'instagramOverlayRectangle') {
                this._alignInstagramOverlayRectangle();
            } else
            if (this._layer.getProperty('type') === 'twitterOverlayRectangle') {
                this._alignTwitterOverlayRectangle();
            }
        }
    });
var
    RuleRectangleDrawing = RectangleDrawing.extend({
        init: function(ruleRectangleLayer) {
            this._super(ruleRectangleLayer)
        },
        _alignHorizontal: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                height = backgroundLayer.getStyle('height');
            this._layer.setStyle('y', Math.ceil((height - 1) / 2));
            this._layer.setStyle('width', width);
            this.refreshStyle('y');
            this.refreshStyle('width');
        },
        _alignVertical: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                height = backgroundLayer.getStyle('height');
            this._layer.setStyle('x', Math.ceil((width - 1) / 2));
            this._layer.setStyle('height', height);
            this.refreshStyle('x');
            this.refreshStyle('height');
        },
        align: function() {
            if (this._layer.getProperty('type') === 'verticalRuleRectangle') {
                this._alignVertical();
            } else
            if (this._layer.getProperty('type') === 'horizontalRuleRectangle') {
                this._alignHorizontal();
            }
        }
    });
var
    TextDrawing = Drawing.extend({
        _centerSnapRatio: 0.035,
        _plane: null,
        init: function(textLayer) {
            this._super(textLayer);
        },
        _snapToCenter: function() {
            var
                jCanvasLayer = this._layer.getDrawing().getJCanvasLayer(),
                x = jCanvasLayer.x,
                y = jCanvasLayer.y,
                width = jCanvasLayer.width,
                height = jCanvasLayer.height,
                threshold = this._centerSnapRatio,
                xFromCenter = Math.ceil(x + width / 2),
                yFromCenter = Math.ceil(y + height / 2);
            var
                imageDocument = App().getImageDocument(),
                verticalRuleRectangleLayer = imageDocument.getVerticalRuleRectangleLayer(),
                horizontalRuleRectangleLayer = imageDocument.getHorizontalRuleRectangleLayer(),
                verticalRuleX = verticalRuleRectangleLayer.getStyle('x'),
                horizontalRuleY = horizontalRuleRectangleLayer.getStyle('y');
            if (xFromCenter > verticalRuleX * (1 - threshold) && xFromCenter < verticalRuleX * (1 + threshold)) {
                verticalRuleRectangleLayer.show();
                this._layer.setStyle('x', Math.ceil(verticalRuleX - width / 2));
                this.refreshStyle('x');
            } else {
                verticalRuleRectangleLayer.hide();
            }
            if (yFromCenter > horizontalRuleY * (1 - threshold) && yFromCenter < horizontalRuleY * (1 + threshold)) {
                horizontalRuleRectangleLayer.show();
                this._layer.setStyle('y', Math.ceil(horizontalRuleY - height / 2));
                this.refreshStyle('y');
            } else {
                horizontalRuleRectangleLayer.hide();
            }
        },
        addPlane: function(hex) {
            var
                dimensions = App().getMaximumCanvasDimensions();
            var
                planeProperties = {
                    isBackground: false,
                    isPlane: true,
                    type: 'rectangle',
                    filters: [],
                    styles: {
                        fillStyle: hex,
                        height: 0,
                        width: dimensions.width,
                        x: 0,
                        y: 0
                    }
                };
            this._plane = (new PlaneRectangleLayer(planeProperties, this._layer));
            this._plane.getDrawing().draw();
            this._plane.getDrawing().redraw();
            this.bringToFront();
            App().getImageDocument().getWatermarkLayer().getDrawing().bringToFront();
        },
        draw: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                backgroundLayerWidth = backgroundLayer.getStyle('width');
            var
                _this = this,
                dragCallback = function(jCanvasLayer) {
                    _this._plane && _this._plane.getDrawing().redraw();
                    _this._snapToCenter();
                },
                dragStartCallback = function(jCanvasLayer) {},
                dragStopCallback = function(jCanvasLayer) {
                    _this._layer.setRelativePosition();
                    var
                        imageDocument = App().getImageDocument(),
                        verticalRuleRectangleLayer = imageDocument.getVerticalRuleRectangleLayer(),
                        horizontalRuleRectangleLayer = imageDocument.getHorizontalRuleRectangleLayer();
                    verticalRuleRectangleLayer.hide();
                    horizontalRuleRectangleLayer.hide();
                },
                dblclick = function(jCanvasLayer) {
                    App().showTextTab();
                    _this._layer.getControl().getElement().find('textarea').select().focus();
                },
                styles = jQuery.extend(true, {}, this._layer.getStyles(), {
                    maxWidth: Math.floor(App().getTextMaxWidthRatio() * backgroundLayerWidth),
                    cursors: {
                        mouseover: 'move',
                        mousedown: 'move',
                        mouseup: 'move'
                    },
                    fromCenter: false,
                    layer: true,
                    draggable: true,
                    lineHeight: App().getDefaultLineHeight(),
                    shadowStroke: true,
                    shadowX: 1,
                    shadowY: 1,
                    x: this.getXPosition(),
                    y: this.getYPosition(),
                    dblclick: dblclick,
                    drag: dragCallback,
                    dragstart: dragStartCallback,
                    dragstop: dragStopCallback,
                    dragcancel: dragStopCallback
                });
            App().getCanvas().getElement().drawText(styles);
            this._super();
            var
                properties = this._layer.getProperties();
            if (typeof properties.plane !== 'undefined') {
                this.addPlane(properties.plane);
            }
        },
        getDimensions: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                styles = jQuery.extend(true, {}, this._layer.getStyles(), {
                    maxWidth: Math.floor(App().getTextMaxWidthRatio() * width),
                    lineHeight: App().getDefaultLineHeight(),
                    shadowStroke: true,
                    shadowX: 1,
                    shadowY: 1,
                    x: 0,
                    y: 0
                }),
                measuredStyles = App().getCanvas().getElement().measureText(styles);
            return {
                height: Math.floor(measuredStyles.height),
                width: Math.floor(measuredStyles.width)
            };
        },
        getPlane: function() {
            return this._plane;
        },
        refreshStyle: function(name) {
            this._super(name);
            this._plane && this._plane.getDrawing().redraw();
        },
        refreshStyles: function(styles) {
            this._super(styles);
            this._plane && this._plane.getDrawing().redraw();
        },
        removePlane: function() {
            App().getCanvas().getElement().removeLayer(this._plane.getDrawing().getJCanvasLayer()).drawLayers();
            delete
            this['_plane'];
        }
    });

var
    Ghost = Class.extend({
        _imageLayers: [],
        _maximumDimension: 1089,
        init: function(callback) {
            this._imageLayers = [];
            var
                clone = $('body').first().clone(),
                previousPageView = Thu.getPageView(),
                previousImageDocumentJson = App().getImageDocument().exportToJson(true),
                ghostPageView = (new AppView(clone, true));
            ghostPageView.setImageDocumentJson(previousImageDocumentJson);
            Thu.setPageView(ghostPageView);
            this._convert(previousImageDocumentJson, function() {
                ghostPageView.go(function() {
                    callback && callback(ghostPageView.getImageDocument().exportToImageString());
                    Thu.setPageView(previousPageView);
                });
            });
        },
        _getResizeRatio: function() {
            if (this._imageLayers.length === 0) {
                var
                    backgroundLayerWidth = App().getImageDocument().getBackgroundLayer().getStyle('width').toInt();
                return this._maximumDimension / backgroundLayerWidth;
            }
            var
                _this = this,
                ratios = [];
            $(this._imageLayers).each(function(index, imageLayer) {
                ratios.push(imageLayer.width / imageLayer.layer.styles.width.toInt());
            });
            ratios.push(this._maximumDimension / App().getImageDocument().getBackgroundLayer().getStyle('width').toInt());
            return Math.min.apply(Math, ratios);
        },
        _loadImages: function(callback, offset) {
            offset = typeof
            offset === 'undefined' ? 0 : offset;
            if (offset === this._imageLayers.length) {
                callback();
            } else {
                var
                    imageLayer = this._imageLayers[offset],
                    imageSrc = imageLayer.layer.sourceSrc,
                    imageObj = (new Image()),
                    _this = this,
                    internal = function() {
                        imageLayer.width = imageObj.width;
                        imageLayer.height = imageObj.height;
                        _this._loadImages(callback, offset + 1);
                    };
                imageObj.onload = internal;
                imageObj.src = imageSrc;
            }
        },
        _getResizedSrc: function(layer, resizeRatio) {
            if (layer.sourceSrc.indexOf('cloudinary') !== -1) {
                return App().getCloudinaryUrl(layer.sourceSrc, {
                    width: layer.originalWidth.toInt() * resizeRatio,
                    height: layer.originalHeight.toInt() * resizeRatio,
                    fit: 'lfill'
                }, true);
            } else
            if (layer.sourceSrc.indexOf('api/file/') !== -1) {
                return App().getFilepickerUrl(layer.sourceSrc, {
                    width: layer.originalWidth.toInt() * resizeRatio,
                    height: layer.originalHeight.toInt() * resizeRatio
                });
            }
            return layer.resizedSrc;
        },
        _resizeImageDocumentJson: function(imageDocumentJson, resizeRatio) {
            var
                _this = this;
            $(imageDocumentJson.layers).each(function(index, layer) {
                if (layer.isBackground === true) {
                    layer.originalHeight = layer.styles.height;
                    layer.originalWidth = layer.styles.width;
                    layer.styles.height *= resizeRatio;
                    layer.styles.width *= resizeRatio;
                    layer.styles.visible = true;
                    if (layer.type === 'image') {
                        layer.resizedSrc = _this._getResizedSrc(layer, resizeRatio);
                    }
                    delete
                    layer.originalHeight;
                    delete
                    layer.originalWidth;
                } else
                if (layer.isWatermark === true) {
                    layer.originalHeight = layer.styles.height;
                    layer.originalWidth = layer.styles.width;
                    layer.styles.height *= resizeRatio;
                    layer.styles.width *= resizeRatio;
                    layer.resizedSrc = _this._getResizedSrc(layer, resizeRatio);
                    delete
                    layer.originalHeight;
                    delete
                    layer.originalWidth;
                } else
                if (layer.type === 'text') {
                    layer.styles.fontSize = (layer.styles.fontSize.toInt() * resizeRatio) + 'px';
                    if (typeof layer.styles.strokeWidth !== 'undefined') {
                        layer.styles.strokeWidth = Math.round(layer.styles.strokeWidth.toInt() * resizeRatio * 0.75 * 10) / 10;
                    }
                }
            });
        },
        _convert: function(imageDocumentJson, callback) {
            var
                _this = this;
            $(imageDocumentJson.layers).each(function(index, layer) {
                if (layer.isWatermark === true) {
                    if (layer.styles.visible === true) {
                        _this._imageLayers.push({
                            layer: layer
                        });
                    }
                } else
                if (layer.isBackground === true && layer.type === 'image') {
                    _this._imageLayers.push({
                        layer: layer
                    });
                }
            });
            this._loadImages(function() {
                var
                    resizeRatio = _this._getResizeRatio();
                if (resizeRatio !== 1) {
                    _this._resizeImageDocumentJson(imageDocumentJson, resizeRatio);
                }
                callback();
            });
        }
    });
var
    ImageDocument = Class.extend({
        _layers: [],
        init: function(imageDocumentJson) {
            this._layers = [];
            var
                _this = this;
            $(imageDocumentJson.layers).each(function(index, properties) {
                var
                    layer;
                if (properties.type === 'text') {
                    layer = (new TextLayer(properties));
                } else
                if (properties.type === 'rectangle') {
                    layer = (new RectangleLayer(properties));
                } else
                if (properties.type === 'image') {
                    if (properties.isWatermark === true) {
                        layer = (new WatermarkLayer(properties));
                    } else {
                        layer = (new ImageLayer(properties));
                    }
                }
                _this._layers.push(layer);
            });
            this._addHorizontalRuleRectangleLayer();
            this._addVerticalRuleRectangleLayer();
            this._addTwitterOverlayRectangleLayers();
            this._addInstagramOverlayRectangleLayers();
        },
        _addHorizontalRuleRectangleLayer: function(layer) {
            var
                layer = (new RuleRectangleLayer({
                    isBackground: false,
                    type: 'horizontalRuleRectangle',
                    styles: {
                        visible: false,
                        fillStyle: 'rgba(171, 227, 246, .75)',
                        height: 1,
                        width: 0,
                        x: 0,
                        y: 0
                    }
                }));
            this._layers.push(layer);
        },
        _addInstagramOverlayRectangleLayers: function(layer) {
            var
                layer = (new OverlayRectangleLayer({
                    isBackground: false,
                    type: 'instagramOverlayRectangle',
                    order: 1,
                    styles: {
                        visible: false,
                        fillStyle: 'rgba(255, 255, 255, .5)',
                        height: 0,
                        width: 0,
                        x: 0,
                        y: 0
                    }
                }));
            this._layers.push(layer);
            layer = (new OverlayRectangleLayer({
                isBackground: false,
                order: 2,
                type: 'instagramOverlayRectangle',
                styles: {
                    visible: false,
                    fillStyle: 'rgba(255, 255, 255, .5)',
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            }));
            this._layers.push(layer);
        },
        _addTwitterOverlayRectangleLayers: function(layer) {
            var
                layer = (new OverlayRectangleLayer({
                    isBackground: false,
                    type: 'twitterOverlayRectangle',
                    order: 1,
                    styles: {
                        visible: false,
                        fillStyle: 'rgba(255, 255, 255, .5)',
                        height: 0,
                        width: 0,
                        x: 0,
                        y: 0
                    }
                }));
            this._layers.push(layer);
            layer = (new OverlayRectangleLayer({
                isBackground: false,
                type: 'twitterOverlayRectangle',
                order: 2,
                styles: {
                    visible: false,
                    fillStyle: 'rgba(255, 255, 255, .5)',
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            }));
            this._layers.push(layer);
        },
        _addVerticalRuleRectangleLayer: function(layer) {
            var
                layer = (new RuleRectangleLayer({
                    isBackground: false,
                    type: 'verticalRuleRectangle',
                    order: 2,
                    styles: {
                        visible: false,
                        fillStyle: 'rgba(171, 227, 246, .75)',
                        height: 0,
                        width: 1,
                        x: 0,
                        y: 0
                    }
                }));
            this._layers.push(layer);
        },
        addEmptyTextLayer: function() {
            var
                textLayers = this.getTextLayers(),
                lastTextLayer = textLayers[textLayers.length - 1];
            var
                y = Math.min((55 + ((textLayers.length - 1) * 7)), 85),
                properties = {
                    styles: jQuery.extend(true, {}, lastTextLayer.getStyles(), {
                        'align': 'center',
                        'text': 'Add more text here',
                        'x': 'center',
                        'y': (y) + '%'
                    }),
                    type: 'text'
                };
            if (typeof lastTextLayer.getProperty('plane') !== 'undefined') {
                properties.plane = lastTextLayer.getProperty('plane');
            }
            var
                layer = (new TextLayer(properties));
            this._layers.push(layer);
            return layer;
        },
        addLayer: function(layer) {
            this._layers.push(layer);
        },
        exportToImageString: function() {
            var
                visibleLayers = this.hideOverlayRectangleLayers();
            var
                $canvas = App().getCanvas().getElement(),
                jpegExportData = $canvas.getCanvasImage('jpeg', 1),
                pngExportData = $canvas.getCanvasImage('png');
            this.showLayers(visibleLayers);
            if (App().isGhost() === true) {
                Thu.set('hdImageDimensions', {
                    x: $canvas.attr('width').toInt(),
                    y: $canvas.attr('height').toInt()
                });
            } else {
                Thu.set('lowImageDimensions', {
                    x: $canvas.attr('width').toInt(),
                    y: $canvas.attr('height').toInt()
                });
            }
            if (Thu.get('config').defaults.autoDetectImageFormat === true) {
                var
                    jpegLength = Math.round((jpegExportData.length - 'data:image/jpeg;base64,'.length) * (3 / 4)),
                    pngLength = Math.round((pngExportData.length - 'data:image/png;base64,'.length) * (3 / 4));
                if (jpegLength < pngLength) {
                    return jpegExportData;
                }
                return pngExportData;
            }
            if (Thu.get('config').defaults.imageOutputFormat === 'image/jpeg') {
                return jpegExportData;
            }
            return pngExportData;
        },
        exportToJson: function(includeWatermarkLayer) {
            includeWatermarkLayer = typeof
            includeWatermarkLayer === 'undefined' ? false : includeWatermarkLayer;
            var
                layers = this._layers,
                toExport = [],
                clone, watermarkLayer = this.getWatermarkLayer();
            $(layers).each(function(index, layer) {
                if (layer !== watermarkLayer || includeWatermarkLayer === true) {
                    if (layer.constructor !== RuleRectangleLayer && layer.constructor !== OverlayRectangleLayer) {
                        clone = jQuery.extend(true, {}, layer.getProperties());
                        toExport.push(clone);
                    }
                }
            });
            return {
                layers: toExport
            };
        },
        exportToJsonString: function() {
            return JSON.stringify(this.exportToJson());
        },
        getActiveFonts: function() {
            var
                textLayers = this.getTextLayers(),
                fontFamilies = App().getFontFamilies(),
                active = [];
            $(textLayers).each(function(index, layer) {
                var
                    fontFamily = layer.getStyle('fontFamily');
                $(fontFamilies).each(function(index, font) {
                    if (fontFamily === font.name) {
                        active.push(font);
                    }
                });
            });
            return active;
        },
        getBackgroundLayer: function() {
            var
                backgroundLayer;
            $(this._layers).each(function(index, layer) {
                if (layer.getProperty('isBackground') === true) {
                    backgroundLayer = layer;
                }
            });
            return backgroundLayer;
        },
        getHorizontalRuleRectangleLayer: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === RuleRectangleLayer && layer.getProperty('type') === 'horizontalRuleRectangle') {
                    found.push(layer);
                }
            });
            return found[0];
        },
        getImageLayers: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === ImageLayer || layer.constructor === WatermarkLayer) {
                    found.push(layer);
                }
            });
            return found;
        },
        getInstagramOverlayRectangleLayers: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === OverlayRectangleLayer && layer.getProperty('type') === 'instagramOverlayRectangle') {
                    found.push(layer);
                }
            });
            return found;
        },
        getRectangleLayers: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === RectangleLayer) {
                    found.push(layer);
                }
            });
            return found;
        },
        getTextLayers: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === TextLayer) {
                    found.push(layer);
                }
            });
            return found;
        },
        getTwitterOverlayRectangleLayers: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === OverlayRectangleLayer && layer.getProperty('type') === 'twitterOverlayRectangle') {
                    found.push(layer);
                }
            });
            return found;
        },
        getVerticalRuleRectangleLayer: function() {
            var
                found = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === RuleRectangleLayer && layer.getProperty('type') === 'verticalRuleRectangle') {
                    found.push(layer);
                }
            });
            return found[0];
        },
        getWatermarkLayer: function() {
            var
                watermarkLayer;
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === WatermarkLayer) {
                    watermarkLayer = layer;
                }
            });
            return watermarkLayer;
        },
        hideOverlayRectangleLayers: function() {
            var
                visibleLayers = [];
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === OverlayRectangleLayer) {
                    if (layer.getStyle('visible') === true) {
                        visibleLayers.push(layer);
                        layer.setStyle('visible', false);
                        layer.getDrawing().refreshStyle('visible');
                    }
                }
            });
            return visibleLayers;
        },
        removeLayer: function(layerToBeRemoved) {
            var
                _this = this;
            $(this._layers).each(function(index, layer) {
                if (layer === layerToBeRemoved) {
                    _this._layers.splice(index, 1);
                }
            });
        },
        showInstragramOverlayRectangleLayers: function() {
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === OverlayRectangleLayer && layer.getProperty('type') === 'instagramOverlayRectangle') {
                    layer.setStyle('visible', true);
                    layer.getDrawing().refreshStyle('visible');
                }
            });
        },
        showLayers: function(layers) {
            $(layers).each(function(index, layer) {
                layer.setStyle('visible', true);
                layer.getDrawing().refreshStyle('visible');
            });
        },
        showTwitterOverlayRectangleLayers: function() {
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === OverlayRectangleLayer && layer.getProperty('type') === 'twitterOverlayRectangle') {
                    layer.setStyle('visible', true);
                    layer.getDrawing().refreshStyle('visible');
                }
            });
        },
        showRules: function() {
            var
                watermarkLayer;
            $(this._layers).each(function(index, layer) {
                if (layer.constructor === WatermarkLayer) {
                    watermarkLayer = layer;
                }
            });
            return watermarkLayer;
        }
    });
var
    Layer = Class.extend({
        _drawing: null,
        _properties: null,
        init: function(properties) {
            this._properties = properties;
        },
        getDrawing: function() {
            return this._drawing;
        },
        getProperties: function() {
            return this._properties;
        },
        getProperty: function(name) {
            return this._properties[name];
        },
        getStyle: function(name) {
            return this._properties.styles[name];
        },
        getStyles: function() {
            return this._properties.styles;
        },
        containsManuallyUploadedBackgroundImage: function() {
            if (typeof this._properties.wasManuallyUploaded === 'undefined') {
                return false;
            }
            return this._properties.wasManuallyUploaded === true;
        },
        removeFromImageDocument: function() {
            App().getImageDocument().removeLayer(this);
        },
        setRelativePosition: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                bgWidth = backgroundLayer.getStyle('width'),
                bgHeight = backgroundLayer.getStyle('height'),
                x = this._drawing.getJCanvasLayer().x,
                y = this._drawing.getJCanvasLayer().y,
                relativeX = Math.round((x / bgWidth) * 100 * 100) / 100,
                relativeY = Math.round((y / bgHeight) * 100 * 100) / 100;
            this.setStyle('x', relativeX + '%');
            this.setStyle('y', relativeY + '%');
        },
        setProperty: function(name, value) {
            this._properties[name] = value;
        },
        setStyle: function(name, value) {
            this._properties.styles[name] = value;
        },
        setStyles: function(styles) {
            this._properties.styles = jQuery.extend(this._properties.styles, styles);
        },
        removeStyle: function(name, value) {
            this._properties.styles[name] = value;
        },
        removeProperty: function(name) {
            delete
            this._properties[name];
        }
    });
var
    ImageLayer = Layer.extend({
        init: function(properties) {
            this._super(properties);
            this._drawing = (new ImageDrawing(this));
        },
        addFilter: function(filterObj) {
            this._properties.filters.push(filterObj);

            function
            compare(a, b) {
                if (a.type < b.type) {
                    return -1;
                }
                if (a.type > b.type) {
                    return 1;
                }
                return 0;
            }
            this._properties.filters.sort(compare);
            this._drawing.refreshImage(false);
        },
        getFilter: function(filterType) {
            var
                _this = this,
                returnableFilter = false;
            $(this._properties.filters).each(function(index, filter) {
                if (filter.type === filterType) {
                    returnableFilter = filter;
                }
            });
            return returnableFilter;
        },
        getFilters: function() {
            return this._properties.filters;
        },
        removeFilter: function(filterType) {
            var
                _this = this;
            $(this._properties.filters).each(function(index, filter) {
                if (filter.type === filterType) {
                    _this._properties.filters.splice(index, 1);
                }
            });
            this._drawing.refreshImage(false);
        },
        removeFilters: function() {
            this._properties.filters = [];
            this._drawing.refreshImage(false);
        },
        setFilter: function(newFilterObj) {
            var
                filterObj = this.getFilter(newFilterObj.type);
            if (filterObj === false) {
                this.addFilter(newFilterObj);
            } else {
                filterObj.properties = newFilterObj.properties;
                this._drawing.refreshImage(false);
            }
        }
    });
var
    RectangleLayer = Layer.extend({
        init: function(properties) {
            this._super(properties);
            this._drawing = (new RectangleDrawing(this));
        }
    });
var
    OverlayRectangleLayer = RectangleLayer.extend({
        init: function(properties) {
            this._super(properties);
            this._drawing = (new OverlayRectangleDrawing(this));
        },
        hide: function() {
            this.setStyle('visible', false);
            this._drawing.refreshStyle('visible');
        },
        show: function() {
            this.setStyle('visible', true);
            this._drawing.refreshStyle('visible');
        }
    });
var
    PlaneRectangleLayer = RectangleLayer.extend({
        _textLayer: null,
        init: function(properties, textLayer) {
            this._textLayer = textLayer;
            this._super(properties);
            this._drawing = (new PlaneRectangleDrawing(this));
        },
        getTextLayer: function() {
            return this._textLayer;
        }
    });
var
    RuleRectangleLayer = RectangleLayer.extend({
        init: function(properties) {
            this._super(properties);
            this._drawing = (new RuleRectangleDrawing(this));
        },
        hide: function() {
            this.setStyle('visible', false);
            this._drawing.refreshStyle('visible');
        },
        show: function() {
            this.setStyle('visible', true);
            this._drawing.refreshStyle('visible');
        }
    });
var
    TextLayer = Layer.extend({
        _control: null,
        init: function(properties) {
            this._super(properties);
            this._drawing = (new TextDrawing(this));
        },
        drawControl: function() {
            var
                publisherUxConfig = App().getPublisherUxConfig(),
                isEditable = true;
            if (publisherUxConfig !== null) {
                isEditable = publisherUxConfig.get('text', 'edit');
            }
            var
                html = _.template(App().getTemplate('controls', 'text'), {
                    isReadonly: !isEditable,
                    fontFamilies: App().getFontFamilies(),
                    properties: this._properties,
                    styles: this._properties.styles
                });
            var
                controlElement = $(jQuery.parseHTML(html.trim()));
            App().getElement().find('div#settings div.textTab div.controls').append(controlElement);
            this._control = (new TextControlView(controlElement, this));
        },
        getControl: function() {
            return this._control;
        },
        getPlane: function() {
            return this._drawing.getPlane();
        }
    });
var
    WatermarkLayer = ImageLayer.extend({
        _saveTimer: null,
        init: function(properties) {
            this._super(properties);
        },
        hide: function(saveSettings) {
            this.setStyle('visible', false);
            this._drawing.refreshStyle('visible');
            if (typeof saveSettings === 'undefined' || saveSettings === true) {
                this.saveSettings();
            }
        },
        saveSettings: function() {
            var
                _this = this;
            clearTimeout(this._saveTimer);
            this._saveTimer = setTimeout(function() {
                var
                    watermarkJson = _this.getProperties(),
                    data = {
                        csrfToken: Thu.get('csrfToken'),
                        watermarkJson: JSON.stringify(watermarkJson)
                    };
                jQuery.post('/users/updateWatermark', data, function(response) {
                    if (response.success === true) {
                        Thu.set('loggedInUser', response.data.user);
                    } else {
                        if (App().siteHasBeenLocked(response)) {
                            App().showLockedModal();
                        } else {
                            App().showErrorModal(false, response.failedRules[0].error.reference);
                        }
                    }
                }, 'json').fail(function() {
                    App().showErrorModal(false, '41jk');
                });
            }, App().getTimeout('watermarkAutoSaveDelay'));
        },
        show: function(saveSettings) {
            this.setStyle('visible', true);
            this._drawing.refreshStyle('visible');
            if (typeof saveSettings === 'undefined' || saveSettings === true) {
                this.saveSettings();
            }
        }
    });
var
    PublisherUxConfig = Class.extend({
        _config: null,
        _defaults: {
            background: {
                color: true,
                filters: true,
                image: false,
                tab: true
            },
            templates: false,
            text: {
                add: false,
                align: true,
                color: true,
                draggable: true,
                edit: false,
                font: true,
                remove: false,
                size: true,
                stroke: true,
                style: true
            },
            resizing: false,
            watermark: {
                draggable: false
            }
        },
        init: function(config) {
            this.setAll(config);
        },
        get: function() {
            var
                args = arguments,
                ref = this._config;
            $(args).each(function(index, arg) {
                ref = ref[arg];
            });
            return ref;
        },
        getAll: function() {
            return this._config;
        },
        setAll: function(config) {
            this._config = jQuery.extend(true, {}, this._defaults, config);
        }
    });
var
    StyleBlock = Class.extend({
        _rules: [],
        init: function() {},
        _addRule: function(selector, property, value) {
            this._rules.push(selector + '{' + property + ':' + value + ';}');
        },
        _addRules: function(selector, styles) {
            var
                _this = this;
            jQuery.each(styles, function(index, style) {
                _this._addRule(selector, index, style);
            });
        },
        insert: function() {
            var
                headElement = document.getElementsByTagName('head')[0],
                styleElement = document.createElement('style'),
                css = this._rules.join(' ');
            styleElement.type = 'text/css';
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = css;
            } else {
                styleElement.appendChild(document.createTextNode(css));
            }
            headElement.appendChild(styleElement);
        }
    });
var
    ConfigStyleBlock = StyleBlock.extend({
        init: function(config) {
            this._config = config;
            this._process();
        },
        _hideBackground: function() {
            this._addRules('*[data-scope~="background"]', {
                display: 'none !important'
            });
        },
        _hideBackgroundColor: function() {
            this._addRules('*[data-scope~="backgroundColor"]', {
                display: 'none !important'
            });
        },
        _hideBackgroundImage: function() {
            this._addRules('*[data-scope~="backgroundImage"]', {
                display: 'none !important'
            });
        },
        _hideFiltersTab: function() {
            this._addRules('*[data-scope~="filtersTab"]', {
                display: 'none !important'
            });
        },
        _hideBackgroundTab: function() {
            this._addRules('*[data-scope~="backgroundTab"]', {
                display: 'none !important'
            });
        },
        _hideResizing: function() {
            this._addRules('*[data-scope~="resizing"]', {
                display: 'none !important'
            });
        },
        _hideStrokeColor: function() {
            this._addRules('*[data-scope~="strokeColor"]', {
                display: 'none !important'
            });
        },
        _hideTemplatesTab: function() {
            this._addRules('*[data-scope~="templatesTab"]', {
                display: 'none !important'
            });
        },
        _hideTextAddition: function() {
            this._addRules('*[data-scope~="textAddition"]', {
                display: 'none !important'
            });
        },
        _hideTextAlignment: function() {
            this._addRules('*[data-scope~="textAlignment"]', {
                display: 'none !important'
            });
        },
        _hideTextColor: function() {
            this._addRules('*[data-scope~="textColor"]', {
                display: 'none !important'
            });
        },
        _hideTextFont: function() {
            this._addRules('*[data-scope~="textFont"]', {
                display: 'none !important'
            });
        },
        _hideTextRemoval: function() {
            this._addRules('*[data-scope~="textRemoval"]', {
                display: 'none !important'
            });
        },
        _hideTextSize: function() {
            this._addRules('*[data-scope~="textSize"]', {
                display: 'none !important'
            });
        },
        _hideTextStyles: function() {
            this._addRules('*[data-scope~="textStyles"]', {
                display: 'none !important'
            });
        },
        _hideWatermarkTab: function() {
            this._addRules('*[data-scope~="watermarkTab"]', {
                display: 'none !important'
            });
        },
        _process: function() {
            if (this._config.background.color === false) {
                this._hideBackgroundColor();
            }
            if (this._config.resizing === false) {
                this._hideResizing();
            }
            if (this._config.background.image === false) {
                this._hideBackgroundImage();
            }
            if (this._config.background.color === false && this._config.background.image === false) {
                this._hideBackground();
            }
            if (this._config.background.filters === false) {
                this._hideFiltersTab();
            }
            if (this._config.background.tab === false) {
                this._hideBackgroundTab();
            }
            if (this._config.templates === false) {
                this._hideTemplatesTab();
            }
            this._hideWatermarkTab();
            if (this._config.text.add === false) {
                this._hideTextAddition();
            }
            if (this._config.text.align === false) {
                this._hideTextAlignment();
            }
            if (this._config.text.color === false) {
                this._hideTextColor();
            }
            if (this._config.text.stroke === false) {
                this._hideStrokeColor();
            }
            if (this._config.text.font === false) {
                this._hideTextFont();
            }
            if (this._config.text.remove === false) {
                this._hideTextRemoval();
            }
            if (this._config.text.size === false) {
                this._hideTextSize();
            }
            if (this._config.text.style === false) {
                this._hideTextStyles();
            }
        }
    });
var
    View = Class.extend({
        _element: null,
        _tooltipContainer: null,
        init: function(element) {
            this._element = element;
            this._addTooltips();
            this._addChromeAppInstallEvents();
            this._addChromeExtensionInstallEvents();
        },
        _addChromeAppInstallEvents: function() {
            var
                _this = this;
            this._element.find('.cws-app-install').click(function(event) {
                event.preventDefault();
                _this._installChromeApp();
            });
        },
        _addChromeExtensionInstallEvents: function() {
            var
                _this = this;
            this._element.find('.cws-extension-install').click(function(event) {
                event.preventDefault();
                _this._installChromeExtension();
            });
        },
        _addScrollOverflowEvent: function($elements) {
            $elements.bind('mousewheel DOMMouseScroll', function(event) {
                var
                    height = $(this).outerHeight(),
                    scrollHeight = $(this).get(0).scrollHeight;
                var
                    original = event.originalEvent,
                    delta = original.wheelDelta || (0 - original.detail);
                if (delta < 0) {
                    if (this.scrollTop === (scrollHeight - height)) {
                        event.preventDefault();
                    }
                } else
                if (delta > 0) {
                    if (this.scrollTop === 0) {
                        event.preventDefault();
                    }
                }
            });
        },
        _addTooltips: function() {
            var
                container, _this = this;
            this._element.find('[data-toggle="tooltip"]').each(function(index, element) {
                container = _this._tooltipContainer || 'body';
                if ($(element).attr('data-container')) {
                    container = $(element).attr('data-container');
                }
                $(element).tooltip({
                    container: container
                });
            });
        },
        _chromeAppInstallCallback: function() {},
        _chromeExtensionInstallCallback: function() {},
        _installChromeApp: function() {
            var
                _this = this,
                $appLink = $('#chrome-webstore-app');
            chrome.webstore.install($appLink.attr('href'), function() {}, function() {});
        },
        _installChromeExtension: function() {
            var
                _this = this,
                $extensionLink = $('#chrome-webstore-extension');
            chrome.webstore.install($extensionLink.attr('href'), function() {
                location.href = '/welcome';
            }, function() {});
        },
        _removeTooltips: function() {
            this._element.find('[data-toggle="tooltip"]').tooltip('destroy');
        },
        getElement: function() {
            return this._element;
        }
    });

var
    CanvasView = View.extend({
        _grids: {
            vertical: null,
            horizontal: null
        },
        init: function(element) {
            this._super(element);
        },
        _drawGrid: function() {
            this._grid = {
                vertical: $('<div class="verticalGrid hidden"></div>'),
                horizontal: $('<div class="horizontalGrid hidden"></div>')
            };
            App().getElement().find('#preview').append(this._grid.vertical, this._grid.horizontal);
        },
        _drawNextImageLayer: function(layers, callback) {
            if (layers.length === 0) {
                callback();
            } else {
                var
                    layer = layers.shift(),
                    _this = this,
                    internal = function() {
                        _this._drawNextImageLayer(layers, callback);
                    };
                layer.getDrawing().draw(internal);
            }
        },
        _repositionTextLayers: function() {
            var
                layers = App().getImageDocument().getTextLayers();
            $(layers).each(function(index, layer) {
                layer.setStyle('x', layer.getDrawing().getXPosition());
                layer.setStyle('y', layer.getDrawing().getYPosition());
                layer.getDrawing().refreshStyle('x');
                layer.getDrawing().refreshStyle('y');
                layer.setRelativePosition();
            });
        },
        _repositionWatermark: function() {
            var
                layer = App().getImageDocument().getWatermarkLayer();
            layer.setStyle('x', layer.getDrawing().getXPosition());
            layer.setStyle('y', layer.getDrawing().getYPosition());
            layer.getDrawing().refreshStyle('x');
            layer.getDrawing().refreshStyle('y');
            layer.setRelativePosition();
        },
        _resizeTextLayers: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                layers = App().getImageDocument().getTextLayers();
            $(layers).each(function(index, layer) {
                layer.setStyle('maxWidth', Math.floor(App().getTextMaxWidthRatio() * width));
                layer.getDrawing().refreshStyle('maxWidth');
            });
        },
        alignInstagramOverlayRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                instagramOverlayRectangleLayers = imageDocument.getInstagramOverlayRectangleLayers();
            instagramOverlayRectangleLayers[0].getDrawing().align();
            instagramOverlayRectangleLayers[1].getDrawing().align();
        },
        alignMargins: function() {
            var
                containerHeight = App().getElement().find('#preview').css('height').toInt(),
                half = Math.round((containerHeight - this._element.css('height').toInt()) / 2);
            this._element.css('margin-top', half);
        },
        alignRuleRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                verticalRuleRectangleLayer = imageDocument.getVerticalRuleRectangleLayer(),
                horizontalRuleRectangleLayer = imageDocument.getHorizontalRuleRectangleLayer();
            verticalRuleRectangleLayer.getDrawing().align();
            horizontalRuleRectangleLayer.getDrawing().align();
        },
        alignTwitterOverlayRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                twitterOverlayRectangleLayers = imageDocument.getTwitterOverlayRectangleLayers();
            twitterOverlayRectangleLayers[0].getDrawing().align();
            twitterOverlayRectangleLayers[1].getDrawing().align();
        },
        drawBackgroundLayer: function(callback) {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer();
            if (backgroundLayer.constructor === RectangleLayer) {
                backgroundLayer.getDrawing().draw();
                callback();
            } else
            if (backgroundLayer.constructor === ImageLayer) {
                backgroundLayer.getDrawing().draw(callback);
            }
        },
        drawImageLayers: function(callback) {
            var
                imageDocument = App().getImageDocument(),
                layers = imageDocument.getImageLayers(),
                backgroundLayer = imageDocument.getBackgroundLayer();
            $(layers).each(function(index, layer) {
                if (layer === backgroundLayer) {
                    layers.splice(index, 1);
                }
            });
            this._drawNextImageLayer(layers, callback);
        },
        drawInstagramOverlayRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                instagramOverlayRectangleLayers = imageDocument.getInstagramOverlayRectangleLayers();
            instagramOverlayRectangleLayers[0].getDrawing().draw();
            instagramOverlayRectangleLayers[1].getDrawing().draw();
        },
        drawRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                rectanglelayers = imageDocument.getRectangleLayers(),
                backgroundLayer = imageDocument.getBackgroundLayer();
            $(rectanglelayers).each(function(index, layer) {
                if (layer !== backgroundLayer) {
                    layer.getDrawing().draw();
                }
            });
        },
        drawRuleRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                verticalRuleRectangleLayer = imageDocument.getVerticalRuleRectangleLayer(),
                horizontalRuleRectangleLayer = imageDocument.getHorizontalRuleRectangleLayer();
            verticalRuleRectangleLayer.getDrawing().draw();
            horizontalRuleRectangleLayer.getDrawing().draw();
        },
        drawTextLayers: function() {
            var
                layers = App().getImageDocument().getTextLayers();
            $(layers).each(function(index, layer) {
                layer.getDrawing().draw();
            });
        },
        drawTwitterOverlayRectangleLayers: function() {
            var
                imageDocument = App().getImageDocument(),
                twitterOverlayRectangleLayers = imageDocument.getTwitterOverlayRectangleLayers();
            twitterOverlayRectangleLayers[0].getDrawing().draw();
            twitterOverlayRectangleLayers[1].getDrawing().draw();
        },
        getTwitterImageVerticalOffset: function() {},
        resize: function() {
            var
                backgroundLayer = App().getImageDocument().getBackgroundLayer(),
                width = backgroundLayer.getStyle('width'),
                height = backgroundLayer.getStyle('height');
            this._element.attr('width', width);
            this._element.attr('height', height);
            this._resizeTextLayers();
            this._repositionTextLayers();
            this._repositionWatermark();
            this._element.drawLayers();
            this.alignRuleRectangleLayers();
            this.alignTwitterOverlayRectangleLayers();
            this.alignInstagramOverlayRectangleLayers();
            this.alignMargins();
            if (App().userIsPro() === false) {
                App().usingReservedPhoto(App().isUsingReservedPhoto());
                App().usingReservedFont(App().isUsingReservedFont());
                App().usingReservedTemplate(App().isUsingReservedTemplate());
            }
        }
    });
var
    BackgroundControlView = View.extend({
        _colorPicker: null,
        init: function(element) {
            this._super(element);
            this._setupFillStyleEvent();
            this._setupSourceEvent();
            this._element.find('input.minicolors-input').minicolors();
        },
        _setupFillStyleEvent: function() {
            var
                _this = this;
            this._colorPicker = (new ColorPickerView(this._element.find('input[name="fillStyle"]'), {
                placement: 'bottom',
                title: 'Background Color',
                selected: function(hex) {
                    var
                        backgroundLayer = App().getImageDocument().getBackgroundLayer();
                    if (backgroundLayer.constructor === ImageLayer) {
                        backgroundLayer.removeFromImageDocument();
                        backgroundLayer.getDrawing().removeFromCanvas();
                        var
                            maximumCanvasDimensions = App().getMaximumCanvasDimensions(),
                            properties = {
                                isBackground: true,
                                type: 'rectangle',
                                filters: [],
                                styles: {
                                    fillStyle: hex,
                                    height: maximumCanvasDimensions.height,
                                    width: maximumCanvasDimensions.width,
                                    x: 0,
                                    y: 0
                                }
                            },
                            newLayer = (new RectangleLayer(properties));
                        App().getImageDocument().addLayer(newLayer);
                        newLayer.getDrawing().draw();
                        newLayer.getDrawing().sendToBack();
//                        App().getFiltersTab().disable();
  //                      App().getFiltersTab().reset();
                        App().getCanvas().resize();
                    } else {
                        backgroundLayer.setStyle('fillStyle', hex);
                        backgroundLayer.getDrawing().refreshStyle('fillStyle');
                    }
                    App().usingReservedPhoto(false);
                    App().usingReservedTemplate(false);
                }
            }));
        },
        _setupSourceEvent: function() {
            var
                showFilepicker = Thu.get('config').defaults.showFilepicker;
            if (showFilepicker === false) {
                this._element.find('a.filepickerButton').popover({
                    placement: 'bottom',
                    content: 'Currently disabled due to a technical issue. We\'re actively working to resolve the issue. Thanks for your patience!',
                    trigger: 'hover',
                    container: '#background'
                });
            }
            this._element.find('a.filepickerButton').click(function(event) {
                event.preventDefault();
                var
                    isNewTabInChrome = Thu.get('config').referer !== false && Thu.get('config').referer.indexOf('_/chrome/newtab') !== -1;
                if (isNewTabInChrome) {
                    App().showAlertModal('filepickerUnavailable');
                } else {
                    if (showFilepicker === true) {
                        App().trackEvent('BackgroundImage', 'shown', 'backgroundControl');
                        App().mpTrackEvent('Filepicker shown', {
                            _source: 'Background control'
                        });
                        App().showFilepicker(function(sourceSrc, InkBlob) {
                            App().trackEvent('BackgroundImage', 'picked', 'backgroundControl');
                            App().mpTrackEvent('Background image uploaded', {
                                _source: 'Background control'
                            });
                            App().resetSize();
                            App().usingReservedPhoto(false);
                            App().usingReservedTemplate(false);
                            App().drawFPImageAsBackgroundLayer(sourceSrc, 'max', function() {
                                App().getImageDocument().getBackgroundLayer().setProperty('wasManuallyUploaded', true);
                            });
                            if (App().userIsLoggedIn() === true) {
                                App().trackUpload(sourceSrc, function(uploadObj) {
                                    var
                                        uploads = Thu.get('uploads');
                                    uploads.unshift(uploadObj);
                                    Thu.set('uploads', uploads);
                                    App().getBackgroundTab().drawUploadsResourceTab();
                                });
                            }
                        }, false);
                    }
                }
            });
        }
    });
var
    TextControlView = View.extend({
        _alwaysShadow: false,
        _colorPickers: {
            fillStyle: null,
            plane: null,
            strokeStyle: null
        },
        _textLayer: null,
        init: function(element, textLayer) {
            if (App().isFirefox() === true) {
                this._alwaysShadow = true;
            }
            this._super(element);
            this._textLayer = textLayer;
            this._colorPickers = {
                fillStyle: null,
                plane: null,
                strokeStyle: null
            };
            this._element.find('select').selectpicker({
                container: 'body'
            });
            this._setupAlignEvents();
            this._setupFillStyleEvent();
            this._setupPlaneFillStyleEvent();
            this._setupStrokeStyleEvent();
            this._setupFontFamilyDropdown();
            this._setupFontFamilyEvent();
            this._setupFontSizeEvent();
            this._setupFontStyleEvents();
            this._setupTextEvent();
            this._setupRemoveEvent();
            this._updateFontStyleElements(this._element.find('[name="fontFamily"]').val());
        },
        _getContrastingColor: function(color) {
            var
                colorObj = pusher.color(color);
            return colorObj.contrastWhiteBlack().alpha(0.25).html();
        },
        _setStrokeWidth: function() {
            var
                fontSize = this._textLayer.getStyle('fontSize').toInt(),
                strokeWidth;
            if (fontSize < 20) {
                strokeWidth = 3;
            } else
            if (fontSize < 30) {
                strokeWidth = 4;
            } else
            if (fontSize < 40) {
                strokeWidth = 5;
            } else
            if (fontSize < 50) {
                strokeWidth = 6;
            } else {
                strokeWidth = 7;
            }
            this._textLayer.setStyle('strokeWidth', strokeWidth);
            this._textLayer.setStyle('rounded', true);
        },
        _setupAlignEvents: function() {
            var
                _this = this;
            this._element.find('input[name="align"]').change(function() {
                var
                    align = $(this).val();
                _this._textLayer.setStyle('align', align);
                _this._textLayer.getDrawing().refreshStyle('align');
                App().trackEvent('Text', 'aligned', align);
                App().mpTrackEvent('Text aligned', {
                    _align: align
                });
            });
        },
        _setShadowColor: function() {
            var
                shadowColor = this._getContrastingColor(this._textLayer.getStyle('fillStyle'));
            if (this._alwaysShadow === true || (typeof this._textLayer.getStyle('strokeWidth') !== 'undefined' && this._textLayer.getStyle('strokeWidth').toInt() > 0)) {
                shadowColor = 'rgba(0,0,0,0)';
            }
            this._textLayer.setStyle('shadowColor', shadowColor);
            this._textLayer.getDrawing().refreshStyle('shadowColor');
        },
        _setFillStyle: function(hex) {
            this._textLayer.setStyle('fillStyle', hex);
            this._textLayer.getDrawing().refreshStyle('fillStyle');
            this._setShadowColor();
        },
        _setStrokeStyle: function(hex) {
            this._textLayer.setStyle('strokeStyle', hex);
            this._setStrokeWidth();
            this._textLayer.getDrawing().refreshStyles(['fillStyle', 'strokeStyle', 'strokeWidth', 'rounded']);
            this._element.find('.strokeWrapper .icon-remove').removeClass('hidden');
            this._setShadowColor();
        },
        _setupFillStyleEvent: function() {
            var
                _this = this,
                placement = 'bottom';
            if (App().getElement().find('textarea[name="text"]').length > 1) {}
            this._colorPickers.fillStyle = (new ColorPickerView(this._element.find('input[name="fillStyle"]'), {
                container: App().getElement(),
                placement: placement,
                title: 'Color',
                selected: function(hex) {
                    _this._setFillStyle(hex);
                }
            }));
        },
        _setupPlaneFillStyleEvent: function() {
            var
                _this = this;
            var
                placement = 'bottom';
            if (App().getElement().find('textarea[name="text"]').length > 1) {}
            this._colorPickers.plane = (new ColorPickerView(this._element.find('input[name="planeFillStyle"]'), {
                container: App().getElement(),
                placement: placement,
                title: 'Box',
                selected: function(hex) {
                    if (typeof _this._textLayer.getProperty('plane') === 'undefined') {
                        _this._textLayer.getDrawing().addPlane(hex);
                    }
                    _this._textLayer.setProperty('plane', hex);
                    _this._textLayer.getPlane().setStyle('fillStyle', hex);
                    _this._textLayer.getPlane().getDrawing().refreshStyle('fillStyle');
                    _this._textLayer.getPlane().getDrawing().redraw();
                    _this._element.find('.planeWrapper .icon-remove').removeClass('hidden');
                }
            }));
            this._element.find('.planeWrapper a.icon-remove').click(function(event) {
                event.preventDefault();
                _this._element.find('.planeWrapper .icon-remove').addClass('hidden');
                _this._element.find('input[name="planeFillStyle"]').val('');
                _this._textLayer.getDrawing().removePlane();
                _this._textLayer.removeProperty('plane');
                _this._element.find('.planeWrapper .swatch .inner').css({
                    backgroundColor: ''
                });
            });
        },
        _setupStrokeStyleEvent: function() {
            var
                _this = this;
            var
                placement = 'bottom';
            if (App().getElement().find('textarea[name="text"]').length > 1) {}
            this._colorPickers.strokeStyle = (new ColorPickerView(this._element.find('input[name="strokeStyle"]'), {
                container: App().getElement(),
                placement: placement,
                title: 'Outline',
                selected: function(hex) {
                    _this._setStrokeStyle(hex);
                }
            }));
            this._element.find('.strokeWrapper a.icon-remove').click(function(event) {
                event.preventDefault();
                _this._element.find('.strokeWrapper .icon-remove').addClass('hidden');
                _this._element.find('input[name="strokeStyle"]').val('');
                _this._textLayer.setStyle('strokeWidth', 0);
                _this._textLayer.getDrawing().refreshStyles(['fillStyle', 'strokeStyle', 'strokeWidth', 'rounded']);
                _this._element.find('.strokeWrapper .swatch .inner').css({
                    backgroundColor: ''
                });
                _this._setShadowColor();
            });
        },
        _setupFontFamilyDropdown: function() {
            var
                _this = this,
                element = this._element.find('*[name="fontFamily"]').first(),
                options = element.find('option'),
                dropdownElement = element.next().find('.dropdown-menu');
            options.each(function(optionIndex, optionElement) {
                optionElement = $(optionElement);
                var
                    fontFamily = optionElement.attr('data-fontfamily'),
                    relativeElement = dropdownElement.find('li[data-original-index="' + (optionIndex) + '"]');
                relativeElement.css('font-family', fontFamily);
            });
        },
        _updateFontStyleElements: function(fontFamily) {
            var
                fontFamilies = App().getFontFamilies(),
                selectedFontFamilyObj;
            $(fontFamilies).each(function(index, fontFamilyObj) {
                if (fontFamilyObj.name === fontFamily) {
                    selectedFontFamilyObj = fontFamilyObj;
                }
            });
            var
                _this = this,
                boldElement = _this._element.find('input[name="bold"]'),
                italicElement = _this._element.find('input[name="italic"]');
            boldElement.parent().addClass('disabled');
            italicElement.parent().addClass('disabled');
            if (selectedFontFamilyObj.bold === true) {
                boldElement.parent().removeClass('disabled');
            }
            if (selectedFontFamilyObj.italic === true) {
                italicElement.parent().removeClass('disabled');
            }
            if (boldElement.is(':checked') && boldElement.parent().hasClass('disabled')) {
                boldElement.attr('checked', false);
                boldElement.parent().removeClass('active');
                this._textLayer.setStyle('fontStyle', 'normal');
                this._textLayer.getDrawing().refreshStyle('fontStyle');
            } else
            if (italicElement.is(':checked') && italicElement.parent().hasClass('disabled')) {
                italicElement.attr('checked', false);
                italicElement.parent().removeClass('active');
                this._textLayer.setStyle('fontStyle', 'normal');
                this._textLayer.getDrawing().refreshStyle('fontStyle');
            }
        },
        _setupFontFamilyEvent: function() {
            var
                _this = this,
                $fontFamily = this._element.find('select[name="fontFamily"]');
            $fontFamily.change(function() {
                var
                    fontFamily = $(this).val();
                App().trackEvent('Text', 'fontFamily', fontFamily);
                App().mpTrackEvent('Text font changed', {
                    _fontFamily: fontFamily
                });
                _this._updateFontStyleElements(fontFamily);
                _this._textLayer.setStyle('fontFamily', fontFamily);
                _this._textLayer.getDrawing().refreshStyle('fontFamily');
                App().getElement().find('#createImageBtn').first().focus();
                App().getElement().find('#createImageBtn').first().blur();
            });
            $fontFamily.data().selectpicker.$newElement.click(function(event) {
                App().loadWebFonts(App().getFontFamilies());
            });
            var
                _this = this;
            $fontFamily.data().selectpicker.$newElement.find('li').mouseover(function(event) {
                var
                    position = $(this).index(),
                    font = $fontFamily.find('option')[position],
                    fontFamily = $(font).attr('data-fontfamily');
                _this._updateFontStyleElements(fontFamily);
                _this._textLayer.setStyle('fontFamily', fontFamily);
                _this._textLayer.getDrawing().refreshStyle('fontFamily');
            });
        },
        _setupFontSizeEvent: function() {
            var
                _this = this,
                sliderElement = this._element.find('input[name="fontSize"]');
            sliderElement.slider();
            sliderElement.on('slide', function(event) {
                var
                    sliderValue = event.value,
                    strokeWidth = _this._textLayer.getStyle('strokeWidth'),
                    strokeStyle = _this._textLayer.getStyle('strokeStyle');
                _this._textLayer.setStyle('fontSize', (sliderValue + 'px'));
                if (typeof strokeWidth !== 'undefined' && strokeWidth.toInt() !== 0 && typeof strokeStyle !== 'undefined') {
                    _this._setStrokeWidth();
                }
                _this._textLayer.getDrawing().refreshStyles(['fontSize', 'fillStyle', 'strokeStyle', 'strokeWidth', 'rounded']);
            });
        },
        _setupFontStyleEvents: function() {
            var
                _this = this,
                boldElement = _this._element.find('input[name="bold"]'),
                italicElement = _this._element.find('input[name="italic"]');
            boldElement.change(function(event) {
                if ($(this).parent().hasClass('disabled') === false) {
                    var
                        fontStyle = 'normal';
                    $(this).parent().toggleClass('active');
                    if ($(this).is(':checked') === true) {
                        fontStyle = 'bold';
                        italicElement.attr('checked', false);
                        italicElement.parent().removeClass('active');
                        App().trackEvent('Text', 'bolded');
                        App().mpTrackEvent('Text bolded');
                    }
                    _this._textLayer.setStyle('fontStyle', fontStyle);
                    _this._textLayer.getDrawing().refreshStyle('fontStyle');
                } else {
                    $(this).attr('checked', false);
                }
            });
            italicElement.change(function(event) {
                if ($(this).parent().hasClass('disabled') === false) {
                    var
                        fontStyle = 'normal';
                    $(this).parent().toggleClass('active');
                    if ($(this).is(':checked') === true) {
                        fontStyle = 'italic';
                        boldElement.attr('checked', false);
                        boldElement.parent().removeClass('active');
                        App().trackEvent('Text', 'italicized');
                        App().mpTrackEvent('Text italicized');
                    }
                    _this._textLayer.setStyle('fontStyle', fontStyle);
                    _this._textLayer.getDrawing().refreshStyle('fontStyle');
                } else {
                    $(this).attr('checked', false);
                }
            });
        },
        _setupRemoveEvent: function() {
            var
                _this = this;
            this._element.find('.remove, .removeTextCta').click(function(event) {
                event.preventDefault();
                _this._textLayer.removeFromImageDocument();
                _this._textLayer.getDrawing().removeFromCanvas();
                _this.removeFromControls();
            });
        },
        _setupTextEvent: function() {
            var
                _this = this;
            this._element.find('textarea').bind('input propertychange', function() {
                var
                    text = $(this).val();
                _this._textLayer.setStyle('text', text);
                _this._textLayer.getDrawing().refreshStyle('text');
            });
        },
        getColorPickers: function() {
            return this._colorPickers;
        },
        removeFromControls: function() {
            this._element.remove();
            if (this._textLayer.getPlane() !== null) {
                this._textLayer.getDrawing().removePlane();
            }
            App().getTextTab().update();
        }
    });



var
    ColorPickerView = View.extend({
        _popupHideCallback: null,
        _swatch: null,
        init: function(element, options) {
            this._super(element);
            this._options = options;
            this._drawSupportingMarkup();
            this._addEvents();
        },
        _drawSupportingMarkup: function() {
            this._swatch = $('<div class="swatch"></div>');
            var
                $backdrop = $('<div class="backdrop"></div>'),
                $inner = $('<div class="inner"></div>');
            $inner.css({
                backgroundColor: this._element.val()
            });
            this._swatch.append($backdrop);
            this._swatch.append($inner);
            this._swatch.insertAfter(this._element);
            this._element.addClass('hidden');
        },
        _addEvents: function() {
            var
                _this = this,
                currentHex = this._element.val();
            this._swatch.popover({
                html: true,
                container: this._options.container,
                animation: false,
                trigger: 'manual',
                placement: this._options.placement,
                content: '<input type="text" class="form-control" data-inline="true" value="' + (currentHex) + '" />'
            }).on('click', function(event) {
                $(this).popover('toggle');
            }).on('hidden.bs.popover', function(event) {
                var
                    $popover = _this._swatch.data('bs.popover').$tip;
                $popover.parent().find('.popover:not(.in)').hide().detach();
                _this._swatch.data('bs.popover').hoverState = 'out';
            }).on('shown.bs.popover', function(event) {
                var
                    $popover = _this._swatch.data('bs.popover').$tip,
                    $input = $popover.find('input[data-inline="true"]');
                $popover.addClass('colorPickerPopover');
                $input.minicolors({
                    inline: true
                });
                $input.minicolors('value', _this._element.val());
                var
                    $panel = $popover.find('.minicolors-panel');
                $input.insertAfter($panel);
                $input.on('input', function(event) {
                    var
                        hex = $(this).val();
                    if (!hex.match(/^\#/)) {
                        hex = '#' + (hex);
                    }
                    if (hex.length === 4) {
                        hex = '#' + (hex[1] + '' + hex[1]) + (hex[2] + '' + hex[2]) + (hex[3] + '' + hex[3]);
                    }
                    if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex)) {
                        _this._options.selected(hex);
                        _this._element.val(hex);
                        _this._swatch.find('.inner').css({
                            backgroundColor: hex
                        });
                    }
                });
            });
            this.addPopupHideCallback();
        },
        addPopupHideCallback: function() {
            var
                _this = this;
            this._popupHideCallback = function(event) {
                var
                    $target = $(event.target);
                if (($target[0] === _this._swatch[0]) === false && ($target[0] === _this._swatch.find('.inner')[0]) === false) {
                    if ($target.closest('.colorPickerPopover').length === 0) {
                        if (typeof _this._swatch.data('bs.popover') !== 'undefined') {
                            if (_this._swatch.data('bs.popover').hoverState === 'in') {
                                _this._swatch.popover('hide');
                            }
                        } else {
                            _this.removePopupHideCallback();
                        }
                    }
                }
            };
            App().getElement().click(this._popupHideCallback);
        },
        getSwatch: function() {
            return this._swatch;
        },
        removePopupHideCallback: function() {
            App().getElement().unbind('click', this._popupHideCallback);
        }
    });
var
    BackgroundTabView = View.extend({
        init: function(element) {
            this._super(element);
            this._addLazyLoadEvents();
            this._addCategoryChangeEvents();
            this._addResourceTabEvents();
            this._setupDropdown();
            this._setupPhotoEvents();
            this._setupSourceEvent();
            this.changeCategories(0);
            this.drawUploadsResourceTab();
            this._addLoginButtonEvent();
            this._addRegisterButtonEvent();
            this._addScrollOverflowEvent(this._element.find('.photos'));
        },
        _addCategoryChangeEvents: function() {
            var
                _this = this;
            this._element.find('select').change(function(event) {
                _this.changeCategories($(this).val().toInt());
                App().getElement().find('#createImageBtn').first().focus();
                App().getElement().find('#createImageBtn').first().blur();
                App().trackEvent('BackgroundTab', 'categoryChange');
                App().mpTrackEvent('Background category changed');
            });
        },
        _addLazyLoadEvents: function() {
            this._element.find('.lazy').lazyload({
                container: this._element.find('.photos')
            });
        },
        _addLoginButtonEvent: function() {
            var
                _this = this;
            this._element.find('.loginBtn').click(function(event) {
                event.preventDefault();
                App().showConnectModal('login', 'register');
            });
        },
        _addRegisterButtonEvent: function() {
            var
                _this = this;
            this._element.find('.registerBtn').click(function(event) {
                event.preventDefault();
                App().showConnectModal('register', 'register');
            });
        },
        _addResourceTabEvents: function() {
            var
                _this = this;
            this._element.find('.resourceTabs a').click(function(event) {
                event.preventDefault();
                var
                    tab = $(this).attr('data-tab');
                _this._element.find('.resourceTabs a').removeClass('active');
                _this._element.find('.resourceTabContents > div').addClass('hidden');
                $(this).addClass('active');
                _this._element.find('.resourceTabContents > div[data-tab="' + (tab) + '"]').removeClass('hidden');
            });
        },
        _setupDropdown: function() {
            this._element.find('select').selectpicker({
                container: 'body'
            });
            var
                _this = this,
                element = this._element.find('*[name="categories"]').first(),
                options = element.find('option'),
                dropdownElement = element.next().find('.dropdown-menu');
            dropdownElement.addClass('categoryDropdown');
            options.each(function(optionIndex, optionElement) {
                optionElement = $(optionElement);
                var
                    count = optionElement.attr('data-count'),
                    relativeElement = dropdownElement.find('li[data-original-index="' + (optionIndex) + '"] .text'),
                    $sup = $('<span class="catCount">').html(count);
                relativeElement.prepend($sup);
            });
        },
        _setupPhotoEvents: function() {
            var
                _this = this;
            this._element.find('.photosResourceTabContent .photo a.preview').click(function(event) {
                event.preventDefault();
                var
                    hasPhotoPermissions = App().userIsPro() == true || $(this).parent().attr('data-image-isfree') === 'true' || Thu.get('publisher') !== false;
                var
                    photoSwitchCallback = function(anchor) {
                        App().addToCallStack();
                        App().usingReservedPhoto(!hasPhotoPermissions);
                        App().usingReservedTemplate(false);
                        var
                            sourceSrc = $(anchor).parent().attr('data-image-cloudinaryurl');
                        App().drawCloudinaryImageAsBackgroundLayer(sourceSrc, function() {}, 'lfill', false);
                    };
                var
                    anchor = this;
                if (App().getImageDocument().getBackgroundLayer().containsManuallyUploadedBackgroundImage() === true) {
                    App().showConfirmModal('backgroundImageChange', function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                        photoSwitchCallback(anchor);
                    }, function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                    });
                } else {
                    photoSwitchCallback(anchor);
                }
            });
        },
        _setupSourceEvent: function() {
            var
                showFilepicker = Thu.get('config').defaults.showFilepicker;
            if (showFilepicker === false) {
                this._element.find('a.uploadBtn').popover({
                    placement: 'bottom',
                    content: 'Currently disabled due to a technical issue. We\'re actively working to resolve the issue. Thanks for your patience!',
                    trigger: 'hover'
                });
            }
            this._element.find('a.uploadBtn').click(function(event) {
                event.preventDefault();
                var
                    isNewTabInChrome = Thu.get('config').referer !== false && Thu.get('config').referer.indexOf('_/chrome/newtab') !== -1;
                if (isNewTabInChrome) {
                    App().showAlertModal('filepickerUnavailable');
                } else {
                    if (showFilepicker === true) {
                        App().trackEvent('BackgroundImage', 'clicked', 'backgroundTab');
                        App().mpTrackEvent('Filepicker shown', {
                            _source: 'Background tab'
                        });
                        App().showFilepicker(function(sourceSrc, InkBlob) {
                            App().trackEvent('BackgroundImage', 'picked', 'backgroundTab');
                            App().mpTrackEvent('Background image uploaded', {
                                _source: 'Background tab'
                            });
                            App().resetSize();
                            App().usingReservedPhoto(false);
                            App().usingReservedTemplate(false);
                            App().drawFPImageAsBackgroundLayer(sourceSrc, 'max', function() {
                                App().getImageDocument().getBackgroundLayer().setProperty('wasManuallyUploaded', true);
                            });
                            if (App().userIsLoggedIn() === true) {
                                App().trackUpload(sourceSrc, function(uploadObj) {
                                    var
                                        uploads = Thu.get('uploads');
                                    uploads.unshift(uploadObj);
                                    Thu.set('uploads', uploads);
                                    App().getBackgroundTab().drawUploadsResourceTab();
                                });
                            }
                        }, false);
                    }
                }
            });
        },
        changeCategories: function(categoryId) {
            this._element.find('.photosResourceTabContent .photo').removeClass('hidden');
            this._element.find('.proPhotosSection .photoList').prepend(this._element.find('.freePhotosSection .photoList .photo'));
            this._element.find('.proPhotosSection .photoList .photo').attr('data-image-isfree', 'false');
            var
                $firstFourProPhotos = this._element.find('.photosResourceTabContent .photo').slice(0, 4);
            if (categoryId !== 0) {
                var
                    $all = this._element.find('.photosResourceTabContent .photo[data-categories~="' + (categoryId) + '"]');
                this._element.find('.photosResourceTabContent .photo').addClass('hidden');
                $all.removeClass('hidden');
                this._element.find('.photosResourceTabContent .photos').trigger('scroll');
                $firstFourProPhotos = $all.slice(0, 4);
            }
            var
                authd = App().userIsPro() == true || Thu.get('publisher') !== false;
            if (!authd) {
                this._element.find('.freePhotosSection .photoList').prepend($firstFourProPhotos);
                $firstFourProPhotos.attr('data-image-isfree', 'true');
            }
            this._element.find('.photosResourceTabContent .photos').animate({
                scrollTop: 0
            }, 'slow');
        },
        drawUploadsResourceTab: function() {
            this._element.find('.uploadsResourceTabContent .photoList .photo').remove();
            var
                uploads = Thu.get('uploads'),
                $uploads = [],
                $div, $anchor, $delete, _this = this,
                path;
            this._element.find('.connectPrompt').addClass('hidden');
            this._element.find('.uploadPrompt').addClass('hidden');
            if (App().userIsLoggedIn() === false) {
                this._element.find('.connectPrompt').removeClass('hidden');
            } else {
                if (uploads.length === 0) {
                    this._element.find('.uploadPrompt').removeClass('hidden');
                }
            }
            $(uploads).each(function(index, upload) {
                if (upload.url.match('cloudinary') === null) {
                    path = App().getFilepickerUrl(upload.url, {
                        width: 56,
                        height: 44
                    });
                } else {
                    path = App().getCloudinaryUrl(upload.url, {
                        width: 56,
                        height: 44,
                        fit: 'lfill'
                    }, true);
                }
                $div = $('<div>');
                $div.attr('class', 'photo pull-left');
                $div.attr('data-image-url', upload.url);
                $anchor = $('<a>');
                $anchor.attr('href', '#');
                $anchor.attr('class', 'preview');
                $anchor.append('<div class="overlay"></div>');
                $anchor.append('<div class="icon"><div class="icon-plus"></div></div>');
                $anchor.append('<img class="lazy" src="' + (path) + '" alt="" title="" width="65" height="52" />');
                $delete = $('<a>');
                $delete.attr('href', '#');
                $delete.attr('data-uploadId', upload.id);
                $delete.attr('class', 'remove');
                $delete.html('x');
                $div.append($anchor);
                $div.append($delete);
                $uploads.push($div);
                $anchor.click(function(event) {
                    event.preventDefault();
                    App().addToCallStack();
                    App().resetSize();
                    var
                        sourceSrc = $(this).parent().attr('data-image-url');
                    if (upload.url.match('cloudinary') === null) {
                        App().drawFPImageAsBackgroundLayer(sourceSrc, 'max', function() {});
                    } else {
                        App().drawCloudinaryImageAsBackgroundLayer(sourceSrc, function() {}, 'lfill', false);
                    }
                });
                $delete.click(function(event) {
                    event.preventDefault();
                    if (confirm('Are you sure you want to delete this upload?') === true) {
                        var
                            data = {
                                csrfToken: Thu.get('csrfToken')
                            };
                        jQuery.post('/uploads/' + $(this).attr('data-uploadId') + '/delete', data, function(response) {
                            if (response.success === true) {
                                Thu.set('uploads', response.data.uploads);
                                _this.drawUploadsResourceTab();
                            } else {
                                if (App().siteHasBeenLocked(response)) {
                                    App().showLockedModal();
                                } else {
                                    App().showErrorModal(false, response.failedRules[0].error.reference);
                                }
                            }
                        }, 'json').fail(function() {
                            App().showErrorModal(false, 'a3uj');
                        });
                    }
                });
            });
            this._element.find('.uploadsResourceTabContent .photoList').append($uploads);
        },
        refreshCategory: function() {
            var
                categoryId = this._element.find('select').val().toInt();
            this.changeCategories(categoryId);
            this._element.find('.photosResourceTabContent .photos').addClass('authd');
            this._element.find('.uploadsResourceTabContent .photos').addClass('authd');
            this._element.find('.photosResourceTabContent .photos').trigger('scroll');
        }
    });
var
    TemplatesTabView = View.extend({
        init: function(element) {
            this._super(element);
            this._addResourceTabEvents();
            this._setupTemplateEvents();
            
            this.drawUserResourceTab();
            this._addLoginButtonEvent();
            this._addRegisterButtonEvent();
            this._addScrollOverflowEvent(this._element.find('.templates'));
        },
        _addLoginButtonEvent: function() {
            var
                _this = this;
            this._element.find('.loginBtn').click(function(event) {
                event.preventDefault();
                App().showConnectModal('login', 'register');
            });
        },
        _addRegisterButtonEvent: function() {
            var
                _this = this;
            this._element.find('.registerBtn').click(function(event) {
                event.preventDefault();
                App().showConnectModal('register', 'register');
            });
        },
        _addResourceTabEvents: function() {
            var
                _this = this;
            this._element.find('.resourceTabs a').click(function(event) {
                event.preventDefault();
                var
                    tab = $(this).attr('data-tab');
                _this._element.find('.resourceTabs a').removeClass('active');
                _this._element.find('.resourceTabContents > div').addClass('hidden');
                $(this).addClass('active');
                _this._element.find('.resourceTabContents > div[data-tab="' + (tab) + '"]').removeClass('hidden');
            });
        },
        _setupTemplateEvents: function() {
            var
                _this = this;
            this._element.find('.globalResourceTabContent .template a.preview').click(function(event) {
                event.preventDefault();
                var
                    hasTemplatePermissions = App().userIsPro() == true || $(this).parent().attr('data-image-isfree') === 'true' || Thu.get('publisher') !== false;
                var
                    templateSwitchCallback = function(anchor) {
                        App().addToCallStack();
                        App().usingReservedTemplate(!hasTemplatePermissions);
                        App().resetSize();
                        var
                            templates = Thu.get('templates'),
                            imageId = $(anchor).attr('data-imageId').toInt(),
                            imageObj;
                        $(templates).each(function(index, templateObj) {
                          if (templateObj.id.toInt() === imageId) {
                           
                                imageObj = templateObj;
                            }
                        });
                        App().remixImage(imageObj, 'loadingTemplate', function() {}, true);
                    };
                var
                    anchor = this;
                if (App().getImageDocument().getBackgroundLayer().containsManuallyUploadedBackgroundImage() === true) {
                    App().showConfirmModal('backgroundImageChange', function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                        templateSwitchCallback(anchor);
                    }, function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                    });
                } else {
                    templateSwitchCallback(anchor);
                }
            });
        },
        
        drawUserResourceTab: function() {
            this._element.find('.userResourceTabContent .templateList .template').remove();
            var
                userTemplates = Thu.get('userTemplates'),
                $userTemplates = [],
                $div, $anchor, $delete, _this = this,
                path;
            this._element.find('.emptyState').addClass('hidden');
            this._element.find('.connectPrompt').addClass('hidden');
            if (App().userIsLoggedIn() === false) {
                this._element.find('.connectPrompt').removeClass('hidden');
            } else {
                if (userTemplates.length === 0) {
                    this._element.find('.emptyState').removeClass('hidden');
                }
            }
            $(userTemplates).each(function(index, image) {
                $div = $('<div>');
                $div.attr('class', 'template pull-left');
                $anchor = $('<a>');
                $anchor.attr('href', '#');
                $anchor.attr('class', 'preview');
                $anchor.attr('data-imageId', image.id);
                $anchor.append('<div class="overlay"></div>');
                $anchor.append('<div class="icon"><div class="icon-plus"></div></div>');
                $anchor.append('<div class="actual" style="background-image: url(\'' + (image.cloudfrontUrl) + '\');"></div>');
                $delete = $('<a>');
                $delete.attr('href', '#');
                $delete.attr('class', 'remove');
                $delete.attr('data-imageId', image.id);
                $delete.html('x');
                $div.append($anchor);
                $div.append($delete);
                $userTemplates.push($div);
                $anchor.click(function(event) {
                    event.preventDefault();
                    App().addToCallStack();
                    var
                        templates = Thu.get('userTemplates'),
                        imageId = $(this).attr('data-imageId').toInt(),
                        imageObj;
                    $(templates).each(function(index, templateObj) {
                        if (templateObj.id.toInt() === imageId) {
                            imageObj = templateObj;
                        }
                    });
                    App().remixImage(imageObj, 'loadingTemplate', function() {
                        _this.showUserTemplatesTab();
                    }, true);
                });
                $delete.click(function(event) {
                    event.preventDefault();
                    if (confirm('Are you sure you want to delete this template?') === true) {
                        var
                            data = {
                                csrfToken: Thu.get('csrfToken'),
                                userTemplating: 1,
                                data: {
                                    isUserTemplate: 0
                                }
                            };
                        jQuery.post('/images/' + $(this).attr('data-imageId'), data, function(response) {
                            if (response.success === true) {
                                Thu.set('userTemplates', response.data.user.templates);
                                _this.drawUserResourceTab();
                            } else {
                                if (App().siteHasBeenLocked(response)) {
                                    App().showLockedModal();
                                } else {
                                    App().showErrorModal(false, response.failedRules[0].error.reference);
                                }
                            }
                        }, 'json').fail(function() {
                            App().showErrorModal(false, 'a3qj');
                        });
                    }
                });
            });
            this._element.find('.userResourceTabContent .templateList').append($userTemplates);
        },
        showUserTemplatesTab: function() {
            this._element.find('.resourceTabs a').removeClass('active');
            this._element.find('.resourceTabContents > div').addClass('hidden');
            this._element.find('.resourceTabs a[data-tab="user"]').addClass('active');
            this._element.find('.resourceTabContents > div[data-tab="user"]').removeClass('hidden');
        }
    });
var
    FooterView = View.extend({
        init: function(element) {
            this._super(element);
            this._addMyAccountButtonEvent();
            this._addMyImagesButtonEvent();
            this._addReferralEvent();
            this._addLoginButtonEvent();
            this._addSignUpButtonEvent();
            this._addUpgradeButtonEvent();
            this._addPublisherBrandEvent();
        },
        _addLoginButtonEvent: function() {
            this._element.find('a.loginLink').click(function(event) {
                event.preventDefault();
                App().showConnectModal('login', 'register');
            });
        },
        _addReferralEvent: function() {
            this._element.find('div.referral a').click(function(event) {
                event.preventDefault();
                App().showReferralModal();
            });
        },
        _addSignUpButtonEvent: function() {
            this._element.find('a.registerLink').click(function(event) {
                event.preventDefault();
                App().showConnectModal('register', 'register');
            });
        },
        _addMyAccountButtonEvent: function() {
            this._element.find('a.myAccountLink').click(function(event) {
                event.preventDefault();
                if (Thu.get('loggedInUser') !== false) {
                    App().showAccountModal();
                } else {
                    App().showConnectModal('register', 'register');
                    App().setConnectCallback(function() {
                        App().showAccountModal();
                    });
                }
            });
        },
        _addMyImagesButtonEvent: function() {
            this._element.find('a.myImagesLink').click(function(event) {
                event.preventDefault();
                if (Thu.get('loggedInUser') !== false) {
                    App().showImagesModal();
                } else {
                    App().showConnectModal('register', 'register');
                    App().setConnectCallback(function() {
                        App().showImagesModal();
                    });
                }
            });
        },
        _addPublisherBrandEvent: function() {
            this._element.find('> div.publisher > a').click(function(event) {
                App().trackEvent('Referral', 'homepage', 'footer');
                App().mpTrackEvent('Footer sticker clicked', {
                    _source: 'publisher'
                });
            });
        },
        _addUpgradeButtonEvent: function() {
            var
                _this = this;
            this._element.find('a.proCta').click(function(event) {
                event.preventDefault();
                App().trackEvent('UpgradeModal', 'shown', 'footer');
                App().mpTrackEvent('Upgrade button clicked', {
                    _source: 'Footer'
                });
                App().showAppropriateUpgradeStep('upgrade');
            });
        },
        hide: function() {
            if (Thu.get('publisher') === false) {
                this._element.addClass('hiding');
            }
        },
        show: function() {
            this._element.removeClass('hiding');
        },
        update: function() {
            var
                config = Thu.get('config'),
                userObj = Thu.get('loggedInUser'),
                publisherObj = Thu.get('publisher');
            this._element.removeClass('freeUserState');
            this._element.removeClass('publisherState');
            this._element.removeClass('proUserState');
            if (publisherObj !== false) {
                this._element.addClass('publisherState');
            } else
            if (userObj !== false && userObj.isPro.toInt() === 1) {
                this._element.addClass('proUserState');
            } else {
                this._element.addClass('freeUserState');
            }
            this._element.removeClass('guestState');
            if (userObj === false) {
                this._element.addClass('guestState');
            }
            if (userObj !== false) {
                var
                    rate = (userObj.rate / 100);
                this._element.find('span.rate').text(rate);
                var
                    frequencyShorthand = 'mo';
                if (userObj.frequency === 'yearly') {
                    rate = (userObj.yearlyRate / 12 / 100);
                }
                this._element.find('span.rate').text(rate);
                this._element.find('span.frequencyShorthand').text(frequencyShorthand);
            }
            if (userObj !== false && userObj.isAdmin.toInt() === 1) {
                this._element.find('.accountType strong').text('Admin');
            }
        }
    });
var
    ModalView = View.extend({
        init: function(element) {
            this._super(element);
            this._addCloseEvents();
        },
        _addCloseEvents: function() {
            var
                _this = this;
            this._element.find('.closeModalSource').click(function(event) {
                event.preventDefault();
                _this.close();
            });
        },
        _addTooltips: function() {
            this._element.find('[data-toggle="tooltip"]').tooltip({
                container: this._element
            });
        },
        close: function() {
            this._element.remove();
            var
                openModals = App().getOpenModals(),
                _this = this;
            $(openModals).each(function(index, modalView) {
                if (modalView === _this) {
                    openModals.splice(index, 1);
                }
            });
            App().getFooter().show();
        }
    });
var
    SpecialModalView = ModalView.extend({
        init: function(element) {
            this._super(element);
        },
        close: function() {
            this._element.remove();
            var
                openModals = App().getOpenModals(),
                _this = this;
            $(openModals).each(function(index, modalView) {
                if (modalView === _this) {
                    openModals.splice(index, 1);
                }
            });
            if (App().getOpenModals().length === 0) {
                App().getFooter().show();
            }
        }
    });

var
    AlertModalView = SpecialModalView.extend({
        _alert: null,
        _callback: null,
        init: function(element, alert, callback) {
            this._alert = alert;
            this._callback = callback;
            this._super(element);
            this._addButtonEvent();
        },
        _addButtonEvent: function() {
            var
                _this = this;
            this._element.find('.btn').click(function(event) {
                jQuery.proxy(_this._alert.button.callback, this)(event);
                _this._callback && _this._callback(_this);
            });
        }
    });

var
    BusyModalView = SpecialModalView.extend({
        init: function(element) {
            this._super(element);
        }
    });
var
    CategoryModalView = SpecialModalView.extend({
        _callback: null,
        init: function(element, callback) {
            this._super(element);
            this._callback = callback;
            this._setupForm();
            this._element.find('input[type="text"]').first().focus();
        },
        _setupForm: function() {
            var
                _this = this;
            new
            FormView(this._element.find('form'), function(response) {
                if (response.success === true) {
                    _this._callback({});
                }
            });
        }
    });

var
    ErrorModalView = ModalView.extend({
        init: function(element) {
            this._super(element);
            this._addReloadEvent();
        },
        _addReloadEvent: function() {
            this._element.find('.btn-primary').click(function(event) {
                event.preventDefault();
                location.reload();
            });
        }
    });
var
    ImgurModalView = ModalView.extend({
        init: function(element) {
            this._super(element);
            this._bindImgurEvent();
        },
        _bindImgurEvent: function() {
            App()._setupTemplateImgurEventsModal();
        }
    });
var
    ImagesModalView = ModalView.extend({
        _images: [],
        _loadedPath: null,
        init: function(element) {
            this._super(element);
        },
        _addDeleteEvents: function() {
            var
                _this = this;
            this._element.find('.btn.deleteBtn').click(function(event) {
                event.preventDefault();
                if (App().userIsPro() == true) {
                    if (confirm('Are you sure you want to delete this image?') === true) {
                        App().trackEvent('Image', 'deleted', 'imagesModal');
                        App().mpTrackEvent('Image deleted', {
                            _source: 'Images modal'
                        });
                        _this._removeTooltips();
                        App().showBusyModal('loadingImages');
                        var
                            imageId = $(this).attr('data-image-id');
                        jQuery.post('/images/' + (imageId) + '/delete', {
                            csrfToken: Thu.get('csrfToken')
                        }, function(response) {
                            if (response.success === true) {
                                _this.load(_this._loadedPath);
                            } else {
                                if (App().siteHasBeenLocked(response)) {
                                    App().showLockedModal();
                                } else {
                                    App().showErrorModal(false, response.failedRules[0].error.reference);
                                }
                            }
                        }, 'json').fail(function() {
                            App().showErrorModal(false, 'a4n2');
                        });
                    }
                } else {
                    App().showUpsellModal('delete');
                }
            });
        },
        _addDownloadEvents: function() {
            var
                _this = this;
            this._element.find('.btn.downloadBtn').click(function(event) {
                event.preventDefault();
                if (App().userIsPro() == true) {
                    var
                        publicKey = $(this).attr('data-image-publickey');
                    App().trackEvent('Image', 'downloaded', 'imagesModal');
                    App().mpTrackEvent('Image downloaded', {
                        _source: 'Images modal'
                    });
                    var
                        path = '/i/' + (publicKey) + '/download';
                    if (App().userIsPro() === true) {
                        var
                            hasHighDef = $(this).attr('data-image-hashighdef');
                        if (hasHighDef === '1') {
                            path += '?hd';
                        }
                    }
                    location.href = path;
                } else {
                    App().showUpsellModal('download');
                }
            });
        },
        _addRemixEvents: function() {
            var
                _this = this;
            this._element.find('.btn.remixBtn').click(function(event) {
                event.preventDefault();
                var
                    iteration = $(this).attr('data-iteration'),
                    imageObj = _this._images[iteration];
                App().trackEvent('Image', 'remixed', 'imagesModal');
                App().mpTrackEvent('Image remixed', {
                    _source: 'Images modal'
                });
                App().remixImage(imageObj, 'loadingRemix');
                _this._removeTooltips();
            });
        },
        _addViewEvents: function() {
            this._element.find('.btn.viewBtn').click(function(event) {
                event.preventDefault();
                var
                    url = $(this).attr('data-image-url');
                App().trackEvent('Image', 'viewed', 'imagesModal');
                App().mpTrackEvent('Image viewed', {
                    _source: 'Images modal'
                });
                window.open(url);
            });
        },
        _addPaginationEvents: function() {
            var
                _this = this;
            this._element.find('.pagination a').click(function(event) {
                event.preventDefault();
                if (App().userIsPro() == false) {
                    App().showUpsellModal('pagination');
                } else {
                    var
                        href = $(this).attr('href');
                    if (href !== '#') {
                        _this.load(href);
                    }
                }
            });
        },
        load: function(path) {
            this._loadedPath = path;
            App().showBusyModal('loadingImages');
            this._removeTooltips();
            var
                _this = this;
            jQuery.get(path, {}, function(response) {
                _this._element.find('.content').empty();
                if (response.success === true) {
                    var
                        html = _.template(App().getTemplate('images'), {
                            user: Thu.get('loggedInUser'),
                            total: response.data.total,
                            images: response.data.images,
                            pagination: response.data.pagination
                        }),
                        elements = $(jQuery.parseHTML(html.trim()));
                    (new View(elements));
                    _this._images = response.data.images;
                    _this._element.find('.content').append(elements);
                    _this._addViewEvents();
                    _this._addRemixEvents();
                    _this._addDownloadEvents();
                    _this._addDeleteEvents();
                    _this._addPaginationEvents();
                    _this._addCloseEvents();
                    setTimeout(function() {
                        App().closeBusyModal();
                    }, App().getTimeout('loadingImages'));
                } else {
                    if (App().siteHasBeenLocked(response)) {
                        App().showLockedModal();
                    } else {
                        App().showErrorModal(false, response.failedRules[0].error.reference);
                    }
                }
            }, 'json').fail(function() {
                App().showErrorModal(false, '7nna');
            });
        }
    });

var
    PageView = View.extend({
        init: function(element) {
            this._super(element);
            this._insertChromeWebstoreItemLinks();
        },
        _insertChromeWebstoreItemLinks: function() {
            var
                $app = $('<link />');
            $app.attr({
                rel: 'chrome-webstore-item',
                id: 'chrome-webstore-app',
                href: 'https://chrome.google.com/webstore/detail/bgjkdefgpgngdhagacbeajapgnoobjig'
            });
            var
                $extension = $('<link />');
            $extension.attr({
                rel: 'chrome-webstore-item',
                id: 'chrome-webstore-extension',
                href: 'https://chrome.google.com/webstore/detail/hgmhphfbdfbkokcfajipbmkcakmmepeb'
            });
            $('head').append($app, $extension);
        },
        _makeGaCall: function(call, override) {
            var
                role = Thu.get('config').role,
                user = Thu.get('loggedInUser');
            if (role === 'prod') {
                if (user === false || user.isAdmin.toInt() === 0 || (typeof override !== 'undefined' && override === true)) {
                    _gaq.push(call);
                }
            }
        },
        _makeMpCall: function(call, scope, args, override) {
            var
                role = Thu.get('config').role,
                user = Thu.get('loggedInUser');
            if (role === 'prod') {
                if (user === false || user.isAdmin.toInt() === 0 || (typeof override !== 'undefined' && override === true)) {
                    call.apply(scope, args);
                }
            }
        },
        trackCustomVar: function(index, name, value, scope) {
            var
                call = ['_setCustomVar', index, name, value, scope];
            this._makeGaCall(call);
        },
        trackEvent: function(category, action, optLabel, optValue, override) {
            var
                call = ['_trackEvent'];
            if (typeof category !== 'undefined') {
                call.push(category);
            }
            if (typeof action !== 'undefined') {
                call.push(action);
            }
            if (typeof optLabel !== 'undefined') {
                call.push(optLabel);
            }
            if (typeof optValue !== 'undefined') {
                call.push(optValue);
            }
            this._makeGaCall(call, override);
        },
        mpAlias: function(alias) {
            var
                publisher = Thu.get('publisher');
            if (publisher === false) {
                var
                    role = Thu.get('config').role;
                if (role === 'local') {
                    alias = 'l-' + (alias);
                } else
                if (role === 'dev') {
                    alias = 'd-' + (alias);
                } else
                if (role === 'prod') {
                    alias = 'p-' + (alias);
                }
               // this._makeMpCall(mixpanel.alias, mixpanel, [alias]);
            }
        },
        mpIdentify: function(alias) {
            var
                publisher = Thu.get('publisher');
            if (publisher === false) {
                var
                    role = Thu.get('config').role;
                if (role === 'local') {
                    alias = 'l-' + (alias);
                } else
                if (role === 'staging') {
                    alias = 'd-' + (alias);
                } else
                if (role === 'prod') {
                    alias = 'p-' + (alias);
                }
            }
        },
        mpRegister: function(properties) {
            var
                publisher = Thu.get('publisher');
            if (publisher === false) {}
        },
        mpPeopleSet: function(properties) {
            var
                publisher = Thu.get('publisher');
            if (publisher === false) {}
        },
        mpTrackEvent: function(name, properties) {
            var
                publisher = Thu.get('publisher');
            if (publisher === false) {}
        },
        trackView: function(path) {
            var
                call = ['_trackPageview', path];
            this._makeGaCall(call);
        }
    });
var
    TextTabView = View.extend({
        _maxTextFields: 100,
        init: function(element) {
            this._super(element);
            if (isChrome() === false) {}
            this._addScrollEvent();
            this._addTextAdditionEvent();
            this._drawTextControls();
            this.update();
            this._addScrollOverflowEvent(this._element);
        },
        _addEmptyTextLayer: function() {
            var
                newLayer = App().getImageDocument().addEmptyTextLayer();
            newLayer.getDrawing().draw();
            newLayer.drawControl();
            newLayer.getControl().getElement().find('textarea').select();
            App().getImageDocument().getWatermarkLayer().getDrawing().bringToFront();
        },
        _addScrollEvent: function() {
            var
                _this = this;
            this._element.scroll(function(event) {
                var
                    layers = App().getImageDocument().getTextLayers();
                $(layers).each(function(index, layer) {
                    var
                        pickers = layer.getControl().getColorPickers();
                    pickers.fillStyle && pickers.fillStyle.getSwatch().popover('hide');
                    pickers.plane && pickers.plane.getSwatch().popover('hide');
                    pickers.strokeStyle && pickers.strokeStyle.getSwatch().popover('hide');
                });
            });
        },
        _addTextAdditionEvent: function() {
            var
                _this = this;
            this._element.find('.addTextBtn').click(function(event) {
                event.preventDefault();
                _this._addEmptyTextLayer();
                _this.update();
            });
        },
        _drawTextControls: function() {
            var
                textLayers = App().getImageDocument().getTextLayers();
            $(textLayers).each(function(index, layer) {
                layer.drawControl();
            });
        },
        update: function() {
            var
                textLayers = App().getImageDocument().getTextLayers();
            this._element.find('.addTextBtn').removeClass('hidden');
            if (textLayers.length === this._maxTextFields) {
                this._element.find('.addTextBtn').addClass('hidden');
            }
            this._element.find('.remove').removeClass('hidden');
            this._element.find('.removeTextCta').removeClass('hidden');
            if (textLayers.length === 1) {
                this._element.find('.remove').addClass('hidden');
                this._element.find('.removeTextCta').addClass('hidden');
            }
            if (textLayers.length === 1) {
                this._element.find('textarea').css('height', '192px');
            } else {
                this._element.find('textarea').css('height', '69px');
                this._element.animate({
                    scrollTop: this._element.find('.controls').first().height()
                }, 'slow');
            }
        }
    });
var
    WatermarkTabView = View.extend({
        init: function(element) {
            this._super(element);
            this._setupOpacityEvent();
            this._setupSizeEvents();
            this._setupSourceEvent();
            this._setupToggler();
            this._element.find('div.disabled .btn').click(function(event) {
                event.preventDefault();
                App().trackEvent('UpgradeModal', 'shown', 'watermarkTab');
                App().mpTrackEvent('Upgrade modal shown', {
                    _source: 'Watermark tab'
                });
                App().showAppropriateUpgradeStep('upgrade');
            });
        },
        _setupOpacityEvent: function() {
            var
                _this = this,
                strengthElement = this._element.find('input[name="opacityStrength"]');
            strengthElement.slider();
            strengthElement.on('slideStop', function(event) {
                var
                    watermarkLayer = App().getImageDocument().getWatermarkLayer(),
                    opacityStrength = event.value.toInt();
                _this.turnSwitchOn();
                opacityStrength = 100 - opacityStrength;
                watermarkLayer.setFilter({
                    type: 'opacity',
                    properties: {
                        strength: opacityStrength
                    }
                });
                watermarkLayer.saveSettings();
            });
        },
        _setupSizeEvents: function() {
            var
                _this = this;
            this._element.find('input[name="size"]').change(function() {
                if (App().userIsPro() == true) {
                    var
                        size = $(this).val(),
                        watermarkLayer = App().getImageDocument().getWatermarkLayer();
                    watermarkLayer.setProperty('size', size);
                    App().trackEvent('WatermarkImage', 'resized', size);
                    App().mpTrackEvent('Watermark resized', {
                        _size: size
                    });
                    var
                        resizedImg = (new Image()),
                        maximumWatermarkDimensions = App().getMaximumWatermarkDimensions(size),
                        sourceSrc = watermarkLayer.getProperty('sourceSrc'),
                        resizedSrc = (sourceSrc) + '/convert' + '?w=' + (maximumWatermarkDimensions.width) + '&h=' + (maximumWatermarkDimensions.height) + '&fit=max';
                    App().getWatermarkTab().turnSwitchOn();
                    resizedImg.onload = function() {
                        var
                            dimensions = resizedImg.getFittedDimensions(maximumWatermarkDimensions);
                        watermarkLayer.setProperty('resizedSrc', resizedSrc);
                        watermarkLayer.setStyle('height', dimensions.height);
                        watermarkLayer.setStyle('width', dimensions.width);
                        watermarkLayer.getDrawing().refreshImage(true, function() {
                            watermarkLayer.getDrawing().refreshStyle('height');
                            watermarkLayer.getDrawing().refreshStyle('width');
                        });
                        watermarkLayer.saveSettings();
                    };
                    resizedImg.src = resizedSrc;
                } else {
                    var
                        $mediumOption = _this._element.find('input[name="size"][value="medium"]'),
                        _this2 = this;
                    setTimeout(function() {
                        $(_this2).attr('checked', false);
                        $(_this2).parent().removeClass('active');
                        $mediumOption.attr('checked', true);
                        $mediumOption.parent().addClass('active');
                    }, 0);
                    App().showUpsellModal('watermark');
                }
            });
        },
        _setupSourceEvent: function() {
            var
                _this = this;
            var
                showFilepicker = Thu.get('config').defaults.showFilepicker;
            if (showFilepicker === false) {
                this._element.find('a.uploadWatermarkBtn').popover({
                    placement: 'bottom',
                    content: 'Currently disabled due to a technical issue. We\'re actively working to resolve the issue. Thanks for your patience!',
                    trigger: 'hover'
                });
            }
            this._element.find('a.uploadWatermarkBtn').click(function(event) {
                event.preventDefault();
                var
                    isNewTabInChrome = Thu.get('config').referer !== false && Thu.get('config').referer.indexOf('_/chrome/newtab') !== -1;
                if (isNewTabInChrome) {
                    App().showAlertModal('filepickerUnavailable');
                } else {
                    if (showFilepicker === true) {
                        if (App().userIsPro() == true) {
                            App().trackEvent('WatermarkImage', 'clicked', 'watermarkTab');
                            App().mpTrackEvent('Filepicker shown', {
                                _source: 'Watermark tab'
                            });
                            App().showFilepicker(function(sourceSrc, InkBlob) {
                                App().trackEvent('WatermarkImage', 'pick', 'watermarkTab');
                                App().mpTrackEvent('Watermark uploaded', {
                                    _source: 'Watermark tab'
                                });
                                App().drawFPImageAsWatermarkLayer(sourceSrc, function() {
                                    var
                                        watermarkLayer = App().getImageDocument().getWatermarkLayer();
                                    watermarkLayer.saveSettings();
                                });
                            }, false);
                        } else {
                            App().showUpsellModal('watermark');
                        }
                    }
                }
            });
        },
        _setupToggler: function() {
            var
                _this = this;
            this._element.find('.switch').bootstrapSwitch();
            this._element.find('.switch').on('switch-change', function(event, data) {
                if (App().userIsPro() == true) {
                    $(this).bootstrapSwitch('setAnimated', true);
                    var
                        watermarkLayer = App().getImageDocument().getWatermarkLayer();
                    if (data.value === true) {
                        App().trackEvent('WatermarkImage', 'shown');
                        App().mpTrackEvent('Watermark toggled', {
                            _visible: 'Yes'
                        });
                        watermarkLayer.show();
                    } else {
                        App().trackEvent('WatermarkImage', 'hidden');
                        App().mpTrackEvent('Watermark toggled', {
                            _visible: 'No'
                        });
                        watermarkLayer.hide();
                    }
                } else {
                    if (data.value === false) {
                        $(this).bootstrapSwitch('setAnimated', false);
                        $(this).bootstrapSwitch('setState', true);
                        App().showUpsellModal('watermark');
                    }
                }
            });
        },
        disable: function() {
            this._element.addClass('disabledState');
        },
        enable: function() {
            this._element.removeClass('disabledState');
        },
        turnSwitchOn: function() {
            this._element.find('.switch').bootstrapSwitch('setState', true);
        }
    });
var
    AppView = PageView.extend({
        _alerts: {
            deliquent: {
                class: 'deliquent',
                headline: 'Your account needs updating!',
                message: 'We had trouble charging your card this month.<br />' + 'Please update your credit card details.',
                button: {
                    copy: 'Update Payment Details',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeOpenModals();
                        App().showAccountModal('payment');
                    }
                }
            },
            facebookInactive: {
                class: 'facebookInactive',
                headline: 'Facebook is temporarily off',
                message: 'Sorry about the trouble.<br /><br />We\'re working on ' + 'it, and will have things up<br />and running as soon as ' + 'possible.',
                button: {
                    copy: 'Okay',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeAlertModal();
                    }
                }
            },
            twitterInactive: {
                class: 'twitterInactive',
                headline: 'Twitter is temporarily off',
                message: 'Sorry about the trouble.<br /><br />We\'re working on ' + 'it, and will have things up<br />and running as soon as ' + 'possible.',
                button: {
                    copy: 'Okay',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeAlertModal();
                    }
                }
            },
            weeklySnaps: {
                class: 'weeklySnaps',
                headline: 'Introducing',
                message: '20 Royalty free images in you<br />inbox every week!',
                button: {
                    copy: 'Go To WeeklySnaps.com',
                    callback: function(event) {
                        event.preventDefault();
                        window.open('http://weeklysnaps.com');
                        App().closeOpenModals();
                    }
                }
            },
            filepickerUnavailable: {
                class: 'filepickerUnavailable',
                headline: 'File uploading alert',
                message: 'You are not on a website right now. Please go to a ' + 'valid website<br />(i.e. <a href="https://www.yahoo.com" target="_blank">https://www.yahoo.com</a> or any website) ' + 'in order to use file uploads.',
                button: {
                    copy: 'Okay',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeAlertModal();
                    }
                }
            },
            hdPrint: {
                class: 'hdPrint',
                headline: 'Your image is ready!',
                message: 'Click below to view options on printing your image on ' + 'a canvas.',
                button: {
                    copy: 'View Print Options',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeAlertModal();
                    }
                }
            },
            print: {
                class: 'print',
                headline: 'Printing is coming soon!',
                message: 'We\'re working on letting you order prints<br />' + 'on canvas. We hope to get it live soon.',
                button: {
                    copy: 'Okay',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeAlertModal();
                    }
                }
            },
            templateSaved: {
                class: 'templateSaved',
                headline: 'Your template has been saved!',
                message: 'Use it anytime from the Templates tab.',
                button: {
                    copy: 'Okay',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeOpenModals();
                    }
                }
            }
        },
        _backgroundControl: null,
        _backgroundTab: null,
        _boxFitting: {
            single: {
                fontSize: {
                    minimum: '12px',
                    maximum: '48px'
                }
            },
            double: {
                fontSize: [{
                    minimum: '12px',
                    maximum: '48px'
                }, {
                    minimum: '16px',
                    maximum: '24px'
                }]
            }
        },
        _busyModalCopy: {
            cancellingSubscription: 'Cancelling subscription...',
            loggingOut: 'Logging you out...',
            facebookConnection: 'Connecting to Facebook...',
            twitterConnection: 'Connecting to Twitter...',
            creatingImage: 'Saving your image...',
            savingImageAsTemplate: 'Saving your image as a template...',
            creatingPublisherImage: 'Saving your image...',
            disconnectingConnection: 'Updating social settings...',
            loadingEmptyCanvas: 'Preparing new image...',
            loadingImages: 'Loading your images...',
            loadingPhoto: 'Loading photo...',
            loadingFilepickerImage: 'Loading your preview...',
            loadingRemix: 'Loading image...',
            loadingTemplate: 'Loading template...',
            processingCreditCard: 'Securely processing your order<br />This may ' + 'take up to 15 seconds',
            resizing: 'Resizing your image...',
            upgrading: '<i class="icon-lock"></i>Connecting to secure server...'
        },
        _callbacks: {
            connect: function() {},
            upgrade: function() {}
        },
        _canvasDimensionsLimit: {
            height: 385,
            width: 495
        },
        _changeStack: [],
        _confirms: {
            backgroundImageChange: {
                class: 'backgroundImageChange',
                headline: 'Do you want to change your background<br />image to this one?',
                message: 'Are you sure you want to do this?',
                buttons: {
                    yes: {
                        copy: 'Yes'
                    },
                    no: {
                        copy: 'No'
                    }
                }
            },
            watermarkSize: {
                class: 'watermarkSize',
                headline: 'Your watermark is too small',
                message: '...',
                buttons: [{
                    copy: 'Choose another watermark',
                    type: 'button',
                    callback: function(event) {
                        event.preventDefault();
                        log('test');
                    }
                }, {
                    copy: 'Use this one',
                    type: 'text',
                    callback: function(event) {
                        event.preventDefault();
                        App().closeOpenModals();
                    }
                }]
            }
        },
        _currentTab: 'text',
        _defaultImageDocumentJson: {
            layers: [{
                isBackground: true,
                type: 'rectangle',
                filters: [],
                styles: {
                    fillStyle: '#000000',
                    height: '{replace}',
                    width: '{replace}',
                    x: 0,
                    y: 0
                }
            }, {
                styles: {
                    align: 'center',
                    fillStyle: '#ffffff',
                    shadowColor: 'rgba(0,0,0,0.25)',
                    fontFamily: 'Bad Script',
                    fontSize: '28px',
                    fontStyle: 'normal',
                    text: 'move me',
                    x: 'center',
                    y: 'center'
                },
                type: 'text'
            }]
        },
        _defaultLineHeight: 1.2,
        _filtersTab: null,
        _fontFamilies: [{
            name: 'Amaranth',
            bold: true,
            italic: true
        }, {
            name: 'Antic Slab',
            bold: false,
            italic: false
        }, {
            name: 'Baumans',
            bold: false,
            italic: false
        }, {
            name: 'Bevan',
            bold: false,
            italic: false
        }, {
            name: 'Bitter',
            bold: true,
            italic: true
        }, {
            name: 'Black Ops One',
            bold: false,
            italic: false
        }, {
            name: 'Buenard',
            bold: true,
            italic: false
        }, {
            name: 'Butterfly Kids',
            bold: false,
            italic: false
        }, {
            name: 'Codystar',
            bold: false,
            italic: false
        }, {
            name: 'Concert One',
            bold: false,
            italic: false
        }, {
            name: 'Crete Round',
            bold: false,
            italic: true
        }, {
            name: 'Dancing Script',
            bold: true,
            italic: false
        }, {
            name: 'Dosis',
            bold: true,
            italic: false
        }, {
            name: 'Graduate',
            bold: false,
            italic: false
        }, {
            name: 'Helvetica',
            bold: false,
            italic: false,
            webfont: true
        }, {
            name: 'Lilita One',
            bold: false,
            italic: false
        }, {
            name: 'Lily Script One',
            bold: false,
            italic: false
        }, {
            name: 'Merriweather Sans',
            bold: true,
            italic: true
        }, {
            name: 'Monoton',
            bold: false,
            italic: false
        }, {
            name: 'Noticia Text',
            bold: true,
            italic: true
        }, {
            name: 'Open Sans',
            bold: true,
            italic: true
        }, {
            name: 'Oswald',
            bold: true,
            italic: false
        }, {
            name: 'PT Mono',
            bold: false,
            italic: false
        }, {
            name: 'Parisienne',
            bold: false,
            italic: false
        }, {
            name: 'Permanent Marker',
            bold: false,
            italic: false
        }, {
            name: 'Quattrocento Sans',
            bold: true,
            italic: true
        }, {
            name: 'Quicksand',
            bold: true,
            italic: false
        }, {
            name: 'Qwigley',
            bold: false,
            italic: false
        }, {
            name: 'Rokkitt',
            bold: true,
            italic: false
        }, {
            name: 'Satisfy',
            bold: false,
            italic: false
        }, {
            name: 'Shadows Into Light Two',
            bold: false,
            italic: false
        }, {
            name: 'Special Elite',
            bold: false,
            italic: false
        }, {
            name: 'The Girl Next Door',
            bold: false,
            italic: false
        }, {
            name: 'Playfair Display',
            bold: true,
            italic: true
        }, {
            name: 'Cabin Sketch',
            bold: true,
            italic: false
        }, {
            name: 'Emilys Candy',
            bold: false,
            italic: false
        }, {
            name: 'Nixie One',
            bold: false,
            italic: false
        }, {
            name: 'Yellowtail',
            bold: false,
            italic: false
        }, {
            name: 'Bad Script',
            bold: false,
            italic: false
        }, {
            name: 'Roboto Slab',
            bold: true,
            italic: false
        }, {
            name: 'Rye',
            bold: false,
            italic: false
        }, {
            name: 'Josefin Sans',
            bold: true,
            italic: true
        }, {
            name: 'Rock Salt',
            bold: false,
            italic: false
        }, {
            name: 'Damion',
            bold: false,
            italic: false
        }, {
            name: 'Quando',
            bold: false,
            italic: false
        }, {
            name: 'Chewy',
            bold: false,
            italic: false
        }, {
            name: 'Courgette',
            bold: false,
            italic: false
        }, {
            name: 'Comfortaa',
            bold: true,
            italic: false
        }, {
            name: 'Fredoka One',
            bold: false,
            italic: false
        }, {
            name: 'Bowlby One SC',
            bold: false,
            italic: false
        }, {
            name: 'Sacramento',
            bold: false,
            italic: false
        }, {
            name: 'Changa One',
            bold: false,
            italic: true
        }, {
            name: 'Lusitana',
            bold: true,
            italic: false
        }, {
            name: 'Reenie Beanie',
            bold: false,
            italic: false
        }],
        _footer: null,
        _imageDocument: null,
        _isGhost: false,
        _loadedWebFonts: [],
        _maximumCanvasDimensions: {
            height: 385,
            width: 495
        },
        _maximumWatermarkDimensions: {
            tiny: {
                height: 50,
                width: 50
            },
            small: {
                height: 100,
                width: 100
            },
            medium: {
                height: 200,
                width: 200
            },
            large: {
                height: 300,
                width: 300
            }
        },
        _pendingModalCopy: {
            facebookShare: 'Posting to Facebook<br />' + 'Just a few more seconds...',
            loadingFonts: 'Loading 50+ fonts<br />' + 'Just a few more seconds...',
            imageDownload: 'Saving your image as HD<br />' + 'Download will begin shortly',
            hdImagePrint: 'Saving your image as HD and removing watermark. ' + 'Just a few seconds',
            processingHd: 'Saving your image as HD<br />' + 'Just a few more seconds...',
            twitterShare: 'Posting to Twitter<br />' + 'Just a few more seconds...'
        },
        _tips: [{
            copy: 'Images can now<br />be shared in high resolution!',
            type: 'new'
        }, {
            copy: 'When you share images on Facebook<br />& Twitter, ' + 'they\'ll stand out on your timeline like never before!',
            type: 'dyk'
        }, {
            copy: 'Photo tweets are <strong>400%</strong> more<br />likely to ' + 'be shared than text-based ones!',
            type: 'dyk'
        }, {
            copy: 'Start branding images with<br />your company logo.',
            type: 'new'
        }, {
            copy: 'Images get <strong>84%</strong> more<br />click-throughs ' + 'than text-based posts.',
            type: 'dyk'
        }, {
            copy: 'Create and share your micro-content<br />directly to Facebook & Twitter.',
            type: 'new'
        }, {
            copy: 'When you tweet an image<br />it is <strong>150%</strong> ' + 'more likely to be retweeted.',
            type: 'dyk'
        }],
        _facebookErrorModalCopy: {
            top: {
                sharing: 'Error while trying to<br />share to Facebook',
                connecting: 'Something went wrong while connecting to Facebook'
            },
            bottom: {
                unknown: 'This can normally be fixed<br />by <strong>reconnecting</strong> to Facebook',
                empty: 'No new profiles or pages found. You can<br />try logging out ' + 'of Facebook to add more accounts',
                permissions: 'In order to share to Facebook, you need to allow permissions to our app.'
            }
        },
        _twitterErrorModalCopy: {
            unknown: 'This can normally be fixed<br />by <strong>reconnecting</strong> to Twitter',
            limit: 'Tweet cannot be longer than 140 characters',
            duplicate: 'This tweet is a duplicate'
        },
        _pingInterval: 3 * 60 * 1000,
        _pingIntervalReference: null,
        _publisherUxConfig: null,
        _openModals: [],
        _startTime: Math.round(new Date().getTime() / 1000),
        _templatesTab: null,
        _textMaxWidthRatio: 0.95,
        _textTab: null,
        _timeouts: {
            browserUpgrade: 1000,
            ccProcessingStateDelay: 500,
            cookieNotice: 1000,
            disconnectingConnection: 2500,
            loadingApp: 500,
            loadingEmptyCanvas: 2000,
            loadingImages: 1250,
            loggingOut: 2500,
            remixingImage: 1500,
            resizing: 500,
            socialConnection: 2500,
            submittingForm: 2000,
            upgrading: 3000,
            watermarkAutoSaveDelay: 2500,
            watermarkCallout: 15000
        },
        _upsellModalCopy: {
            facebookConnections: 'Upgrade to connect more<br />than 1 Facebook profile',
            twitterConnections: 'Upgrade to connect more<br />than 1 Twitter profile',
            googleConnections: 'Upgrade to connect more<br />than 1 Google profile',
            delete: 'Go PRO to delete<br />your images',
            download: 'Go PRO to download<br />your images in HD',
            filters: 'Upgrade to use<br />PRO filters',
            pagination: 'Go PRO to view<br />all your images',
            fonts: 'Upgrade to use<br />PRO fonts',
            photos: 'Upgrade to use<br />PRO photos',
            templates: 'Upgrade to use<br />templates',
            redirectUrl: 'Upgrade to link images<br />back to your site',
            watermark: 'Go PRO to add<br />your logo'
        },
        _useSmartShare: false,
        _usingReservedFont: false,
        _usingReservedPhoto: false,
        _usingReservedTemplate: false,
        _watermarkTab: null,
        init: function(element, isGhost) {
            var
                _this = this;
            this._isGhost = typeof
            isGhost === 'undefined' ? false : isGhost;
            this._defaultImageDocumentJson.layers[0].styles.height = this._maximumCanvasDimensions.height;
            this._defaultImageDocumentJson.layers[0].styles.width = this._maximumCanvasDimensions.width;
            this._super(element);
            if (this.isFirefox() === true) {
                this._defaultImageDocumentJson.layers[1].styles.shadowColor = 'rgba(0,0,0,0)';
            }
            if (this._isGhost === false) {
                this._fontFamilies.sort(Thu.nameSort);
                this._addTemplateSaveEvent();
                this._addResizeEvents();
                this._addUndoEvent();
                this._addCreateButtonEvent();
                this._addCreatepdfButtonEvent();
                this._addTestButtonEvent();
                this._addBusinessButtonEvent();
                this._addCarButtonEvent();
                this._addInvitationButtonEvent();
                 this._addIndustryButtonEvent();
                this._addNatureButtonEvent();
                this._setupTemplateImgurEvents();
                this._setupTemplateProEvents();
                this._addFlowerButtonEvent();
                this._addTabToggleEvents();
                this._addCloseButtonEvent();
                this._addLockImageClickEvents();
                this._addPostMessageListeners();
                this._addDelayedReferralModalPrompt();
                this._setupPingInterval();
                setTimeout(function() {
                    var
                        config = Thu.get('config'),
                        errorImage = (new Image());
                    errorImage.src = 'https://' + (config.cloudfront.static) + '/static/app/images/backgrounds/milk2.png';
                }, 0);
                setTimeout(function() {
                    var
                        role = Thu.get('config').role;
                    if (role === 'local' || role === 'dev' || role === 'prod') {
                        _this._useSmartShare = true;
                    }
                }, 0);
                setTimeout(function() {
                    _this.trackEmbedType();
                    _this.trackFlow();
                    _this.trackRole();
                    if (Thu.get('loggedInUser') !== false) {
                        App().updateUserMpPeopleData();
                        App().mpIdentify(Thu.get('loggedInUser').id.toInt());
                    }
                    App().mpTrackEvent('App opened');
                }, 0);
                setTimeout(function() {
                    var
                        config = Thu.get('config');
                  //  filepicker.setKey(config.filepicker.key);
                }, 0);
                setTimeout(function() {
                    var
                        config = Thu.get('config');
                    //Stripe.setPublishableKey(config.stripe.publishableKey);
                }, 0);
            }
        },
        _addCloseButtonEvent: function() {
            var
                _this = this;
            this._element.find('.closeButton').click(function(event) {
                event.preventDefault();
                _this.slideAppOutOfView();
            });
        },
        _addDelayedReferralModalPrompt: function() {
            var
                _this = this,
                interval = setInterval(function() {
                    if (typeof $.cookie('referralModalSeen') === 'undefined' && _this.userIsPro() && Thu.get('loggedInUser').stripeCustomerId !== '') {
                        clearInterval(interval);
                        _this.showReferralModal();
                    }
                }, 3 * 60 * 1000);
        },
        _addPostMessageListeners: function() {
            var
                _this = this,
                listener = function(event) {
                    var
                        check = Thu.get('referer') && Thu.get('referer').indexOf(event.origin) === 0;
                    if (check === true) {
                        var
                            data = JSON.parse(event.data);
                        if (data.action === 'open') {
                            _this.slideAppIntoView();
                        } else
                        if (data.action === 'close') {
                            _this.slideAppOutOfView();
                        }
                    }
                };
            if (window.addEventListener) {
                addEventListener('message', listener, false);
            } else {
                attachEvent('onmessage', listener);
            }
        },
        _addUndoEvent: function() {
            var
                _this = this;
            this._element.find('#undoBtn').click(function(event) {
                event.preventDefault();
                _this.undoChange();
            });
        },
        _addTemplateSaveEvent: function() {
            var
                _this = this;
            this._element.find('#saveToTemplates a').click(function(event) {
                event.preventDefault();
                if (App().userIsPro() === true) {
                    App().saveImageAsTemplate();
                } else {
                    App().showUpsellModal('templates');
                }
            });
        },
        saveImageAsTemplate: function() {
            App().createImage(true);
        },
        _addResizeEvents: function() {
            var
                _this = this,
                $dropdown = this._element.find('[name="resize"]');
            $dropdown.selectpicker({
                container: 'body'
            });
            $dropdown.change(function(event) {
                var
                    val = $(this).val(),
                    imageDocument = _this._imageDocument,
                    backgroundLayer = imageDocument.getBackgroundLayer(),
                    width = _this._canvasDimensionsLimit.width,
                    height = _this._canvasDimensionsLimit.height;
                event.preventDefault();
                if (val === 'wide') {
                    height = Math.floor(width / 2);
                } else
                if (val === 'tall') {
                    width = Math.ceil(height / 2);
                } else
                if (val === 'square') {
                    width = height;
                }
                _this._maximumCanvasDimensions = {
                    width: width,
                    height: height
                };
                _this.resize(val === 'original');
                _this._resetSizeCopy();
                App().getElement().find('#createImageBtn').first().focus();
                App().getElement().find('#createImageBtn').first().blur();
            });
            this._resetSizeCopy();
        },
        _addWatermarkCalloutEvents: function() {
            return;
            var
                $callout = this._element.find('.watermarkCallout');
            $callout.tooltip({
                container: '#editor',
                trigger: 'manual'
            }).tooltip('show');
            $callout.data('bs.tooltip').$tip.addClass('watermarkCalloutTooltip');
            var
                cookieCallback = function() {
                    $.cookie('watermarkCalloutHasBeenSeen', '1', {
                        path: '/',
                        domain: '.' + (location.host)
                    });
                };
            $callout.data('bs.tooltip').$tip.find('a.closeLink').click(function(event) {
                event.preventDefault();
                $callout.tooltip('destroy');
                cookieCallback();
            });
            $callout.data('bs.tooltip').$tip.find('a.blue').click(function(event) {
                event.preventDefault();
                App().showUpsellModal('watermark');
                $callout.tooltip('destroy');
                cookieCallback();
                App().trackEvent('Watermark Callout', 'clicked', 'app');
                App().mpTrackEvent('Watermark callout clicked', {});
            });
        },
        _addCarButtonEvent:function() {
             var
                _this = this;
            this._element.find('#car').click(function(event) {
                event.preventDefault();
             // alert("car btn clicked");
                 var
                html = _.template(_this.getTemplate('tabs', 'templates_car'), {});
               
                 templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            return;
            });
        },
        _addBusinessButtonEvent:function() {
             var
                _this = this;
            this._element.find('#business').click(function(event) {
                event.preventDefault();
             // alert("business btn clicked");
                 var
                html = _.template(_this.getTemplate('tabs', 'templates_business'), {});
               
                 templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            return;
            });
        },
        _addInvitationButtonEvent:function() {
             var
                _this = this;
            this._element.find('#invitation').click(function(event) {
                event.preventDefault();
             // alert("invitation btn clicked");
                 var
                html = _.template(_this.getTemplate('tabs', 'templates_invitation'), {});
                 templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            return;
            });
        },
        _setupTemplateProEvents: function() {
            var_setupTemplateImgurEvents:
                _this = this;
              
           // this._element.find('.globalResourceTabContent .template a.preview').click(function(event) {
           this._element.find('#proBtn').click(function(event) {
                event.preventDefault();
               App().showProModal('adf');
               return;
//                var
//                    hasTemplatePermissions = App().userIsPro() == true || $(this).parent().attr('data-image-isfree') === 'true' || Thu.get('publisher') !== false;
//                var
//                    templateSwitchCallback = function(anchor) {
//                        App().addToCallStack();
//                        App().usingReservedTemplate(!hasTemplatePermissions);
//                        App().resetSize();
//                        var
//                            templates = Thu.get('templates'),
//                            imageId = $(anchor).attr('data-imageId').toInt(),
//                            imageObj;
//                        $(templates).each(function(index, templateObj) {
//                           
//                           if (templateObj.id.toInt() === 999195) {
//                                imageObj = templateObj;
//                            }
//                        });
//                        App().remixImage(imageObj, 'loadingTemplate', function() {}, true);
//                    };
//                var
//                    anchor = this;
//                if (App().getImageDocument().getBackgroundLayer().containsManuallyUploadedBackgroundImage() === true) {
//                    App().showConfirmModal('backgroundImageChange', function(event) {
//                        event.preventDefault();
//                        App().closeConfirmModal();
//                        templateSwitchCallback(anchor);
//                    }, function(event) {
//                        event.preventDefault();
//                        App().closeConfirmModal();
//                    });
//                } else {
//                    templateSwitchCallback(anchor);
//                }
            });
        },
         _setupTemplateImgurEvents: function() {
            var_setupTemplateImgurEvents:
                _this = this;
              
           // this._element.find('.globalResourceTabContent .template a.preview').click(function(event) {
           this._element.find('#createImgurBtn').click(function(event) {
                event.preventDefault();
               App().showImgurModal('adf');
               return;
                var
                    hasTemplatePermissions = App().userIsPro() == true || $(this).parent().attr('data-image-isfree') === 'true' || Thu.get('publisher') !== false;
                var
                    templateSwitchCallback = function(anchor) {
                        App().addToCallStack();
                        App().usingReservedTemplate(!hasTemplatePermissions);
                        App().resetSize();
                        var
                            templates = Thu.get('templates'),
                            imageId = $(anchor).attr('data-imageId').toInt(),
                            imageObj;
                        $(templates).each(function(index, templateObj) {
                           
                           if (templateObj.id.toInt() === 999195) {
                                imageObj = templateObj;
                            }
                        });
                        App().remixImage(imageObj, 'loadingTemplate', function() {}, true);
                    };
                var
                    anchor = this;
                if (App().getImageDocument().getBackgroundLayer().containsManuallyUploadedBackgroundImage() === true) {
                    App().showConfirmModal('backgroundImageChange', function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                        templateSwitchCallback(anchor);
                    }, function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                    });
                } else {
                    templateSwitchCallback(anchor);
                }
            });
        },
          _setupTemplateImgurEventsModal: function() {
            var_setupTemplateImgurEvents:
                _this = this;
              
           // this._element.find('.globalResourceTabContent .template a.preview').click(function(event) {
           this._element.find('.createImgurBtn2').click(function(event) {
              
                event.preventDefault();
               //App().showImgurModal('adf');
               
                var
                    hasTemplatePermissions = App().userIsPro() == true || $(this).parent().attr('data-image-isfree') === 'true' || Thu.get('publisher') !== false;
                var
                    templateSwitchCallback = function(anchor) {
                        App().addToCallStack();
                        App().usingReservedTemplate(!hasTemplatePermissions);
                        App().resetSize();
                        var
                            templates = Thu.get('templates'),
                           // imageId = $(anchor).attr('data-imageId').toInt(),
                            imageObj;
                            if($("#imgurlink").val()!=''){
                        $(templates).each(function(index, templateObj) {
                           
                           if (templateObj.id.toInt() === 999195) {
                                imageObj = templateObj;
                                
                                 var configsource=[$("#imgurlink").val()];//namefthumbnailimg
     var configsource2=[$("#imgurlink").val()];//namefimg
//if plain then configsource == configsource2 no thumbnail text
   var documentJson=$.parseJSON(imageObj.documentJson);
      var resizedSrc =  $.parseJSON(imageObj.documentJson)['layers']['1']['resizedSrc'];
      var sourceSrc =  $.parseJSON(imageObj.documentJson)['layers']['1']['sourceSrc'];
           documentJson['layers']['1']['resizedSrc'] = configsource[0];
            documentJson['layers']['1']['sourceSrc'] = configsource[0];
            imageObj.documentJson = JSON.stringify(documentJson);
            imageObj.cloudfrontUrl =  configsource2[0]
           imageObj.displayUrl = configsource2[0]
           
                            }
                        });
                        App().remixImage(imageObj, 'loadingTemplate', function() {}, true);
                    }
                };
                var
                    anchor = this;
                if (App().getImageDocument().getBackgroundLayer().containsManuallyUploadedBackgroundImage() === true) {
                    App().showConfirmModal('backgroundImageChange', function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                        templateSwitchCallback(anchor);
                    }, function(event) {
                        event.preventDefault();
                        App().closeConfirmModal();
                    });
                } else {
                    templateSwitchCallback(anchor);
                }
            });
        },
        _addIndustryButtonEvent:function() {
             var
                _this = this;
            this._element.find('#industry').click(function(event) {
                event.preventDefault();
            //  alert("invitation btn clicked");
                 var
                html = _.template(_this.getTemplate('tabs', 'templates_industry'), {});
                 templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            return;
            });
        },
        
         _addFlowerButtonEvent:function() {
             var
                _this = this;
            this._element.find('#flower').click(function(event) {
                event.preventDefault();
             // alert("invitation btn clicked");
                 var
                html = _.template(_this.getTemplate('tabs', 'templates_flower'), {});
                 templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            return;
            });
        },
       
         _addNatureButtonEvent:function() {
             var
                _this = this;
            this._element.find('#nature').click(function(event) {
                event.preventDefault();
             // alert("invitation btn clicked");
                 var
                html = _.template(_this.getTemplate('tabs', 'templates_nature'), {});
                 templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            return;
            });
        },
         _addTestButtonEvent: function() {
            var
                _this = this;
            this._element.find('#testBtn').click(function(event) {
                event.preventDefault();
             //   console.log("tst");
        // alert("test in event");
             Thu.set("test",122345678);
               var
                html = _.template(_this.getTemplate('tabs', 'templates'), {});//
                //above line gets what template . which tell fast templatesTabTemplate yes. got it aa? one line ala flow chuskovali.ok
                //lets see what gettemplate is doing okk
                //why ask .  so why ante. i want to redraw the thumbs.y. test ane button will say invitationthen invitations will 
                //be populated. if we say business then business thumbs have to come. already i am able to redraw the template area. 
                //template area is the thumbs area. but i am just putting the same html. this function and all functions in this 
                //are js functions that get templates and draw the element and attach the events. vv imp if u dont understand u cant do it 
               //draw elements ante text ah on . thumbs? no any functio in this like lets say createbutton
               //that will get template of create button which will have image and then put it in dom and then attach events like backbone this is 
               //template ante html + js so that u dont need to string concatenate. same old concepts be strong in them. 
               //ok. baga ardam ainda. sarley we will see this first. 
               //chusthunna they are setting and getin i wanna see if i can do the same.
                templateElements = $(jQuery.parseHTML(html.trim())),//this will trim some html and get us the html 
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.html(templateElements);//ippudu em chesa. instead of adding elements. i am ?just populating. i am not appending. got it?
            _this._templatesTab = (new TemplatesTabView(tabElement));
            App().showTemplatesTab();
            //this function gets templateTabTemplate and puts the template, template2 variables data and puts it in which element 
            //i meant which div in dom templatetabtemplate2 lo peduthundi. no honey it gets the template html 
            //that way we dont need to string concatenate. andulo pettadu ye line lo techindi . 27021 ok gud 
            //next em chsindi ye div lo pedthundi abbaa 
            //template is not div . template just makes it easy to build html. it wont show up in dom in backbone like if u remember movies 
            //ye div lo pedthundi . .html ekkada undi adi chudu chalu easy . dont overthink it easy . 
            //teemplateements so what is templateelements div.templatesTab. comon honey dont be so dumb. 
               
                return;
            });
         },
         _addCreatepdfButtonEvent: function() {
              var
                _this = this;
                 this._element.find('#save_pdf').click(function() {
                        // on recupÃ¨re le datatourl et on le stocke dans une variable et on valide le formulmaire
                    //alert("poo");
                         
                                                      document.getElementById('form_save').action = './pdf/tutorial/tuto2.php';
                            document.getElementById('form_dataurl').value= document.getElementsByTagName("canvas")[0].toDataURL("image/png");
                            document.getElementById('form_save').submit();
                            //window.open(dataUrl);
                          
                      });
         },
        _addCreateButtonEvent: function() {
            var
                _this = this;
            this._element.find('#createImageBtn').click(function(event) {
                event.preventDefault();
                        //javascript:void(window.open().location = "http://thunderify.com/createit.php?form_dataurl=document.getElementsByTagName("canvas")[0].toDataURL("image/png"));
                var image = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
               // console.log(image);
                App().showCanvasModal(image);
         
            //  var canvas = document.getElementsByTagName("canvas")[0];

              //  $("#picture").html('<img src="'+image+'"/>'); 
                return;
               
                if (Thu.get('publisher') !== false) {
                    _this.createPublisherImage();
                } else {
                    if (_this.userIsPro() === false && _this._usingReservedPhoto === true) {
                        _this.showUpsellModal('photos');
                    } else {
                        if (_this.userIsPro() === false && _this._usingReservedFont === true) {
                            _this.showUpsellModal('fonts');
                        } else {
                            if (_this.userIsPro() === false && _this._usingReservedTemplate === true) {
                                _this.showUpsellModal('templates');
                            } else {
                                if (Thu.get('loggedInUser') !== false) {
                                    _this._createImageOrPromptForDeliquency();
                                } else {
                                    _this.setConnectCallback(jQuery.proxy(_this._createImageOrPromptForDeliquency, _this));
                                    _this.showConnectModal('register', 'create');
                                }
                            }
                        }
                    }
                }
            });
        },
        _addLockImageClickEvents: function() {
            var
                _this = this;
            this._element.find('#preview .fontUpgradeLock').click(function(event) {
                event.preventDefault();
                App().showUpsellModal('fonts');
            });
            this._element.find('#preview .photoUpgradeLock').click(function(event) {
                event.preventDefault();
                App().showUpsellModal('photos');
            });
            this._element.find('#preview .templateUpgradeLock').click(function(event) {
                event.preventDefault();
                App().showUpsellModal('templates');
            });
        },
        _addTabToggleEvents: function() {
            var
                _this = this;
            this._element.find('ul.tabs li a').click(function(event) {
                event.preventDefault();
                var
                    href = $(this).attr('href'),
                    tabName = href.replace('#', '');
                _this._currentTab = tabName;
                _this.showCurrentTab();
            });
        },
        _clearCanvas: function(drawingTemplate) {
            this._canvas.getElement().removeLayers();
            this._canvas.getElement().drawLayers();
            this._canvas.getElement().clearCanvas();
            this._element.find('div#settings div#background').contents().remove();
            this._element.find('div#settings div.textTab').contents().remove();
            this._element.find('div#settings div.filtersTab').contents().remove();
            this._element.find('div#settings div.watermarkTab').contents().remove();
            if (!drawingTemplate) {
                this._element.find('div#settings div.backgroundTab').contents().remove();
                this._element.find('div#settings div.templatesTab').contents().remove();
            }
            this._element.find('canvas').remove();
            delete
            this._canvas;
        },
        _cookiesEnabled: function() {
            var
                enabled = (navigator.cookieEnabled) ? true : false;
            if (typeof navigator.cookieEnabled == 'undefined' && !enabled) {
                document.cookie = 'canary';
                enabled = (document.cookie.indexOf('canary') != -1) ? true : false;
            }
            return enabled;
        },
        _createImageOrPromptForDeliquency: function() {
            var
                userObj = Thu.get('loggedInUser');
            if (userObj.stripeIsDeliquent.toInt() === 1) {
                this.showAlertModal('deliquent');
            } else {
                this.createImage();
            }
        },
        _resetSizeCopy: function() {
            var
                $current = this._element.find('.resizeDropdownWrapper').find('.filter-option.pull-left'),
                currentCopy = $current.text();
            $current.text(currentCopy.split(' ').shift());
        },
        _resetWatermarkToUsers: function(callback) {
            var
                watermarkLayer = this._imageDocument.getWatermarkLayer();
            watermarkLayer.removeFromImageDocument();
            watermarkLayer.getDrawing().removeFromCanvas();
            var
                watermarkJson = JSON.parse(Thu.get('loggedInUser').watermarkJson),
                newLayer = (new WatermarkLayer(watermarkJson));
            this._imageDocument.addLayer(newLayer);
            newLayer.getDrawing().draw(function() {
                newLayer.getDrawing().bringToFront();
                newLayer.getDrawing().makeDraggable();
                callback && callback();
            });
        },
        _setupPingInterval: function() {
//            var
//                _this = this;
//            this._pingIntervalReference = setInterval(function() {
//                jQuery.get('./ping.php', {
//                    _: $.now()
//                }, function(response) {
//                    if (response.success === true) {
//                        Thu.set('csrfToken', response.data.csrfToken);
//                        _this._element.find('input[name="csrfToken"]').val(response.data.csrfToken);
//                    } else {
//                        if (_this.siteHasBeenLocked(response)) {
//                            _this.showLockedModal();
//                        }
//                    }
//                }, 'json').fail(function() {
//                 //   _this.showErrorModal(false, 'j1lk');
//                });
//            }, this._pingInterval);
        },
        addToCallStack: function() {},
        resetCallStack: function() {
            this._changeStack = [];
        },
        closeAlertModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === AlertModalView) {
                    modalView.close();
                }
            });
        },
        closeBusyModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === BusyModalView) {
                    modalView.close();
                }
            });
        },
        closeCategoryModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === CategoryModalView) {
                    modalView.close();
                }
            });
        },
        closeCC0Modal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === CC0ModalView) {
                    modalView.close();
                }
            });
        },
        closeReferralModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === ReferralModalView) {
                    modalView.close();
                }
            });
        },
        closeConfirmModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === ConfirmModalView) {
                    modalView.close();
                }
            });
        },
        closeCouponCodeModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === CouponCodeModalView) {
                    modalView.close();
                }
            });
        },
        closeCouponModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === CouponModalView) {
                    modalView.close();
                }
            });
        },
        closeCustomUrlModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === CustomUrlModalView) {
                    modalView.close();
                }
            });
        },
        closeFacebookShareModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === FacebookShareModalView) {
                    modalView.close();
                }
            });
        },
        closeOpenModals: function() {
            $(this._openModals).each(function(index, modalView) {
                modalView.close();
            });
        },
        closePendingModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === PendingModalView) {
                    modalView.close();
                }
            });
        },
        closePhotoEditModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === PhotoEditModalView) {
                    modalView.close();
                }
            });
        },
        closeTwitterShareModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === TwitterShareModalView) {
                    modalView.close();
                }
            });
        },
        closeUpsellModal: function() {
            $(this._openModals).each(function(index, modalView) {
                if (modalView.constructor === UpsellModalView) {
                    modalView.close();
                }
            });
        },
        undoChange: function() {
            var
                _this = this,
                lastImageJson = this._changeStack.pop();
            this.setImageDocumentJson(lastImageJson);
            log(lastImageJson);
            this.redrawImage(function() {
                setTimeout(function() {
                    _this._footer.show();
                    setTimeout(function() {
                        _this._canvas.getElement().removeClass('hidden');
                    }, 0);
                }, _this._timeouts.remixingImage);
            });
        },
        createImage: function(savingAsTemplate) {
            var
                _this = this,
                data = {
                    csrfToken: Thu.get('csrfToken'),
                    documentJson: this.getImageDocument().exportToJsonString(),
                    imageString: this.getImageDocument().exportToImageString(),
                    secondsToCreate: Thu.getUnixTimestamp() - this._startTime
                };
            var
                busyModalCopyKey = 'creatingImage',
                showRandomTip = true;
            if (savingAsTemplate) {
                data.userTemplating = 1;
                data.isUserTemplate = 1;
                busyModalCopyKey = 'savingImageAsTemplate';
                showRandomTip = false;
            }
            data['stat-embedType'] = '';
            data['stat-flow'] = '';
            if (typeof query.get('embedType') !== 'undefined') {
                data['stat-embedType'] = query.get('embedType');
            }
            if (typeof query.get('flow') !== 'undefined') {
                data['stat-flow'] = query.get('flow');
            }
            if (Thu.get('sourceUrl') !== false) {
                data.sourceUrl = Thu.get('sourceUrl');
                Thu.set('sourceUrl', false);
            }
            if (Thu.get('sourceImage') !== false) {
                data.sourceImageId = Thu.get('sourceImage').id;
            }
            this.showBusyModal(busyModalCopyKey, showRandomTip);
            var
                previous = (new Date()).getTime();
            jQuery.post('/images', data, function(response) {
                if (response.success === true) {
                    Thu.set('hdImageCreated', false);
                    var
                        callback = function() {
                            _this.trackEvent('Image', 'created', 'app');
                            App().mpTrackEvent('Image created', {
                                _source: 'app',
                                _url: response.data.image.url
                            });
                            var
                                imageObj = response.data.image,
                                userObj = response.data.user;
                            Thu.set('loggedInUser', userObj);
                            App().updateUserMpPeopleData();
                            var
                                img = (new Image());
                            img.onload = function() {
                                var
                                    interval = setInterval(function() {
                                        var
                                            now = (new Date()).getTime();
                                        if ((now - previous) > 3500) {
                                            clearInterval(interval);
                                            if (typeof query.get('hasSaveCallback') !== 'undefined' && query.get('hasSaveCallback').toInt() === 1) {
                                                var
                                                    urls = {
                                                        standard: imageObj.cloudfrontUrl
                                                    };
                                                if (typeof query.get('saveAsHd') !== 'undefined' && query.get('saveAsHd').toInt() === 1) {
                                                    urls.hd = imageObj.cloudfrontUrl.replace(/\.net\//, '.net/hd.');
                                                }
                                                var
                                                    formattedImageObj = {
                                                        urls: urls,
                                                        text: imageObj.text
                                                    },
                                                    data = {
                                                        action: 'saveCallback',
                                                        data: formattedImageObj
                                                    };
                                                window.parent.postMessage(JSON.stringify(data), '*');
                                            } else {
                                                _this.closeOpenModals();
                                                if (savingAsTemplate) {
                                                    Thu.set('userTemplates', response.data.userTemplates);
                                                    App().showTemplatesTab();
                                                    App()._templatesTab.drawUserResourceTab();
                                                    App()._templatesTab.showUserTemplatesTab();
                                                    App().showAlertModal('templateSaved');
                                                } else {
                                                    var
                                                        user = Thu.get('loggedInUser');
                                                    if (_this._useSmartShare === true) {
                                                        _this.showSmartShareModal(imageObj);
                                                    } else {
                                                        _this.showShareModal(imageObj);
                                                    }
                                                }
                                            }
                                        }
                                    }, 50);
                            };
                            img.src = imageObj.displayUrl;
                        };
                    if (_this._useSmartShare === true) {
                        (new Ghost(function(imageString) {
                            callback();
                            jQuery.post('/images/' + (response.data.image.id) + '/hd', {
                                csrfToken: Thu.get('csrfToken'),
                                imageString: imageString
                            }, function(response) {
                                if (response.success === true) {
                                    Thu.set('hdImageCreated', true);
                                } else {
                                    if (App().siteHasBeenLocked(response)) {
                                        App().showLockedModal();
                                    } else {
                                        App().showErrorModal(false, response.failedRules[0].error.reference);
                                    }
                                }
                            }, 'json').fail(function() {
                                App().showErrorModal(false, 'mak5');
                            });
                        }));
                    } else {
                        callback();
                    }
                } else {
                    if (App().siteHasBeenLocked(response)) {
                        App().showLockedModal();
                    } else {
                        _this.showErrorModal(false, response.failedRules[0].error.reference);
                    }
                }
            }, 'json').fail(function() {
                _this.showErrorModal(false, 'u2n3');
            });
        },
        createPublisherImage: function() {
            var
                _this = this,
                data = {
                    csrfToken: Thu.get('csrfToken'),
                    documentJson: this.getImageDocument().exportToJsonString(),
                    imageString: this.getImageDocument().exportToImageString(),
                    publisherId: Thu.get('publisher').id,
                    secondsToCreate: Thu.getUnixTimestamp() - this._startTime
                };
            data['stat-embedType'] = '';
            data['stat-flow'] = '';
            if (typeof query.get('embedType') !== 'undefined') {
                data['stat-embedType'] = query.get('embedType');
            }
            if (typeof query.get('flow') !== 'undefined') {
                data['stat-flow'] = query.get('flow');
            }
            if (Thu.get('sourceUrl') !== false) {
                data.sourceUrl = Thu.get('sourceUrl');
            }
            this.showBusyModal('creatingPublisherImage');
            var
                previous = (new Date()).getTime();
            jQuery.post('/images', data, function(response) {
                if (response.success === true) {
                    Thu.set('hdImageCreated', false);
                    var
                        callback = function() {
                            _this.trackEvent('Image', 'created', 'publisher');
                            App().mpTrackEvent('Image created', {
                                _source: 'publisher'
                            });
                            var
                                imageObj = response.data.image,
                                publisherObj = response.data.publisher;
                            Thu.set('publisher', publisherObj);
                            var
                                img = (new Image());
                            img.onload = function() {
                                var
                                    interval = setInterval(function() {
                                        var
                                            now = (new Date()).getTime();
                                        if ((now - previous) > 3500) {
                                            clearInterval(interval);
                                            if (typeof query.get('hasSaveCallback') !== 'undefined' && query.get('hasSaveCallback').toInt() === 1) {
                                                var
                                                    urls = {
                                                        standard: imageObj.cloudfrontUrl
                                                    };
                                                if (typeof query.get('saveAsHd') !== 'undefined' && query.get('saveAsHd').toInt() === 1) {
                                                    urls.hd = imageObj.cloudfrontUrl.replace(/\.net\//, '.net/hd.');
                                                }
                                                var
                                                    formattedImageObj = {
                                                        urls: urls,
                                                        text: imageObj.text
                                                    },
                                                    data = {
                                                        action: 'saveCallback',
                                                        data: formattedImageObj
                                                    };
                                                window.parent.postMessage(JSON.stringify(data), '*');
                                            } else {
                                                _this.closeOpenModals();
                                                _this.showShareModal(imageObj);
                                            }
                                        }
                                    }, 50);
                            };
                            img.src = imageObj.displayUrl;
                        };
                    if (typeof query.get('saveAsHd') !== 'undefined' && query.get('saveAsHd').toInt() === 1) {
                        (new Ghost(function(imageString) {
                            jQuery.post('/images/' + (response.data.image.id) + '/hd', {
                                csrfToken: Thu.get('csrfToken'),
                                imageString: imageString
                            }, function(response) {
                                if (response.success === true) {
                                    callback();
                                    Thu.set('hdImageCreated', true);
                                } else {
                                    if (App().siteHasBeenLocked(response)) {
                                        App().showLockedModal();
                                    } else {
                                        App().showErrorModal(false, response.failedRules[0].error.reference);
                                    }
                                }
                            }, 'json').fail(function() {
                                App().showErrorModal(false, 'mak5');
                            });
                        }));
                    } else {
                        callback();
                    }
                } else {
                    if (App().siteHasBeenLocked(response)) {
                        App().showLockedModal();
                    } else {
                        _this.showErrorModal(false, response.failedRules[0].error.reference);
                    }
                }
            }, 'json').fail(function() {
                _this.showErrorModal(false, '8b5b');
            });
        },
        drawBackgroundControl: function() {
            var
                html = _.template(this.getTemplate('controls', 'background'), {
                    layer: this.getImageDocument().getBackgroundLayer()
                });
            var
                templateElements = $(jQuery.parseHTML(html.trim())),
                backgroundElement = this._element.find('div#background');
            backgroundElement.append(templateElements);
            this._backgroundControl = (new BackgroundControlView(backgroundElement));
        },
        drawCanvas: function() {
            var
                html = _.template(this.getTemplate('canvas'), {
                    width: this._imageDocument.getBackgroundLayer().getStyle('width'),
                    height: this._imageDocument.getBackgroundLayer().getStyle('height')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#preview').append(element);
            return (new CanvasView(element));
        },
        drawCloudinaryImageAsBackgroundLayer: function(sourceSrc, callback, fit, trackAsUpload) {
        	
      //  alert(2);
            var
                _this = this,
                resizedImg = (new Image()),
                maximumCanvasDimensions = this._maximumCanvasDimensions;
            if (App().userIsLoggedIn() === true && trackAsUpload === true) {
                App().trackUpload(sourceSrc);
            }
            var
                resizedSrc = App().getCloudinaryUrl(sourceSrc, {
                    width: maximumCanvasDimensions.width,
                    height: maximumCanvasDimensions.height,
                    fit: fit
                }, true);
            resizedImg.onload = function() {
                var
                    backgroundLayer = _this._imageDocument.getBackgroundLayer();
                backgroundLayer.removeFromImageDocument();
                backgroundLayer.getDrawing().removeFromCanvas();
                var
                    dimensions = resizedImg.getFittedDimensions(maximumCanvasDimensions);
                var
                    properties = {
                        isBackground: true,
                        type: 'image',
                        filters: [],
                        sourceSrc: sourceSrc,
                        resizedSrc: resizedSrc,
                        styles: {
                            height: dimensions.height,
                            width: dimensions.width,
                            x: 0,
                            y: 0
                        }
                    },
                    newLayer = (new ImageLayer(properties));
                _this._imageDocument.addLayer(newLayer);
               // _this.getFiltersTab().enable();
               // _this.getFiltersTab().reset();
                newLayer.getDrawing().draw(function() {
                    newLayer.getDrawing().sendToBack();
                    _this.getCanvas().resize();
                    callback();
                });
            };
            resizedImg.src = resizedSrc;
        },
        drawFiltersTab: function() {
            var
                html = _.template(this.getTemplate('tabs', 'filters'), {
                    layer: this.getImageDocument().getBackgroundLayer()
                }),
                templateElements = $(jQuery.parseHTML(html.trim())),
                tabElement = App().getElement().find('div.filtersTab');
            tabElement.append(templateElements);
            this._filtersTab = (new FiltersTabView(tabElement));
            this._filtersTab.enable();
            if (this.getImageDocument().getBackgroundLayer().getProperty('type') === 'rectangle') {
                this._filtersTab.disable();
            }
        },
        drawFooter: function() {
            var
                userObj = Thu.get('loggedInUser'),
                html = _.template(this.getTemplate('footer'), {
                    config: Thu.get('config'),
                    user: userObj
                }),
                element = $(jQuery.parseHTML(html.trim()));
        //    this._element.find('div#wrapper').append(element);
            this._footer = (new FooterView(element));
            //this._footer.update();
            this._footer.hide();
        },
        drawFPImageAsBackgroundLayer: function(sourceSrc, fit, callback) {
            var
                _this = this,
                resizedImg = (new Image()),
                maximumCanvasDimensions = this._maximumCanvasDimensions,
                resizedSrc = (sourceSrc) + '/convert' + '?w=' + (maximumCanvasDimensions.width) + '&h=' + (maximumCanvasDimensions.height) + '&fit=' + (fit);
            resizedImg.onload = function() {
                var
                    backgroundLayer = _this._imageDocument.getBackgroundLayer();
                backgroundLayer.removeFromImageDocument();
                backgroundLayer.getDrawing().removeFromCanvas();
                var
                    dimensions = resizedImg.getFittedDimensions(maximumCanvasDimensions);
                var
                    properties = {
                        isBackground: true,
                        type: 'image',
                        filters: [],
                        sourceSrc: sourceSrc,
                        resizedSrc: resizedSrc,
                        styles: {
                            height: dimensions.height,
                            width: dimensions.width,
                            x: 0,
                            y: 0
                        }
                    },
                    newLayer = (new ImageLayer(properties));
                _this._imageDocument.addLayer(newLayer);
           //     _this.getFiltersTab().enable();
           //     _this.getFiltersTab().reset();
                newLayer.getDrawing().draw(function() {
                    newLayer.getDrawing().sendToBack();
                    _this.getCanvas().resize();
                    callback && callback();
                    _this.closeOpenModals();
                    _this._footer.show();
                });
            };
            resizedImg.src = resizedSrc;
        },
        drawFPImageAsWatermarkLayer: function(sourceSrc, callback) {
            var
                _this = this,
                resizedImg = (new Image()),
                watermarkLayer = _this._imageDocument.getWatermarkLayer(),
                previousSize = watermarkLayer.getProperty('size'),
                maximumWatermarkDimensions = this._maximumWatermarkDimensions[previousSize],
                resizedSrc = (sourceSrc) + '/convert' + '?w=' + (maximumWatermarkDimensions.width) + '&h=' + (maximumWatermarkDimensions.height) + '&fit=max';
            this.getWatermarkTab().turnSwitchOn();
            resizedImg.onload = function() {
                var
                    previousXPoisition = watermarkLayer.getStyle('x'),
                    previousYPoisition = watermarkLayer.getStyle('y');
                watermarkLayer.removeFromImageDocument();
                watermarkLayer.getDrawing().removeFromCanvas();
                previousXPoisition = 'left';
                previousYPoisition = 'bottom';
                var
                    dimensions = resizedImg.getFittedDimensions(maximumWatermarkDimensions);
                var
                    properties = {
                        filters: [{
                            properties: {
                                strength: 100
                            },
                            type: 'opacity'
                        }],
                        isWatermark: true,
                        resizedSrc: resizedSrc,
                        size: previousSize,
                        sourceSrc: sourceSrc,
                        styles: {
                            height: dimensions.height,
                            width: dimensions.width,
                            visible: true,
                            x: previousXPoisition,
                            y: previousYPoisition
                        },
                        type: 'image'
                    },
                    newLayer = (new WatermarkLayer(properties));
                _this._imageDocument.addLayer(newLayer);
                newLayer.getDrawing().draw(function() {
                    newLayer.getDrawing().bringToFront();
                    newLayer.getDrawing().makeDraggable();
                    callback();
                    _this.closeOpenModals();
                    _this._footer.show();
                });
            };
            resizedImg.src = resizedSrc;
        },
        drawImage: function(callback, canvas, drawingTemplate) {
            canvas = canvas || this._canvas;
            var
                _this = this;
            canvas.drawBackgroundLayer(function() {
                canvas.drawImageLayers(function() {
                    canvas.drawRectangleLayers();
                    canvas.alignRuleRectangleLayers();
                    canvas.alignInstagramOverlayRectangleLayers();
                    canvas.alignTwitterOverlayRectangleLayers();
                    canvas.drawRuleRectangleLayers();
                    canvas.drawInstagramOverlayRectangleLayers();
                    canvas.drawTwitterOverlayRectangleLayers();
                    canvas.drawTextLayers();
                    _this.drawBackgroundControl();
                    _this.drawTextTab();
                   // _this.drawFiltersTab();
                    _this.drawWatermarkTab();
                    if (_this._isGhost === false && !drawingTemplate) {
                        _this.drawBackgroundTab();
                        _this.drawTemplatesTab();
                    }
                    var
                        watermarkLayer = _this._imageDocument.getWatermarkLayer();
                    watermarkLayer.getDrawing().bringToFront();
                    if (Thu.get('publisher') === false && App().userIsPro() == true) {
                        watermarkLayer.getDrawing().makeDraggable();
                    }
                    callback();
                });
            });
        },
        drawBackgroundTab: function() {
            var
                _this = this;
//            jQuery.get('./photos.php', {}, function(response) {
//                if (response.success === true) {
//                    Thu.set('photos', response.data.photos);
//                    var
//                        html = _.template(_this.getTemplate('tabs', 'background'), {}),
//                        templateElements = $(jQuery.parseHTML(html.trim())),
//                        tabElement = App().getElement().find('div.backgroundTab');
//                    tabElement.append(templateElements);
//                    _this._backgroundTab = (new BackgroundTabView(tabElement));
//                } else {
//                    if (App().siteHasBeenLocked(response)) {
//                        App().showLockedModal();
//                    } else {
//                        App().showErrorModal(false, response.failedRules[0].error.reference);
//                    }
//                }
//            }, 'json').fail(function() {
//                App().showErrorModal(false, 'z1jk');
//            });
        },
        drawTemplatesTab: function() {
            var
                html = _.template(this.getTemplate('tabs', 'templates'), {}),
                templateElements = $(jQuery.parseHTML(html.trim())),
                tabElement = App().getElement().find('div.templatesTab');
            tabElement.append(templateElements);
            this._templatesTab = (new TemplatesTabView(tabElement));
        },
        drawTextTab: function() {
            var
                html = _.template(this.getTemplate('tabs', 'text'), {}),
                templateElements = $(jQuery.parseHTML(html.trim())),
                tabElement = App().getElement().find('div.textTab');
            tabElement.append(templateElements);
            this._textTab = (new TextTabView(tabElement));
        },
        drawWatermarkTab: function() {
            var
                html = _.template(this.getTemplate('tabs', 'watermark'), {
                    watermarkLayer: this.getImageDocument().getWatermarkLayer()
                }),
                templateElements = $(jQuery.parseHTML(html.trim())),
                tabElement = App().getElement().find('div.watermarkTab');
            tabElement.append(templateElements);
            this._watermarkTab = (new WatermarkTabView(tabElement));
            this._watermarkTab.enable();
            if (Thu.get('loggedInUser') === false || Thu.get('loggedInUser').isPro.toInt() === 0) {}
        },
        getBackgroundControl: function() {
            return this._backgroundControl;
        },
        getBackgroundTab: function() {
            return this._backgroundTab;
        },
        getCanvas: function() {
            return this._canvas;
        },
        getCloudinaryUrl: function(sourceSrc, properties, proxy) {
            var
                height = Math.floor(properties.height),
                width = Math.floor(properties.width),
                fit = properties.fit,
                path = sourceSrc.replace(/upload\//, ('upload/' + 'c_' + (fit) + ',' + 'h_' + (height) + ',' + 'w_' + (width) + '/'));
            if (typeof proxy !== 'undefined' && proxy === true) {
                path = path.replace('res.cloudinary.com', Thu.get('config').cloudfront.cloudinary);
            }
            return path;
        },
        getFilepickerUrl: function(sourceSrc, properties) {
            var
                height = Math.floor(properties.height),
                width = Math.floor(properties.width),
                fit = properties.fit;
            return (sourceSrc) ;//+ '/convert?w=' + (width) + '&h=' + (height) + '&' + 'fit=crop';
        },
        getConnectCallback: function() {
            return this._callbacks.connect;
        },
        getDefaultLineHeight: function() {
            return this._defaultLineHeight;
        },
        getTextMaxWidthRatio: function() {
            return this._textMaxWidthRatio;
        },
        getFontFamilies: function() {
            return this._fontFamilies.slice();
        },
        getFontFamily: function(fontFamily) {
            var
                found = false;
            $(this._fontFamilies).each(function(index, font) {
                if (fontFamily === font.name) {
                    found = font;
                }
            });
            return found;
        },
        getFooter: function() {
            return this._footer;
        },
        getFiltersTab: function() {
            return this._filtersTab;
        },
        getImageDocument: function() {
            return this._imageDocument;
        },
        getInitialImageDocumentJson: function(processQueryParams) {
            var
                imageDocumentJson = jQuery.extend(true, {}, this._defaultImageDocumentJson),
                watermarkJson = jQuery.extend(true, {}, Thu.get('config').watermark);
            if (Thu.get('publisher') !== false) {
                if (Thu.get('sourceImage') !== false) {
                    imageDocumentJson = JSON.parse(Thu.get('sourceImage').documentJson);
                } else {
                    imageDocumentJson = JSON.parse(Thu.get('publisher').imageTemplate.documentJson);
                }
                watermarkJson = JSON.parse(Thu.get('publisher').adminUser.watermarkJson);
            } else
            if (Thu.get('sourceImage') !== false) {
                imageDocumentJson = JSON.parse(Thu.get('sourceImage').documentJson);
                if (Thu.get('loggedInUser') !== false) {
                    watermarkJson = JSON.parse(Thu.get('loggedInUser').watermarkJson);
                }
            } else {
                if (Thu.get('loggedInUser') !== false) {
                    watermarkJson = JSON.parse(Thu.get('loggedInUser').watermarkJson);
                }
            }
            if (processQueryParams === true) {
                var
                    sourceUrl = query.get('sourceUrl');
                Thu.set('sourceUrl', sourceUrl);
                var
                    referer = query.get('referer');
                Thu.set('referer', referer);
                var
                    text = query.get('text');
                if (typeof text === 'undefined') {
                    text = [];
                } else {
                    if (typeof text === 'string') {
                        text = [text];
                    } else {
                        var
                            pieces = [];
                        $(text).each(function(index, val) {
                            if (index < 2) {
                                pieces.push(val);
                            }
                        });
                        text = pieces;
                    }
                }
                var
                    lastTextLayer;
                if (text.length > 0) {
                    var
                        textStr;
                    $(imageDocumentJson.layers).each(function(index, layer) {
                        if (layer.type === 'text') {
                            lastTextLayer = layer;
                            textStr = text.shift();
                            if (typeof textStr === 'undefined') {
                                imageDocumentJson.layers.splice(index, 1);
                            } else {
                                layer.styles.text = textStr;
                            }
                        }
                    });
                    if (text.length > 0) {
                        var
                            newTextLayer;
                        $(text).each(function(index, val) {
                            newTextLayer = jQuery.extend(true, {}, lastTextLayer);
                            newTextLayer.styles.text = val;
                            imageDocumentJson.layers.push(newTextLayer);
                        });
                    }
                }
                var
                    config = query.get('config');
                if (typeof config !== 'undefined') {
                    config = JSON.parse(config);
                    this._publisherUxConfig = (new PublisherUxConfig(config));
                    (new ConfigStyleBlock(this._publisherUxConfig.getAll())).insert();
                }
            }
            imageDocumentJson.layers.push(watermarkJson);
            return imageDocumentJson;
        },
        getMaximumCanvasDimensions: function() {
            return this._maximumCanvasDimensions;
        },
        upscaleMaximumCanvasDimensions: function() {
            return {
                width: this._maximumCanvasDimensions.width * 2,
                height: this._maximumCanvasDimensions.height * 2
            };
        },
        getMaximumWatermarkDimensions: function(size) {
            return this._maximumWatermarkDimensions[size];
        },
        getOpenModals: function() {
            return this._openModals;
        },
        getPublisherUxConfig: function() {
            return this._publisherUxConfig;
        },
        getRandomTip: function() {
            var
                numberOfOptions = this._tips.length;
            return this._tips[Math.floor((Math.random() * numberOfOptions))];
        },
        getRequiredFacebookPermissions: function() {
            return ['manage_pages', 'read_insights', 'publish_actions'];
        },
        getTemplate: function() {
            var
                args = arguments,//arguments passed to the function. we can pass any number of arguments this way 
                //we dint put function(arg1, arg2) ade adugudama nukunna
                ref = this.getTemplates();//calling gettemplates 
            $(args).each(function(index, arg) { //first time index is 0 and arg is tabs and second time index is 1 and arg is template
                ref = ref[arg];//vvv imp first time ref is getTemplates.tabs .. second time ref is vv imp tell getTemplates.tabs.template ok so 
                //wat is the value tell now. from below function
            });
            return ref;
            
            
        },
        getTemplates: function() {//get templates is here. getTemplate('tabs', 'templates'),
            return {
                admin: {
                    categories: this._element.find('#categoriesAdminTemplate').html(),
                    coupons: this._element.find('#couponsAdminTemplate').html(),
                    images: this._element.find('#imagesAdminTemplate').html(),
                    photos: this._element.find('#photosAdminTemplate').html(),
                    users: this._element.find('#usersAdminTemplate').html()
                },
                canvas: this._element.find('#canvasTemplate').html(),
                controls: {
                    background: this._element.find('#backgroundControlTemplate').html(),
                    text: this._element.find('#textControlTemplate').html()
                },
                emails: {
                    share: this._element.find('#shareEmailTemplate').html()
                },
                footer: this._element.find('#footerTemplate').html(),
                images: this._element.find('#imagesTemplate').html(),
                modals: {
                    account: this._element.find('#accountModalTemplate').html(),
                    alert: this._element.find('#alertModalTemplate').html(),
                    cC0: this._element.find('#cC0ModalTemplate').html(),
                    browserUpgrade: this._element.find('#browserUpgradeModalTemplate').html(),
                    busy: this._element.find('#busyModalTemplate').html(),
                    category: this._element.find('#categoryModalTemplate').html(),
                    confirm: this._element.find('#confirmModalTemplate').html(),
                    connect: this._element.find('#connectModalTemplate').html(),
                    cookieNotice: this._element.find('#cookieNoticeModalTemplate').html(),
                    coupon: this._element.find('#couponModalTemplate').html(),
                    couponCode: this._element.find('#couponCodeModalTemplate').html(),
                    couponCodeSuccess: this._element.find('#couponCodeSuccessModalTemplate').html(),
                    customUrl: this._element.find('#customUrlModalTemplate').html(),
                    error: this._element.find('#errorModalTemplate').html(),
                    facebookConnections: this._element.find('#facebookConnectionsModalTemplate').html(),
                    facebookError: this._element.find('#facebookErrorModalTemplate').html(),
                    facebookShare: this._element.find('#facebookShareModalTemplate').html(),
                    facebookSuccess: this._element.find('#facebookSuccessModalTemplate').html(),
                    images: this._element.find('#imagesModalTemplate').html(),
                    locked: this._element.find('#lockedModalTemplate').html(),
                    pending: this._element.find('#pendingModalTemplate').html(),
                    photoEdit: this._element.find('#photoEditModalTemplate').html(),
                    referral: this._element.find('#referralModalTemplate').html(),
                    share: this._element.find('#shareModalTemplate').html(),
                    smartShare: this._element.find('#smartShareModalTemplate').html(),
                    twitterError: this._element.find('#twitterErrorModalTemplate').html(),
                    twitterShare: this._element.find('#twitterShareModalTemplate').html(),
                    twitterSuccess: this._element.find('#twitterSuccessModalTemplate').html(),
                    upgrade: this._element.find('#upgradeModalTemplate').html(),
                    modal_canvas:this._element.find('#canvasModalTemplate').html(),
                    modal_imgur:this._element.find('#imgurModalTemplate').html(),
                    modal_pro:this._element.find('#proModalTemplate').html(),
                    upsell: this._element.find('#upsellModalTemplate').html()
                },
                tabs: {
                    filters: this._element.find('#filtersTabTemplate').html(),
                    text: this._element.find('#textTabTemplate').html(),
                    background: this._element.find('#backgroundTabTemplate').html(),
                    templates: this._element.find('#templatesTabTemplate').html(),
                    templates_business:this._element.find('#businesstemplate').html(),
                     templates_car:this._element.find('#carsTemplate').html(),
                      templates_industry:this._element.find('#industryTemplate').html(),
                     templates_invitation:this._element.find('#invitationtemplate').html(),
                     templates_nature:this._element.find('#naturetemplate').html(),
                     //templates_water:this._element.find('#watertemplate').html(),
                     templates_flower:this._element.find('#flowerstemplate').html(),
                    watermark: this._element.find('#watermarkTabTemplate').html()
                }
            };
        },
        getTemplatesTab: function() {
            return this._templatesTab;
        },
        getTextTab: function() {
            return this._textTab;
        },
        getTimeout: function(key) {
            return this._timeouts[key];
        },
        getUpgradeCallback: function() {
            return this._callbacks.upgrade;
        },
        getUserRole: function() {
            var
                role = 'guest';
            if (Thu.get('loggedInUser') !== false) {
                role = 'registered';
                if (Thu.get('loggedInUser').isPro.toInt() === 1) {
                    role = 'pro';
                }
            }
            return role;
        },
        getWatermarkTab: function() {
            return this._watermarkTab;
        },
        go: function(callbackPre) {
            var
                _this = this;
            if (this.validBrowser() === true && this._cookiesEnabled() === true) {
                if (this._isGhost === false) {
                    var
                        imageDocumentJson = this.getInitialImageDocumentJson(true);
                    this.setImageDocumentJson(imageDocumentJson);
                }
                this.drawFooter();
                this._canvas = this.drawCanvas();
                var
                    fontsToLoad = _this._fontFamilies.slice(0, 15);
                fontsToLoad = jQuery.merge(fontsToLoad, _this._imageDocument.getActiveFonts());
                this.loadWebFonts(fontsToLoad, function() {
                    _this.showCurrentTab();
                    _this.trackEvent('Speed', 'app.ready', 'milliseconds', (new Date()).getTime() - start);
                    _this.drawImage(function() {
                        setTimeout(function() {
                            var
                                callback = function() {
                                    _this.slideAppIntoView();
                                    _this._element.find('.customModal').remove();
                                    _this._footer.show();
                                    setTimeout(function() {
                                        _this._canvas.getElement().removeClass('hidden');
                                        _this._canvas.alignMargins();
                                    }, 0);
                                    if (query.get('flow') === 'checkout' && (Thu.get('loggedInUser') === false || Thu.get('loggedInUser').isPro.toInt() === 0)) {
                                        _this.showAppropriateUpgradeStep('checkout');
                                    }
                                    if (query.get('route') === 'login' && (Thu.get('loggedInUser') === false)) {
                                        _this.showConnectModal('login', 'register');
                                    }
                                    var
                                        publisher = Thu.get('publisher');
                                    if (publisher !== false && publisher.id.toInt() === 2) {
                                        _this.showBackgroundTab(false);
                                    }
                                    setTimeout(function() {
                                        if (_this.userIsPro() === false && typeof $.cookie('watermarkCalloutHasBeenSeen') === 'undefined' && App().getOpenModals().length === 0) {
                                            if (Thu.get('publisher') === false) {
                                                _this._addWatermarkCalloutEvents();
                                            }
                                        }
                                    }, _this._timeouts.watermarkCallout);
                                    callbackPre && callbackPre();
                                };
                            if (_this._isGhost === false) {
                                if (Thu.get('imageUrl') === false) {
                                    callback();
                                } else {
                                    _this.drawCloudinaryImageAsBackgroundLayer(Thu.get('imageUrl'), function() {
                                        App().getImageDocument().getBackgroundLayer().setProperty('wasManuallyUploaded', true);
                                        callback();
                                    }, 'limit', true);
                                }
                            } else {
                                callback();
                            }
                        }, _this._isGhost === true ? 0 : _this._timeouts.loadingApp);
                    });
                });
            } else {
                if (this.validBrowser() === false) {
                    setTimeout(function() {
                        _this.showBrowserUpgradeModal();
                    }, _this._timeouts.browserUpgrade);
                } else
                if (this._cookiesEnabled() === false) {
                    setTimeout(function() {
                        _this.showCookieNoticeModal();
                    }, _this._timeouts.cookieNotice);
                }
            }
        },
        hideFontUpgradeImage: function() {
            this._element.find('.fontUpgradeLock').addClass('hidden');
        },
        hidePhotoUpgradeImage: function() {
            this._element.find('.photoUpgradeLock').addClass('hidden');
        },
        hideTemplateUpgradeImage: function() {
            this._element.find('.templateUpgradeLock').addClass('hidden');
        },
        isFirefox: function() {
            return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        },
        isGhost: function() {
            return this._isGhost;
        },
        isIe: function() {
            var
                userAgent = navigator.userAgent;
            return userAgent.match(/msie/i) !== null || userAgent.match(/trident\/7/i) !== null;
        },
        isSafari5x: function() {
            var
                userAgent = navigator.userAgent;
            return userAgent.match(/Safari\//i) !== null && userAgent.match(/Version\/5/i) !== null;
        },
        isUsingReservedFont: function() {
            return this._usingReservedFont
        },
        isUsingReservedPhoto: function() {
            return this._usingReservedPhoto
        },
        isUsingReservedTemplate: function() {
            return this._usingReservedTemplate
        },
        loadEmptyCanvas: function() {
            var
                _this = this,
                imageJson;
            Thu.set('sourceImage', false);
            imageJson = this.getInitialImageDocumentJson(false);
            this.showBusyModal('loadingEmptyCanvas');
            this.setImageDocumentJson(imageJson);
            this.redrawImage(function() {
                setTimeout(function() {
                    _this.closeOpenModals();
                    _this._footer.show();
                    setTimeout(function() {
                        _this._canvas.getElement().removeClass('hidden');
                    }, 0);
                }, _this._timeouts.loadingEmptyCanvas);
            });
        },
        loadWebFonts: function(fonts, callback) {
            if (this._isGhost === true) {
                callback && callback();
            } else {
                if (fonts.length === 0) {
                    callback && callback();
                } else {
                    var
                        font = fonts.shift(),
                        families = [];
                    if (typeof font.webfont === 'undefined' && this._loadedWebFonts.indexOf(font) === -1) {
                        this._loadedWebFonts.push(font);
                        families.push(font.name);
                        if (font.bold) {
                            families.push((font.name) + ':b');
                        }
                        if (font.italic) {
                            families.push((font.name) + ':i');
                        }
                        if (window.isChrome() === true) {
                            App().getFontFamily(font.name).italic = true;
                        }
                        WebFont.load({
                            active: function() {
                                App().loadWebFonts(fonts, callback);
                            },
                            google: {
                                families: families
                            },
                            timeout: 5000
                        });
                    } else {
                        App().loadWebFonts(fonts, callback);
                    }
                }
            }
        },
        registerUser: function(userObj, callback) {
            var
                facebookAdId = 6018804392714,
                val = 0,
                img = new
            Image(1, 1), path = 'https://www.facebook.com/offsite_event.php' + '?id=' + (facebookAdId) + '&amp;value=' + (val) + '&amp;currency=USD';
            img.src = path;
            callback && callback();
        },
        logUserIn: function(userObj, uploads, callback) {
            Thu.set('loggedInUser', userObj);
            Thu.set('uploads', uploads);
            this.trackRole();
            this._footer.update();
            this._backgroundTab.drawUploadsResourceTab();
            this._templatesTab.drawUserResourceTab();
            if (userObj.isPro.toInt() === 1) {
                var
                    _this = this;
                this.hideFontUpgradeImage();
                this.hidePhotoUpgradeImage();
                this._backgroundTab.refreshCategory();
                this.hideTemplateUpgradeImage();
                this._resetWatermarkToUsers(function() {
                    _this.getWatermarkTab().enable();
                    callback && callback();
                });
            } else {
                callback && callback();
            }
        },
        publishPermissionGiven: function(permissions) {
            if (!permissions.data) {
                return false;
            }
            if (permissions.data.length === 0) {
                return false;
            }
            for (var
                    x = 0, l = permissions.data.length, p; x < l; ++x) {
                p = permissions.data[x];
                if (p.permission === 'publish_actions' && p.status === 'granted') {
                    return true;
                }
            }
            return false;
        },
        redrawImage: function(callback, drawingTemplate) {
            this._clearCanvas(drawingTemplate);
            this._canvas = this.drawCanvas();
            this.drawImage(callback, this._canvas, drawingTemplate);
        },
        remixImage: function(imageObj, busyModalCopyKey, callback, drawingTemplate) {
            var
                _this = this,
                imageJson;
            Thu.set('sourceImage', imageObj);
            imageJson = this.getInitialImageDocumentJson(false);
            this.showBusyModal(busyModalCopyKey);
            this.setImageDocumentJson(imageJson);
            this.loadWebFonts(this._imageDocument.getActiveFonts(), function() {
                _this.redrawImage(function() {
                    setTimeout(function() {
                        _this.closeOpenModals();
                        _this._footer.show();
                        setTimeout(function() {
                            _this._canvas.getElement().removeClass('hidden');
                            callback && callback();
                        }, 0);
                    }, _this._timeouts.remixingImage);
                }, drawingTemplate);
            });
        },
        resetSize: function() {
            this._maximumCanvasDimensions = {
                width: this._canvasDimensionsLimit.width,
                height: this._canvasDimensionsLimit.height
            };
            var
                $dropdown = this._element.find('[name="resize"]');
            $dropdown.selectpicker('val', 'original');
            this._resetSizeCopy();
        },
        resetStartTime: function() {
            this._startTime = Thu.getUnixTimestamp();
        },
        resize: function(resizingToOriginal) {
            var
                _this = this,
                backgroundLayer = this._imageDocument.getBackgroundLayer();
            if (backgroundLayer.getProperty('type') !== 'rectangle') {
                var
                    sourceSrc = backgroundLayer.getProperty('sourceSrc'),
                    isCloudinary = sourceSrc.match('cloudinary.com') !== null;
                if (isCloudinary) {
                    var
                        fill;
                    if (resizingToOriginal) {
                        App().resetSize();
                    }
                    fill = 'lfill';
                    if (backgroundLayer.getProperty('wasManuallyUploaded') === false) {
                        fill = 'lfill';
                    }
                    App().drawCloudinaryImageAsBackgroundLayer(sourceSrc, function() {}, fill, false);
                } else {
                    var
                        fit = 'crop';
                    if (resizingToOriginal) {
                        App().resetSize();
                        fit = 'max';
                    }
                    App().drawFPImageAsBackgroundLayer(sourceSrc, fit, function() {});
                }
            } else {
                var
                    dimensions = {
                        width: this._maximumCanvasDimensions.width,
                        height: this._maximumCanvasDimensions.height
                    };
                backgroundLayer.setStyles(dimensions);
                backgroundLayer.getDrawing().refreshStyles(['width', 'height']);
                App().getCanvas().resize();
            }
        },
        setConnectCallback: function(callback) {
            this._callbacks.connect = callback;
        },
        setImageDocument: function(imageDocument) {
            this._imageDocument = imageDocument;
        },
        setImageDocumentJson: function(imageDocumentJson) {
            if (this._imageDocument !== null) {
                delete
                this._imageDocument;
            }
            this._imageDocument = (new ImageDocument(imageDocumentJson));
        },
        setUpgradeCallback: function(callback) {
            this._callbacks.upgrade = callback;
        },
        showAccountModal: function(defaultTab) {
            var
                html = _.template(this.getTemplate('modals', 'account'), {
                    user: Thu.get('loggedInUser'),
                    csrfToken: Thu.get('csrfToken')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            App().mpTrackEvent('Account modal shown');
            var
                modalView = (new AccountModalView(element));
            if (typeof defaultTab === 'undefined') {
                modalView.showCurrentTab();
            } else {
                modalView.showTab(defaultTab);
            }
            this._openModals.push(modalView);
            this._footer.hide();
        },
        showAppropriateUpgradeStep: function(connectModalState) {
            var
                _this = this,
                directCheckoutFlow = connectModalState === 'checkout';
            if (Thu.get('loggedInUser') !== false) {
                this.showUpgradeModal(false, directCheckoutFlow);
            } else {
                this.showConnectModal('register', connectModalState);
                this.setConnectCallback(function() {
                    if (Thu.get('loggedInUser').isPro.toInt() === 0) {
                        _this.showUpgradeModal(false, directCheckoutFlow);
                    }
                });
            }
        },
        showBackgroundTab: function(trackPageView) {
            if (typeof $.cookie('weeklySnapsPromoSeen') === 'undefined') {
                if (Thu.get('publisher') === false) {
                    if (Thu.get('loggedInUser') !== false && false) {
                        $.cookie('weeklySnapsPromoSeen', '1', {
                            path: '/',
                            domain: '.' + (location.host)
                        });
                        App().showAlertModal('weeklySnaps');
                    }
                }
            }
            if (typeof $.cookie('cC0PromoSeen') === 'undefined') {
                if (Thu.get('publisher') === false) {
                    $.cookie('cC0PromoSeen', '1', {
                        path: '/',
                        domain: '.' + (location.host),
                        expires: 365 * 2
                    });
                    App().showCC0Modal();
                }
            }
            this._currentTab = 'background';
            this._element.find('ul.tabs li.active').removeClass('active');
            this._element.find('ul.tabs li.background').addClass('active');
            this._element.find('div.tabContent > div').addClass('hidden');
            this._element.find('div.tabContent > div.backgroundTab').removeClass('hidden');
            this._element.find('div.tabContent > div.backgroundTab div.photos').trigger('scroll');
            if (typeof trackPageView === 'undefined' || trackPageView === true) {
                App().trackView('/app/background');
                App().mpTrackEvent('Background tab shown');
            }
        },
        showBrowserUpgradeModal: function() {
            var
                html = _.template(this.getTemplate('modals', 'browserUpgrade'), {}),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new BrowserUpgradeModalView(element));
            this._openModals.push(modalView);
            App().trackView('/app/browserUpgrade');
            App().mpTrackEvent('Browser upgrade modal shown');
        },
        showCanvasModal: function(copyKey) {
            var
                html = _.template(this.getTemplate('modals', 'modal_canvas'), {
                    copyKey: copyKey
                   
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new BusyModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/busy/' + (copyKey));
            App().mpTrackEvent('Busy modal shown', {
                _copyKey: copyKey
            });
        },
             showImgurModal: function(copyKey) {
            var
                html = _.template(this.getTemplate('modals', 'modal_imgur'), {
                    copyKey: copyKey
                   
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ImgurModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/busy/' + (copyKey));
            App().mpTrackEvent('Busy modal shown', {
                _copyKey: copyKey
            });
        },
          showProModal: function(copyKey) {
            var
                html = _.template(this.getTemplate('modals', 'modal_pro'), {
                    copyKey: copyKey
                   
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ImgurModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/busy/' + (copyKey));
            App().mpTrackEvent('Busy modal shown', {
                _copyKey: copyKey
            });
        },
        showBusyModal: function(copyKey, showRandomTip) {
            var
                html = _.template(this.getTemplate('modals', 'busy'), {
                    copyKey: copyKey,
                    copy: this._busyModalCopy[copyKey],
                    showRandomTip: showRandomTip
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new BusyModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/busy/' + (copyKey));
            App().mpTrackEvent('Busy modal shown', {
                _copyKey: copyKey
            });
        },
        showCategoryModal: function(callback) {
            var
                html = _.template(this.getTemplate('modals', 'category'), {
                    csrfToken: Thu.get('csrfToken')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CategoryModalView(element, callback));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/category');
            App().mpTrackEvent('Category modal shown');
        },
        showCookieNoticeModal: function() {
            var
                html = _.template(this.getTemplate('modals', 'cookieNotice'), {}),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CookieNoticeModalView(element));
            this._openModals.push(modalView);
            App().trackView('/app/cookieNotice');
            App().mpTrackEvent('Cookie notice modal shown');
        },
        showCouponModal: function(callback) {
            var
                html = _.template(this.getTemplate('modals', 'coupon'), {
                    csrfToken: Thu.get('csrfToken')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CouponModalView(element, callback));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/coupon');
            App().mpTrackEvent('Coupon modal shown');
        },
        showCouponCodeModal: function(callback) {
            var
                html = _.template(this.getTemplate('modals', 'couponCode'), {
                    csrfToken: Thu.get('csrfToken'),
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CouponCodeModalView(element, callback));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/couponCode');
            App().mpTrackEvent('Coupon code modal shown');
        },
        showCouponCodeSuccessModal: function(couponObj) {
            var
                html = _.template(this.getTemplate('modals', 'couponCodeSuccess'), {
                    couponObj: couponObj,
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CouponCodeSuccessModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/couponCodeSuccess');
            App().mpTrackEvent('Coupon code success modal shown', {
                _couponCode: couponObj.code
            });
        },
        showCustomUrlModal: function(imageObj, callback) {
            var
                html = _.template(this.getTemplate('modals', 'customUrl'), {
                    csrfToken: Thu.get('csrfToken'),
                    image: imageObj
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CustomUrlModalView(element, callback));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/customUrl');
            App().mpTrackEvent('Custom url modal shown');
        },
        showConnectModal: function(type, state) {
            var
                html = _.template(this.getTemplate('modals', 'connect'), {
                    config: Thu.get('config'),
                    csrfToken: Thu.get('csrfToken'),
                    imageString: this.getImageDocument().exportToImageString()
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ConnectModalView(element));
            this._openModals.push(modalView);
            if (state === 'upgrade') {
                modalView.showUpgradeState();
            } else
            if (state === 'checkout') {
                modalView.showCheckoutState();
            } else
            if (state === 'create') {
                modalView.showCreateState();
            } else
            if (state === 'register') {
                modalView.showRegisterState();
            } else
            if (state === 'testimonials') {
                modalView.showTestimonialsState();
            }
            var
                loginOverride = false;
            if (state === 'create' && typeof $.cookie('isLoggedIn') !== 'undefined') {
                loginOverride = true;
            }
            App().mpTrackEvent('Connect modal shown', {
                _state: state
            });
            if (type === 'login' || loginOverride) {
                modalView.showLoginForm();
            } else
            if (type === 'register') {
                modalView.showRegisterForm();
            } else
            if (type === 'resetPassword') {
                modalView.showResetPasswordForm();
            }
            this._footer.hide();
        },
        showCurrentTab: function() {
            var
                capitalized = this._currentTab.charAt(0).toUpperCase() + this._currentTab.slice(1),
                functionName = 'show' + (capitalized) + 'Tab';
            this[functionName]();
            this._element.find('#editor').attr('class', '');
            this._element.find('#editor').addClass((this._currentTab) + 'TabVisible');
        },
        showErrorModal: function(copy, referenceCode, headline) {
            var
                html = _.template(this.getTemplate('modals', 'error'), {
                    headline: headline || 'Uh oh. Something bad happened.',
                    copy: copy || 'Please try again',
                    referenceCode: referenceCode
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ErrorModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/error/' + (referenceCode));
            App().mpTrackEvent('Error modal shown', {
                _copy: copy,
                _referenceCode: referenceCode
            });
        },
        showFacebookConnectionsModal: function(connections) {
            var
                html = _.template(this.getTemplate('modals', 'facebookConnections'), {
                    connections: connections,
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new FacebookConnectionsModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/facebookConnections');
            App().mpTrackEvent('Facebook connections modal shown');
        },
        showFacebookErrorModal: function(facebookTopErrorKey, facebookBottomErrorKey) {
            var
                html = _.template(this.getTemplate('modals', 'facebookError'), {
                    topCopy: this._facebookErrorModalCopy.top[facebookTopErrorKey],
                    bottomCopy: this._facebookErrorModalCopy.bottom[facebookBottomErrorKey]
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new FacebookErrorModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/facebookError');
            App().mpTrackEvent('Facebook error modal shown', {
                _facebookTopErrorKey: facebookTopErrorKey,
                _facebookBottomErrorKey: facebookBottomErrorKey
            });
        },
        showFacebookShareModal: function(imageObj) {
            var
                html = _.template(this.getTemplate('modals', 'facebookShare'), {
                    csrfToken: Thu.get('csrfToken'),
                    image: imageObj,
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new FacebookShareModalView(element, imageObj));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/facebookShare');
            App().mpTrackEvent('Facebook share modal shown');
        },
        showFacebookSuccessModal: function(shareId, connectionObj) {
            var
                html = _.template(this.getTemplate('modals', 'facebookSuccess'), {
                    connection: connectionObj,
                    shareId: shareId,
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new FacebookSuccessModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/facebookSuccess');
            App().mpTrackEvent('Facebook success modal shown', {
                _shareId: shareId
            });
        },
        showFilepicker: function(callback, multiple) {
            var
                _this = this,
                options = {
                    mimetypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
                    container: 'window',
                    services: ['COMPUTER', 'FACEBOOK', 'URL', 'INSTAGRAM', 'IMAGE_SEARCH'],
                    openTo: 'COMPUTER',
                    multiple: multiple
                };
            if (multiple === true) {
                options.maxFiles = 250;
            }
            filepicker.pickAndStore(options, {
                location: 'S3',
                access: 'public'
            }, function(inkBlobs) {
                if (multiple === false) {
                    var
                        InkBlob = inkBlobs[0],
                        key = InkBlob.url.split('/').pop(),
                        sourceSrc = 'https://' + (Thu.get('config').cloudfront.filepicker) + '/api/file/' + (key);
                    _this.showBusyModal('loadingFilepickerImage');
                    callback(sourceSrc, InkBlob);
                } else {
                    _this.showBusyModal('loadingFilepickerImage');
                    callback(inkBlobs);
                }
            }, function(FPError) {
                log(FPError);
                log(FPError.toString());
            });
        },
        showFiltersTab: function() {
            this._currentTab = 'filters';
            this._element.find('ul.tabs li.active').removeClass('active');
            this._element.find('ul.tabs li.filters').addClass('active');
            this._element.find('div.tabContent > div').addClass('hidden');
            this._element.find('div.tabContent > div.filtersTab').removeClass('hidden');
            App().trackView('/app/filters');
            App().mpTrackEvent('Filters tab shown');
        },
        showFontUpgradeImage: function() {
            var
                $lock = this._element.find('.fontUpgradeLock');
            $lock.removeClass('hidden');
            var
                bottom = (this._element.find('#preview').css('height').toInt() - this._canvas.getElement().css('height').toInt()) / 2;
            $lock.css('bottom', Math.round(bottom));
            var
                right = (this._element.find('#preview').css('width').toInt() - this._canvas.getElement().css('width').toInt()) / 2;
            $lock.css('right', Math.round(right));
        },
        showImagesModal: function() {
            var
                userId = Thu.get('loggedInUser').id.toInt(),
                html = _.template(this.getTemplate('modals', 'images'), {}),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ImagesModalView(element));
            modalView.load('/images?userId=' + (userId));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/images');
            App().mpTrackEvent('Images modal shown');
        },
        showLockedModal: function() {
            var
                html = _.template(this.getTemplate('modals', 'locked'), {}),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new LockedModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/locked');
            App().mpTrackEvent('Locked modal shown');
            clearInterval(this._pingIntervalReference);
        },
        showPendingModal: function(copyKey) {
            var
                html = _.template(this.getTemplate('modals', 'pending'), {
                    copy: this._pendingModalCopy[copyKey]
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new PendingModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/pending/' + (copyKey));
            App().mpTrackEvent('Pending modal shown', {
                _copyKey: copyKey
            });
        },
        showPhotoEditModal: function(photoId, callback) {
            var
                _this = this;
            this.showBusyModal('loadingPhoto');
            jQuery.get('/photos/' + (photoId), {}, function(response) {
                var
                    html = _.template(_this.getTemplate('modals', 'photoEdit'), {
                        csrfToken: Thu.get('csrfToken'),
                        markup: response
                    }),
                    element = $(jQuery.parseHTML(html.trim()));
                _this._element.find('#body').append(element);
                _this.closeBusyModal();
                var
                    modalView = (new PhotoEditModalView(element, callback));
                _this._openModals.push(modalView);
                _this._footer.hide();
                App().trackView('/app/photoEdit');
                App().mpTrackEvent('Photo edit modal shown');
            }).fail(function() {
                _this.showErrorModal(false, 'y1lk');
            });
        },
        showPhotoUpgradeImage: function() {
            var
                $lock = this._element.find('.photoUpgradeLock');
            $lock.removeClass('hidden');
            var
                bottom = (this._element.find('#preview').css('height').toInt() - this._canvas.getElement().css('height').toInt()) / 2;
            $lock.css('bottom', Math.round(bottom));
            var
                right = (this._element.find('#preview').css('width').toInt() - this._canvas.getElement().css('width').toInt()) / 2;
            $lock.css('right', Math.round(right));
        },
        showShareModal: function(imageObj) {
            var
                html = _.template(this.getTemplate('modals', 'share'), {
                    csrfToken: Thu.get('csrfToken'),
                    image: imageObj,
                    user: Thu.get('loggedInUser'),
                    publisher: Thu.get('publisher')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ShareModalView(element, imageObj));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/share');
            App().mpTrackEvent('Share modal shown');
        },
        showSmartShareModal: function(imageObj) {
            var
                html = _.template(this.getTemplate('modals', 'smartShare'), {
                    csrfToken: Thu.get('csrfToken'),
                    image: imageObj,
                    user: Thu.get('loggedInUser'),
                    publisher: Thu.get('publisher')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new SmartShareModalView(element, imageObj));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/smartShare');
            App().mpTrackEvent('Smart share modal shown');
        },
        showTemplateUpgradeImage: function() {
            var
                $lock = this._element.find('.templateUpgradeLock');
            $lock.removeClass('hidden');
            var
                bottom = (this._element.find('#preview').css('height').toInt() - this._canvas.getElement().css('height').toInt()) / 2;
            $lock.css('bottom', Math.round(bottom));
            var
                right = (this._element.find('#preview').css('width').toInt() - this._canvas.getElement().css('width').toInt()) / 2;
            $lock.css('right', Math.round(right));
        },
        showTextTab: function() {
            this._currentTab = 'text';
            this._element.find('ul.tabs li.active').removeClass('active');
            this._element.find('ul.tabs li.text').addClass('active');
            this._element.find('div.tabContent > div').addClass('hidden');
            this._element.find('div.tabContent > div.textTab').removeClass('hidden');
        },
        showTwitterErrorModal: function(twitterErrorKey) {
            var
                html = _.template(this.getTemplate('modals', 'twitterError'), {
                    copy: this._twitterErrorModalCopy[twitterErrorKey]
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new TwitterErrorModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/twitterError');
            App().mpTrackEvent('Twitter error modal shown', {
                _twitterErrorKey: twitterErrorKey
            });
        },
        showTwitterShareModal: function(imageObj) {
            var
                html = _.template(this.getTemplate('modals', 'twitterShare'), {
                    csrfToken: Thu.get('csrfToken'),
                    image: imageObj,
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new TwitterShareModalView(element, imageObj));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/twitterShare');
            App().mpTrackEvent('Twitter share modal shown');
        },
        showTwitterSuccessModal: function(shareId, connectionObj) {
            var
                html = _.template(this.getTemplate('modals', 'twitterSuccess'), {
                    connection: connectionObj,
                    shareId: shareId,
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new TwitterSuccessModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/twitterSuccess');
            App().mpTrackEvent('Twitter success modal shown', {
                _shareId: shareId
            });
        },
        showAlertModal: function(alertKey, callback) {
            var
                html = _.template(this.getTemplate('modals', 'alert'), {
                    alert: this._alerts[alertKey]
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new AlertModalView(element, this._alerts[alertKey], callback));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/alert/' + (alertKey));
            App().mpTrackEvent('Alert modal shown', {
                _alertKey: alertKey
            });
        },
        showCC0Modal: function() {
            var
                html = _.template(this.getTemplate('modals', 'cC0'), {}),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new CC0ModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/cC0');
            App().mpTrackEvent('CC0 modal shown', {});
        },
        showConfirmModal: function(confirmKey, yesCallback, noCallback) {
            var
                html = _.template(this.getTemplate('modals', 'confirm'), {
                    confirm: this._confirms[confirmKey]
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ConfirmModalView(element, this._confirms[confirmKey], yesCallback, noCallback));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/confirm/' + (confirmKey));
            App().mpTrackEvent('Confirm modal shown', {
                _confirmKey: confirmKey
            });
        },
        showUpgradeModal: function(creatingImageFlow, directCheckoutFlow) {
            var
                _this = this;
            this.showBusyModal('upgrading');
            setTimeout(function() {
                App().trackView('/app/upgrade');
                App().mpTrackEvent('Upgrade modal shown', {
                    _creatingImageFlow: creatingImageFlow,
                    _directCheckoutFlow: directCheckoutFlow
                });
                var
                    html = _.template(_this.getTemplate('modals', 'upgrade'), {
                        defaults: Thu.get('config').defaults,
                        copy: App()._busyModalCopy.processingCreditCard,
                        creatingImageFlow: creatingImageFlow,
                        directCheckoutFlow: directCheckoutFlow,
                        user: Thu.get('loggedInUser'),
                        csrfToken: Thu.get('csrfToken'),
                        provinces: Thu.get('provinces'),
                        referredByPartner: typeof
                        jQuery.cookie('partner') !== 'undefined'
                    }),
                    element = $(jQuery.parseHTML(html.trim()));
                _this._element.find('#body').append(element);
                var
                    modalView = (new UpgradeModalView(element));
                _this._openModals.push(modalView);
                if (directCheckoutFlow === true) {
                    modalView.getElement().addClass('directCheckoutFlow');
                }
                App().closeBusyModal();
            }, this._timeouts.upgrading);
            this._footer.hide();
        },
        showReferralModal: function() {
            $.cookie('referralModalSeen', '1', {
                path: '/',
                domain: '.' + (location.host),
                expires: 365 * 2
            });
            var
                html = _.template(this.getTemplate('modals', 'referral'), {
                    user: Thu.get('loggedInUser')
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new ReferralModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().mpTrackEvent('Referral modal shown');
            App().trackView('/app/referral');
        },
        showUpsellModal: function(type) {
            var
                defaults = Thu.get('config').defaults,
                frequency = defaults.frequency,
                user = Thu.get('loggedInUser');
            if (user !== false) {
                frequency = user.frequency;
            }
            if (frequency === 'yearly') {
                frequency = 'year';
            } else
            if (frequency === 'monthly') {
                frequency = 'month';
            }
            var
                rate = defaults.rate;
            if (defaults.frequency === 'yearly') {
                rate = defaults.yearlyRate / 12;
            }
            if (user !== false) {
                rate = user.rate;
                if (user.frequency === 'yearly') {
                    rate = user.yearlyRate / 12;
                }
            }
            rate = rate / 100;
            var
                copy = this._upsellModalCopy[type];
            var
                html = _.template(this.getTemplate('modals', 'upsell'), {
                    copy: copy,
                    type: type,
                    rate: rate,
                    frequency: frequency
                }),
                element = $(jQuery.parseHTML(html.trim()));
            this._element.find('#body').append(element);
            var
                modalView = (new UpsellModalView(element));
            this._openModals.push(modalView);
            this._footer.hide();
            App().trackView('/app/upsell/' + (type));
            App().mpTrackEvent('Upsell modal shown', {
                _type: type
            });
        },
        showTemplatesTab: function() {
            this._currentTab = 'templates';
            this._element.find('ul.tabs li.active').removeClass('active');
            this._element.find('ul.tabs li.templates').addClass('active');
            this._element.find('div.tabContent > div').addClass('hidden');
            this._element.find('div.tabContent > div.templatesTab').removeClass('hidden');
            App().trackView('/app/templates');
            App().mpTrackEvent('Templates tab shown');
        },
        showWatermarkTab: function() {
            this._currentTab = 'watermark';
            this._element.find('ul.tabs li.active').removeClass('active');
            this._element.find('ul.tabs li.watermark').addClass('active');
            this._element.find('div.tabContent > div').addClass('hidden');
            this._element.find('div.tabContent > div.watermarkTab').removeClass('hidden');
            App().trackView('/app/watermark');
            App().mpTrackEvent('Watermark tab shown');
        },
        siteHasBeenLocked: function(response) {
            if (response.failedRules) {
                if (response.failedRules[0].validator) {
                    if (response.failedRules[0].validator[0] === 'CommonValidator' && response.failedRules[0].validator[1] === 'siteIsNotLocked') {
                        return true;
                    }
                    return false;
                }
                return false;
            }
            return false;
        },
        slideAppIntoView: function() {
            var
                _this = this;
            this._element.removeClass('sai-closed');
            this._element.addClass('sai-opening');
            setTimeout(function() {
                _this._element.removeClass('sai-opening');
                _this._element.addClass('sai-open');
            }, 500);
            var
                data = {
                    action: 'opened'
                };
            window.parent.postMessage(JSON.stringify(data), '*');
        },
        slideAppOutOfView: function() {
            var
                _this = this;
            this._element.removeClass('sai-open');
            this._element.addClass('sai-closing');
            setTimeout(function() {
                _this._element.removeClass('sai-closing');
                _this._element.addClass('sai-closed');
            }, 500);
            var
                data = {
                    action: 'hide'
                };
            window.parent.postMessage(JSON.stringify(data), '*');
        },
        trackEmbedType: function() {
            var
                embedType = 'unknown';
            if (typeof query.get('embedType') !== 'undefined') {
                embedType = query.get('embedType');
            }
            this.trackCustomVar(3, 'Embed Type', embedType, 2);
        },
        trackFlow: function() {
            var
                flow = 'unknown';
            if (typeof query.get('flow') !== 'undefined') {
                flow = query.get('flow');
            }
            this.trackCustomVar(2, 'Flow', flow, 2);
        },
        trackPageView: function(path) {
            jQuery.post('/users/trackPageView', {
                csrfToken: Thu.get('csrfToken'),
                path: path
            }, function(response) {
                if (response.success === true) {
                    Thu.set('loggedInUser', response.data.user);
                } else {
                    if (App().siteHasBeenLocked(response)) {
                        App().showLockedModal();
                    } else {
                        App().showErrorModal(false, response.failedRules[0].error.reference);
                    }
                }
            }, 'json').fail(function() {
                App().showErrorModal(false, '51jk');
            });
        },
        trackRole: function() {
            this.trackCustomVar(1, 'Role', App().getUserRole(), 2);
        },
        trackUpload: function(url, callback) {
            jQuery.post('/uploads', {
                url: url,
                csrfToken: Thu.get('csrfToken')
            }, function(response) {
                if (response.success === true) {
                    callback && callback(response.data.upload);
                } else {
                    if (App().siteHasBeenLocked(response)) {
                        App().showLockedModal();
                    } else {
                        App().showErrorModal('Oh ho!', response.failedRules[0].error.reference);
                    }
                }
            }, 'json').fail(function() {
                App().showErrorModal('Oh ho!', 'avi3');
            });
        },
        updateUserMpPeopleData: function() {
            var
                userObj = Thu.get('loggedInUser'),
                data = {
                    '$email': userObj.email,
                    '$created': (new Date(userObj.created.toInt() * 1000)),
                    _id: userObj.id.toInt(),
                    _isLegacyProUser: userObj.isLegacyProUser.toInt() === 1 ? true : false,
                    _isAdmin: userObj.isAdmin.toInt() === 1 ? true : false,
                    _isPro: userObj.isPro.toInt() === 1 ? true : false,
                    _rate: userObj.rate.toInt(),
                    _frequency: userObj.frequency,
                    _yearlyRate: userObj.yearlyRate.toInt(),
                    _imagesSaved: userObj.imagesSaved.toInt(),
                    '$first_name': userObj.firstName,
                    '$username': userObj.username,
                    '$last_name': userObj.lastName,
                    '$name': (userObj.firstName) + ' ' + (userObj.lastName)
                };
            App().mpPeopleSet(data);
        },
        upgradeUser: function(userObj) {
            Thu.set('loggedInUser', userObj);
            this.trackRole();
            this.hideFontUpgradeImage();
            this.hidePhotoUpgradeImage();
            this.getWatermarkTab().enable();
            this._backgroundTab.refreshCategory();
            this._backgroundTab.drawUploadsResourceTab();
            this._footer.update();
            this._imageDocument.getWatermarkLayer().getDrawing().makeDraggable();
            var
                facebookAdId = 6018803995514,
                frequency = userObj.frequency,
                val = frequency === 'yearly' ? userObj.yearlyRate : userObj.rate,
                img = new
            Image(1, 1), path = 'https://www.facebook.com/offsite_event.php' + '?id=' + (facebookAdId) + '&amp;value=' + (val) + '&amp;currency=USD';
            img.src = path;
            var
                img = new
            Image(1, 1);
            var
                google_conversion_id = 960784177;
            var
                google_conversion_language = "en";
            var
                google_conversion_format = "3";
            var
                google_conversion_color = "ffffff";
            var
                google_conversion_label = "FD6JCPeUg1gQsc6RygM";
            var
                google_conversion_value = 12.00;
            var
                google_conversion_currency = "USD";
            var
                google_remarketing_only = false;
            img.src = 'https://www.googleadservices.com/pagead/conversion/' + google_conversion_id + '/?' + 'value=' + (frequency === 'yearly' ? (userObj.yearlyRate / 100) : (userObj.rate / 100)) + '&amp;currency_code=' + (google_conversion_currency) + '&amp;label=' + (google_conversion_label) + '&amp;guid=ON&amp;script=0';
        },
        userIsAdmin: function() {
            return Thu.get('loggedInUser') !== false && Thu.get('loggedInUser').isAdmin.toInt() === 1;
        },
        userIsLoggedIn: function() {
            return Thu.get('loggedInUser') !== false;
        },
        userIsPro: function() {
            return Thu.get('loggedInUser') !== false && Thu.get('loggedInUser').isPro.toInt() === 1;
        },
        useSmartShare: function() {
            return this._useSmartShare;
        },
        usingReservedFont: function(yes) {
            this._usingReservedFont = yes;
            if (yes) {
                this.showFontUpgradeImage();
            } else {
                this.hideFontUpgradeImage();
            }
        },
        usingReservedPhoto: function(yes) {
            this._usingReservedPhoto = yes;
            if (yes) {
                this.showPhotoUpgradeImage();
            } else {
                this.hidePhotoUpgradeImage();
            }
        },
        usingReservedTemplate: function(yes) {
            this._usingReservedTemplate = yes;
            if (yes) {
                this.showTemplateUpgradeImage();
            } else {
                this.hideTemplateUpgradeImage();
            }
        },
        validBrowser: function() {
            var
                elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
            return 'hi';
        }
    });
var
    Thu = (function() {
        var
            _benchmark = 0;
        var
            _pageView;
        var
            _store = {};
        return {
            benchmark: function() {
                _benchmark = (new Date()).getTime();
            },
            elapsed: function() {
                return (new Date()).getTime() - _benchmark;
            },
            get: function(key) {
                return _store[key];
            },
            getPageView: function() {
                return _pageView;
            },
            getUnixTimestamp: function() {
                return Math.round((new Date()).getTime() / 1000);
            },
            moveCaretToEnd: function(el) {
                if (typeof el.selectionStart == 'number') {
                    el.selectionStart = el.selectionEnd = el.value.length;
                } else
                if (typeof el.createTextRange != 'undefined') {
                    el.focus();
                    var
                        range = el.createTextRange();
                    range.collapse(false);
                    range.select();
                }
            },
            nameSort: function(a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
            setPageView: function(pageView) {
                _pageView = pageView;
            },
            getRandomHash: function() {
                var
                    text = '',
                    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                    i = 0;
                for (i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            },
            setUrlParam: function(url, param, value) {
                var
                    val = new
                RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))'), parts = url.toString().split('#'), url = parts[0], hash = parts[1], qstring = /\?.+$/, newURL = url;
                if (val.test(url)) {
                    newURL = url.replace(val, '$1' + param + '=' + value);
                } else
                if (qstring.test(url)) {
                    newURL = url + '&' + param + '=' + value;
                } else {
                    newURL = url + '?' + param + '=' + value;
                }
                if (hash) {
                    newURL += '#' + hash;
                }
                return newURL;
            },
            init: function() {
                var
                    bodyElement = $('body').first(),
                    pageViewName = bodyElement.attr('data-pageViewName');
                if (typeof pageViewName === 'undefined') {
                    log('No page view defined.');
                } else {
                    _pageView = (new window[pageViewName](bodyElement));
                }
                $.fn.serializeObject = function() {
                    var
                        o = {};
                    var
                        a = this.serializeArray();
                    $.each(a, function() {
                        if (o[this.name] !== undefined) {
                            if (!o[this.name].push) {
                                o[this.name] = [o[this.name]];
                            }
                            o[this.name].push(this.value || '');
                        } else {
                            o[this.name] = this.value || '';
                        }
                    });
                    return o;
                };
                String.prototype.toInt = Number.prototype.toInt = function() {
                    return parseInt(this, 10);
                };
                String.prototype.toFloat = Number.prototype.toFloat = function() {
                    return parseFloat(this);
                };
                String.prototype.toStr = Number.prototype.toStr = function() {
                    return this + '';
                };
                String.prototype.toCommas = Number.prototype.toCommas = function() {
                    return this.toStr().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                };
                String.prototype.centsTo$ = Number.prototype.centsTo$ = function() {
                    var
                        dollars = (this.toInt() / 100) + '';
                    if (dollars.indexOf('.') === -1) {
                        dollars += '.00';
                    } else
                    if (dollars.match(/\.[0-9]{1}$/) !== null) {
                        dollars += '0';
                    }
                    return dollars;
                };
                String.prototype.ucfirst = function() {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                };
                String.prototype.truncate = function(limit) {
                    if (this.length > limit) {
                        return this.substring(0, limit) + '...';
                    }
                    return this;
                };
                String.prototype.linkable = function() {
                    return this.replace(/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url) {
                        var
                            full_url = url;
                        if (!full_url.match('^https?:\/\/')) {
                            full_url = 'http://' + full_url;
                        }
                        return '<a href="' + full_url + '">' + url + '</a>';
                    });
                };
                String.prototype.parseURL = function() {
                    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
                        return url.link('#');
                    });
                };
                String.prototype.parseUsername = function() {
                    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                        var
                            username = u.replace('@', '');
                        return u.link('#');
                    });
                };
                String.prototype.parseHashtag = function() {
                    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
                        var
                            tag = t.replace('#', '%23');
                        return t.link('#');
                    });
                };
                String.prototype.tweetable = function() {
                    var
                        base_url = 'https://twitter.com/',
                        hashtag_part = 'search?q=#',
                        text = '';
                    text = this.replace(/(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi, function($0, $1, $2) {
                        return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
                    });
                    text = text.replace(/(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi, function($0, $1, $2) {
                        return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
                    });
                    text = text.replace(/(:\/\/|>)?(@([_a-z0-9\-]+))/gi, function($0, $1, $2, $3) {
                        return ($1 ? $0 : '<a href="' + base_url + $3 + '" title="Follow ' + $3 + '" target="_blank">@' + $3 + '</a>');
                    });
                    text = text.replace(/(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi, function($0, $1, $2, $3) {
                        return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3 + '" title="Search tag: ' + $3 + '" target="_blank">#' + $3 + '</a>');
                    });
                    return text;
                };
                Image.prototype.getFittedDimensions = function(max) {
                    var
                        ratio = 0,
                        width = Math.floor(this.width),
                        height = Math.floor(this.height);
                    if (width <= max.width && height <= max.height) {
                        return {
                            width: width,
                            height: height
                        };
                    }
                    if (width > height) {
                        ratio = width / max.width;
                        width = max.width;
                        height = height / ratio;
                        return {
                            width: Math.floor(width),
                            height: Math.floor(height)
                        }
                    }
                    ratio = height / max.height;
                    height = max.height;
                    width = width / ratio;
                    return {
                        width: Math.floor(width),
                        height: Math.floor(height)
                    }
                };
                $.extend($.fn, {
                    nonIeFocus: function() {
                        if (App().isIe() === false) {
                            this.focus();
                        }
                    }
                });
            },
            set: function(key, value) {
                _store[key] = value;
            }
        };
    })();
  
queue.unshift(Thu.init);
isChrome = function() {
    return /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
};
App = function() {
    return Thu.getPageView();
};
//log('pre: ', (new Date()).getTime() - start);
queue.process();
//log('post: ', (new Date()).getTime() - start);

