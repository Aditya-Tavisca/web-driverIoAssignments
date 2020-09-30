import { BasePage } from "./basePage";
import data from "../Selectors/hotelSearchSelectors.json"
import {GetElement} from '../Utility/getElement'


export class HotelSearch extends BasePage{
 

      divertToHotelSearch(){
        $(data.hotelButton).click();
    }

    setDestination(city:string){
        $(data.destination).setValue(city);
    }

    setCheckInCheckOutDate(checkInDate:string,checkOutDate:string){
         $(data.checkInDate).click();
         browser.pause(5000)
         let str:string='//*[@id="jd-'
         $(str+checkInDate+'"]').click();
         $(str+checkOutDate+'"]').click();
    }

    setAdult(adultNo:string){
       $(data.adult).selectByVisibleText(adultNo);  
}

    clickOnSearch(){
        //this.searchHotel.click();
        $(data.searchHotel).click();
    }
}