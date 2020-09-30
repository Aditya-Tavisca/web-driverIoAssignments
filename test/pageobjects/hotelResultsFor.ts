import data from "../Selectors/hotelResultsFor.json"

export class HotelResultsFor{
  avilableRooms:any;

    constructor(){
        this.avilableRooms=$(data.avilableRooms);
     }

    getAvilableRoomCount(){
        let roomCount:number =+$(data.avilableRooms).getText().split(' ')[2];  
        return roomCount;
    }

    getHotelName(){
      return $(data.hotelName).getText();
    }


}