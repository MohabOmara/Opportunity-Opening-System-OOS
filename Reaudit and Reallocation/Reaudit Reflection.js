function IGV() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("IGV")
  var data = sheet.getDataRange().getValues()
  var OOS = SpreadsheetApp.openById("1U_Z2MXcZ_vDUKNGbPDNOhnl6nwcPiRdaUZlY3xhbfqw").getSheetByName("IGV Submissions")
  var OOS_data = OOS.getDataRange().getValues()

  for(var j = 130 ; j < data.length ; j++){
    var OPP_ID = data[j][2]
    var Ref_ID = data[j][3]
    var OOS_reflection = data[j][6]
    var validation = data[j][7]
    var mail = data[j][1]
    var mail_sent = data[j][14]

    if(validation  && OOS_reflection != "YES"  && mail_sent != "YES"){
      for(var i = 0 ; i< OOS_data.length ; i++){
        if(OPP_ID == OOS_data[i][8]){
          if(Ref_ID == OOS_data[i][14]){
            // var date_reflected = new Date()
            OOS.getRange(i+1,131,1,1).setValue("submitted")
            // OOS.getRange(i+1,132,1,1).setValue(date_reflected)
            OOS.getRange(i+1,32,1,1).setValue("Close")
            sheet.getRange(j+1,7,1,1).setValue("YES")
            break
          }
        }
      }
    } else if(!validation && mail_sent != "YES" && OOS_reflection != "YES"){
      MailApp.sendEmail(mail,`Re-audit Request Rejected for OPP ID ${OPP_ID}`,body_not_correct)
      sheet.getRange(j+1,15,1,1).setValue("YES")
    }
  }
}