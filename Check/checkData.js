import { Colors } from "react-native/Libraries/NewAppScreen";

  export const checkData = (title , image) =>{
        if(title == "" && image == null){
            
            return false;
        }else{
            return true;
        }

  }