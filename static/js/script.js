/**
 * Created by paultrotter on 12/07/2017.
 */

queue()
   .defer(d3.json, "/garminAthlete/activities")
   .await(makeGraphs);

function makeGraphs(error, activitiesJson) {



    //=====//CLEAN JSON DATA//=====//
    var exercise_data = activitiesJson;



    //=====//CROSSFILTER INSTANCE//=====//
    var ndx = crossfilter(exercise_data);



    //=====//DIMENSIONS//=====//
    var activitySelectDim = ndx.dimension( function (d) {
        return d["activity_type"];
    });

    var yearSelectDim = ndx.dimension( function (d) {
        return d["year"];
    });

    var inOutSelectDim = ndx.dimension( function (d) {
        return d["indoor_outdoor"];
    });

    var activityTypeDim = ndx.dimension(function (d) {
        return d["activity_type"];
    });

    var activityYearDim = ndx.dimension(function (d) {
       return d["year"];
   });

    var activityPopularityDim = ndx.dimension(function (d) {
       return d["activity_type"];
   });

    var dateDim = ndx.dimension(function (d) {
       return d["date_posted"];
   });

    var inOutDim = ndx.dimension(function (d) {
       return d["indoor_outdoor"];
   });

    var equipmentUsedDim = ndx.dimension(function (d) {
       return d["equipmend_used"];
   });
    var distanceDim = ndx.dimension(function (d) {
       return d["distance"];
   });



    //=====//METRICS//=====//
    var activity_select_group = activitySelectDim.group();
    var year_select_group = yearSelectDim.group();
    var inout_select_group = inOutSelectDim.group();
    var activity_type_group = activityTypeDim.group();
    var activity_year_group = activityYearDim.group();
    var activity_popularity_group = activityPopularityDim.group();
    var indoor_outdoor_group = inOutDim.group();
    var equipment_used_group = equipmentUsedDim.group();
    var activity_distance_group = distanceDim.group();

    var all = ndx.groupAll();



    //=====//DEFINE VALUES TO BE USED IN CHARTS//=====//
   var minDate = dateDim.bottom(1)[0]["date_posted"];
   var maxDate = dateDim.top(1)[0]["date_posted"];



    //=====//SELECT MENUS//=====//
    selectField = dc.selectMenu("#select_activity")
        .dimension(activitySelectDim)
        .group(activity_select_group);



    selectField = dc.selectMenu("#select_year")
        .dimension(yearSelectDim)
        .group(year_select_group);


    selectField = dc.selectMenu("#select_inout")
        .dimension(inOutSelectDim)
        .group(inout_select_group);



    //=====//CHARTS//=====//
    var activityTypeChart = dc.pieChart('#activity-type-chart');
    var activityYearChart = dc.pieChart("#activity-year-chart");
    var popularityChart = dc.rowChart("#activity-popularity-chart");
    var timeChart = dc.barChart("#time-chart");
    var totalActivitiesND = dc.numberDisplay("#number-activities-nd");
    var inOutChart = dc.pieChart("#in-out-chart");
    var EquipmentChart = dc.rowChart("#equipment-chart");
    var activityDistanceChart = dc.pieChart("#activity-distance-chart");



    //=====//STYLE CHARTS//=====//
    totalActivitiesND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);


    activityTypeChart
        .width(300)
        .height(300)
        .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
        .transitionDuration(1500)
        .dimension(activityTypeDim)
        .group(activity_type_group);


    activityYearChart
       .height(300)
       .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
       .radius(150)
       .innerRadius(50)
       .transitionDuration(1500)
       .dimension(activityYearDim)
       .group(activity_year_group);


    popularityChart
       .width(350)
       .height(300)
       .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
       .dimension(activityPopularityDim)
       .group(activity_popularity_group)
       .xAxis().ticks(4);


    inOutChart
       .height(300)
       .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
       .radius(150)
       .innerRadius(50)
       .transitionDuration(1500)
       .dimension(inOutDim)
       .group(indoor_outdoor_group);


    EquipmentChart
       .width(350)
       .height(300)
       .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
       .dimension(equipmentUsedDim)
       .group(equipment_used_group)
       .xAxis().ticks(4);


    activityDistanceChart
       .height(300)
       .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
       .radius(150)
       .innerRadius(50)
       .transitionDuration(1500)
       .dimension(activityDistanceChart)
       .group(activity_distance_group);


    timeChart
       .width(1080)
       .height(300)
       .ordinalColors(['#F1C40F','#D35400','#DAF7A6','#FFC300','#FF5733', '#C70039'])
       .dimension(activityYearDim)
       .group(activity_year_group)
       .x(d3.scale.ordinal().domain([(minDate),(maxDate)]))
       .xUnits(dc.units.ordinal)
       .elasticX(true)
       .elasticY(true)
       .brushOn(false);


dc.renderAll();
}