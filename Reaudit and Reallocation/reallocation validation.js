function IGV_Reallocation() {
  var reallocation_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV Reallocation")
  var audit_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV Submissions")
  var contract_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV Contracts System")
  var lr = last_row("E1:E",reallocation_sheet)

  var audit_data = audit_sheet.getDataRange().getValues()
  var lastRowData = reallocation_sheet.getRange(lr,1,1,8).getValues();
  
  var reallocation_ID = lastRowData[0][6]
  var original_ID = lastRowData[0][5]
  var opp_ID = lastRowData[0][4]
  var audit_index = []
  var actual_index = []

  var indexes = contract_sheet.createTextFinder(`${reallocation_ID}`).matchEntireCell(true).findAll().map( x => x.getRow() )
  if (indexes.length > 1 ){
    reallocation_sheet.getRange(lr,14,1,1).setValue("DUPLICATED REALLOCATION REFERENCE ID").setBackground("red").setFontColor("white")
    reallocation_sheet.getRange(lr,13,1,1).setValue("NOT PASSED")
    igv_rejection_mail()
  }else if (indexes.length < 1 ){
    reallocation_sheet.getRange(lr,14,1,1).setValue("WRONG REALLOCATION REFERENCE ID").setBackground("red").setFontColor("white")
    reallocation_sheet.getRange(lr,13,1,1).setValue("NOT PASSED")
    igv_rejection_mail()
  }
  else if(indexes.length == 1){
    var index = indexes[0]
    var reallocation_data = contract_sheet.getRange(index,53,1,15).getValues()
    var reallocated_slots = reallocation_data[0][6]
    if(reallocated_slots == ""){
      reallocation_sheet.getRange(lr,14,1,1).setValue("THE REFERENCE ID BELONGS TO A NORMAL CONTRACT NOT REALLOCATION").setBackground("brown").setFontColor("white")
      reallocation_sheet.getRange(lr,13,1,1).setValue("NOT PASSED")
      igv_rejection_mail()
    }else if(reallocated_slots >= 1){
      reallocation_sheet.getRange(lr,9,1,1).setValue(reallocated_slots)

      for (var i = 3 ; i < audit_data.length ; i++){
        if (audit_data[i][8] == opp_ID && audit_data[i][14] == original_ID ){
          actual_index.push(i+1)
        }
        if (audit_data[i][14] == original_ID ){
          audit_index.push(i+1)
        }
      }

      if(audit_index.length > 1){
        reallocation_sheet.getRange(lr,14,1,1).setValue("DUPLICATED ORIGINAL REFERENCE ID").setBackground("red").setFontColor("white")
        reallocation_sheet.getRange(lr,13,1,1).setValue("NOT PASSED")
        igv_rejection_mail()
      }else if(actual_index.length == 0){
        reallocation_sheet.getRange(lr,14,1,1).setValue("OPP ID IS NOT SUBMITTED WITH THAT ORIGINAL REFERENCE ID").setBackground("black").setFontColor("white")
        reallocation_sheet.getRange(lr,13,1,1).setValue("NOT PASSED")
        igv_rejection_mail()
      }else if(audit_index.length == 1 && actual_index.length == 1){
        // audit_sheet.getRange(audit_index[0],86,1,15).setValues(reallocation_data)
        var remainings = audit_data[(audit_index[0])-1][112]
        reallocation_sheet.getRange(lr,10,1,1).setValue(remainings)
        if (remainings >= reallocated_slots){
          reallocation_sheet.getRange(lr,11,1,1).setValue("TRUE")
        }
        else{
          reallocation_sheet.getRange(lr,11,1,1).setValue("FALSE")
          reallocation_sheet.getRange(lr,14,1,1).setValue("INSUFFIENCT REMAININGS FOR THE REALLOCATION").setBackground("black").setFontColor("white")
          reallocation_sheet.getRange(lr,13,1,1).setValue("NOT PASSED")
          igv_rejection_mail()
        }
      }
    }
  }
}

function igv_rejection_mail(){
  var reallocation_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV Reallocation")
  var data = reallocation_sheet.getDataRange().getValues()

  for (var i = 1 ; i <data.length ; i++){
    var result = data[i][12]
    var mail = data[i][1]
    var mail_sent = data[i][15]
    var opp_id = data[i][4]
    var comment = data[i][13]
    var body = 
    `Dear AIESECer

We are sorry to send you that your request to re-allocate the opportunity didn't pass ECB Audit due to the upcoming reasons:
    
${comment}
    
please correct the mistakes and submit again
    
Best Regards`

    if(result == "NOT PASSED" && mail_sent != "YES"){
      MailApp.sendEmail(mail,`Re-allocation Request Rejection OPP ID ${opp_id}`,body)
      reallocation_sheet.getRange(i+1 ,16,1,1).setValue("YES")
    }
  }
}