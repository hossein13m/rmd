import { Component, Input, OnInit } from '@angular/core';
import { ComponentDataGetInfo, Status } from '../../models/common.model';
import { AppService } from '../../services/app.service';
import { NetProfitModel, OperationalProfitModel, ProfitModels, ProfitType, ROAModel, ROEModel } from './profitBaseModel';
import { ProfitDictionary, ProfitURL } from '../../const/constants';
import { Utils } from '../../utils';

@Component({
    selector: 'app-profit',
    templateUrl: './profit.component.html',
    styleUrls: ['./profit.component.scss'],
})
export class ProfitComponent implements OnInit {
    @Input() info!: ComponentDataGetInfo;
    @Input() profitType: ProfitType = 'net';
    public profitData!: ProfitModels;
    public chartInformation: Array<{ name: string; value: string }> = [];

    constructor(private readonly appService: AppService) {}

    ngOnInit(): void {
        this.getProfitReport(ProfitURL[this.profitType]);
    }

    private getProfitReport(reportUrl: string): void {
        this.appService.getProfitReport(this.info.organization, this.info.createdAt, reportUrl).subscribe((response) => {
            this.profitData = response;
            this.prepareDataForChart();
        });
    }

    public getIconColorBasedOnStatus(profitStatus: Status): string {
        return Utils.getColorBasedOnStatus(profitStatus);
    }

    private prepareDataForChart(): void {
        if (!this.profitData) return;
        this.chartInformation = [{ name: this.getProfitPersianName(), value: `${this.getProfitValueBasedOnProfitType(this.profitData)}` }];
    }

    public getProfitValueBasedOnProfitType(profit: ProfitModels): number {
        return 'netProfitMargin' in profit
            ? (profit as NetProfitModel).netProfitMargin
            : 'operatingProfitMargin' in profit
            ? (profit as OperationalProfitModel).operatingProfitMargin
            : 'ROE' in profit
            ? (profit as ROEModel).ROE
            : (profit as ROAModel).ROA;
    }

    public getProfitPersianName(): string {
        return ProfitDictionary[this.profitType];
    }
}
