import {HomePage} from '../pageobjects/FlightSearch'
import {HotelSearch} from '../pageobjects/HotelSearch'
import {HotelResults} from '../pageobjects/HotelResults'
import {HotelResultsFor} from '../pageobjects/hotelResultsFor'


describe('test Hotel results', () => {
    var hotelSearch:HotelSearch;
    var hotelResults:HotelResults;
    var hotelResultFor:HotelResultsFor;
    var hotelName:string;
    var hotelRaiting:string;
 
    before(()=>{
        hotelSearch=new HotelSearch();
        hotelResults=new HotelResults();
        hotelResultFor=new HotelResultsFor();
        hotelSearch.open();
        browser.maximizeWindow();
        hotelSearch.divertToHotelSearch();
        browser.pause(5000)
        hotelSearch.setDestination('Vancouver, BC, CA');
        hotelSearch.setCheckInCheckOutDate('10-09-20','10-15-20');
        hotelSearch.setAdult('3');
        hotelSearch.clickOnSearch();
        hotelSearch.wait();
    })

    it('should have the right title', () => {
        expect(browser).toHaveTitle('Hotel Results');
     })

    it('Test count of hotel',()=>{
        expect(hotelResults.getHotelCount()).toBe(hotelResults.getHotelCount());
    })

    it('test hotel location',()=>{
        expect(hotelResults.getSearchLocation('Vancouver, BC (YVR)')).toBe(true);      
        browser.pause(10000);
    })

    it('test pagination by selecting random page',()=>{
        hotelResults.clickOnPage(8)
    })

    it('test Five star Hotel List',()=>{
        hotelRaiting="5";
        hotelResults.setRaiting(hotelRaiting);
        browser.pause(5000);
        expect("("+hotelResults.getHotelCount()+")").toBe(hotelResults.getNumberOfHotelsAsPerRaiting(hotelRaiting));
      })

      it('Test No of hotels are perfect',()=>{
        expect(hotelResults.getNoOfHotelInSinglePage().toString()).toBe(hotelResults.getHotelCount());
      })

    it('Search by specific hotel name test the hotel count',()=>{
        hotelName=hotelResults.getSearchHotelName();
        hotelResults.setHotelName(hotelName);
        browser.pause(2000);
        hotelResults.clickOnAutoSuggestList();
        browser.pause(5000)
        expect(hotelResults.getHotelCount()).toBe('1');
    })

    it('Test that the name of the hotel populated is same or not',()=>{
        expect(hotelResults.getSearchHotelName()).toBe(hotelName)
     })

     it('Test the raiting of populated hotel ',()=>{
        expect(hotelResults.getCurrentRaitingOfHotel()).toBe(parseInt(hotelRaiting))
    })

    describe('hotel result for particular hotel',()=>{
    it('search For room avilability',()=>{
       hotelResults.clickOnChooseRoom();
       browser.pause(10000)
       expect(hotelResultFor.getAvilableRoomCount()).toBeGreaterThan(1);
    })

    it('test Hotel name',()=>{
        expect(hotelResultFor.getHotelName()).toBe(hotelName);
    })
  })
})

