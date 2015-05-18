var cntryName;
var cntryID;
var cntryCenterX;
var cntryCenterY;
var cntryZoomLevel;
var cntrySchemeYears;
var cntryClassificationEpoch;
var serviceUrl;
var serviceUrlVector;
var cntryBndType;
var bndrys;
var downloadUrls;
var cntrySchm_I_legend;
var cntrySchm_II_legend;
var map;
var globalswipeWidget;
var globalArcGISTiledMapServiceLayer;
var globalArcGISDynamicMapServiceLayer;
var globalLayerSwipe;
var currentBottom;
var currentSwipe;
var currentOpacity;
var allLayers = [];
var landcover;
var schmType;
var stsViewMode;
var globaFeatureLayer;
var thInfoTemplate;
var globalSimpleFillSymbol;
var globalLabelLayer;
var globalSimpleLineSymbol;
var gloabalesriLang;
var globalTextSymbol;
var globalGraphic;
var globalSimpleRenderer;
var globalColor;
var globalQuery;
var globalExtent;
var cntryschm_I_json_stats;
var admin_0_schm_1_json_stats,
admin_1_schm_1_json_stats,
admin_2_schm_1_json_stats;
var admin_0_schm_2_json_stats,
admin_1_schm_2_json_stats,
admin_2_schm_2_json_stats;
var cntryStatsFields;
var selectedFeatureName;
var cntryAdminLevel;
var resizeTimer;
var isToggld;



function setCountryParams(cntrID){ (function($){
        //var url = 'http://127.0.0.1/landcoverviewer2/js/countryConfigs.json?callback=?';
        var url = 'js/countryConfigs.json?callback=?';
        $.ajax({
            type : 'GET',
            url : url,
            async : false,
            jsonpCallback : 'jsonCallback',
            contentType : "application/json",
            dataType : 'jsonp',
            success : function(json){
                for(i = 0; i < json.country.length; i ++ ){
                    
                    if(cntrID == i){
                        cntryName = json.country[i].name;
                        cntryID = json.country[i].id;
                        cntryCenterX = json.country[i].centerX;
                        cntryCenterY = json.country[i].centerY;
                        cntryZoomLevel = json.country[i].zoomLevel;
                        cntrySchemeYears = json.country[i].schemeIyears;
                        cntryClassificationEpoch = parseInt(json.country[i].classficationEpochs);
                        serviceUrl = json.country[i].serviceUrl;
                        serviceUrlVector = json.country[i].serviceUrl_vector;
                        downloadUrls = json.country[i].downLoadURLs;
                        cntrySchm_I_legend = json.country[i].schm_I_Legend_URLs;
                        cntrySchm_II_legend = json.country[i].schm_II_Legend_URLs;
                        bndrys= json.country[i].boundaryType;
                        cntryAdminLevel = 3;
                        //cntryschm_I_json_stats = json.country[i].schm_I_json_stats;
                        cntryStatsFields = json.country[i].statsFields;
                        admin_0_schm_1_json_stats = json.country[i].admin_1_schm_1_json_stats;
                        admin_1_schm_1_json_stats = json.country[i].admin_2_schm_1_json_stats;
                        admin_2_schm_1_json_stats = json.country[i].admin_3_schm_1_json_stats;
                        admin_0_schm_2_json_stats = json.country[i].admin_1_schm_2_json_stats;
                        admin_1_schm_2_json_stats = json.country[i].admin_2_schm_2_json_stats;
                        admin_2_schm_2_json_stats = json.country[i].admin_3_schm_2_json_stats;
                    }
                }
            },
            error : function(e){
                alert(e.message);
            }
        });
        
    })(jQuery);
}

setCountryParams(0);
schmType = 1;
stsViewMode = "mouse-over";

function initSliderButtons(){
    $(".toggle-btn:not('.noscript') input[type=radio]").addClass("visuallyhidden");
    $(".toggle-btn:not('.noscript') input[type=radio]").change(function(){
        if($(this).attr("name")){
            $(this).parent().addClass("success").siblings().removeClass("success");
            toggleSwipeOrientation();
        }
        else{
            $(this).parent().toggleClass("success");
        }
    });
}

$(function(){
    Shadowbox.init({
        continuous : false,
        counterType : "none"
    }, function(){
        $('#btnAboutSERVIR').show();
        $('#btnmetadatainfo').show();
        $('#btnviewerinfo').show();
    });
    
});

require(["esri/map", "esri/dijit/LayerSwipe", "esri/geometry/Extent", "esri/tasks/query", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer", "esri/InfoTemplate", "esri/layers/FeatureLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/renderers/SimpleRenderer", "esri/symbols/TextSymbol", "esri/layers/LabelLayer", "esri/graphic", "esri/lang", "esri/Color", "dojo/number", "esri/arcgis/utils", "dojo/_base/array", "esri/dijit/BasemapToggle", "esri/dijit/BasemapGallery", "dijit/form/HorizontalSlider", "dojo/parser", "dojo/domReady!"], 
function(Map, LayerSwipe, Extent, Query, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, InfoTemplate, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer, TextSymbol, LabelLayer, Graphic, esriLang, Color, number, arcgisUtils, array, BasemapToggle, BasemapGallery, HorizontalSlider, parser){
    initSliderButtons();
    parser.parse();
    map = new Map("map", 
    {
        center : [cntryCenterX, cntryCenterY],
        basemap : "hybrid",
        sliderPosition : "bottom-left",
        zoom : cntryZoomLevel
    });
	
    map.on("load", function(){
         map.graphics.enableMouseEvents();
         
    });
    
    navToolbar = new esri.toolbars.Navigation(map);
    dojo.connect(navToolbar, "onExtentHistoryChange", function(){
        navToolbar.deactivate();
    });
	           
    globalArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
    globaFeatureLayer = FeatureLayer;
    thInfoTemplate = InfoTemplate;
    globalSimpleFillSymbol = SimpleFillSymbol;
    globalSimpleLineSymbol = SimpleLineSymbol;
    globalTextSymbol = TextSymbol;
    gloabalesriLang = esriLang;
    globalGraphic = Graphic;
    globalLabelLayer = LabelLayer;
    globalSimpleRenderer = SimpleRenderer;
    globalColor= Color;
    globalQuery = Query;
    globalExtent = Extent;
    
    /* No need for basemap gallery as the layers are coverage maps
    var basemapGallery = new BasemapGallery({
    showArcGISBasemaps: true,
    map: map
    }, "basemapGallery");
    basemapGallery.startup();

    basemapGallery.on("error", function (msg) {
    console.log("basemap gallery error:  ", msg);
    });
    */
    var schm_years = cntrySchemeYears.split(",");
    
    for(i = 0; i < schm_years.length; i ++ ){
        addDaynamicLayerToSystem(i, "l" + schm_years[i], true);
    }
    //addDaynamicLayerToSystem(0, "l1990", true);
    //addDaynamicLayerToSystem(1, "l2000", true);
    
    //addDaynamicLayerToSystem(2, "l2010", true);
    
    //addLayerToSystem("l2001", true);
    //addLayerToSystem("l2002", true);
    /*addLayerToSystem("l2003", true);
    addLayerToSystem("l2004", true);
    addLayerToSystem("l2005", true);
    addLayerToSystem("l2006", true);
    addLayerToSystem("l2007", true);
    addLayerToSystem("l2008", true);
    addLayerToSystem("l2009", true);*/
    
    currentSwipe = 0;
    
    currentBottom = allLayers.length - 1;
    
    
    allLayers[currentSwipe].show();
    
    allLayers[currentBottom].show();
    globalArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
    
    globalLayerSwipe = LayerSwipe;
    
    var swipeWidget = new LayerSwipe({
        type : "vertical",
        map : map,
        layers : [allLayers[0]]
    }, "swipeDiv");
    
    swipeWidget.startup();
    globalswipeWidget = swipeWidget;
    $("#btnlayermgr").show();
    toggleLayerManager();
    
    
    $("#map_zoom_slider").addClass("esriSimpleSliderBL");
    $("#map_zoom_slider").removeClass("esriSimpleSliderTL");
    map.reorderLayer(allLayers[currentBottom], 1);
    map.reorderLayer(allLayers[currentSwipe], 2);
    
    
    function addLayerToSystem(which, hide){
        allLayers.push(new ArcGISTiledMapServiceLayer(eval('landcover.' + which)));
        allLayers[allLayers.length - 1].id = which;
        map.addLayer(allLayers[allLayers.length - 1]);
        if(hide == true){
            allLayers[allLayers.length - 1].hide();
        }
    }
    
    popDropdowns();
    intDivs();
    getDownloadLinks();
    
    
    
    
    //loadCountry(0);
    
    /* // Can't use opacity with slide plugin - Would have to customize slider to use two divs for the map layers rather than one so that the bottom one is not actually under the top one
    function addOpacityControl() {
    var targetElem = dojo.byId("opacity_control");
    var sliderElem = dojo.create("div", { id: "opacity_slider" }, targetElem, "first");
    opacityControl = new dijit.form.HorizontalSlider({
    name: "slider",
    value: 1,
    minimum: 0,
    maximum: 1,
    showButtons: true,
    intermediateChanges: true,
    style: "width: 250px; margin-right: auto; margin-left: auto;",
    onChange: function (value) {
    allLayers[currentBottom].setOpacity(value);
    allLayers[currentSwipe].setOpacity(value);
    currentOpacity = value;
    }
    }, "opacity_slider");
    opacityControl.startup();
    }
    */
    
    
    // addOpacityControl();
    // dijit.byId('opacity_slider').attr('value', .5);
});

function addDaynamicLayerToSystem(theId, which, hide){
    //theId is the layer Id index as it is on the map document that forms the web service  
    var layer = new globalArcGISDynamicMapServiceLayer(serviceUrl);
    layer.setVisibleLayers([theId]);
    layer.setDisableClientCaching(true);
    if(hide == true){
        layer.hide();
    }
    allLayers.push(layer);
    allLayers[allLayers.length - 1].id = which;
    map.addLayer(layer);


}

function creatLayers(sch){
    map.setBasemap("hybrid");
    //Other valid base maps "streets" , "satellite" , "hybrid", "topo", "gray", "oceans", "national-geographic", and "osm".
    var layer = new globalArcGISDynamicMapServiceLayer(serviceUrl);
    layer.setDisableClientCaching(true);
    var noOfLayers = cntryClassificationEpoch * 2;
    // 2 here means 2 schemes of classification 
    var schm_years = cntrySchemeYears.split(",");
    allLayers.length = 0;
    map.removeAllLayers();
    //alert(noOfLayers);
    var k = 0;
    for(var i = 0; i < noOfLayers; i ++ ){
        if(sch == 1){
            if(i < cntryClassificationEpoch){
                //if the scheme is 1 add scheme_I layers only					  		
                addDaynamicLayerToSystem(i, "l" + schm_years[i], true);
            }
        }
        else{
            if(i >= (cntryClassificationEpoch)){
                //if the scheme is 2 add scheme_II layers only
                addDaynamicLayerToSystem(i, "l" + schm_years[k], true);
                k = k + 1;
            }
        };
    }
    currentSwipe = 0;
    currentBottom = allLayers.length - 1;
    globalswipeWidget.destroy();
    globalswipeWidget = new globalLayerSwipe({
        type : "vertical",
        //Try switching to "scope" or "horizontal"
        map : map,
        layers : [allLayers[0]]
    }, "swipeDiv");
    globalswipeWidget.startup();
    allLayers[currentSwipe].hide();
    map.removeLayer(allLayers[currentBottom]);
    map.addLayer(allLayers[currentBottom]);
    //allLayers[currentSwipe].setOpacity(currentOpacity);
    globalswipeWidget.layers = [allLayers[currentSwipe]];
    allLayers[currentSwipe].show();
    allLayers[currentBottom].show();
    //currentSwipe = which;
    map.reorderLayer(allLayers[currentBottom], 1);
    map.reorderLayer(allLayers[currentSwipe], 2);
    //alert(map.layerIds.length);
    //alert(k); 
}

function loadCountry(cntr){
    //globalswipeWidget.disable();
    //globalswipeWidget.destroy();
    map.graphics.clear();
    map.removeAllLayers();
    setCountryParams(cntr);
    map.centerAndZoom([cntryCenterX, cntryCenterY], cntryZoomLevel);
    map.removeAllLayers();
    creatLayers(schmType);
    loadLegend(schmType);
    popDropdowns();
    getDownloadLinks();
}

function loadStatistics(lyrIndex){
    
    var adminLevel = lyrIndex - 1;
    var bndrs = bndrys.split(",");
    cntryBndType = bndrs[adminLevel] ;
    var layerIndex = lyrIndex - 1;
    map.graphics.clear();
    map.removeAllLayers();
    map.centerAndZoom([cntryCenterX, cntryCenterY], cntryZoomLevel);
    creatLayers(schmType);
    var qryField = cntryStatsFields.split(",");
    console.log(layerIndex);
    console.log("load Stats Query Field:" + qryField[layerIndex]);
    globalswipeWidget.destroy();
    var theinfoTemplate = new thInfoTemplate("${" + qryField[layerIndex] + "}");
    bndryServiceURL = serviceUrlVector + "/" + layerIndex;
    var featureLayer = new globaFeatureLayer(bndryServiceURL, 
    {
        mode: globaFeatureLayer.MODE_SNAPSHOT,        
        outFields : [qryField[layerIndex]],         
    });
    featureLayer.setDefinitionExpression("Country = '" + cntryName + "'");  
        var symbol = new globalSimpleFillSymbol(
          globalSimpleFillSymbol.STYLE_SOLID, 
          new globalSimpleLineSymbol(
            globalSimpleLineSymbol.STYLE_SOLID, 
            new globalColor([102,0,102,0.9]), 2
          ),
          new globalColor([90,100,125,0.3])
        );
        featureLayer.setRenderer(new globalSimpleRenderer(symbol));
        map.addLayer(featureLayer); 
        var adminUnitColor = new globalColor("#FFFFFF"); 
        var adminUnitLabel = new globalTextSymbol().setColor(adminUnitColor);
        adminUnitLabel.font.setSize("6pt");
        adminUnitLabel.font.setFamily("arial");
        adminUnitLabel.font.setWeight("WEIGHT_BOLDER");
        var adminUnitLabelRenderer = new globalSimpleRenderer(adminUnitLabel);
        var labels = new globalLabelLayer({ id: "labels" });
        // tell the label layer to label the countries feature layer 
        // using the field named "admin"
        labels.addFeatureLayer(featureLayer, adminUnitLabelRenderer, "${" + qryField[layerIndex]+ "}");
        // add the label layer to the map
        map.addLayer(labels);
        map.centerAndZoom([cntryCenterX, cntryCenterY], cntryZoomLevel);
        var highlightSymbol = new globalSimpleFillSymbol(
          globalSimpleFillSymbol.STYLE_SOLID, 
          new globalSimpleLineSymbol(
            globalSimpleLineSymbol.STYLE_SOLID, 
            new globalColor([20,255,255, 0.9]), 3
          ), 
          new globalColor([90,100,125,0.6])
        );
        
        featureLayer.on(stsViewMode, function (evt) {
            if (isToggld==false) { 
              toggleLayerManager();
              isToggld = true;
            } 
             stsViewMode = $('input:radio[name=viewMode]:checked').val();            
            map.graphics.clear();
            var highlightGraphic = new globalGraphic(evt.graphic.geometry, highlightSymbol);
            map.graphics.add(highlightGraphic);
            var t = "${" + qryField[layerIndex]+ "}";              
            console.log(t);
            var content = gloabalesriLang.substitute(evt.graphic.attributes, t);
            console.log(content);
            selectedFeatureName = content ;             
            //alert(selectedFeatureName); 
            //google.setOnLoadCallback(drawChart);
             //getStatistics(selectedFeatureName);
            drawChart_percnt();
            drawChart_area();
            
        });

       
        //alert("works")
    //map.addLayer(featureLayer);
    //console.log(getStatistics("NORTH"));    
    //mapClickEvent(featureLayer)
}

function mapClickEvent(featureLayer){
    map.on("click", function (event) {
    //This was an old method
//        var query = new globalQuery();
//        query.geometry = pointToExtent(map, event.mapPoint, 10);
//        var deferred = featureLayer.selectFeatures(query, globaFeatureLayer.SELECTION_NEW);
//        map.infoWindow.setFeatures([deferred]);
//        var jsValue = $('.title').text();
//        selectedFeatureName = jsValue.toUpperCase();
//        console.log(selectedFeatureName);
//        //map.infoWindow.show(event.mapPoint);
//        google.setOnLoadCallback(drawChart);
        //        drawChart();

        //new method here

        featureLayer.on("mouse-up", function (evt) {
            map.graphics.clear();
            var highlightGraphic = new globalGraphic(evt.graphic.geometry, highlightSymbol);
            map.graphics.add(highlightGraphic);
            var t = "${NAME_2}";
            var content = gloabalesriLang.substitute(evt.graphic.attributes, t);
            console.log(content);
            alert(content);

        });

    });
}


function pointToExtent(map, point, toleranceInPixel){
    var pixelWidth = map.extent.getWidth() / map.width;
    var toleranceInMapCoords = toleranceInPixel * pixelWidth;
    return new globalExtent(point.x - toleranceInMapCoords, point.y - toleranceInMapCoords, point.x + toleranceInMapCoords, point.y + toleranceInMapCoords, map.spatialReference);
}

function drawChart_area(){
console.log("Selected feature:- " + selectedFeatureName)
    var chartData = getStatistics(selectedFeatureName);    
    var cntryYears = cntrySchemeYears.split(",");
    
    //alert(cntryYears.length);
    var statsChartTitle;
    
    if(schmType == 1){
        statsChartTitle = 'Scheme I Land Cover Statistics for ';
    }
    else{
        statsChartTitle = 'Scheme II Land Cover Statistics for ';
    }
   
    
    var statsChart = $('#columnchart_material_area').highcharts({
        
        credits : 
        {
            text : 'SERVIR Eastern and Southern Africa',
            href : 'https://servirglobal.net/Africa.aspx'
        },
        
        chart : 
        {
            type : 'column'
        },
        title : 
        {
            text : statsChartTitle + selectedFeatureName + " "  +    cntryBndType
        },
        subtitle : 
        {
            text : 'Source: SERVIR ESA'
        },
        
        yAxis : 
        {
            min : 0,
            title : 
            {
                text : 'Area (sqKM)'
            }
        },
        tooltip : 
        {
            headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} sqKM </b></td></tr>',
            footerFormat : '</table>',
            shared : true,
            useHTML : true
        },
        plotOptions : 
        {
            column : 
            {
                pointPadding : 0.2,
                borderWidth : 0
            }
        },
        
        
    }).highcharts();
     
    //from the chart data create categories to be used by highchart
    var catgs = [];
    for(i = 0; i < chartData.length; i ++ ){
        //split the json data and extract first value eg "Closed Grassland,0,8" Closed Grassland 
        var dt = chartData[i].split(",");
        catgs.push(dt[0]);
    }
    statsChart.xAxis[0].setCategories(catgs);
    //loop through the data and compute the total pixel counts for each year
    var total_pixel_count = [];
    for(m = 0; m < cntryYears.length; m ++ ){ 
        var total_pix = 0;         
        for(i = 0; i < chartData.length; i ++ ){
            var dat = chartData[i].split(",");
            var vl = dat[m+1] ;
            if ( vl == null){
                vl = 0;
            }
            total_pix = total_pix + parseInt(vl);
            console.log(total_pix);
        }
        console.log(total_pix);
        //push the total number of pixels in an array to be later used below to compute area and percentages for graphing         
        total_pixel_count.push(parseInt(total_pix)); 
    }
    //loop through the json data and extract data for each mapped year
    //index starts at 1  and not zero since zero is for categories

    for(m = 0; m < cntryYears.length; m ++ ){
        var z = 30; //image resolution thats 30m
        var total_count  = total_pixel_count[m];
        var yr_data = [];
        for(i = 0; i < chartData.length; i ++ ){
            var dat = chartData[i].split(",");
             //index starts at 1  and not zero since zero is for categories (m+1)
            var vl = dat[m+1] ;
            if ( vl == null){
                vl = 0;
            }
            //compute area covered by the class (sqkm)            
            var st = parseFloat(z*z*1.0*vl/1000000);
            yr_data.push(parseFloat(st));  
            console.log(parseFloat(z*z*1.0*vl/1000000));           
        }         
          console.log(yr_data);          
        var newseries = 
        {
            name : cntryYears[m],
            data :  yr_data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: -40, // 40 pixels up from the top
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        };         
        statsChart.addSeries(newseries, true);
    }
}
function drawChart_percnt(){
    
    console.log("Selected feature:- " + selectedFeatureName)
    var chartData = getStatistics(selectedFeatureName);
    var chartPopData = new google.visualization.DataTable();
    var cntryYears = cntrySchemeYears.split(",");
    //alert(cntryYears.length);
    var statsChartTitle;
    
    if(schmType == 1){
        statsChartTitle = 'Scheme I Land Cover Statistics for ';
    }
    else{
        statsChartTitle = 'Scheme II Land Cover Statistics for ';
    }
    // Declare columns
    chartPopData.addColumn('string', 'Land Cover Type');
    
    var statsChart = $('#columnchart_material_percnt').highcharts({
        
        credits : 
        {
            text : 'SERVIR Eastern and Southern Africa',
            href : 'https://servirglobal.net/Africa.aspx'
        },
        
        chart : 
        {
            type : 'column'
        },
        title : 
        {
            text :statsChartTitle + selectedFeatureName + " "  +    cntryBndType
        },
        subtitle : 
        {
            text : 'Source: SERVIR ESA'
        },
        
        yAxis : 
        {
            min : 0,
            title : 
            {
                text : 'Percentage (%)'
            }
        },
        tooltip : 
        {
            headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} % </b></td></tr>',
            footerFormat : '</table>',
            shared : true,
            useHTML : true
        },
        plotOptions : 
        {
            column : 
            {
                pointPadding : 0.2,
                borderWidth : 0
            }
        },
        
        
    }).highcharts();
     
    //from the chart data create categories to be used by highchart
    var catgs = [];
    for(i = 0; i < chartData.length; i ++ ){
        //split the json data and extract first value eg "Closed Grassland,0,8" Closed Grassland 
        var dt = chartData[i].split(",");
        catgs.push(dt[0]);
    }
    statsChart.xAxis[0].setCategories(catgs);
    //loop through the data and compute the total pixel counts for each year
    var total_pixel_count = [];
    for(m = 0; m < cntryYears.length; m ++ ){ 
        var total_pix = 0;         
        for(i = 0; i < chartData.length; i ++ ){
            var dat = chartData[i].split(",");
            var vl = dat[m+1] ;
            if ( vl == null){
                vl = 0;
            }
            total_pix = total_pix + parseInt(vl);
            console.log(total_pix);
        }
        console.log(total_pix);
        //push the total number of pixels in an array to be later used below to compute area and percentages for graphing         
        total_pixel_count.push(parseInt(total_pix)); 
    }
    //loop through the json data and extract data for each mapped year
    //index starts at 1  and not zero since zero is for categories

    for(m = 0; m < cntryYears.length; m ++ ){
        var total_count  = total_pixel_count[m];
        var yr_data = [];
        for(i = 0; i < chartData.length; i ++ ){
            var dat = chartData[i].split(",");
             //index starts at 1  and not zero since zero is for categories (m+1)
            var vl = dat[m+1] ;
            if ( vl == null){
                vl = 0;
            }
            var st = parseFloat(vl*100.0/total_count).toFixed(4);
            yr_data.push(parseFloat(st));  
            console.log(parseFloat(vl*100.0/total_count).toFixed(2));           
        }         
          console.log(yr_data);          
        var newseries = 
        {
            name : cntryYears[m],
            data :  yr_data,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: -40, // 40 pixels up from the top
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        };         
        statsChart.addSeries(newseries, true);
    }
}

function drawChart_old(){
    console.log("Selected feature:- " + selectedFeatureName)
    var chartData = getStatistics(selectedFeatureName);
    var chartPopData = new google.visualization.DataTable();
    var cntryYears = cntrySchemeYears.split(",");
    //alert(cntryYears.length);
    var statsChartTitle;
    
    if(schmType == 1){
        statsChartTitle = 'Scheme I Land Cover Statistics for ';
    }
    else{
        statsChartTitle = 'Scheme II Land Cover Statistics for ';
    }
    // Declare columns
    chartPopData.addColumn('string', 'Land Cover Type');
    
    for(m = 0; m < cntryYears.length; m ++ ){
        chartPopData.addColumn('number', cntryYears[m]);
    }
    
    
    chartPopData.addRows(chartData.length);
    for(i = 0; i < chartData.length; i ++ ){
        chartPopData.setCell(i, 0, "'" + chartData[i][0] + "'");
        chartPopData.setCell(i, 1, parseFloat(chartData[i][1]).toFixed(2));
        chartPopData.setCell(i, 2, parseFloat(chartData[i][2]).toFixed(2));
        chartPopData.setCell(i, 3, parseFloat(chartData[i][3]).toFixed(2));
        
    }
    console.log(chartPopData);
    var options = 
    {
        title : statsChartTitle + selectedFeatureName,
        //subtitle: '1990, 2000, and 2010',
        //vAxis: { title: 'Land Cover Type', titleTextStyle: { color: 'red'} }
        hAxis : 
        {
            title : 'Percentage',
            titleTextStyle : 
            {
                color : 'red'
            }
        }
    };
    
    var chart = new google.visualization.BarChart(document.getElementById('columnchart_material'));
    
    chart.draw(chartPopData, options);
    
}

function getStatistics(statsField){
    //get statistics for the selected admin unit from the respective json file
    var adminLevel = cntryAdminLevel - 1;
    var statsArry = [];
    var interMidtatsArry = [];
    var finalStatsArry = [];
    var url = 'stats/' + cntryName + '_admin' + adminLevel + '_sch_' + schmType + '_pixel_count_stats.JSON?callback=?';
    console.log(url);
    $.ajax({
        type : 'GET',
        url : url,
        async : false,
        jsonpCallback : 'jsonCallback',
        contentType : "application/json",
        dataType : 'jsonp',
        success : function(json){
            $.each(json, function(){
                $.each(this, function(){
                    $.each(this, function(){
                        $.each(this, function(name, value){
                            //statsField eg BALAKA
                            if(name == statsField){
                                console.log("if evaluated");
                                console.log(statsField + "....." + name);
                                for(k = 0; k < value.length; k ++ ){
                                    console.log(name + '=' + value);
                                    console.log(value[k].lc);                                    
                                    statsArry.push(value[k].lc);
                                    
                                }
                                
                            }
                        });
                        
                    });
                });
            });
            
        },
        error : function(e){
            alert("Statistics JSON File Error:-" + e.message);
        }
    });
    console.log(statsArry);
    return statsArry
}

function getStatisticsOld (statsField){
    //statsEpochs = cntryschm_I_json_stats.split(",");
    var adminLevel = cntryAdminLevel - 1;
    jsonFile = eval("admin_" + adminLevel + "_schm_" + schmType + "_json_stats");
    statsEpochs = jsonFile.split(",");
    console.log("admin_" + adminLevel + "_schm_" + schmType + "_json_stats");
    console.log(statsEpochs.length);
    var statsArry = [];
    var interMidtatsArry = [];
    var finalStatsArry = []; (function($){
        for(t = 0; t < statsEpochs.length; t ++ ){
            statsArry = [];
            console.log(statsEpochs[t]);
            //var url = 'http://127.0.0.1/landcoverviewer2/js/countryConfigs.json?callback=?';
            var url = 'stats/' + statsEpochs[t] + '?callback=?';
            $.ajax({
                type : 'GET',
                url : url,
                async : false,
                jsonpCallback : 'jsonCallback',
                contentType : "application/json",
                dataType : 'jsonp',
                success : function(json){
                    $.each(json, function(){
                        $.each(this, function(){
                            
                            $.each(this, function(name, value){
                                console.log(name + '=' + value);
                                //console.log(statsField);
                                //statsField eg BALAKA
                                if(name.toUpperCase() == statsField){
                                    console.log(statsField + "....." + name.toUpperCase());
                                    for(k = 0; k < value.length; k ++ ){
                                        console.log(name + '=' + value);
                                        console.log(statsField);
                                        var stsarry = [];
                                        stsarry.push(value[k].Land_Cover);
                                        stsarry.push(value[k].percent);
                                        statsArry.push(stsarry);
                                    }
                                    interMidtatsArry.push(statsArry)
                                }
                            });
                            console.log(statsArry);
                            
                        });
                    });
                    
                },
                error : function(e){
                    alert("Statistics JSON File Error:-" + e.message);
                }
            });
            
        }
        
        for(j = 0; j < interMidtatsArry.length; j ++ ){
            
            var yrStats = interMidtatsArry[j]
            if(j == 0){
                for(g = 0; g < yrStats.length; g ++ ){
                    finalStatsArry.push(yrStats[g]);
                    console.log(j + "_____" + yrStats[g]);
                    console.log(j + "_____" + finalStatsArry[g][0] + "_____" + yrStats[g][0]);
                }
            }
            else{
                for(g = 0; g < yrStats.length; g ++ ){
                    if(finalStatsArry[g][0] = yrStats[g][0]){
                        finalStatsArry[g].push(yrStats[g][1]);
                        //console.log(j + "_____" + yrStats[g][1]);
                        //console.log(j + "_____" + finalStatsArry[g][0] + "_____" + yrStats[g][0]);
                    }
                    
                }
            }
        }
        console.log(finalStatsArry);
    })(jQuery);
    return finalStatsArry;
}
function rSizeMap(){
clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            map.resize();
            map.reposition();
            //map.centerAndZoom([cntryCenterX, cntryCenterY], cntryZoomLevel); 
        }, 500);
        //  
}
function popDropdowns(){
    var schm_years = cntrySchemeYears.split(",");
    $("#leftSide").find('option').remove();
    for(i = 0; i < schm_years.length; i ++ ){
        if(i == 0){
            $("#leftSide").append('<option value="' + i + '" selected="selected" >' + schm_years[i] + '</option>');
        }
        else if(i < schm_years.length + 1){
            $("#leftSide").append('<option value="' + i + '">' + schm_years[i] + '</option>');
        }
        else{
            var a = schm_years.length + 1;
            $("#leftSide").append('<option value="' + a + '">' + "Basemap" + '</option>');
        };
    }
    $("#rightSide").find('option').remove();
    for(i = 0; i < schm_years.length; i ++ ){
        //alert(i +" and "+ schm_years .length -1 );          	
        if(i == schm_years.length - 1){
            $("#rightSide").append('<option value="' + i + '" selected="selected" >' + schm_years[i] + '</option>');
        }
        else if(i < schm_years.length + 1){
            
            $("#rightSide").append('<option value="' + i + '">' + schm_years[i] + '</option>');
        }
        else{
            var a = schm_years.length + 1;
            $("#rightSide").append('<option value="' + a + '">Basemap</option>');
        };
    }
}

function intDivs(){
    //hide other div elements on the layer manager and show the compare layers div
    $("#fieldVal").show();
    $("#stats").hide();
    $("#donwLayers").hide();
    showCollapseGraphing(false);
}

function loadLegend(schmType){
    
    if(schmType == 1){
        $("#legendHolder").find('img').remove();
        $("#legendHolder").append('<img src="' + cntrySchm_I_legend + '" style="max-width: 90%;" />');
        //<img src="http://servir.rcmrd.org/ArcGIS/services/landcover/malawi/MapServer/WMSServer?request=GetLegendGraphic%26version=1.1.0%26format=image/png&width=192%26layer=3" style="max-width: 90%;" />
    }
    else{
        $("#legendHolder").find('img').remove();
        $("#legendHolder").append('<img src="' + cntrySchm_II_legend + '" style="max-width: 90%;" />');
        //<img src="http://servir.rcmrd.org/ArcGIS/services/landcover/malawi/MapServer/WMSServer?request=GetLegendGraphic%26version=1.1.0%26format=image/png&width=192%26layer=3" style="max-width: 90%;" />
        
    };
    
}

function getDownloadLinks(){
    var dwnLnks = downloadUrls.split(",");
    $("#donwLayers").find('a').remove();
    $("#donwLayers").find('br').remove();
    for(i = 0; i < dwnLnks.length; i ++ ){
        zipFileLink = dwnLnks[i];
        linkElements = zipFileLink.split("/");
        zipFileName = linkElements[linkElements.length - 1];
        //$("#donwLayers").append('<option value="'+i+'" selected="selected" >'+schm_years [i]+'</option>');
        $("#donwLayers").append('<br/><a href="' + zipFileLink + '" style="color:#fff; font-size: 10px; font-weight: bold;" target="_blank">' + zipFileName + ' </a> <br/>');
    }
    $("#donwLayers").append('<br/>');
    
}

function changeSwipeLayer(which){
    if(which == currentBottom){
        alert("Can't compare layer to itself");
        $('#leftSide').prop('selectedIndex', currentSwipe);
    }
    else{
        allLayers[currentSwipe].hide();
        map.removeLayer(allLayers[currentBottom]);
        map.addLayer(allLayers[currentBottom]);
        allLayers[which].setOpacity(currentOpacity);
        globalswipeWidget.layers = [allLayers[which]];
        allLayers[which].show();
        currentSwipe = which;
        map.reorderLayer(allLayers[currentBottom], 1);
        map.reorderLayer(allLayers[currentSwipe], 2);
    }
}


function changeBottomCompare(which){
    if(which == currentSwipe){
        alert("Can't compare layer to itself");
        $('#rightSide').prop('selectedIndex', currentBottom);
    }
    else{
        
        allLayers[currentBottom].hide();
        map.removeLayer(allLayers[which]);
        map.addLayer(allLayers[which]);
        allLayers[which].setOpacity(currentOpacity);
        allLayers[which].show();
        currentBottom = which;
        map.reorderLayer(allLayers[currentBottom], 1);
        map.reorderLayer(allLayers[currentSwipe], 2);
    }
}


function checkAdjustSizeOfLayerManager(){
    if($("#LayerManager").width() == 0){}
    else{
        $("#LayerManager").width(0, 0);
        var theAdjustmentWidth = 275;
        if($('#mobilefinder').css('display') == 'block'){
            if(titlePaneDiv.open){
                titlePaneDiv.toggle();
            }
            if($('#tinymobilefinder').css('display') == 'block'){
                theAdjustmentWidth = 170;
            }
            else{
                theAdjustmentWidth = 225;
            }
            toggleSwipeOrientation();
            toggleSwipeOrientation();
        }
        openLayerManager(theAdjustmentWidth, 0);
    }
    
}


function openLayerManager(toggleWidth, speed){
    $("#LayerManager").hide();
    var adjustnumHeight = $("#LayerManager").height('auto').height();
    $("#LayerManager").height(0);
    $("#LayerManager").show();
    var adjustnumWidth = $(window).width() - 30;
    if(adjustnumWidth > toggleWidth){
        adjustnumWidth = toggleWidth;
    }
    $("#LayerManager").animate({
        width : '+=' + adjustnumWidth + 'px',
        height : '+=' + adjustnumHeight + 'px'
    }, speed);
    $("#btnlayermgr").css('left', 'auto');
    $("#btnlayermgr").css('background-color', 'inherit');
    
    $("#btnlayermgr").css('padding', '0px');
    $("#btnlayermgr").css('top', '3px');
    var num = toggleWidth - 12;
    $("#btnlayermgr").animate({
        left : '+=' + num + 'px'
    }, speed);
}

function showCollapseGraphing(isShow){
    
    if(isShow == true){
        
        $('#map').css({
            'height' : 100 + '%'
        });
        $('#map').css({
            'width' : 50 + '%'
        });
        $('#charstHolder').css({
            'height' : 100 + '%'
        });
        $('#charstHolder').css({
            'width' : 50 + '%'
        });
        
        $("#charstHolder").show();
        
    }
    else{
         
        $('#map').css({
            'height' : 100 + '%'
        });
        $('#map').css({
            'width' : 100 + '%'
        });
        $('#charstHolder').css({
            'height' : 0 + '%'
        });
        $('#charstHolder').css({
            'width' : 0 + '%'
        });        
        $("#charstHolder").hide();
    }
}

function toggleLayerManager(){
    isToggld==true
    if($("#LayerManager").width() == 0){
        var theAdjustmentWidth = 275;
        if($('#mobilefinder').css('display') == 'block'){
            if(titlePaneDiv.open){
                titlePaneDiv.toggle();
                
            }
            if($('#tinymobilefinder').css('display') == 'block'){
                theAdjustmentWidth = 170;
            }
            else{
                theAdjustmentWidth = 225;
            }
        }
        openLayerManager(theAdjustmentWidth, 250);
    }
    else{
        
        $("#LayerManager").width(0);
        $("#LayerManager").height(0);
        $("#btnlayermgr").css('right', 'auto');
        $("#btnlayermgr").css('left', '0px');
        $("#btnlayermgr").css('background-color', 'rgb(38,127,176)');
        $("#btnlayermgr").css('padding', '5px');
        $("#btnlayermgr").css('top', '0px');
    }
}

function setSchemeType(){
    schmType = parseInt($('input:radio[name=schmType]:checked').val());
    loadCountry(cntryID);
}
function statsViewMode(){      
   stsViewMode = $('input:radio[name=viewMode]:checked').val();
   loadStatistics(3)
}

$(document).ready(function(){
    $("#btnComprLyrs").click(function(){
        rSizeMap();
        showCollapseGraphing(false);
        $("#compare").show();
        $("#stats").hide();
        $("#donwLayers").hide();
        loadCountry(cntryID);
        rSizeMap();
    });
    $("#btnStats").click(function(){
        showCollapseGraphing(true);
        rSizeMap();
        $("#compare").hide();
        $("#stats").show();
        $("#donwLayers").hide();        
        loadStatistics(3);
        isToggld = false;
        rSizeMap();
		   
    });
    $("#btnDown").click(function(){
        rSizeMap();
        showCollapseGraphing(false);
        $("#compare").hide();
        $("#stats").hide();
        $("#donwLayers").show();
        loadCountry(cntryID);
        rSizeMap();
    });
    $('#adminlevel').change(function(){
        isToggld = false;
        cntryAdminLevel = $(this).val();          
        loadStatistics(cntryAdminLevel);
    });
    
    $('#country').change(function(){
        showCollapseGraphing(false);
        loadCountry($(this).val());
        isToggld = false;
        rSizeMap();
        showCollapseGraphing(false);
        $("#compare").show();
        $("#stats").hide();
        $("#donwLayers").hide();
        rSizeMap();
        
    });
    $('#leftSide').change(function(){
        changeSwipeLayer($(this).val());
    });
    $('#rightSide').change(function(){
        changeBottomCompare($(this).val());
    });
    $(window).resize(function(){
        checkAdjustSizeOfLayerManager();
    });
    
    $("#sch_1, #sch_2").click(function(){
        isToggld = false;
        showCollapseGraphing(false)
        rSizeMap();
        $("#compare").show();
        $("#stats").hide();
        $("#donwLayers").hide();        
        setSchemeType();
        rSizeMap();
    });
    $("#prM, #slctM").click(function(){ 
        statsViewMode();  
    });
    //drawChart();
});

function toggleSwipeOrientation(){
    var swipeType = globalswipeWidget.type == "vertical" ? "horizontal" : "vertical";
    globalswipeWidget.destroy();
    globalswipeWidget = new globalLayerSwipe({
        type : swipeType,
        //Try switching to "scope" or "horizontal"
        map : map,
        layers : [allLayers[0]]
    }, "swipeDiv");
    
    globalswipeWidget.startup();
    var tlText = swipeType == "horizontal" ? "Top Section:" : "Left Side:";
    var rbText = swipeType == "horizontal" ? "Bottom Section:" : "Right Side:";
    
    $('#leftTopLabel').text(tlText);
    $('#rightBottomLabel').text(rbText);
    /* Left becomes top */
    
}

function openHtmlShadowBox(HTMLmessage, title){
    Shadowbox.open({
        content : HTMLmessage,
        player : "html",
        title : title
    });
}

function getLegend(){
    
    var serviceUrl = legendList[legendCnt][0];
    var lyrsInfo = legendList[legendCnt][1];
    
    $.getJSON(serviceUrl + '/legend?f=json&callback=?', 
    //{},
    function(data){
        
        //Iterate through each sublayers
        for(i = 0; i < lyrsInfo.length; i ++ ){
            
            var layerId = lyrsInfo[i].id;
            var legendTitle = lyrsInfo[i].title;
            
            
            //Check for legend title for the layer
            if((legendTitle == null) || (legendTitle == "")){
                legendTitle = data.layers[layerId].layerName;
            }
            $('#legendDiv').append('<strong>' + legendTitle + '</strong><br>');
            $.each(data.layers[layerId].legend, function(i, item){
                var label = item.label;
                var url = item.url;
                $('#legendDiv').append('<img src="' + serviceUrl + '/0/images/' + item.url + '" />');
                $('#legendDiv').append(' ' + item.label + '<br>');
            });
            $('#legendDiv').append('<br>');
            //Add extra line break 
            
        }
        
        //Call getLegend function recursively to ensure new legend creation starts only after completion of previous legend creation
        
        legendCnt = legendCnt + 1;
        
        if(legendCnt < legendList.length){
            getLegend();
        }
    }
    
    );
    
}