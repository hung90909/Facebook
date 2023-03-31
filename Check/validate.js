export const checkEmail = (text) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text.length == 0) {
        return false;
    } else if (pattern.test(text) == true) {
        return true;
    } else if (pattern.test(text) == false) {
        return false
    }
}
export const checkPassword = (text) => {
  
    if (text.length == 0) {
        return false;
    } else if (text.length < 3) {
        return false;
    } else if (text.length > 15) {
        return false;
    } else {
        return true;

    }
   
}
export const checkRepassword = (text) => {
    
    if (text.length == 0) {
        return false;
    } else if (text.length < 3) {
        return false;
    } else if (text.length > 15) {
        return false;
    }else{
        return true;

    }

}