function GV_slots(){
  var sheet_IGV = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ALL SLOTS IGV")
 var id = []
  var lc = []
  var product = []
  var status = []
  var total_opens = []
  var available_opens = []
  var date_opened = []
  var date_created = []
  var total_slots = []
  var date_updated = []
  var min_date = []
  var max_date = []
  var data_to_sheet = []
  var working_hours=[]
var query = `query {
    opportunities(
        filters:{
          date_opened: {from : \"2020-01-01\"},
            programmes:[7],
            committee:1609,
        }
        per_page:7000
    )
    {
        paging {
            total_items
        }
        data {
            person {
                accepted_count
            }
            id
            logistics_info {
                accommodation_covered
                accommodation_provided
                computer_provided
                food_covered
                food_provided
                no_of_meals
                transportation_covered
                transportation_provided
            }
            title
            branch {
                company {
                    name
                }
            }
            programme {
                short_name_display
            }
            home_lc {
                name
            }
            status
            duration
            project_duration
            opportunity_duration_type{
              duration_max
              duration_min
              duration_type
              salary
            }
            sub_product{
              id
              name
              sub_product_group
            }
            title
            created_at
            date_opened
            updated_at
            applicants_count
            accepted_count
            work_hours
            project_fee
            programme_fees
            work_hours
            slots {
                id
                status
                created_at
                openings
                available_openings
                start_date
                end_date
            }
            available_slots {
                id
            }
        }
    }
}`;

  var data = dataExtraction(query)
  for (var i = 0; i <data.length; i++){
  id.push(data[i].id)
  lc.push(data[i].home_lc.name)
  product.push(data[i].programme.short_name_display)
  status.push(data[i].status)
  total_opens.push(get_opens(data[i].slots)[0])
  available_opens.push(get_opens(data[i].slots)[1])
  min_start_date = expa_dates(data[i].slots)[0]
  max_start_date = expa_dates(data[i].slots)[1]
  min_date.push(min_start_date)
  max_date.push(max_start_date)
  date_opened.push(new Date(data[i].date_opened))
  date_created.push(new Date(data[i].created_at))
  total_slots.push(data[i].slots.length)
  date_updated.push(new Date(data[i].updated_at))
  working_hours.push(data[i].work_hours)
  data_to_sheet.push([id[i],status[i],product[i],lc[i],date_created[i],date_opened[i],date_updated[i],total_slots[i],total_opens[i],available_opens[i],min_date[i],max_date[i],working_hours[i]])
  }

  sheet_IGV.getRange(2,1,sheet_IGV.getLastRow(),data_to_sheet[0].length).clearContent();
  sheet_IGV.getRange(2,1,data_to_sheet.length,data_to_sheet[0].length).setValues(data_to_sheet);
}