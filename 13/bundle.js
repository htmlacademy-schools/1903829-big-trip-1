/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mock/point.js":
/*!***************************!*\
  !*** ./src/mock/point.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateDescription": () => (/* binding */ generateDescription),
/* harmony export */   "generatePoint": () => (/* binding */ generatePoint)
/* harmony export */ });
/* harmony import */ var _utils_informations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/informations.js */ "./src/utils/informations.js");
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/functionsWithDayjs.js */ "./src/utils/functionsWithDayjs.js");
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");




const types = [{
  title: 'taxi',
  img: 'img/icons/taxi.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'bus',
  img: 'img/icons/bus.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'drive',
  img: 'img/icons/drive.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'check-in',
  img: 'img/icons/check-in.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'flight',
  img: 'img/icons/flight.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'restaurant',
  img: 'img/icons/restaurant.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'sightseeing',
  img: 'img/icons/sightseeing.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'train',
  img: 'img/icons/train.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}];
const generateDescription = () => {
  const points = (0,_utils_informations_js__WEBPACK_IMPORTED_MODULE_0__.destinations)();
  points.forEach(city => {
    const descriptionArray = (0,_utils_informations_js__WEBPACK_IMPORTED_MODULE_0__.descriptions)();
    const countDescription = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(1, descriptionArray.length);

    for (let i = 0; i < countDescription; i++) {
      const elementNumber = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, descriptionArray.length - 1);
      const descriptionArrayElement = descriptionArray[elementNumber];
      descriptionArray.splice(elementNumber, 1);
      city.description += descriptionArrayElement;
    }
  });
};

const generateOffers = () => {
  let count = (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 5);
  const off = (0,_utils_informations_js__WEBPACK_IMPORTED_MODULE_0__.offers)();
  let len = off.length;
  const result = new Array(count);
  const taken = new Array(len);

  if (count > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }

  while (count--) {
    const x = Math.floor(Math.random() * len);
    result[count] = off[x in taken ? taken[x] : x];
    taken[x] = --len;
  }

  return result;
};

generateOffers();
generateDescription();
(0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.generateImages)();
const generatePoint = () => {
  const date = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_2__.generateBeginEndDates)();
  const time = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_2__.countDuration)(date);
  const dest = (0,_utils_informations_js__WEBPACK_IMPORTED_MODULE_0__.destinations)();
  const type = {
    currentType: types[(0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 7)],
    arrayType: types
  };
  const allPrice = type.currentType.allPriceOffers + (0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(10, 30);
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)(),
    date,
    type,
    city: {
      currentCity: dest[(0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 2)],
      arrayCity: dest
    },
    time,
    allPrice,
    isFavorite: Boolean((0,_utils_common_js__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 1))
  };
};

/***/ }),

/***/ "./src/presenter/point-presenter.js":
/*!******************************************!*\
  !*** ./src/presenter/point-presenter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointPresenter)
/* harmony export */ });
/* harmony import */ var _view_site_edit_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/site-edit-point */ "./src/view/site-edit-point.js");
/* harmony import */ var _view_site_trip_event_item_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/site-trip-event-item-view */ "./src/view/site-trip-event-item-view.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

var _pointCointainer = /*#__PURE__*/new WeakMap();

var _changeData = /*#__PURE__*/new WeakMap();

var _changeMode = /*#__PURE__*/new WeakMap();

var _itemTemplateComponent = /*#__PURE__*/new WeakMap();

var _editPointComponent = /*#__PURE__*/new WeakMap();

var _wayPoint = /*#__PURE__*/new WeakMap();

var _mode = /*#__PURE__*/new WeakMap();

var _replaceWaypointToForm = /*#__PURE__*/new WeakMap();

var _replaceFormToWaypoint = /*#__PURE__*/new WeakMap();

var _escKeyDownHandler = /*#__PURE__*/new WeakMap();

var _eventRollupHandler = /*#__PURE__*/new WeakMap();

var _formSubmitHandler = /*#__PURE__*/new WeakMap();

var _editClickHandler = /*#__PURE__*/new WeakMap();

var _favoriteClickHandler = /*#__PURE__*/new WeakMap();

class PointPresenter {
  constructor(pointContainer, changeData, changeMode) {
    _classPrivateFieldInitSpec(this, _pointCointainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeData, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeMode, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _itemTemplateComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _editPointComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _wayPoint, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _mode, {
      writable: true,
      value: Mode.DEFAULT
    });

    _defineProperty(this, "init", wayPoint => {
      _classPrivateFieldSet(this, _wayPoint, wayPoint);

      const prevItemComponent = _classPrivateFieldGet(this, _itemTemplateComponent);

      const prevEditComponent = _classPrivateFieldGet(this, _editPointComponent);

      _classPrivateFieldSet(this, _itemTemplateComponent, new _view_site_trip_event_item_view__WEBPACK_IMPORTED_MODULE_1__["default"](wayPoint));

      _classPrivateFieldSet(this, _editPointComponent, new _view_site_edit_point__WEBPACK_IMPORTED_MODULE_0__["default"](wayPoint));

      _classPrivateFieldGet(this, _itemTemplateComponent).setEditClickHandler(_classPrivateFieldGet(this, _editClickHandler));

      _classPrivateFieldGet(this, _itemTemplateComponent).setFavoriteClickHandler(_classPrivateFieldGet(this, _favoriteClickHandler));

      _classPrivateFieldGet(this, _editPointComponent).setEventRollupBtnHandler(_classPrivateFieldGet(this, _eventRollupHandler));

      _classPrivateFieldGet(this, _editPointComponent).setFormSubmitHandler(_classPrivateFieldGet(this, _formSubmitHandler));

      if (prevItemComponent === null || prevEditComponent === null) {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.render)(_classPrivateFieldGet(this, _pointCointainer), _classPrivateFieldGet(this, _itemTemplateComponent), _utils_render__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
        return;
      }

      if (_classPrivateFieldGet(this, _mode) === Mode.DEFAULT) {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _itemTemplateComponent), prevItemComponent);
      }

      if (_classPrivateFieldGet(this, _mode) === Mode.EDITING) {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _editPointComponent), prevEditComponent);
      }

      (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(prevItemComponent);
      (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(prevEditComponent);
    });

    _defineProperty(this, "destroy", () => {
      (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(_classPrivateFieldGet(this, _itemTemplateComponent));
      (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.remove)(_classPrivateFieldGet(this, _editPointComponent));
    });

    _defineProperty(this, "resetView", () => {
      if (_classPrivateFieldGet(this, _mode) !== Mode.DEFAULT) {
        _classPrivateFieldGet(this, _replaceFormToWaypoint).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _replaceWaypointToForm, {
      writable: true,
      value: () => {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _editPointComponent), _classPrivateFieldGet(this, _itemTemplateComponent));
        document.addEventListener('keydown', _classPrivateFieldGet(this, _escKeyDownHandler));

        _classPrivateFieldGet(this, _changeMode).call(this);

        _classPrivateFieldSet(this, _mode, Mode.EDITING);
      }
    });

    _classPrivateFieldInitSpec(this, _replaceFormToWaypoint, {
      writable: true,
      value: () => {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _itemTemplateComponent), _classPrivateFieldGet(this, _editPointComponent));
        document.removeEventListener('keydown', _classPrivateFieldGet(this, _escKeyDownHandler));

        _classPrivateFieldSet(this, _mode, Mode.DEFAULT);
      }
    });

    _classPrivateFieldInitSpec(this, _escKeyDownHandler, {
      writable: true,
      value: evt => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();

          _classPrivateFieldGet(this, _replaceFormToWaypoint).call(this);
        }
      }
    });

    _classPrivateFieldInitSpec(this, _eventRollupHandler, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _replaceFormToWaypoint).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _formSubmitHandler, {
      writable: true,
      value: pnt => {
        _classPrivateFieldGet(this, _changeData).call(this, pnt);

        _classPrivateFieldGet(this, _replaceFormToWaypoint).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _editClickHandler, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _replaceWaypointToForm).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _favoriteClickHandler, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _changeData).call(this, { ..._classPrivateFieldGet(this, _wayPoint),
          isFavorite: !_classPrivateFieldGet(this, _wayPoint).isFavorite
        });
      }
    });

    _classPrivateFieldSet(this, _pointCointainer, pointContainer);

    _classPrivateFieldSet(this, _changeData, changeData);

    _classPrivateFieldSet(this, _changeMode, changeMode);
  }

}

/***/ }),

/***/ "./src/presenter/trip-presenter.js":
/*!*****************************************!*\
  !*** ./src/presenter/trip-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripPresenter)
/* harmony export */ });
/* harmony import */ var _view_site_add_first_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/site-add-first-point */ "./src/view/site-add-first-point.js");
/* harmony import */ var _view_site_list_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/site-list-view */ "./src/view/site-list-view.js");
/* harmony import */ var _view_site_trip_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/site-trip-sort */ "./src/view/site-trip-sort.js");
/* harmony import */ var _view_site_trip_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/site-trip-filter */ "./src/view/site-trip-filter.js");
/* harmony import */ var _point_presenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./point-presenter */ "./src/presenter/point-presenter.js");
/* harmony import */ var _view_site_trip_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/site-trip-tabs */ "./src/view/site-trip-tabs.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/common */ "./src/utils/common.js");
/* harmony import */ var _utils_informations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/informations */ "./src/utils/informations.js");
/* harmony import */ var _utils_functionsWithDayjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/functionsWithDayjs */ "./src/utils/functionsWithDayjs.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }












var _tripContainer = /*#__PURE__*/new WeakMap();

var _tabsContainer = /*#__PURE__*/new WeakMap();

var _filterContainer = /*#__PURE__*/new WeakMap();

var _currentSortType = /*#__PURE__*/new WeakMap();

var _sortComponent = /*#__PURE__*/new WeakMap();

var _tabsComponent = /*#__PURE__*/new WeakMap();

var _filterComponent = /*#__PURE__*/new WeakMap();

var _listPointComponent = /*#__PURE__*/new WeakMap();

var _noComponent = /*#__PURE__*/new WeakMap();

var _tripPoints = /*#__PURE__*/new WeakMap();

var _pointsPresenter = /*#__PURE__*/new WeakMap();

var _handleModeChange = /*#__PURE__*/new WeakMap();

var _handlePointChange = /*#__PURE__*/new WeakMap();

var _handleSortTypeChange = /*#__PURE__*/new WeakMap();

var _sortPoints = /*#__PURE__*/new WeakMap();

var _renderSort = /*#__PURE__*/new WeakMap();

var _renderPointList = /*#__PURE__*/new WeakMap();

var _renderPoint = /*#__PURE__*/new WeakMap();

var _renderPoints = /*#__PURE__*/new WeakMap();

var _clearPointList = /*#__PURE__*/new WeakMap();

var _renderNoPoint = /*#__PURE__*/new WeakMap();

var _renderTripStart = /*#__PURE__*/new WeakMap();

class TripPresenter {
  constructor(tripContainer, tabsContainer, filterContainer) {
    _classPrivateFieldInitSpec(this, _tripContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _tabsContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filterContainer, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _currentSortType, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _sortComponent, {
      writable: true,
      value: new _view_site_trip_sort__WEBPACK_IMPORTED_MODULE_2__["default"]()
    });

    _classPrivateFieldInitSpec(this, _tabsComponent, {
      writable: true,
      value: new _view_site_trip_tabs__WEBPACK_IMPORTED_MODULE_5__["default"]()
    });

    _classPrivateFieldInitSpec(this, _filterComponent, {
      writable: true,
      value: new _view_site_trip_filter__WEBPACK_IMPORTED_MODULE_3__["default"]()
    });

    _classPrivateFieldInitSpec(this, _listPointComponent, {
      writable: true,
      value: new _view_site_list_view__WEBPACK_IMPORTED_MODULE_1__["default"]()
    });

    _classPrivateFieldInitSpec(this, _noComponent, {
      writable: true,
      value: new _view_site_add_first_point__WEBPACK_IMPORTED_MODULE_0__["default"]()
    });

    _classPrivateFieldInitSpec(this, _tripPoints, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _pointsPresenter, {
      writable: true,
      value: new Map()
    });

    _defineProperty(this, "init", tripPoints => {
      _classPrivateFieldSet(this, _tripPoints, [...tripPoints]);

      (0,_utils_render__WEBPACK_IMPORTED_MODULE_6__.render)(_classPrivateFieldGet(this, _tabsContainer), _classPrivateFieldGet(this, _tabsComponent), _utils_render__WEBPACK_IMPORTED_MODULE_6__.RenderPosition.BEFOREEND);
      (0,_utils_render__WEBPACK_IMPORTED_MODULE_6__.render)(_classPrivateFieldGet(this, _filterContainer), _classPrivateFieldGet(this, _filterComponent), _utils_render__WEBPACK_IMPORTED_MODULE_6__.RenderPosition.BEFOREEND);

      _classPrivateFieldGet(this, _renderTripStart).call(this);
    });

    _classPrivateFieldInitSpec(this, _handleModeChange, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _pointsPresenter).forEach(presenter => presenter.resetView());
      }
    });

    _classPrivateFieldInitSpec(this, _handlePointChange, {
      writable: true,
      value: updatedPoint => {
        _classPrivateFieldSet(this, _tripPoints, (0,_utils_common__WEBPACK_IMPORTED_MODULE_7__.updateItem)(_classPrivateFieldGet(this, _tripPoints), updatedPoint));

        _classPrivateFieldGet(this, _pointsPresenter).get(updatedPoint.id).init(updatedPoint);
      }
    });

    _classPrivateFieldInitSpec(this, _handleSortTypeChange, {
      writable: true,
      value: sortType => {
        if (_classPrivateFieldGet(this, _currentSortType) === sortType) {
          return;
        }

        _classPrivateFieldGet(this, _sortPoints).call(this, sortType);

        _classPrivateFieldGet(this, _clearPointList).call(this);

        _classPrivateFieldGet(this, _renderPointList).call(this);

        _classPrivateFieldGet(this, _renderPoints).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _sortPoints, {
      writable: true,
      value: sortType => {
        switch (sortType) {
          case _utils_informations__WEBPACK_IMPORTED_MODULE_8__.SortType.DATE_UP:
            _classPrivateFieldGet(this, _tripPoints).sort(_utils_functionsWithDayjs__WEBPACK_IMPORTED_MODULE_9__.sortPointUp);

            break;

          case _utils_informations__WEBPACK_IMPORTED_MODULE_8__.SortType.DATE_DOWN:
            _classPrivateFieldGet(this, _tripPoints).sort(_utils_functionsWithDayjs__WEBPACK_IMPORTED_MODULE_9__.sortPointDown);

            break;
        }

        _classPrivateFieldSet(this, _currentSortType, sortType);
      }
    });

    _classPrivateFieldInitSpec(this, _renderSort, {
      writable: true,
      value: () => {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_6__.render)(_classPrivateFieldGet(this, _tripContainer), _classPrivateFieldGet(this, _sortComponent), _utils_render__WEBPACK_IMPORTED_MODULE_6__.RenderPosition.BEFOREEND);

        _classPrivateFieldGet(this, _sortComponent).setSortTypeChangeHandler(_classPrivateFieldGet(this, _handleSortTypeChange));
      }
    });

    _classPrivateFieldInitSpec(this, _renderPointList, {
      writable: true,
      value: () => {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_6__.render)(_classPrivateFieldGet(this, _tripContainer), _classPrivateFieldGet(this, _listPointComponent), _utils_render__WEBPACK_IMPORTED_MODULE_6__.RenderPosition.BEFOREEND);
      }
    });

    _classPrivateFieldInitSpec(this, _renderPoint, {
      writable: true,
      value: point => {
        const pointPresenter = new _point_presenter__WEBPACK_IMPORTED_MODULE_4__["default"](_classPrivateFieldGet(this, _listPointComponent), _classPrivateFieldGet(this, _handlePointChange), _classPrivateFieldGet(this, _handleModeChange));
        pointPresenter.init(point);

        _classPrivateFieldGet(this, _pointsPresenter).set(point.id, pointPresenter);
      }
    });

    _classPrivateFieldInitSpec(this, _renderPoints, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _tripPoints).forEach(tripPoint => _classPrivateFieldGet(this, _renderPoint).call(this, tripPoint));
      }
    });

    _classPrivateFieldInitSpec(this, _clearPointList, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _pointsPresenter).forEach(presenter => presenter.destroy());

        _classPrivateFieldGet(this, _pointsPresenter).clear();
      }
    });

    _classPrivateFieldInitSpec(this, _renderNoPoint, {
      writable: true,
      value: () => {
        (0,_utils_render__WEBPACK_IMPORTED_MODULE_6__.render)(_classPrivateFieldGet(this, _tripContainer), _classPrivateFieldGet(this, _noComponent), _utils_render__WEBPACK_IMPORTED_MODULE_6__.RenderPosition.BEFOREEND);

        _classPrivateFieldGet(this, _listPointComponent).element.remove();

        _classPrivateFieldGet(this, _sortComponent).element.remove();
      }
    });

    _classPrivateFieldInitSpec(this, _renderTripStart, {
      writable: true,
      value: () => {
        if (_classPrivateFieldGet(this, _tripPoints).length === 0) {
          _classPrivateFieldGet(this, _renderNoPoint).call(this);

          return;
        }

        _classPrivateFieldGet(this, _renderSort).call(this);

        _classPrivateFieldGet(this, _renderPointList).call(this);

        _classPrivateFieldGet(this, _renderPoints).call(this);

        _classPrivateFieldGet(this, _handleSortTypeChange).call(this, 'day');
      }
    });

    _classPrivateFieldSet(this, _tripContainer, tripContainer);

    _classPrivateFieldSet(this, _tabsContainer, tabsContainer);

    _classPrivateFieldSet(this, _filterContainer, filterContainer);
  }

}

/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": () => (/* binding */ getRandomInteger),
/* harmony export */   "generateImages": () => (/* binding */ generateImages),
/* harmony export */   "updateItem": () => (/* binding */ updateItem),
/* harmony export */   "isPointRepeating": () => (/* binding */ isPointRepeating),
/* harmony export */   "createEventTypesMarkup": () => (/* binding */ createEventTypesMarkup)
/* harmony export */ });
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const generateImages = () => {
  const arrayOfImages = [];

  for (let i = 0; i < 3; i++) {
    arrayOfImages[i] = `http://picsum.photos/248/152?${getRandomInteger(0, 99).toString()}`;
  }

  return arrayOfImages;
};
const updateItem = (items, update) => {
  const index = items.findIndex(item => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
const isPointRepeating = repeating => Object.values(repeating).some(Boolean);
const createEventTypesMarkup = (types, chosenEventType) => {
  const createTypeMarkup = type => {
    const isChecked = type === chosenEventType ? 'checked=""' : '';
    const label = type.charAt(0).toUpperCase() + type.slice(1);
    return `<div class="event__type-item">
                          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${label}</label>
                        </div>`;
  };

  return types.map(createTypeMarkup).join('');
};

/***/ }),

/***/ "./src/utils/functionsWithDayjs.js":
/*!*****************************************!*\
  !*** ./src/utils/functionsWithDayjs.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateBeginEndDates": () => (/* binding */ generateBeginEndDates),
/* harmony export */   "dateRend": () => (/* binding */ dateRend),
/* harmony export */   "sortPointUp": () => (/* binding */ sortPointUp),
/* harmony export */   "sortPointDown": () => (/* binding */ sortPointDown),
/* harmony export */   "getDifferentDates": () => (/* binding */ getDifferentDates),
/* harmony export */   "countDuration": () => (/* binding */ countDuration)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./src/utils/common.js");


const generateBeginEndDates = () => {
  const maxGap = 10;
  const daysGap = (0,_common__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, maxGap);
  const days = daysGap + (0,_common__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 2);
  const startHours = (0,_common__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(1, 6);
  const endHours = (0,_common__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(startHours, startHours + 10);
  const startMinutes = (0,_common__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 59);
  const endMinutes = (0,_common__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(startMinutes, startMinutes + 59);
  return {
    start: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(daysGap, 'day').add(startHours, 'hour').add(startMinutes, 'minute').toDate(),
    end: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(days, 'day').add(endHours, 'hour').add(endMinutes, 'minute').toDate()
  };
};
const dateRend = (date, format) => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);
  return weight !== null && weight !== void 0 ? weight : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(pointA.dueDate).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(pointB.dueDate));
};
const sortPointDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);
  return weight !== null && weight !== void 0 ? weight : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(pointB.dueDate).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(pointA.dueDate));
};
const getDifferentDates = (dayOne, dayTwo) => {
  const diffDateUnix = Math.abs(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dayOne).diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dayTwo)));
  const days = Math.floor(diffDateUnix / (24 * 60 * 60 * 1000));
  const hours = Math.floor(diffDateUnix / (60 * 60 * 1000) - 24 * days);
  const minuts = diffDateUnix / (60 * 1000) - days * 24 * 60 - hours * 60;
  return {
    'days': days,
    'hours': hours,
    'minuts': minuts,
    'unix': diffDateUnix
  };
};
const countDuration = date => {
  const duration = getDifferentDates(date.dataBeginEvent, date.dataEndEvent);
  let durationFormat = '';

  if (duration.days !== 0) {
    durationFormat += `${`0${duration.days}`.slice(-2)}D ${`0${duration.hours}`.slice(-2)}H ${`0${duration.minuts}`.slice(-2)}M`;
  } else if (duration.hours !== 0) {
    durationFormat += `${`0${duration.hours}`.slice(-2)}H ${`0${duration.minuts}`.slice(-2)}M`;
  } else {
    durationFormat += `${`0${duration.minuts}`.slice(-2)}M`;
  }

  return {
    'startTime': `${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('HH')}:${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataBeginEvent).format('mm')}`,
    'endTime': `${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('HH')}:${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date.dataEndEvent).format('mm')}`,
    'duration': durationFormat,
    'arrayDurationFormat': duration
  };
};

/***/ }),

/***/ "./src/utils/informations.js":
/*!***********************************!*\
  !*** ./src/utils/informations.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "descriptions": () => (/* binding */ descriptions),
/* harmony export */   "destinations": () => (/* binding */ destinations),
/* harmony export */   "wayPointTypes": () => (/* binding */ wayPointTypes),
/* harmony export */   "SortType": () => (/* binding */ SortType),
/* harmony export */   "offers": () => (/* binding */ offers)
/* harmony export */ });
const descriptions = () => ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const destinations = () => [{
  titleCity: 'Podgorica',
  description: '',
  photos: [],
  isShowPhoto: false
}, {
  titleCity: 'Moscow',
  description: '',
  photos: [],
  isShowPhoto: false
}, {
  titleCity: 'New York',
  description: '',
  photos: [],
  isShowPhoto: false
}, {
  titleCity: 'Bratislava',
  description: '',
  photos: [],
  isShowPhoto: false
}, {
  titleCity: 'Oslo',
  description: '',
  photos: [],
  isShowPhoto: false
}, {
  titleCity: 'Ottawa',
  description: '',
  photos: [],
  isShowPhoto: false
}, {
  titleCity: 'Prague',
  description: '',
  photos: [],
  isShowPhoto: false
}];
const wayPointTypes = () => [{
  title: 'taxi',
  img: 'img/icons/taxi.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'bus',
  img: 'img/icons/bus.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'drive',
  img: 'img/icons/drive.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'check-in',
  img: 'img/icons/check-in.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'flight',
  img: 'img/icons/flight.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'restaurant',
  img: 'img/icons/restaurant.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'sightseeing',
  img: 'img/icons/sightseeing.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}, {
  title: 'train',
  img: 'img/icons/train.png',
  allOffer: [],
  selectedOffer: [],
  allPriceOffers: 0
}];
const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  DATE_UP: 'date-up'
};
const offers = () => [{
  'text': 'Add luggage',
  'type': 'luggage',
  'price': '30'
}, {
  'text': 'Switch to comfort class',
  'type': 'flight',
  'price': '100'
}, {
  'text': 'Add meal',
  'type': 'meal',
  'price': '15'
}, {
  'text': 'Travel by train',
  'type': 'transport',
  'price': '40'
}, {
  'text': 'Rent a car',
  'type': 'car',
  'price': '200'
}, {
  'text': 'Add breakfast',
  'type': 'meal',
  'price': '40'
}];

/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _view_Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/Abstract-view.js */ "./src/view/Abstract-view.js");

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
const render = (container, element, place) => {
  const parent = container instanceof _view_Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? container.element : container;
  const child = element instanceof _view_Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;

    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;

    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;

    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};
const createElement = template => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof _view_Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? newElement.element : newElement;
  const oldChild = oldElement instanceof _view_Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldElement.element : oldElement;
  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};
const remove = component => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
};

/***/ }),

/***/ "./src/view/Abstract-view.js":
/*!***********************************!*\
  !*** ./src/view/Abstract-view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _element = /*#__PURE__*/new WeakMap();

class AbstractView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _defineProperty(this, "_callback", {});

    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView');
    }
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    throw new Error('Abstract method not impleted: get template');
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/Smart-view.js":
/*!********************************!*\
  !*** ./src/view/Smart-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SmartView)
/* harmony export */ });
/* harmony import */ var _Abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract-view */ "./src/view/Abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class SmartView extends _Abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_data", {});

    _defineProperty(this, "updateData", (update, justDataUpdating) => {
      if (!update) {
        return;
      }

      this._data = { ...this._data,
        ...update
      };

      if (justDataUpdating) {
        return;
      }

      this.updateElement();
    });

    _defineProperty(this, "updateElement", () => {
      const prevElement = this.element;
      const parent = prevElement.parentElement;
      this.removeElement();
      const newElement = this.element;
      parent.replaceChild(newElement, prevElement);
      this.restoreHandlers();
    });

    _defineProperty(this, "restoreHandlers", () => {
      throw new Error('Abstract method not implemented: restoreHandlers');
    });
  }

}

/***/ }),

/***/ "./src/view/site-add-first-point.js":
/*!******************************************!*\
  !*** ./src/view/site-add-first-point.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AddFirstPoint)
/* harmony export */ });
/* harmony import */ var _Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract-view.js */ "./src/view/Abstract-view.js");


const createFirstPoint = () => `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`;

class AddFirstPoint extends _Abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createFirstPoint();
  }

}

/***/ }),

/***/ "./src/view/site-edit-point.js":
/*!*************************************!*\
  !*** ./src/view/site-edit-point.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditNewPoint)
/* harmony export */ });
/* harmony import */ var _utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/functionsWithDayjs.js */ "./src/utils/functionsWithDayjs.js");
/* harmony import */ var _Smart_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Smart-view.js */ "./src/view/Smart-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




const createEditPoint = (point = {}) => {
  const {
    date = null,
    waypointType = null,
    waypoint = null
  } = point;
  const startDateRend = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(date.start, 'D MMMM YYYY');
  const endDateRend = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(date.end, 'D MMMM YYYY');

  const createOffer = offer => {
    const isChecked = offer.isChosen ? ' checked=""' : '';
    const name = offer.name;
    const price = offer.price;
    const type = offer.type;
    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}"${isChecked}>
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>
    `;
  };

  waypointType.arrayType.forEach(element => {
    if (element.title === waypointType.currentType.title) {
      waypointType.currentType = element;
    }
  });
  let offers = '';
  waypointType.currentType.allOffer.forEach(offer => {
    const offerCurrent = createOffer(offer);
    offers += offerCurrent;
  });
  waypoint.arrayCity.forEach(arrayCityElement => {
    if (arrayCityElement.titleCity === waypoint.currentCity.titleCity) {
      if (waypoint.currentCity.isShowPhoto) {
        waypoint.currentCity = arrayCityElement;
        waypoint.currentCity.isShowPhoto = true;
      } else {
        waypoint.currentCity = arrayCityElement;
      }
    }
  });
  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${waypointType}}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${waypointType.currentType.title === 'taxi' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${waypointType.currentType.title === 'bus' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>
                <div class="event__type-item">                 
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${waypointType.currentType.title === 'train' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${waypointType.currentType.title === 'ship' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${waypointType.currentType.title === 'drive' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${waypointType.currentType.title === 'flight' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${waypointType.currentType.title === 'check-in' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${waypointType.currentType.title === 'sightseeing' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>
                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${waypointType.currentType.title === 'restaurant' ? 'checked' : ''}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>
    
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${waypointType.currentType.title}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${waypoint.currentCity.titleCity}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Podgorica"></option>
              <option value="Moscow"></option>
              <option value="New York"></option>
              <option value="Bratislava"></option>
              <option value="Oslo"></option>
              <option value="Ottawa"></option>
              <option value="Prague"></option>
            </datalist>
          </div>
    
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateRend}">
              &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateRend}">
          </div>
    
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>
    
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">${offers}
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    
              </div>
            </div>
         </section>
    
         <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description"></p>
        </section>
      </section>
    </form>
  </li> `;
};

var _findTags = /*#__PURE__*/new WeakMap();

var _typesPointToggleHandler = /*#__PURE__*/new WeakMap();

var _citiesToggleHandler = /*#__PURE__*/new WeakMap();

var _formSubmitHandler = /*#__PURE__*/new WeakMap();

var _eventRollupBtnClickHandler = /*#__PURE__*/new WeakMap();

class EditNewPoint extends _Smart_view_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(_point) {
    super();

    _defineProperty(this, "restoreHandlers", () => {
      _classPrivateFieldGet(this, _findTags).call(this);

      this.setFormSubmitHandler(this._callback.formSubmit);
      this.setEventRollupBtnHandler(this._callback.click);
    });

    _defineProperty(this, "reset", point => {
      this.updateData(point);
    });

    _classPrivateFieldInitSpec(this, _findTags, {
      writable: true,
      value: () => {
        this.element.querySelector('.event__type-group').addEventListener('change', _classPrivateFieldGet(this, _typesPointToggleHandler));
        this.element.querySelector('.event__input--destination').addEventListener('change', _classPrivateFieldGet(this, _citiesToggleHandler));
      }
    });

    _classPrivateFieldInitSpec(this, _typesPointToggleHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();
        this.updateData({
          currentType: {
            title: evt.target.value
          }
        });
      }
    });

    _classPrivateFieldInitSpec(this, _citiesToggleHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();
        this.updateData({
          currentCity: {
            titleCity: evt.target.value,
            isShowPhoto: true
          },
          arrayCity: this._data.city.arrayCity
        });
      }
    });

    _defineProperty(this, "setFormSubmitHandler", callback => {
      this._callback.formSubmit = callback;
      this._data.city.currentCity.isShowPhoto = false;
      this.element.querySelector('form').addEventListener('submit', _classPrivateFieldGet(this, _formSubmitHandler));
    });

    _classPrivateFieldInitSpec(this, _formSubmitHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.formSubmit(EditNewPoint.parseDataToPoint(this._data));
      }
    });

    _defineProperty(this, "setEventRollupBtnHandler", callback => {
      this._callback.rollupClick = callback;
      this._data.city.currentCity.isShowPhoto = false;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _eventRollupBtnClickHandler));
    });

    _classPrivateFieldInitSpec(this, _eventRollupBtnClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.rollupClick();
      }
    });

    this._data = { ..._point
    };

    _classPrivateFieldGet(this, _findTags).call(this);
  }

  get template() {
    return createEditPoint(this._data);
  }

}

/***/ }),

/***/ "./src/view/site-list-view.js":
/*!************************************!*\
  !*** ./src/view/site-list-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventsListTemplate)
/* harmony export */ });
/* harmony import */ var _Abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract-view */ "./src/view/Abstract-view.js");


const createEventsListTemplate = () => `<ul class="trip-events__list">
   </ul>`;

class EventsListTemplate extends _Abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createEventsListTemplate();
  }

}

/***/ }),

/***/ "./src/view/site-trip-event-item-view.js":
/*!***********************************************!*\
  !*** ./src/view/site-trip-event-item-view.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripEventsItemTemplate)
/* harmony export */ });
/* harmony import */ var _utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/functionsWithDayjs.js */ "./src/utils/functionsWithDayjs.js");
/* harmony import */ var _Abstract_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Abstract-view.js */ "./src/view/Abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const createTripEventsItemTemplate = point => {
  const {
    waypointType,
    destination,
    cost,
    startD,
    endD,
    duration,
    offers,
    favor
  } = point;
  const startDayMonth = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(startD, 'MMM D');
  const startDate = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(startD, 'YYYY-MM-D');
  const startDatetime = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(startD, 'YYYY-MM-DDTHH:mm');
  const startTime = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(startD, 'HH:mm');
  const endDatetime = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(endD, 'YYYY-MM-DDTHH:mm');
  const endTime = (0,_utils_functionsWithDayjs_js__WEBPACK_IMPORTED_MODULE_0__.dateRend)(endD, 'HH:mm');

  const getDuration = dur => {
    const result = [];

    if (dur.days !== 0) {
      result[0] = `${String(dur.days).padStart(2, '0')}D`;
    }

    if (dur.hours !== 0) {
      result[1] = `${String(dur.hours).padStart(2, '0')}H`;
    }

    if (dur.minutes !== 0) {
      result[2] = `${String(dur.minutes).padStart(2, '0')}M`;
    }

    return result.join(' ');
  };

  const createListOffers = offer => {
    if (offer.isChosen) {
      const name = offer.name;
      const price = offer.price;
      return `<li class="event__offer">
                    <span class="event__offer-title">${name}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </li>`;
    }
  };

  const isFavorite = favor ? ' event__favorite-btn--active' : '';
  const listOffers = offers.map(createListOffers).join('');
  const durat = getDuration(duration);
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startDate}">${startDayMonth}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${waypointType} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDatetime}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDatetime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${durat}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${cost}</span>
                </p>
                  <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${listOffers}
                  </ul>
                  <button class="event__favorite-btn event__favorite-btn--${isFavorite}}" type="button">
                    <span class="visually-hidden">Add to favorite</span>
                    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                    </svg>
                  </button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </div>
              </li>`;
};

var _point = /*#__PURE__*/new WeakMap();

var _editClickHandler = /*#__PURE__*/new WeakMap();

var _favoriteClickHandler = /*#__PURE__*/new WeakMap();

class TripEventsItemTemplate extends _Abstract_view_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(point) {
    super();

    _classPrivateFieldInitSpec(this, _point, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setEditClickHandler", callback => {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _editClickHandler));
    });

    _defineProperty(this, "setFavoriteClickHandler", callback => {
      this._callback.favoriteClick = callback;
      this.element.querySelector('.event__favorite-btn').addEventListener('click', _classPrivateFieldGet(this, _favoriteClickHandler));
    });

    _classPrivateFieldInitSpec(this, _editClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.editClick();
      }
    });

    _classPrivateFieldInitSpec(this, _favoriteClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.favoriteClick();
      }
    });

    _classPrivateFieldSet(this, _point, point);
  }

  get template() {
    return createTripEventsItemTemplate(_classPrivateFieldGet(this, _point));
  }

}

/***/ }),

/***/ "./src/view/site-trip-filter.js":
/*!**************************************!*\
  !*** ./src/view/site-trip-filter.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripFiltersTemplate)
/* harmony export */ });
/* harmony import */ var _Abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract-view */ "./src/view/Abstract-view.js");


const createTripFiltersTemplate = () => `<form class="trip-filters" action="#" method="get">
          <div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
            <label class="trip-filters__filter-label" for="filter-future">Future</label>
          </div>
          <div class="trip-filters__filter">
            <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
            <label class="trip-filters__filter-label" for="filter-past">Past</label>
          </div>
          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>`;

class TripFiltersTemplate extends _Abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createTripFiltersTemplate();
  }

}

/***/ }),

/***/ "./src/view/site-trip-sort.js":
/*!************************************!*\
  !*** ./src/view/site-trip-sort.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripSortTemplate)
/* harmony export */ });
/* harmony import */ var _Abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract-view */ "./src/view/Abstract-view.js");
/* harmony import */ var _utils_informations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/informations */ "./src/utils/informations.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




const createTripSortTemplate = () => `<div class="board__sort-list">
    <a href="#" class="board__sort-item" data-sort-type="${_utils_informations__WEBPACK_IMPORTED_MODULE_1__.SortType.DEFAULT}">SORT BY DEFAULT</a>
    <a href="#" class="board__sort-item" data-sort-type="${_utils_informations__WEBPACK_IMPORTED_MODULE_1__.SortType.DATE_UP}">SORT BY DATE up</a>
    <a href="#" class="board__sort-item" data-sort-type="${_utils_informations__WEBPACK_IMPORTED_MODULE_1__.SortType.DATE_DOWN}">SORT BY DATE down</a>
  </div>`;

var _sortTypeChangeHandler = /*#__PURE__*/new WeakMap();

class TripSortTemplate extends _Abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setSortTypeChangeHandler", callback => {
      this._callback.sortTypeChange = callback;
      this.element.addEventListener('click', _classPrivateFieldGet(this, _sortTypeChangeHandler));
    });

    _classPrivateFieldInitSpec(this, _sortTypeChangeHandler, {
      writable: true,
      value: evt => {
        if (evt.target.tagName !== 'A') {
          return;
        }

        evt.preventDefault();

        this._callback.sortTypeChange(evt.target.dataset.sortType);
      }
    });
  }

  get template() {
    return createTripSortTemplate();
  }

}

/***/ }),

/***/ "./src/view/site-trip-tabs.js":
/*!************************************!*\
  !*** ./src/view/site-trip-tabs.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTripTabsTemplate": () => (/* binding */ createTripTabsTemplate),
/* harmony export */   "default": () => (/* binding */ TripTabsTemplate)
/* harmony export */ });
/* harmony import */ var _Abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Abstract-view */ "./src/view/Abstract-view.js");

const createTripTabsTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
                  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
                  <a class="trip-tabs__btn" href="#">Stats</a>
                </nav>`;
class TripTabsTemplate extends _Abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createTripTabsTemplate();
  }

}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));

/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mock_point_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mock/point.js */ "./src/mock/point.js");
/* harmony import */ var _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter/trip-presenter.js */ "./src/presenter/trip-presenter.js");


const POINT_COUNT = 15;
const points = Array.from({
  length: POINT_COUNT
}, _mock_point_js__WEBPACK_IMPORTED_MODULE_0__.generatePoint);
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripPresenter = new _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_1__["default"](tripEventsElement, tripControlsNavigationElement, tripControlsFiltersElement);
tripPresenter.init(points);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map