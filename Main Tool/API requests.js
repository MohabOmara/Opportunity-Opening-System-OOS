function dataExtraction(graphql){ 
  var graphql = JSON.stringify({query: graphql})
  var requestOptions = {
    'method': 'post',
    'payload': graphql,
    'contentType':'application/json',
    'headers':{
      'access_token': `${access_token}`
    }
  };
  var response = UrlFetchApp.fetch(`https://gis-api.aiesec.org/graphql?access_token=${requestOptions["headers"]["access_token"]}`, requestOptions);
  var recievedDate = JSON.parse(response.getContentText());
  return recievedDate.data.opportunities.data;
}



function unpublishOpportunity(id){
 try {
        Logger.log(id)
        const requestBody = {
          query: `
            mutation UnpublishOpportunity($id: ID!) {
              unpublishOpportunity(id: $id) {
               accepted_count
               applicants_count
               application_processing_time
              applications_close_date
              applications_status_facets
              applied_to
              applied_to_with
              available_openings
              average_nps_score
              company_description
              completeness
              cover_photo
              created_at
              current_status
              date_opened
              description
              duration
              earliest_start_date
              experience_type
              external_opportunity_id
              external_opportunity_link
              fee_and_health_insurance
              google_place_id
              has_opportunity_applications
              has_opportunity_questions
              id
              is_favourited
              is_gep
              is_global_project
              is_project_enabled
              lat
              latest_end_date
              lng
              location
              mandatory_fields_check
              nps_score
              office_footfall_for_exchange
              openings
              opportunity_cost
              partner_type
              percentage_of_fulfillment
              profile_photo
              programme_fees
              progress_percentage_for_standards
              project_description
              project_duration
              project_fee
              project_id
              project_name
              redirect_to_external_opportunity
              rejected_count
              remark
              remote_experience_additional_details
              remote_experience_duration
              remote_experience_salary
              remote_opportunity
              reviews
              status
              template_opportunities_locations
              title
              updated_at
              video_url
              view_count
              work_hours
              }
            }
          `,
          variables: { id }
        };

        const options = {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify(requestBody),
          headers: {
            'access_token': "MY_ACCESS_TOKEN"
          }
        };

        const response = UrlFetchApp.fetch(graphqlEndpoint, options);
        const responseData = JSON.parse(response.getContentText());
        Logger.log(response.getResponseCode())

  } catch (error) {
    console.error('Failed to unpublish opportunities:', error);
    throw error;
  }
}



function publishOpportunity(id){
 try {
        Logger.log(id)
        const requestBody = {
          query: `
            mutation UnpublishOpportunity($id: ID!) {
              openOpportunity(id: $id) {
               accepted_count
               applicants_count
               application_processing_time
              applications_close_date
              applications_status_facets
              applied_to
              applied_to_with
              available_openings
              average_nps_score
              company_description
              completeness
              cover_photo
              created_at
              current_status
              date_opened
              description
              duration
              earliest_start_date
              experience_type
              external_opportunity_id
              external_opportunity_link
              fee_and_health_insurance
              google_place_id
              has_opportunity_applications
              has_opportunity_questions
              id
              is_favourited
              is_gep
              is_global_project
              is_project_enabled
              lat
              latest_end_date
              lng
              location
              mandatory_fields_check
              nps_score
              office_footfall_for_exchange
              openings
              opportunity_cost
              partner_type
              percentage_of_fulfillment
              profile_photo
              programme_fees
              progress_percentage_for_standards
              project_description
              project_duration
              project_fee
              project_id
              project_name
              redirect_to_external_opportunity
              rejected_count
              remark
              remote_experience_additional_details
              remote_experience_duration
              remote_experience_salary
              remote_opportunity
              reviews
              status
              template_opportunities_locations
              title
              updated_at
              video_url
              view_count
              work_hours
              }
            }
          `,
          variables: { id }
        };

        const options = {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify(requestBody),
          headers: {
            'access_token': "MY_ACCESS_TOKEN"
          }
        };

        const response = UrlFetchApp.fetch(graphqlEndpoint, options);
        const responseData = JSON.parse(response.getContentText());
        Logger.log(response.getResponseCode())

  } catch (error) {
    console.error('Failed to publish opportunities:', error);
    throw error;
  }

}
