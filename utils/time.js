// GMT时间转化为普通时间
 export function GMTToTime(time){
	let date = new Date(time)
	   let Str=date.getFullYear() + '-' +
	   (date.getMonth() + 1) + '-' + 
	   date.getDate() + ' ' +
	   date.getHours() + ':' + 
	   date.getMinutes() + ':' + 
	   date.getSeconds()
	   return Str
}

// 返回距离当前时间得上一周时间
export function getYestoday(){       
    var d=new Date();
    var yesterday_milliseconds=d.getTime()-7000*60*60*24;        
    var yesterday = new Date();        
    yesterday.setTime(yesterday_milliseconds);        
    var strYear = yesterday.getFullYear();     
    var strDay = yesterday.getDate();     
    var strMonth = yesterday.getMonth()+1;   
      if(strDay<10)     
   {     
       strDay="0"+strDay;     
    }    
   if(strMonth<10)     
   {     
       strMonth="0"+strMonth;     
    }     
    var datastr = strYear+"-"+strMonth+"-"+strDay;   
    return datastr;   
  }  

//格式化时间
export function currentTime(){
	const dictTime = new Date()
	var changeDate = dictTime.getFullYear() + '-' + (dictTime.getMonth() + 1) + '-' + dictTime.getDate();
	return changeDate
}
