import {
  __publicField,
  __toESM,
  require_react
} from "./chunk-Q462PRL3.js";

// node_modules/react-google-charts/dist/index.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
function useLoadScript(src) {
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
  const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
  const onLoad = () => {
    setIsLoading(false);
    setIsSuccess(true);
  };
  (0, import_react.useEffect)(() => {
    if (!document) {
      const error2 = new Error(`[ScriptLoadingError] document not defined when attempting to load ${src}`);
      setError(error2);
      return;
    }
    const foundScript = document.querySelector(`script[src="${src}"]`);
    if (foundScript == null ? void 0 : foundScript.dataset.loaded) {
      onLoad();
      return;
    }
    const script = foundScript || document.createElement("script");
    if (!foundScript) {
      script.src = src;
    }
    const onLoadWithMarker = () => {
      script.dataset.loaded = "1";
      onLoad();
    };
    script.addEventListener("load", onLoadWithMarker);
    script.addEventListener("error", (err) => {
      console.error("Failed to load script:", src, err);
      const error2 = new Error(`[ScriptLoadingError] Failed to load script: ${src}`);
      setError(error2);
    });
    if (!foundScript) {
      document.head.append(script);
    }
  }, []);
  return {
    isLoading,
    error,
    isSuccess
  };
}
var isGoogleReady = (google) => {
  return google && google.charts;
};
var isGoogleChartsReady = (props, google) => {
  const { controls, toolbarItems, getChartEditor } = props;
  return google && google.charts && google.visualization && google.visualization.ChartWrapper && google.visualization.Dashboard && (!controls || google.visualization.ChartWrapper) && (!getChartEditor || google.visualization.ChartEditor) && (!toolbarItems || google.visualization.drawToolbar);
};
var getGoogleInstanceFromWindow = (props) => {
  const google = window.google;
  return google;
};
function useLoadGoogleCharts(props) {
  const { chartVersion = "current", chartPackages = [
    "corechart",
    "controls"
  ], chartLanguage = "en", mapsApiKey } = props;
  const [googleCharts, setGoogleCharts] = (0, import_react.useState)(null);
  const [scriptInitializationError, setScriptInitializationError] = (0, import_react.useState)(null);
  const [googleChartsInitializationError, setGoogleChartsInitializationError] = (0, import_react.useState)(null);
  const { isLoading, error: scriptLoadingError, isSuccess } = useLoadScript(props.chartLoaderScriptUrl || "https://www.gstatic.com/charts/loader.js");
  (0, import_react.useEffect)(() => {
    if (!isSuccess) {
      return;
    }
    const google = getGoogleInstanceFromWindow();
    if (!isGoogleReady(google)) {
      const error = new Error("[ScriptInitializationError] Script loaded but Google not attached to window.");
      setScriptInitializationError(error);
      return;
    }
    if (isGoogleChartsReady(props, google)) {
      setGoogleCharts(google);
      return;
    }
    google.charts.load(chartVersion, {
      packages: chartPackages,
      language: chartLanguage,
      mapsApiKey
    });
    google.charts.setOnLoadCallback(() => {
      if (!isGoogleChartsReady(props, google)) {
        const error = new Error("[GoogleChartsInitializationError] Google Charts not ready after load callback.");
        console.error(error);
        setGoogleChartsInitializationError(error);
        return;
      }
      setGoogleCharts(google);
    });
  }, [
    isSuccess
  ]);
  return {
    error: scriptLoadingError || scriptInitializationError || googleChartsInitializationError,
    isLoading,
    google: googleCharts
  };
}
var chartDefaultProps = {
  // <DEPRECATED_PROPS>
  legend_toggle: false,
  // </DEPRECATED_PROPS>
  options: {},
  legendToggle: false,
  getChartWrapper: () => {
  },
  spreadSheetQueryParameters: {
    headers: 1,
    gid: 1
  },
  rootProps: {},
  chartWrapperParams: {},
  chartLoaderScriptUrl: "https://www.gstatic.com/charts/loader.js"
};
var GoogleChartControls = (props) => {
  const { isReady, chartControls, filter } = props;
  if (!isReady || !chartControls || !(chartControls == null ? void 0 : chartControls.length)) {
    return null;
  }
  return import_react.default.createElement(import_react.default.Fragment, null, chartControls.filter((param) => {
    let { controlProp, control } = param;
    return filter ? filter({
      control,
      controlProp
    }) : true;
  }).map((param) => {
    let { control } = param;
    return import_react.default.createElement("div", {
      key: control.getContainerId(),
      id: control.getContainerId()
    });
  }));
};
var uniqueID = 0;
var generateUniqueID = () => {
  uniqueID += 1;
  return `reactgooglegraph-${uniqueID}`;
};
var _GoogleChartControlsInternal = class _GoogleChartControlsInternal {
};
/**
* Initialize the controls once chart is ready
*/
__publicField(_GoogleChartControlsInternal, "initializeControls", (googleChartControls) => {
  for (let i = 0; i < googleChartControls.length; i += 1) {
    const { controlType, options, controlWrapperParams } = googleChartControls[i].controlProp;
    if (controlWrapperParams && "state" in controlWrapperParams) {
      googleChartControls[i].control.setState(controlWrapperParams["state"]);
    }
    googleChartControls[i].control.setOptions(options);
    googleChartControls[i].control.setControlType(controlType);
  }
});
/**
* listen to the control events (ready, statechange, error) specified in the controlEvents prop
*/
__publicField(_GoogleChartControlsInternal, "listenToControlEvents", (googleChartControls, props) => {
  const { google } = props;
  return googleChartControls.flatMap((chartControl) => {
    const { control, controlProp } = chartControl;
    const { controlEvents = [] } = controlProp;
    return controlEvents.map((event) => {
      const { callback, eventName } = event;
      return google.visualization.events.addListener(control, eventName, function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback({
          chartWrapper: null,
          controlWrapper: control,
          props,
          google,
          eventArgs: args
        });
      });
    });
  });
});
/**
* If controlID is not provided, generate a unique controlID
*/
__publicField(_GoogleChartControlsInternal, "createControlId", (id) => {
  let controlID;
  if (typeof id === "undefined") {
    controlID = `googlechart-control-${generateUniqueID()}`;
  } else {
    controlID = id;
  }
  return controlID;
});
/**
* Map the control props to Google Chart Controls
*/
__publicField(_GoogleChartControlsInternal, "createChartControls", (props) => {
  const { controls, google } = props;
  if (!controls) {
    return null;
  }
  return controls.map((control, i) => {
    const { controlID: controlIDMaybe, controlType, options: controlOptions, controlWrapperParams } = control;
    const controlID = _GoogleChartControlsInternal.createControlId(controlIDMaybe);
    return {
      controlProp: control,
      control: new google.visualization.ControlWrapper({
        containerId: controlID,
        controlType,
        options: controlOptions,
        ...controlWrapperParams
      })
    };
  });
});
__publicField(_GoogleChartControlsInternal, "addControls", (props) => {
  const { chartWrapper, chartDashboard } = props;
  const googleChartControls = _GoogleChartControlsInternal.createChartControls(props);
  if (!googleChartControls || !chartDashboard || !chartWrapper) {
    return null;
  }
  chartDashboard.bind(googleChartControls.map((param) => {
    let { control } = param;
    return control;
  }), chartWrapper);
  _GoogleChartControlsInternal.initializeControls(googleChartControls);
  return googleChartControls;
});
var GoogleChartControlsInternal = _GoogleChartControlsInternal;
var useCreateChartControls = (controls) => {
  const [chartControls, setChartControls] = React.useState(null);
  const controlAndProp = React.useMemo(() => {
    if (!chartControls || !controls) return null;
    return controls.map((controlProp, i) => {
      const control = chartControls[i];
      return control ? {
        controlProp,
        control
      } : void 0;
    }).flatMap((controlAndProp2) => controlAndProp2 ? [
      controlAndProp2
    ] : []);
  }, [
    chartControls,
    controls
  ]);
  return [
    controlAndProp,
    setChartControls
  ];
};
var useListenToControlEvents = (chartControls, props) => {
  React.useEffect(() => {
    const listeners = GoogleChartControlsInternal.listenToControlEvents(chartControls ?? [], props);
    return () => {
      listeners.forEach((listener) => {
        props.google.visualization.events.removeListener(listener);
      });
    };
  }, [
    chartControls,
    props
  ]);
};
var useChartControls = (props) => {
  const [chartControls, setChartControls] = useCreateChartControls(props.controls);
  useListenToControlEvents(chartControls ?? [], props);
  const renderControl = (filter) => {
    const { chartWrapper, chartDashboard } = props;
    return React.createElement(GoogleChartControls, {
      ...props,
      isReady: Boolean(chartWrapper && chartDashboard),
      chartControls,
      filter
    });
  };
  return {
    addControls: (props2) => {
      const controls = GoogleChartControlsInternal.addControls(props2);
      setChartControls((controls == null ? void 0 : controls.map((control) => control.control)) ?? null);
    },
    renderControl
  };
};
var useChartId = (props) => {
  const chartIdRef = React.useRef(null);
  const getChartId = () => {
    const { graphID, graph_id } = props;
    const chartIdFromProps = graphID || graph_id;
    let currentChartId;
    if (chartIdFromProps) {
      currentChartId = chartIdFromProps;
    } else {
      currentChartId = chartIdRef.current || generateUniqueID();
    }
    chartIdRef.current = currentChartId;
    return chartIdRef.current;
  };
  const chartId = getChartId();
  return {
    chartId
  };
};
var DEFAULT_CHART_COLORS = [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC",
  "#0099C6",
  "#DD4477",
  "#66AA00",
  "#B82E2E",
  "#316395",
  "#994499",
  "#22AA99",
  "#AAAA11",
  "#6633CC",
  "#E67300",
  "#8B0707",
  "#329262",
  "#5574A6",
  "#3B3EAC"
];
var loadDataTableFromSpreadSheet = async function(googleViz, spreadSheetUrl) {
  let urlParams = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return new Promise((resolve, reject) => {
    const headers = `${urlParams.headers ? `headers=${urlParams.headers}` : `headers=0`}`;
    const queryString = `${urlParams.query ? `&tq=${encodeURIComponent(urlParams.query)}` : ``}`;
    const gid = `${urlParams.gid ? `&gid=${urlParams.gid}` : ""}`;
    const sheet = `${urlParams.sheet ? `&sheet=${urlParams.sheet}` : ""}`;
    const access_token = `${urlParams.access_token ? `&access_token=${urlParams.access_token}` : ""}`;
    const urlQueryString = `${headers}${gid}${sheet}${queryString}${access_token}`;
    const urlToSpreadSheet = `${spreadSheetUrl}/gviz/tq?${urlQueryString}`;
    const query = new googleViz.visualization.Query(urlToSpreadSheet);
    query.send((response) => {
      if (response.isError()) {
        reject(`Error in query:  ${response.getMessage()} ${response.getDetailedMessage()}`);
      } else {
        resolve(response.getDataTable());
      }
    });
  });
};
var GRAY_COLOR = "#CCCCCC";
var _GoogleChartInternal = class _GoogleChartInternal {
};
__publicField(_GoogleChartInternal, "grayOutHiddenColumnsLabel", (props, hiddenColumns) => {
  const { googleChartWrapper, options } = props;
  if (!googleChartWrapper) {
    console.error("googleChartWrapper is not defined");
    return;
  }
  const dataTable = googleChartWrapper.getDataTable();
  if (!dataTable) return;
  const columnCount = dataTable.getNumberOfColumns();
  const hasAHiddenColumn = hiddenColumns.length > 0;
  if (hasAHiddenColumn === false) return;
  const colors = Array.from({
    length: columnCount - 1
  }).map((_dontcare, i) => {
    const columnID = _GoogleChartInternal.getColumnId(dataTable, i + 1);
    if (hiddenColumns.includes(columnID)) {
      return GRAY_COLOR;
    } else if (options && options.colors) {
      return options.colors[i];
    } else {
      return DEFAULT_CHART_COLORS[i];
    }
  });
  googleChartWrapper.setOptions({
    ...options,
    colors
  });
  googleChartWrapper.draw();
});
/**
* Listens to user clicking on the legend to toggle the visibility of a column.
* When a user clicks on a legend item, the column id is added to / removed from the hiddenColumns state.
*/
__publicField(_GoogleChartInternal, "listenToLegendToggle", (props, hiddenColumnsState) => {
  const [hiddenColumns, setHiddenColumns] = hiddenColumnsState;
  const { google, googleChartWrapper } = props;
  if (!googleChartWrapper) {
    console.error("googleChartWrapper is not defined");
    return;
  }
  return google.visualization.events.addListener(googleChartWrapper, "select", () => {
    const chart = googleChartWrapper.getChart();
    const selection = chart.getSelection();
    const dataTable = googleChartWrapper.getDataTable();
    if (selection.length === 0 || // We want to listen to when a whole row is selected. This is the case only when row === null
    selection[0].row !== null || !dataTable) {
      return;
    }
    const columnIndex = selection[0].column;
    const columnID = _GoogleChartInternal.getColumnId(dataTable, columnIndex);
    if (hiddenColumns == null ? void 0 : hiddenColumns.includes(columnID)) {
      setHiddenColumns((state) => [
        ...state.filter((colID) => colID !== columnID)
      ]);
    } else {
      setHiddenColumns((state) => [
        ...state,
        columnID
      ]);
    }
  });
});
/**
* (Re-)Draw a Google Chart with the given data, options, and chart type.
*/
__publicField(_GoogleChartInternal, "draw", async (props) => {
  const { data, diffdata, rows, columns, options, chartType, formatters, spreadSheetUrl, spreadSheetQueryParameters, googleChartDashboard, googleChartWrapper, google, hiddenColumns, legendToggle, legend_toggle } = props;
  if (!googleChartWrapper) {
    console.error("draw was called with googleChartWrapper = null");
    return;
  }
  let dataTable;
  let chartDiff = null;
  if (diffdata) {
    const oldData = google.visualization.arrayToDataTable(diffdata.old);
    const newData = google.visualization.arrayToDataTable(diffdata.new);
    chartDiff = google.visualization[chartType].prototype.computeDiff(oldData, newData);
  }
  if (data) {
    if (data instanceof google.visualization.DataTable) {
      dataTable = data;
    } else if (Array.isArray(data)) {
      dataTable = google.visualization.arrayToDataTable(data);
    } else {
      dataTable = new google.visualization.DataTable(data);
    }
  } else if (rows && columns) {
    dataTable = google.visualization.arrayToDataTable([
      columns,
      ...rows
    ]);
  } else if (spreadSheetUrl) {
    dataTable = await loadDataTableFromSpreadSheet(google, spreadSheetUrl, spreadSheetQueryParameters);
  } else {
    dataTable = google.visualization.arrayToDataTable([]);
  }
  const columnCount = dataTable.getNumberOfColumns();
  const viewColumns = Array(columnCount).fill(0).map((_c, i) => {
    const columnID = _GoogleChartInternal.getColumnId(dataTable, i);
    if (hiddenColumns.includes(columnID)) {
      return {
        label: dataTable.getColumnLabel(i),
        type: dataTable.getColumnType(i),
        calc: () => null
      };
    } else {
      return i;
    }
  });
  const chart = googleChartWrapper.getChart();
  if (googleChartWrapper.getChartType() === "Timeline") {
    chart && chart.clearChart();
  }
  googleChartWrapper.setChartType(chartType);
  googleChartWrapper.setOptions(options || {});
  const viewTable = new google.visualization.DataView(dataTable);
  viewTable.setColumns(viewColumns);
  googleChartWrapper.setDataTable(viewTable);
  googleChartWrapper.draw();
  if (googleChartDashboard) {
    googleChartDashboard.draw(dataTable);
  }
  if (chartDiff) {
    googleChartWrapper.setDataTable(chartDiff);
    googleChartWrapper.draw();
  }
  if (formatters) {
    _GoogleChartInternal.applyFormatters({
      dataTable,
      formatters,
      google
    });
    googleChartWrapper.setDataTable(dataTable);
    googleChartWrapper.draw();
  }
  if (legendToggle === true || legend_toggle === true) {
    _GoogleChartInternal.grayOutHiddenColumnsLabel(props, hiddenColumns);
  }
  return;
});
/**
* Get the column ID of a column in a GoogleDataTable.
* If the column has an ID, return the ID, otherwise return the label.
*/
__publicField(_GoogleChartInternal, "getColumnId", (dataTable, columnIndex) => {
  return dataTable.getColumnId(columnIndex) || dataTable.getColumnLabel(columnIndex);
});
/**
* Apply Chart Formatters passed under the formatters prop to the GoogleDataTable
*/
__publicField(_GoogleChartInternal, "applyFormatters", (param) => {
  let { dataTable, formatters, google } = param;
  for (let formatter of formatters) {
    switch (formatter.type) {
      case "ArrowFormat": {
        const vizFormatter = new google.visualization.ArrowFormat(formatter.options);
        vizFormatter.format(dataTable, formatter.column);
        return;
      }
      case "BarFormat": {
        const vizFormatter = new google.visualization.BarFormat(formatter.options);
        vizFormatter.format(dataTable, formatter.column);
        return;
      }
      case "ColorFormat": {
        const vizFormatter = new google.visualization.ColorFormat(formatter.options);
        const { ranges } = formatter;
        if (ranges) {
          for (let range of ranges) {
            vizFormatter.addRange(...range);
          }
        }
        vizFormatter.format(dataTable, formatter.column);
        return;
      }
      case "DateFormat": {
        const vizFormatter = new google.visualization.DateFormat(formatter.options);
        vizFormatter.format(dataTable, formatter.column);
        return;
      }
      case "NumberFormat": {
        const vizFormatter = new google.visualization.NumberFormat(formatter.options);
        vizFormatter.format(dataTable, formatter.column);
        return;
      }
      case "PatternFormat": {
        const vizFormatter = new google.visualization.PatternFormat(formatter.options);
        vizFormatter.format(dataTable, formatter.column);
        return;
      }
      default: {
        console.warn(`Unknown formatter type: ${formatter.type}`);
        return;
      }
    }
  }
});
var GoogleChartInternal = _GoogleChartInternal;
var useGoogleChartDataTable = (props) => {
  const { google, googleChartWrapper, googleChartDashboard } = props;
  const [hiddenColumns, setHiddenColumns] = React.useState([]);
  React.useEffect(() => {
    if (!googleChartWrapper) {
      return;
    }
    GoogleChartInternal.draw({
      ...props,
      hiddenColumns,
      googleChartWrapper,
      googleChartDashboard,
      google
    });
  }, [
    hiddenColumns,
    props.data,
    props.rows,
    props.columns,
    props.options,
    props.chartLoaderScriptUrl,
    props.chartType,
    props.formatters,
    props.spreadSheetUrl,
    props.spreadSheetQueryParameters,
    props.legendToggle,
    props.legend_toggle
  ]);
  const onResize = () => {
    const { googleChartWrapper: googleChartWrapper2 } = props;
    if (!googleChartWrapper2) {
      return;
    }
    googleChartWrapper2.draw();
  };
  const initialize = (googleChartWrapper2) => {
    const listeners = [];
    const { legendToggle, legend_toggle } = props;
    GoogleChartInternal.draw({
      ...props,
      hiddenColumns,
      googleChartWrapper: googleChartWrapper2,
      googleChartDashboard,
      google
    });
    window.addEventListener("resize", onResize);
    if (legend_toggle || legendToggle) {
      const listener = GoogleChartInternal.listenToLegendToggle(props, [
        hiddenColumns,
        setHiddenColumns
      ]);
      if (listener) listeners.push(listener);
    }
    return listeners;
  };
  const destroy = (googleChartWrapper2, listeners) => {
    window.removeEventListener("resize", onResize);
    listeners.forEach((listener) => {
      google.visualization.events.removeListener(listener);
    });
    if (googleChartWrapper2.getChartType() === "Timeline") {
      googleChartWrapper2.getChart() && googleChartWrapper2.getChart().clearChart();
    }
  };
  React.useEffect(() => {
    if (!googleChartWrapper) {
      return;
    }
    const listeners = initialize(googleChartWrapper);
    return () => {
      destroy(googleChartWrapper, listeners);
    };
  }, [
    googleChartWrapper,
    initialize,
    destroy
  ]);
};
var listenToEvents = (props) => {
  const { chartEvents, google, googleChartWrapper } = props;
  if (!chartEvents) {
    return;
  }
  if (!googleChartWrapper) {
    console.warn("listenToEvents was called before chart wrapper ready.");
    return;
  }
  return chartEvents.map((param) => {
    let { eventName, callback } = param;
    return google.visualization.events.addListener(googleChartWrapper, eventName, function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      callback({
        chartWrapper: googleChartWrapper,
        props,
        google,
        eventArgs: args
      });
    });
  });
};
var useGoogleChartEvents = (props) => {
  (0, import_react.useEffect)(() => {
    if (!props.googleChartWrapper) return;
    const listeners = listenToEvents(props);
    return () => {
      listeners == null ? void 0 : listeners.forEach((listener) => {
        props.google.visualization.events.removeListener(listener);
      });
    };
  }, [
    props
  ]);
};
var GoogleChart = (props) => {
  const [googleChartWrapper, setGoogleChartWrapper] = React.useState(null);
  const [googleChartDashboard, setGoogleChartDashboard] = React.useState(null);
  const { addControls, renderControl } = useChartControls({
    ...props,
    chartDashboard: googleChartDashboard,
    chartWrapper: googleChartWrapper
  });
  useGoogleChartEvents({
    ...props,
    googleChartWrapper
  });
  const { chartId } = useChartId(props);
  const dashboardRef = React.useRef(null);
  const toolbarRef = React.useRef(null);
  React.useEffect(() => {
    const { options: options2, google, chartType, chartWrapperParams, toolbarItems, getChartEditor, getChartWrapper, onLoad } = props;
    const chartConfig = {
      chartType,
      options: options2,
      containerId: chartId,
      ...chartWrapperParams
    };
    const chartWrapper = new google.visualization.ChartWrapper(chartConfig);
    chartWrapper.setOptions(options2 || {});
    getChartWrapper == null ? void 0 : getChartWrapper(chartWrapper, google);
    const chartDashboard = new google.visualization.Dashboard(dashboardRef.current);
    if (toolbarItems) {
      google.visualization.drawToolbar(toolbarRef.current, toolbarItems);
    }
    let chartEditor = null;
    if (getChartEditor) {
      chartEditor = new google.visualization.ChartEditor();
      getChartEditor({
        chartEditor,
        chartWrapper,
        google
      });
    }
    addControls({
      ...props,
      chartDashboard,
      chartWrapper
    });
    setGoogleChartWrapper(chartWrapper);
    setGoogleChartDashboard(chartDashboard);
    onLoad == null ? void 0 : onLoad(google, {
      google,
      chartWrapper,
      chartEditor,
      chartDashboard
    });
  }, []);
  useGoogleChartDataTable({
    ...props,
    googleChartWrapper,
    googleChartDashboard
  });
  const renderChart = () => {
    const { width: width2, height: height2, options: options2, style: style2, className, rootProps, google } = props;
    const divStyle2 = {
      height: height2 || options2 && options2.height,
      width: width2 || options2 && options2.width,
      ...style2
    };
    return React.createElement("div", {
      id: chartId,
      style: divStyle2,
      className,
      ...rootProps
    });
  };
  const renderToolBar = () => {
    if (!props.toolbarItems) return null;
    return React.createElement("div", {
      ref: toolbarRef
    });
  };
  const { width, height, options, style } = props;
  const divStyle = {
    height: height || options && options.height,
    width: width || options && options.width,
    ...style
  };
  if (props.render) {
    return React.createElement("div", {
      ref: dashboardRef,
      style: divStyle
    }, React.createElement("div", {
      ref: toolbarRef,
      id: "toolbar"
    }), props.render({
      renderChart,
      renderControl,
      renderToolbar: renderToolBar
    }));
  } else {
    return React.createElement("div", {
      ref: dashboardRef,
      style: divStyle
    }, renderControl((param) => {
      let { controlProp } = param;
      return controlProp.controlPosition !== "bottom";
    }), renderChart(), renderControl((param) => {
      let { controlProp } = param;
      return controlProp.controlPosition === "bottom";
    }), renderToolBar());
  }
};
var ChartContext = React.createContext(chartDefaultProps);
var ContextProvider = (param) => {
  let { children, value } = param;
  return React.createElement(ChartContext.Provider, {
    value
  }, children);
};
var ChartView = (props) => {
  const { google, isLoading, error } = useLoadGoogleCharts(props);
  if (isLoading) {
    return props.loader ?? null;
  }
  if (error) {
    return props.errorElement ?? null;
  }
  if (google) {
    return import_react.default.createElement(GoogleChart, {
      google,
      ...props
    });
  }
  return null;
};
var Chart = (userProps) => {
  const props = {
    ...chartDefaultProps,
    ...userProps
  };
  return import_react.default.createElement(ContextProvider, {
    value: props
  }, import_react.default.createElement(ChartView, props));
};
var GoogleDataTableColumnRoleType;
(function(GoogleDataTableColumnRoleType2) {
  GoogleDataTableColumnRoleType2["annotation"] = "annotation";
  GoogleDataTableColumnRoleType2["annotationText"] = "annotationText";
  GoogleDataTableColumnRoleType2["certainty"] = "certainty";
  GoogleDataTableColumnRoleType2["emphasis"] = "emphasis";
  GoogleDataTableColumnRoleType2["interval"] = "interval";
  GoogleDataTableColumnRoleType2["scope"] = "scope";
  GoogleDataTableColumnRoleType2["style"] = "style";
  GoogleDataTableColumnRoleType2["tooltip"] = "tooltip";
  GoogleDataTableColumnRoleType2["domain"] = "domain";
})(GoogleDataTableColumnRoleType || (GoogleDataTableColumnRoleType = {}));
export {
  Chart,
  GoogleDataTableColumnRoleType,
  Chart as default
};
//# sourceMappingURL=react-google-charts.js.map
