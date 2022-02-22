import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { isPlatformBrowser } from '@angular/common';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnDestroy, AfterViewInit {
    public chart!: am4charts.XYChart;
    @Input() data!: Array<{ name: string; value: string }>;
    @Input() chartId!: string;

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // Chart code goes in here
        this.browserOnly(() => {
            am4core.useTheme(am4themes_animated);
            let chart = am4core.create(this.chartId, am4charts.XYChart);
            chart.paddingRight = 10;
            chart.data = this.data;

            let categoryAxis: any = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'name';
            categoryAxis.title.text = 'تاریخ';
            categoryAxis.title.fontWeight = 'bold';

            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 200;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'value';
            series.dataFields.categoryX = 'name';
            series.name = 'جریان نقد ورودی';
            series.columns.template.tooltipText = 'جریان نقد ورودی';
            series.columns.template.fill = am4core.color('#92D050');

            this.chart = chart;
        });
    }

    ngOnDestroy() {
        // Clean up chart when the component is removed
        this.browserOnly(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }
}
