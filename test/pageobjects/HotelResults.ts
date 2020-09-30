import data from "../Selectors/hotelResultsSelectors.json"
import {PaginationHelper} from "../helpers/paginationHelper"
export class HotelResults{
    getHotelCount(){
        return $(data.hotelCount).getText().split(" ")[5]; 
    }

    getStartingIndexOfHotelOnPage(){
        return $(data.hotelCount).getText().split(" ")[1];
    }

    getSearchLocation(destination:string){
        //return GetElement.getElementByXpath(data.searchLocation).getText().includes(destination);
        return $(data.searchLocation).getText().includes(destination);
    }

    getFiveStarRaitingHotels(){
        $(data.fiveStarRating).click();
    }

    setHotelName(hotelName:string){
        $(data.searchByHotelName).setValue(hotelName);
    }

    clickOnAutoSuggestList(){
        $(data.autosugestlist).click();
    }

    setRaiting(raiting:string){
        switch(raiting){
            case "2":$(data.twoStarRaiting).click();
                     break;
            case "3":$(data.threeStarRaiting).click();          
                     break;
            case "4":$(data.fourStarRaiting).click();
                     break;
            case "5":$(data.fiveStarRating).click();
                     break;                 
        }     
    }

    getNumberOfHotelsAsPerRaiting(raiting:string){
        switch(raiting){
            case "2":return $(data.noOfTwoStarHotel).getText();
            case "3":return $(data.noOfThreeStarHotel).getText();       
            case "4":return $(data.noOfFourStarHotel).getText();
             case "5":return $(data.noOffiveStarHotel).getText();                 
        }     
      }

      getSearchHotelName(){
          return $(data.searchHotelName).getText();
      }

      getNoOfHotelInSinglePage(){
          return $(data.noOfHotelsInPage).$$('.js-hotel-result').length;
      }

      clickOnChooseRoom(){
          $(data.chooseRoom).click();  
      }

      getCurrentRaitingOfHotel(){
       return $(data.raitingOfHotel).$$('.hotel-results-star-rating-selected').length;
      }

      clickOnPage(pageNo:number){
         let obj:PaginationHelper=new PaginationHelper();
         obj.clickOnPage(pageNo);   
         
      }

      clickOnSortByPrice(){
          $(data.sortByPrice).click();
      }

      clickOnSortByDistance(){
          $(data.sortByDistance).click();
      }

      clickOnSortByHotelName(){
          $(data.sortByHotelName).click();
      }

      clickOnSortByRaiting(){
          $(data.sortByRaiting).click();
      }

}