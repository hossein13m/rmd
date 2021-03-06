import { AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Utils } from '../../../utils';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-combo-chart-strokeless',
    templateUrl: './combo-chart-strokeless.component.html',
    styleUrls: ['./combo-chart-strokeless.component.scss'],
})
export class ComboChartStrokelessComponent implements OnDestroy, AfterViewInit {
    public chart!: am4charts.XYChart;
    @Input() data!: any;

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {}

    ngAfterViewInit(): void {
        // Chart code goes in here
        this.browserOnly(() => {
            am4core.useTheme(am4themes_animated);
            this.chart = am4core.create('dastan', am4charts.XYChart);
            this.chart.data = this.data.data;
            this.chart.rtl = true;

            this.chart.scrollbarX = new am4core.Scrollbar();
            this.chart.scrollbarX.parent = this.chart.bottomAxesContainer;
            this.chart.legend = new am4charts.Legend();

            let categoryAxis: any = this.chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = 'titleFA';

            let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = 'میلیارد تومان';

            // Create series
            let series = this.chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = 'budget';
            series.dataFields.categoryX = 'titleFA';
            series.name = this.data.legends.budgetLegend;
            series.columns.template.tooltipText = '{titleFA}:{valueY}';
            series.columns.template.fill = am4core.color(Utils.generateRandomColor());

            let series2 = this.chart.series.push(new am4charts.ColumnSeries());
            series2.dataFields.valueY = 'value';
            series2.dataFields.categoryX = 'titleFA';
            series2.name = this.data.legends.valueLegend;
            series2.columns.template.tooltipText = '{titleFA}:{valueY}';
            series2.columns.template.fill = am4core.color(Utils.generateRandomColor());

            this.chart.cursor = new am4charts.XYCursor();
            this.chart.cursor.behavior = 'zoomXY';
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
