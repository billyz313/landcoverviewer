<<<<<<< HEAD
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

//ArcGIS js requires
require(["esri/map", "esri/toolbars/navigation", "esri/dijit/LayerSwipe", "esri/geometry/Extent", "esri/tasks/query", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer", "esri/InfoTemplate", "esri/layers/FeatureLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/renderers/SimpleRenderer", "esri/symbols/TextSymbol", "esri/layers/LabelLayer", "esri/graphic", "esri/lang", "esri/Color", "dojo/number", "esri/arcgis/utils", "dojo/_base/array", "esri/dijit/BasemapToggle", "esri/dijit/BasemapGallery", "dijit/form/HorizontalSlider", "dojo/parser", "dijit/Toolbar", "dojo/domReady!"],
function (Map, Navigation, LayerSwipe, Extent, Query, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, InfoTemplate, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer, TextSymbol, LabelLayer, Graphic, esriLang, Color, number, arcgisUtils, array, BasemapToggle, BasemapGallery, HorizontalSlider, parser, Toolbar) {
    initSliderButtons();
    parser.parse();
    //Creates and centers map
    map = new Map("map", 
    {
        center : [-23, 33],
        basemap : "hybrid",
        sliderPosition : "bottom-left",
        zoom : 4
    });
	
    map.on("load", function(){
         map.graphics.enableMouseEvents();
       
    });
    
    navToolbar = new Navigation(map);
    dojo.connect(navToolbar, "onExtentHistoryChange", function(){
        navToolbar.deactivate();
    });
	         
    /*******************Load variables to global access******************************/         
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
    
    /*************************************Add layers to the map******************************/
    var baseUrl = "https://gis1.servirglobal.net/arcgis/rest/services/Global/";
    
    addDaynamicLayerToSystem(0, "l2001", true, baseUrl + "MODIS_Landcover_Type1_2001/MapServer?");
    addDaynamicLayerToSystem(1, "l2002", true, baseUrl + "MODIS_Landcover_Type1_2002/MapServer?");
    addDaynamicLayerToSystem(2, "l2003", true, baseUrl + "MODIS_Landcover_Type1_2003/MapServer?");
    addDaynamicLayerToSystem(3, "l2004", true, baseUrl + "MODIS_Landcover_Type1_2004/MapServer?");
    addDaynamicLayerToSystem(4, "l2005", true, baseUrl + "MODIS_Landcover_Type1_2005/MapServer?");
    addDaynamicLayerToSystem(5, "l2006", true, baseUrl + "MODIS_Landcover_Type1_2006/MapServer?");
    addDaynamicLayerToSystem(6, "l2007", true, baseUrl + "MODIS_Landcover_Type1_2007/MapServer?");
    addDaynamicLayerToSystem(7, "l2008", true, baseUrl + "MODIS_Landcover_Type1_2008/MapServer?");
    addDaynamicLayerToSystem(8, "l2009", true, baseUrl + "MODIS_Landcover_Type1_2009/MapServer?");
    addDaynamicLayerToSystem(9, "l2010", true, baseUrl + "MODIS_Landcover_Type1_2010/MapServer?");
    addDaynamicLayerToSystem(10, "l2011", true, baseUrl + "MODIS_Landcover_Type1_2011/MapServer?");
    
    currentSwipe = 0;
    
    currentBottom = allLayers.length - 1;
    
    
    allLayers[currentSwipe].show();
    
    allLayers[currentBottom].show();
    globalArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
    
    globalLayerSwipe = LayerSwipe;
    
    var swipeWidget = new LayerSwipe({
        type: "vertical",
        region: "right",
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

    intDivs();

});

function addDaynamicLayerToSystem(theId, which, hide, serviceUrl){
    //theId is the layer Id index as it is on the map document that forms the web service  
    var layer = new globalArcGISDynamicMapServiceLayer(serviceUrl);
    layer.setVisibleLayers([0]);
    layer.setDisableClientCaching(true);
    if(hide == true){
        layer.hide();
    }
    allLayers.push(layer);
    allLayers[allLayers.length - 1].id = which;
    map.addLayer(layer);


}




//function rSizeMap(){
//clearTimeout(resizeTimer);
//        resizeTimer = setTimeout(function(){
//            map.resize();
//            map.reposition();
//            //map.centerAndZoom([cntryCenterX, cntryCenterY], cntryZoomLevel); 
//        }, 500); 
//}


function intDivs(){
    //hide other div elements on the layer manager and show the compare layers div
    $("#fieldVal").show();

}

function loadLegend(schmType){
    
    if(schmType == 1){
        $("#legendHolder").find('img').remove();
        $("#legendHolder").append('<img src="' + cntrySchm_I_legend + '" style="width:auto;" />');
        }
    else{
        $("#legendHolder").find('img').remove();
        $("#legendHolder").append('<img src="' + cntrySchm_II_legend + '" style="width:auto;" />');
       
    };
    
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


var LastVal = 0;
$(document).ready(function(){
    $("#btnComprLyrs").click(function(){
       
        $("#compare").show();
        
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
    
   
});

function toggleSwipeOrientation(){
    var swipeType = globalswipeWidget.type == "vertical" ? "horizontal" : "vertical";

    setSwipe(swipeType);
    
    /* Left becomes top */
    
}

function setSwipe(swipeType)
{
    currentSwipe = 0;
    currentBottom = allLayers.length - 1;
    try {
        globalswipeWidget.destroy();
    }
    catch (e) { }
    var swipeDiv = document.createElement('div');
    swipeDiv.id = "swipeDiv";

    var mapswitcher = document.getElementById("map");
    mapswitcher.insertBefore(swipeDiv, mapswitcher.firstChild);

    globalswipeWidget = new globalLayerSwipe({
        type: swipeType,
        //Try switching to "scope" or "horizontal"
        region: "right",
        map: map,
        layers: [allLayers[0]]
    }, "swipeDiv");
    globalswipeWidget.startup();
    allLayers[currentSwipe].hide();

    map.removeLayer(allLayers[currentBottom]);
    map.addLayer(allLayers[currentBottom]);
    
    globalswipeWidget.layers = [allLayers[currentSwipe]];
    allLayers[currentSwipe].show();
    allLayers[currentBottom].show();
    map.reorderLayer(allLayers[currentBottom], 1);
    map.reorderLayer(allLayers[currentSwipe], 2);



    var tlText = swipeType == "horizontal" ? "Top Section:" : "Left Side:";
    var rbText = swipeType == "horizontal" ? "Bottom Section:" : "Right Side:";

    $('#leftTopLabel').text(tlText);
    $('#rightBottomLabel').text(rbText);
    globalswipeWidget.type = swipeType;
    map.setExtent(map.extent);
    
}

function openHtmlShadowBox(HTMLmessage, title){
    Shadowbox.open({
        content : HTMLmessage,
        player : "html",
        title : title
    });
}

//function getLegend(){
    
//    var serviceUrl = legendList[legendCnt][0];
//    var lyrsInfo = legendList[legendCnt][1];
    
//    $.getJSON(serviceUrl + '/legend?f=json&callback=?', 
//    function(data){
        
//        //Iterate through each sublayers
//        for(i = 0; i < lyrsInfo.length; i ++ ){
            
//            var layerId = lyrsInfo[i].id;
//            var legendTitle = lyrsInfo[i].title;
            
            
//            //Check for legend title for the layer
//            if((legendTitle == null) || (legendTitle == "")){
//                legendTitle = data.layers[layerId].layerName;
//            }
//            $('#legendDiv').append('<strong>' + legendTitle + '</strong><br>');
//            $.each(data.layers[layerId].legend, function(i, item){
//                var label = item.label;
//                var url = item.url;
//                $('#legendDiv').append('<img src="' + serviceUrl + '/0/images/' + item.url + '" />');
//                $('#legendDiv').append(' ' + item.label + '<br>');
//            });
//            $('#legendDiv').append('<br>');
//            //Add extra line break 
            
//        }
        
//        //Call getLegend function recursively to ensure new legend creation starts only after completion of previous legend creation
        
//        legendCnt = legendCnt + 1;
        
//        if(legendCnt < legendList.length){
//            getLegend();
//        }
//    }
    
//    );
    
//}
=======
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

require(["esri/map", "esri/toolbars/navigation", "esri/dijit/LayerSwipe", "esri/geometry/Extent", "esri/tasks/query", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISTiledMapServiceLayer", "esri/InfoTemplate", "esri/layers/FeatureLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/renderers/SimpleRenderer", "esri/symbols/TextSymbol", "esri/layers/LabelLayer", "esri/graphic", "esri/lang", "esri/Color", "dojo/number", "esri/arcgis/utils", "dojo/_base/array", "esri/dijit/BasemapToggle", "esri/dijit/BasemapGallery", "dijit/form/HorizontalSlider", "dojo/parser", "dijit/Toolbar", "dojo/domReady!"],
function (Map, Navigation, LayerSwipe, Extent, Query, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, InfoTemplate, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer, TextSymbol, LabelLayer, Graphic, esriLang, Color, number, arcgisUtils, array, BasemapToggle, BasemapGallery, HorizontalSlider, parser, Toolbar) {
    initSliderButtons();
    parser.parse();
    
    map = new Map("map", 
    {
        center : [-23, 33],
        basemap : "hybrid",
        sliderPosition : "bottom-left",
        zoom : 4
    });
	
    map.on("load", function(){
         map.graphics.enableMouseEvents();
       
    });
    
    navToolbar = new Navigation(map);
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
    


    
    
    var baseUrl = "https://gis1.servirglobal.net/arcgis/rest/services/Global/";
    
    addDaynamicLayerToSystem(0, "l2001", true, baseUrl + "MODIS_Landcover_Type1_2001/MapServer?");
    addDaynamicLayerToSystem(1, "l2002", true, baseUrl + "MODIS_Landcover_Type1_2002/MapServer?");
    addDaynamicLayerToSystem(2, "l2003", true, baseUrl + "MODIS_Landcover_Type1_2003/MapServer?");
    addDaynamicLayerToSystem(3, "l2004", true, baseUrl + "MODIS_Landcover_Type1_2004/MapServer?");
    addDaynamicLayerToSystem(4, "l2005", true, baseUrl + "MODIS_Landcover_Type1_2005/MapServer?");
    addDaynamicLayerToSystem(5, "l2006", true, baseUrl + "MODIS_Landcover_Type1_2006/MapServer?");
    addDaynamicLayerToSystem(6, "l2007", true, baseUrl + "MODIS_Landcover_Type1_2007/MapServer?");
    addDaynamicLayerToSystem(7, "l2008", true, baseUrl + "MODIS_Landcover_Type1_2008/MapServer?");
    addDaynamicLayerToSystem(8, "l2009", true, baseUrl + "MODIS_Landcover_Type1_2009/MapServer?");
    addDaynamicLayerToSystem(9, "l2010", true, baseUrl + "MODIS_Landcover_Type1_2010/MapServer?");
    addDaynamicLayerToSystem(10, "l2011", true, baseUrl + "MODIS_Landcover_Type1_2011/MapServer?");
    
    currentSwipe = 0;
    
    currentBottom = allLayers.length - 1;
    
    
    allLayers[currentSwipe].show();
    
    allLayers[currentBottom].show();
    globalArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
    
    globalLayerSwipe = LayerSwipe;
    
    var swipeWidget = new LayerSwipe({
        type: "vertical",
        region: "right",
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
    
   // popDropdowns();
    intDivs();
    //getDownloadLinks();

    
    
});

function addDaynamicLayerToSystem(theId, which, hide, serviceUrl){
    //theId is the layer Id index as it is on the map document that forms the web service  
    var layer = new globalArcGISDynamicMapServiceLayer(serviceUrl);
    layer.setVisibleLayers([0]);
    layer.setDisableClientCaching(true);
    if(hide == true){
        layer.hide();
    }
    allLayers.push(layer);
    allLayers[allLayers.length - 1].id = which;
    map.addLayer(layer);


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


function intDivs(){
    //hide other div elements on the layer manager and show the compare layers div
    $("#fieldVal").show();

}

function loadLegend(schmType){
    
    if(schmType == 1){
        $("#legendHolder").find('img').remove();
        $("#legendHolder").append('<img src="' + cntrySchm_I_legend + '" style="width:auto;" />');
        //<img src="http://servir.rcmrd.org/ArcGIS/services/landcover/malawi/MapServer/WMSServer?request=GetLegendGraphic%26version=1.1.0%26format=image/png&width=192%26layer=3" style="max-width: 90%;" />
    }
    else{
        $("#legendHolder").find('img').remove();
        $("#legendHolder").append('<img src="' + cntrySchm_II_legend + '" style="width:auto;" />');
        //<img src="http://servir.rcmrd.org/ArcGIS/services/landcover/malawi/MapServer/WMSServer?request=GetLegendGraphic%26version=1.1.0%26format=image/png&width=192%26layer=3" style="max-width: 90%;" />
        
    };
    
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


var LastVal = 0;
$(document).ready(function(){
    $("#btnComprLyrs").click(function(){
        //rSizeMap();
        
        $("#compare").show();
        
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
    
   
});

function toggleSwipeOrientation(){
    var swipeType = globalswipeWidget.type == "vertical" ? "horizontal" : "vertical";

    setSwipe(swipeType);
    
    /* Left becomes top */
    
}

function setSwipe(swipeType)
{
    currentSwipe = 0;
    currentBottom = allLayers.length - 1;
    try {
        globalswipeWidget.destroy();
    }
    catch (e) { }
    var swipeDiv = document.createElement('div');
    swipeDiv.id = "swipeDiv";

    var mapswitcher = document.getElementById("map");
    mapswitcher.insertBefore(swipeDiv, mapswitcher.firstChild);

    globalswipeWidget = new globalLayerSwipe({
        type: swipeType,
        //Try switching to "scope" or "horizontal"
        region: "right",
        map: map,
        layers: [allLayers[0]]
    }, "swipeDiv");
    globalswipeWidget.startup();
    //map.removeAllLayers();
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



    var tlText = swipeType == "horizontal" ? "Top Section:" : "Left Side:";
    var rbText = swipeType == "horizontal" ? "Bottom Section:" : "Right Side:";

    $('#leftTopLabel').text(tlText);
    $('#rightBottomLabel').text(rbText);
    globalswipeWidget.type = swipeType;
    map.setExtent(map.extent);
    
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
>>>>>>> 901e36b24ee13a03f2c41f07e43989600bd970ac
