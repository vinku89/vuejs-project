import Vue from "vue";
//import numeral from "numeral";
Vue.config.productionTip = false;

Vue.filter("nf_eight_dec", value => {
    //if (value > 0) {
      return Number.parseFloat(value).toFixed(8);
    //}
    //return 0.00;
  });

  // Vue.filter("number_format_eight_dec", value => {
  //   let str=value.substring(0, 1);
  //       let f="";
  //       if(str=='-'){
  //           f="-";
  //           value = value.ltrim('-');
  //       }
  //       //value=exp2dec(value);
  //       var t=value.split(".");
  //       if(t[0]==="-0"){
  //           var beforeDecimal=t[0];
  //       }else{
  //           beforeDecimal=Math.floor(t[0]).toFixed;
  //       }
  //       if(!t[1]){
  //           var afterDecimal=t[1].substring(0,8);
  //           if(afterDecimal.rtrim(0)!=""){
  //                afterDecimal = afterDecimal.rtrim(0);   
  //           }else{
  //               afterDecimal = "00";
  //           }
  //           var formatAmt=beforeDecimal+"."+afterDecimal;
  //       }else{
  //           formatAmt=beforeDecimal;
  //       }
  //       if (formatAmt.indexOf('.') !== false) {
  //           var amttemp=formatAmt.split(".");
  //           if(amttemp[1].length==1){
  //               formatAmt = formatAmt+"0";
  //           }else{
  //               //
  //           }
  //       }else{
            
  //           formatAmt = formatAmt+".00";
  //       }
  //       return f+formatAmt;
  // });

  export default new Vue({
    
  })