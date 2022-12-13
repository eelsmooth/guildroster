import {OnInit, AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

export interface Person {
  id: Number
  name: string
  position:string
  weight:string
  symbol:Number
}

const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('x-master-key', '$2b$10$V0KEZ8p2ITtuPEeslj.BE.7zP9NDvdVJahDwUMepBlVMKi5VrIm3O');

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
  baseUrl: string = 'https://api.jsonbin.io/v3/b/63981ce534ae3620ec2cf79f';
  @ViewChild('rosterColor') myDiv: ElementRef | undefined;

  constructor(private httpClient: HttpClient) {}

  GetRoster(){
    this.httpClient.get(this.baseUrl, {responseType: 'blob', headers})
    .subscribe(data => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        if (typeof reader.result === 'string') {
          let theValue = JSON.parse(reader.result);
          console.log(theValue.record);
          for (var i = 0; i < theValue.record.length; i++){
            console.log(theValue.record[i].name);
            this.dataSource.push({
              name: theValue.record[i].name,
              position: theValue.record[i].position,
              weight: theValue.record[i].weight,
              symbol: this.checkClassID(theValue.record[i].symbol)
            });
          }
        }
      };
      reader.readAsText(data, 'UTF-8');
    }, error => console.log(error));
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
    this.httpClient.put(this.baseUrl, this.dataSource, { headers: headers }).subscribe(response => {
    // do something with the response
    });
  }

  public RemoveRaider(e:string){
    const indexOfObject = this.dataSource.findIndex((object: { name: string; }) => {
      return object.name === e;
    });
    this.dataSource.splice(indexOfObject, 1);
    this.httpClient.put(this.baseUrl, this.dataSource, { headers: headers }).subscribe(response => {
      // do something with the response
      });
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
      console.log(this.myDiv?.nativeElement.innerHTML);
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
