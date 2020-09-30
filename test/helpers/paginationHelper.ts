import data from "../Selectors/hotelResultsSelectors.json"

export class PaginationHelper {

    getTotalNumberOfPages(totalNumberOfHotel: number) {
        return Math.ceil(totalNumberOfHotel / 25);
    }


    isPageAvilable(pageNo: number) {
        for (let i = 1; i <= $(data.pagination).$$('li').length; i++) {
            if (parseInt($(data.pagination + '/li[' + i + ']').getText()) == pageNo) {
                return i;
            }
        }
        return -1;
    }

    clickOnPage(pageNo) {
        let result = this.isPageAvilable(pageNo)
        let currentPage = this.getCurrentPageNo();
        if (pageNo > currentPage) {
            while (result == -1) {
                let i = 0;
                let len = $(data.pagination).$$('li').length;
                $(data.pagination + '/li[' + len + ']').click();
                browser.pause(5000)
                result = this.isPageAvilable(pageNo)
            }
        }
        else {
            while (result == -1) {
                let i = 0;
                console.log("\n count " + i++);
                $(data.pagination + '/li[1]').click();
                browser.pause(5000)
                result = this.isPageAvilable(pageNo)
            }
        }
        console.log("The result page index is " + result);
        $(data.pagination + '/li[' + result + ']').click();
        browser.pause(5000);
    }

    getStartingIndexOfHotel(pageNo: number) {
        return ((pageNo - 1) * 25) + 1;
    }

    getCurrentPageNo() {
        let hotelCount = parseInt($(data.hotelCount).getText().split(" ")[1])
        let hotel = hotelCount - 1
        return Math.ceil(hotel / 25)
    }

    // totalNumberOfIteration(pageno) {
    //     let times_click: number;
    //     if (pageno <= 9)
    //         times_click = 0;
    //     else {
    //         let num = pageno - 9;
    //         times_click = parseInt((num / 4).toString());
    //         if (num % 4 != 0)
    //             times_click++;
    //     }
    //     return times_click;
    // }

    getHotelNameOnSinglePage() {
        let countOfHotel: number = $(data.noOfHotelsInPage).$$('.js-hotel-result').length;
        let hotelDetails = new Map();
        let hotelInfo=[];
        let hotelName;
        for (let i = 1, j = 0; i <= countOfHotel; i++, j++) {
            hotelInfo=[];
           // hotelName = $('//*[@id="HotelSearchResults"]/li[' + i + ']/h3').getText().split('-')[1];
            hotelName=$$(data.hotelName)[i].getText() 
            hotelInfo[0]=parseFloat($$(data.unitPrice)[i-1].getText());
            hotelInfo[1]=parseFloat($(data.distance.replace("?", i.toString())).getText().split(" ")[0]);
            hotelInfo[2]=$(data.hotelRaiting.replace("?", i.toString())).$$('.hotel-results-star-rating-selected').length
            hotelDetails.set(hotelName,hotelInfo); 
        }
        return hotelDetails;
    }

    getAllHotelName() {
        let allHotelNames: Map<any, any> = new Map();
        allHotelNames = this.getHotelNameOnSinglePage();
        for (let i = 2; i <= this.getTotalNumberOfPages(parseInt($(data.hotelCount).getText().split(" ")[5])); i++) {
            this.clickOnPage(i);
            browser.pause(2000);
            allHotelNames = new Map([...Array.from(allHotelNames.entries()), ...Array.from(this.getHotelNameOnSinglePage().entries())]);
        }
        return allHotelNames;
    }

    compareTwoPages(page1:Map<any,any>,page2:Map<any,any>,sortBy:number){
        if(page2.size!=page1.size)
         return false;
       let hotelName=Array.from(page1.keys());
       let sortedHotelName=Array.from(page2.keys());
       for(let i=0;i<hotelName.length;i++){
        if(sortBy!=3){
          if(page1.get(hotelName[i][sortBy]==page2.get(sortedHotelName[i][2]))){
               return false;
          }
        }
        else{
            if(hotelName[i]!=sortedHotelName[i])
               return false  
         }
      }
        return true;
    }

    asscendingSort(map:Map<any,any>,sortBy:string){
        let sortedMap:Map<any,any>;
        switch(sortBy){
            case "price"   :sortedMap=new Map([...Array.from(map.entries())].sort((a,b)=>a[1][0]-b[1][0]));
                            break;
            case "distance":sortedMap=new Map([...Array.from(map.entries())].sort((a,b)=>a[1][1]-b[1][1]));
                            break;
            case "raiting" :sortedMap=new Map([...Array.from(map.entries())].sort((a,b)=>a[1][2]-b[1][2]));
                            break;                               
        }                   
        return sortedMap; 
    }

    descendingSort(map:Map<any,any>,sortBy:string){
        let sortedMap:Map<any,any>;
        switch(sortBy){
            case "price"   :sortedMap=new Map([...Array.from(map.entries())].sort((a,b)=>b[1][0]-a[1][0]));
                            break;
            case "distance":sortedMap=new Map([...Array.from(map.entries())].sort((a,b)=>b[1][1]-a[1][1]));
                            break;
            case "raiting" :sortedMap=new Map([...Array.from(map.entries())].sort((a,b)=>b[1][2]-a[1][2]));
                            break;                               
        }                   
        return sortedMap; 
    }
}
