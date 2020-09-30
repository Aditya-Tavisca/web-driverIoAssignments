import { BasePage } from "./basePage";

export class HomePage extends BasePage{
  departureCity:any;
  destinationCity:any;
  departureDate:any;
  returnDate:any;
  adult:any;
  children:any;
  search:any;

  constructor(){
      super()
      this.departureCity=$('#inputDepartureCity1_1');
      this.destinationCity=$('[name="EndLocation"]');
      this.returnDate=$('//*[@id="inputReturnDate1_1"]');
      this.departureDate=$('//*[@id="inputDepartureDate1_1"]');
      this.adult=$('//*[@id="selectAirNumberAdults"]');
      this.children=$('#selectAirNumberChildren')
      this.search=$('#flightSearchButton')
    }

    setDepartureCity(cityName:string){
        this.departureCity.setValue(cityName);
    }

    setDestinationCity(cityName:string){
        this.destinationCity.setValue(cityName)
    }

    clickOnDate(){
        this.departureDate.click();
    }

    setDepartureDate(){
        $('//*[@id="jd-10-04-20"]').click();
        $('//*[@id="jd-10-07-20"]').click();
    }

    setAdult(){
        this.adult.selectByVisibleText("3")
    }

}