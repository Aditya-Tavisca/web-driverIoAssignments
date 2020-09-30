export class BasePage{
   open(){
        return browser.url('https://vacationsdirect.com'); 
    }

    wait(){
        browser.pause(5000);
    }

    
}