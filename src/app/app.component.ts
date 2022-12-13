import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Person {
  id: Number
  name: string
  position:string
  weight:string
  symbol:Number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'nj_roster';
  dataSource:any = []
  plr_role: string = '';
  plr_name: string = '';
  plr_class: string = '';

  constructor(private httpClient: HttpClient) {}

  GetRoster(){
    this.httpClient.get('https://localhost:7080/weatherforecast', {responseType: 'blob'})
    .subscribe(data => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const readerResult = reader.result;
        if (typeof reader.result === 'string') {
          this.dataSource = JSON.parse(reader.result);
          console.log(this.dataSource);
        }
      };
      reader.readAsText(data, 'UTF-8');
    }, error => console.log(error));
  }

  PostRoster(){
    this.httpClient.post<any>('https://localhost:7080/weatherforecast', this.dataSource).subscribe(data => {
        console.log("POST");
    })
  }
  
  ngOnInit() {
    this.GetRoster();
  }

  public AddRaider(plr_name:string){
    this.dataSource.push({
      name: plr_name,
      position: this.plr_role,
      weight: this.plr_class,
      symbol: this.checkClassID(this.plr_class)
    });
    this.PostRoster();
  }

  public RemoveRaider(e:string){
    const indexOfObject = this.dataSource.findIndex((object: { name: string; }) => {
      return object.name === e;
    });
    this.dataSource.splice(indexOfObject, 1);
    this.PostRoster();
  }

  checkClassID(theClass:string){
    if (theClass == "Todesritter") return 0;
		else if (theClass == "Dämonenjäger") return 1;
    else if (theClass == "Druide") return 2;
    else if (theClass == "Rufer") return 3;
    else if (theClass == "Jäger") return 4;
    else if (theClass == "Magier") return 5;
    else if (theClass == "Mönch") return 6;
    else if (theClass == "Paladin") return 7;
    else if (theClass == "Priester") return 8;
    else if (theClass == "Schurke") return 9;
    else if (theClass == "Schamane") return 10;
    else if (theClass == "Hexenmeister") return 11;
    else if (theClass == "Krieger") return 12;
    else return 0;
  }

  getColor(value: number): string {
		if (value == 0) {
      // 0 - Death Knight
			return 'RGBA(196,30,58,0.8)';
		} else if (value == 1) {
      // 1 - Demon Hunter
			return 'RGBA(163,48,201,0.8)';
		} else if (value == 2) {
      // 2 - Druid
			return 'RGBA(255,124,10,0.8)';
		} else if (value == 3) {
      // 3 - Evoker
			return 'RGBA(51,147,127,0.8)';
		} else if (value == 4) {
      // 4 - Hunter
			return 'RGBA(170,211,114,0.8)';
		} else if (value == 5) {
      // 5 - Mage
			return 'RGBA(63,199,235,0.8)';
		} else if (value == 6) {
      // 6 - Monk
			return 'RGBA(0,255,152,0.8)';
		} else if (value == 7) {
      // 7 - Paladin
			return 'RGBA(244,140,186,0.8)';
		} else if (value == 8) {
      // 8 - Priest
			return 'RGBA(255,255,255,0.8)';
		} else if (value == 9) {
      // 9 - Rogue
			return 'RGBA(255,244,104,0.8)';
		} else if (value == 10) {
      // 10 - Shaman
			return 'RGBA(0,112,221,0.8)';
		}  else if (value == 11) {
      // 11 - Warlock
			return 'RGBA(135,136,238,0.8)';
		} else if (value == 12) {
      // 12 - Warrior
			return 'RGBA(198,155,109,0.8)';
		} else {
      return 'RGBA(198,155,109,0.4)';
    }
	}
}
