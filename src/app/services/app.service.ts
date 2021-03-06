import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiquidityReportChart, LiquidityReportDescriptionsNew, Organization, Report } from '../models/common.model';
import { ContractsListModel } from '../components/contracts-list/contracts-list.model';
import { BudgetValueResponse } from '../components/budget-value/BudgetValue.model';
import { ConcentrationReport } from '../components/circular-pie-chart/circular-pie-chart.model';
import { DemandsModel } from '../components/demands/demands.model';
import { LiquidityCashModel } from '../components/liquidity-cash/liquidity-cash.model';
import { SufficiencyReport } from '../components/sufficiency-gauge-chart/sufficiency-gauge-chart.model';
import { PerformanceCurveModel } from '../components/performance-curve/performance-curve.model';
import { HistoryModel } from '../modules/history/history.model';

@Injectable()
export class AppService {
    constructor(private readonly http: HttpClient) {}

    public getOrganization(): Observable<Array<Organization>> {
        return this.http.get<Array<Organization>>(`/api/organization`);
    }

    public getReportTypes(organizationCode: string): Observable<Array<Report>> {
        return this.http.get<Array<Report>>(`/api/report-type?organization=${organizationCode}`);
    }

    public uploadReport(reportData: any): Observable<any> {
        return this.http.post<any>(`/api/upload-report`, reportData);
    }

    public getAvailableDatesForReports(organizationNationalCode: number): Observable<Array<string>> {
        return this.http.get<Array<string>>(`/api/organization/report-dates?organization=${organizationNationalCode}`);
    }

    public getLiquidityReportChart(organization: string, createdAt: string): Observable<Array<LiquidityReportChart>> {
        return this.http.get<Array<LiquidityReportChart>>(`/api/dashboard/naghdinegi/chart?organization=${organization}&createdAt=${createdAt}`);
    }

    public getLiquidityReportDescriptions(organization: string, createdAt: string): Observable<Array<LiquidityReportDescriptionsNew>> {
        return this.http.get<Array<LiquidityReportDescriptionsNew>>(
            `/api/dashboard/naghdinegi/descriptions?organization=${organization}&createdAt=${createdAt}`
        );
    }

    public getContractsList(organization: string, createdAt: string): Observable<Array<ContractsListModel>> {
        return this.http.get<Array<ContractsListModel>>(`/api/dashboard/gharardad?organization=${organization}&createdAt=${createdAt}`);
    }

    public getProfitReport(organization: string, createdAt: string, url: string): Observable<any> {
        return this.http.get<any>(`/api/dashboard/${url}?organization=${organization}&createdAt=${createdAt}`);
    }

    public getBudgetAndValueReport(organization: string, createdAt: string): Observable<BudgetValueResponse> {
        return this.http.get<BudgetValueResponse>(`/api/dashboard/daramad-hazine?organization=${organization}&createdAt=${createdAt}`);
    }

    public getConcentrationPieChartReport(organization: string, createdAt: string, url: string): Observable<Array<ConcentrationReport>> {
        return this.http.get<Array<ConcentrationReport>>(`/api/dashboard/tamarkoz-${url}?organization=${organization}&createdAt=${createdAt}`);
    }

    public getDemandsReport(organization: string, createdAt: string): Observable<Array<DemandsModel>> {
        return this.http.get<Array<DemandsModel>>(`/api/dashboard/motalebat?organization=${organization}&createdAt=${createdAt}`);
    }

    public getLiquidityCashReport(organization: string, createdAt: string): Observable<LiquidityCashModel> {
        return this.http.get<LiquidityCashModel>(`/api/dashboard/naghdShavandegi?organization=${organization}&createdAt=${createdAt}`);
    }

    public getSufficiencyReport(organization: string, createdAt: string): Observable<SufficiencyReport> {
        return this.http.get<SufficiencyReport>(`/api/dashboard/kefayat?organization=${organization}&createdAt=${createdAt}`);
    }

    public getPerformanceCurve(organization: string, createdAt: string): Observable<Array<PerformanceCurveModel>> {
        return this.http.get<Array<PerformanceCurveModel>>(`/api/dashboard/monhani-bazdeh?organization=${organization}&createdAt=${createdAt}`);
    }

    public getFileUploadHistory(): Observable<Array<HistoryModel>> {
        return this.http.get<Array<HistoryModel>>(`/api/upload-report`);
    }
}
