import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useHistory } from 'react-router';

am4core.useTheme(am4themes_animated);

class JobsDataVis extends Component {
  componentDidUpdate() {
    var chart = am4core.create(
      'chartdiv',
      am4plugins_forceDirected.ForceDirectedTree
    );
    var networkSeries = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );

    this.props.jobsData.forEach((job) => {
      if (
        job.job_category &&
        job.job_category.includes('Administration & Human Resources')
      ) {
        job.job_category = 'Administration & Human Resources';
      } else if (
        job.job_category &&
        job.job_category.includes('Constituent Services & Community Programs')
      ) {
        job.job_category = 'Constituent Services & Community Programs';
      } else if (
        job.job_category &&
        job.job_category.includes('Engineering, Architecture, & Planning')
      ) {
        job.job_category = 'Engineering, Architecture, & Planning';
      } else if (
        job.job_category &&
        job.job_category.includes('Communications & Intergovernmental Affairs')
      ) {
        job.job_category = 'Communications & Intergovernmental Affairs';
      } else if (
        job.job_category &&
        job.job_category.includes('Finance, Accounting, & Procurement')
      ) {
        job.job_category = 'Finance, Accounting, & Procurement';
      } else if (job.job_category && job.job_category.includes('Health')) {
        job.job_category = 'Health';
      } else if (
        job.job_category &&
        job.job_category.includes('Technology, Data & Innovation')
      ) {
        job.job_category = 'Technology, Data & Innovation';
      } else if (
        job.job_category &&
        job.job_category.includes('Information Technology & Telecommunications')
      ) {
        job.job_category = 'Information Technology & Telecommunications';
      } else if (
        job.job_category &&
        job.job_category.includes('Clerical & Administrative Support')
      ) {
        job.job_category = 'Clerical & Administrative Support';
      } else if (job.job_category && job.job_category.includes('Legal')) {
        job.job_category = 'Legal';
      } else if (
        job.job_category &&
        job.job_category.includes('Building Operations & Maintenance')
      ) {
        job.job_category = 'Building Operations & Maintenance';
      } else if (
        job.job_category &&
        job.job_category.includes('Policy, Research & Analysis')
      ) {
        job.job_category = 'Policy, Research & Analysis';
      } else if (
        job.job_category &&
        job.job_category.includes('Public Safety, Inspections, & Enforcement')
      ) {
        job.job_category = 'Public Safety, Inspections, & Enforcement';
      } else {
        job.job_category = job.job_category;
      }
    });

    const unique = [
      ...new Map(
        this.props.jobsData.map((obj) => [obj['job_category'], obj])
      ).values(),
    ];

    const uniqueAgency = [
      ...new Map(
        this.props.jobsData.map((obj) => [obj['agency'], obj])
      ).values(),
    ];

    const jobCategoryArr = unique.reduce((accum, currentObj) => {
      return [...accum, currentObj['job_category']];
    }, []);

    const testArr = [];

    jobCategoryArr.forEach((element) => {
      testArr.push({ name: element });
    });

    let result = [],
      index = [];

    for (let i in this.props.jobsData) {
      let category = this.props.jobsData[i].job_category,
        j = index.indexOf(category);
      if (j === -1) {
        result.push({
          name: category,
          children: [],
        });
        index.push(category);
        j = index.length - 1;
      }

      result[j].children.push({ name: this.props.jobsData[i].agency });
    }

    chart.data = result;
    console.log('testArr', testArr);
    console.log('jobsData', this.props.jobsData);
    console.log('result', result);
    // console.log('unique', unique);
    // chart.data = [
    //   {
    //     name: this.props.jobsData[0]['job_category'],
    //     children: [
    //       {
    //         name: 'First',
    //         children: [
    //           { name: 'A1', value: 100 },
    //           { name: 'A2', value: 60 },
    //         ],
    //       },
    //       {
    //         name: 'Second',
    //         children: [
    //           { name: 'B1', value: 135 },
    //           { name: 'B2', value: 98 },
    //         ],
    //       },
    //       {
    //         name: 'Third',
    //         children: [
    //           {
    //             name: 'C1',
    //             children: [
    //               { name: 'EE1', value: 130 },
    //               { name: 'EE2', value: 87 },
    //               { name: 'EE3', value: 55 },
    //             ],
    //           },
    //           { name: 'C2', value: 148 },
    //           {
    //             name: 'C3',
    //             children: [
    //               { name: 'CC1', value: 53 },
    //               { name: 'CC2', value: 30 },
    //             ],
    //           },
    //           { name: 'C4', value: 26 },
    //         ],
    //       },
    //       {
    //         name: 'Fourth',
    //         children: [
    //           { name: 'D1', value: 415 },
    //           { name: 'D2', value: 148 },
    //           { name: 'D3', value: 89 },
    //         ],
    //       },
    //       {
    //         name: 'Fifth',
    //         children: [
    //           {
    //             name: 'E1',
    //             children: [
    //               { name: 'EE1', value: 33 },
    //               { name: 'EE2', value: 40 },
    //               { name: 'EE3', value: 89 },
    //             ],
    //           },
    //           {
    //             name: 'E2',
    //             value: 148,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ];

    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.children = 'children';
    networkSeries.nodes.template.tooltipText = '{name}:{value}';
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = '{name}';
    networkSeries.fontSize = 10;

    networkSeries.links.template.strokeWidth = 1;

    var hoverState = networkSeries.links.template.states.create('hover');
    hoverState.properties.strokeWidth = 3;
    hoverState.properties.strokeOpacity = 1;

    networkSeries.nodes.template.events.on('over', function (event) {
      event.target.dataItem.childLinks.each(function (link) {
        link.isHover = true;
      });
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = true;
      }
    });

    networkSeries.nodes.template.events.on('out', function (event) {
      event.target.dataItem.childLinks.each(function (link) {
        link.isHover = false;
      });
      if (event.target.dataItem.parentLink) {
        event.target.dataItem.parentLink.isHover = false;
      }
    });
    this.chart = chart;

    //Responsiveness
    // chart.responsive.useDefault = false;
    // chart.responsive.enabled = true;
    // chart.responsive.rules.push({
    //   relevant: function (target) {
    //     if (target.pixelWidth <= 400) {
    //       return true;
    //     }
    //     return false;
    //   },
    //   state: function (target, stateId) {
    //     if (target instanceof am4charts.Chart) {
    //       var state = target.states.create(stateId);
    //       state.properties.paddingTop = 5;
    //       state.properties.paddingRight = 37;
    //       state.properties.paddingBottom = 20;
    //       state.properties.paddingLeft = 17;
    //       return state;
    //     }

    //     if (target instanceof am4core.Scrollbar) {
    //       var state = target.states.create(stateId);
    //       state.properties.marginBottom = 15;
    //       return state;
    //     }

    //     if (target instanceof am4charts.Legend) {
    //       var state = target.states.create(stateId);
    //       state.properties.paddingTop = 0;
    //       state.properties.paddingRight = 0;
    //       state.properties.paddingBottom = 0;
    //       state.properties.paddingLeft = 0;
    //       state.properties.marginLeft = 0;
    //       return state;
    //     }

    //     if (target instanceof am4charts.AxisRendererY) {
    //       var state = target.states.create(stateId);
    //       state.properties.inside = true;
    //       state.properties.maxLabelPosition = 0.99;
    //       return state;
    //     }

    //     if (
    //       target instanceof am4charts.AxisLabel &&
    //       target.parent instanceof am4charts.AxisRendererY
    //     ) {
    //       var state = target.states.create(stateId);
    //       state.properties.dy = -15;
    //       state.properties.paddingTop = 3;
    //       state.properties.paddingRight = 20;
    //       state.properties.paddingBottom = 3;
    //       state.properties.paddingLeft = 5;

    //       // Create a separate state for background
    //       target.setStateOnChildren = true;
    //       var bgstate = target.background.states.create(stateId);
    //       bgstate.properties.fill = am4core.color('#fff');
    //       bgstate.properties.fillOpacity = 0;

    //       return state;
    //     }
    //     return null;
    //   },
    // });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv"></div>;
  }
}

export default JobsDataVis;
