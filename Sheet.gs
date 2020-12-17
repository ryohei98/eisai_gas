


function main1() {
  //-----*** 定義をする ***---
  var ResultList= "ResultList";
  var Data = "Data";
  var StudentList = "StudentList";
  
  //----*** 処理 ***---
  
  //ssとシートを取得
  const ss = SpreadsheetApp.getActive();
  const sheetResultList = ss.getSheetByName(ResultList);
  const sheetData = ss.getSheetByName(Data);
  const sheetStudent = ss.getSheetByName(StudentList);
  
  
  var lastRow = sheetData.getLastRow();
  var lastCol = sheetData.getLastColumn();
  
  //処理の高速化のために配列に格納
  const arrayData = sheetData.getRange(1,1,lastRow,lastCol).getValues();
  
  Logger.log("arrayResultList:%s",arrayData);
  
  //重複なしの名前の配列を作る
  var arrayName = makeNameArray(sheetStudent);
  
  //名前の配列を基準に過去の成績を標準化してKPIとして書き込んでいく
  var studentArray = makeStudentObj(arrayData,arrayName);
  
  Logger.log(studentArray)
  
}

//名前を並べた配列を返す
function makeNameArray(sheet){
  var lastRow = sheet.getLastRow();
  var array1 = sheet.getRange(1,1,lastRow,1).getValues();
  var newArray = new Array(1);
  for(var i in array1){
    for(var j in array1[0]){
      newArray.push(array1[i][j])
    }
  }
  newArray.shift();
  newArray.shift();
  return newArray
}


//studentObjの配列を作るための関数
function makeStudentObj(arrayData,arrayName){
  
  var arr = new Array(1);
  var kpi = 0;
  
  //名前でKPIを出すための情報を取ってくる
  for(var name in arrayName){
    var currentName = arrayName[name];
    
    //その子の成績を集めた配列を作る
    var arrayPersonal = makeArrayPersonal(currentName, arrayData);
    Logger.log("arrayPersonal:%s",arrayPersonal);
    
    //平均点等を計算するための配列
    var arrayAverage = new Array(10).fill(0);
    
    //最新の成績を格納する配列
    var arrayLatest = new Array(5).fill(0);
    
    //オブジェクトを作る
    var std_obj = {name: arrayName[name]};
    
    //点数を格納する    
    for(var i in arrayPersonal){
      //前回までの点数の総和
      arrayAverage[0] += parseFloat(arrayPersonal[i][3]);
      arrayAverage[1] += parseFloat(arrayPersonal[i][4]);
      arrayAverage[2] +=  parseFloat(arrayPersonal[i][5]);
      arrayAverage[3] +=  parseFloat(arrayPersonal[i][6]);
      arrayAverage[4] +=  parseFloat(arrayPersonal[i][7]);
      if(i == arrayPersonal.length - 1){
        //最新のタイムスタンプを記録
        std_obj["timeStamp"] = arrayPersonal[i][0];
        
        //最新の成績を格納
        arrayLatest[0] = parseFloat(arrayPersonal[i][3]);
        arrayLatest[1] = parseFloat(arrayPersonal[i][4]);
        arrayLatest[2] = parseFloat(arrayPersonal[i][5]);                          
        arrayLatest[3] = parseFloat(arrayPersonal[i][6]);                           
        arrayLatest[4] = parseFloat(arrayPersonal[i][7]);
        
        // 今回の平均を格納
        arrayAverage[5] +=  parseFloat(arrayPersonal[i][8]);
        arrayAverage[6] +=  parseFloat(arrayPersonal[i][9]);
        arrayAverage[7] +=  parseFloat(arrayPersonal[i][10]);
        arrayAverage[8] +=  parseFloat(arrayPersonal[i][11]);
        arrayAverage[9] +=  parseFloat(arrayPersonal[i][12]);
      }
    }
    //記録
    std_obj["latest"] = arrayLatest;
    
    Logger.log("Tentative_sum:%s",arrayAverage);
    
    //過去の平均を求める  
    for(var i in [0,1,2,3,4]){
      arrayAverage[i] = arrayAverage[i] / arrayPersonal.length;
    }
    
    //記録
    std_obj["average"] = arrayAverage;
    
    var arrayKpi = new Array(1);
    Logger.log("%s\narrayAverage:%s\narrayLatest:%s",arrayName[name],arrayAverage,arrayLatest);    
   
    
    for( var i in [0,1,2,3,4]){
      
      var i1 = parseInt(i)+5; 
      
      Logger.log("i1:%s",i1)
      Logger.log("parseFloat(((arrayLatest[i]-arrayAverage[i])/arrayAverage[i])):%s\nparseFloat(((arrayLatest[i]- arrayAverage[i+5]) / arrayAverage[i+5])):%s",((arrayLatest[i]-arrayAverage[i])/arrayAverage[i]),((arrayLatest[i]- arrayAverage[i+5]) / arrayAverage[i+5]));
      Logger.log("arrayLatest[i]:%s\narrayAverage[i+5]:%s\narrayLatest[i]- arrayAverage[i+5]:%s\n",arrayLatest[i],arrayAverage[i1],arrayLatest[i]- arrayAverage[i1])
      

      
      //全教科のKPIの和を算出
      var currentKpi = parseFloat(((arrayLatest[i]-arrayAverage[i])/arrayAverage[i])) + 
        parseFloat(((arrayLatest[i]- arrayAverage[i1]) / arrayAverage[i1]));
      Logger.log("currentKpi:%s",currentKpi);
      kpi += currentKpi;
      arrayKpi.push(currentKpi);
    }
    
    arrayKpi.shift();
    std_obj["kpi"] = arrayKpi;
    
    arr.push(std_obj);
    
    Logger.log("%s : %s", currentName, arrayAverage);
  }
  
  arr.shift();
  
  return arr;
}


//KPIを計算するための配列を作成する
function makeArrayPersonal(currentName, arrayData){
  
  //returnするための空配列
  var arr = new Array(1); 
  
  //名前が一致しているものを配列にしていく
  for(var i in arrayData){
    if (i == 0){
      continue;
    }else if(arrayData[i][2] == currentName){
      Logger.log("arrayData[i]:%s",arrayData[i]);
      arr.push(arrayData[i]);
    } 
  }
  
  arr.shift();
  return arr
}
