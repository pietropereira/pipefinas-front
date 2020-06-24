import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryModel } from 'src/app/models/Category.Model';
import { EntryModel } from 'src/app/models/Entry.Model';
import { EntryService } from 'src/app/services/entry.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: number = 0;
  revenueTotal: number = 0;
  balance: number = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = { //graph axis
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: CategoryModel[] = [];
  entries: EntryModel[] = [];

  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;
  
  constructor(private entrySrv: EntryService, private categorySrv: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  async getAllCategories() {
    const result = await this.categorySrv.GetAll();
    if(result.success) {
      this.categories = result.data;
    }
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
    if(!month || !year) {
      alert("Você precisa selecionar um mês e ano para gerar os relatórios");
    }
    else {
      const entryMonthAndYear = this.entrySrv.getByMonthAndYear(month, year);
      entryMonthAndYear.then(this.setValues.bind(this))
    }
  }

  private setValues(entries: EntryModel[]) {
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }


  
  
  private calculateBalance() {
    let expenseTotal = 0;
    let  revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type === 2) {
        revenueTotal += entry.amount;
      }
      else {
        expenseTotal += entry.amount;
      }
    });

    this.expenseTotal = expenseTotal;
    this.revenueTotal = revenueTotal;
    this.balance = revenueTotal - expenseTotal;

  }


  private setChartData() {
    this.revenueChartData = this.getChartData(2, 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData(1, 'Gráfico de Despesas', '#e03131');
  }


  private getChartData(entryType: number, title: string, color: string) {
    const chartData = [];
    this.categories.forEach(category => {
      //by and type
      const filteredEntries = this.entries.filter(entry => (entry.category.uid === category.uid)
      && (entry.type === entryType));

      //if found, then sum entries amount and add chartData
      if(filteredEntries.length > 0) {
        const totalAmount = filteredEntries.reduce((total, entry) => total + entry.amount, 0);

        chartData.push({categoryName: category.name, totalAmount: totalAmount})
      }
    });

    return {
      labels: chartData.map(e => e.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(e => e.totalAmount)
      }]
    }
  }
}
