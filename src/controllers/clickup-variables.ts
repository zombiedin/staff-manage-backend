// For mapping clickup attr to our own attr
// in form -> "[clickup attr name]": "[your attr name]"
export const attr_mapping: { [key: string]: string } = {
  name: 'p_name',
  description: 'p_desc',
  start_date: 'start_date',
  due_date: 'end_date',
  assignees: 'assignees',
  date_created: 'created_date',
  id: 'cu_id',
  url: 'ticket_url',
};

// For mapping clickup attr to our own attr (but we want a value inside object)
// eg. "space":{
//       "id": "123123"
//     }
// set dict as { "space.id": "[your attr name]" }
export const attr_mapping_obj: { [key: string]: string } = {
  'status.status': 'status_name',
  'status.color': 'status_color',
  'space.id': 'space',
  'priority.priority': 'priority',
};

// For mapping custom fields from clickup
// in form -> "[name of that field]": "[your attr name]"
export const custom_fields: { [key: string]: string } = {
  Solutions: 'solution',
  BU: 'bu',
  'Resource Application Develop': 'res_dev',
  'Resource Core systems and platform': 'res_core',
  'Resource Data and Analytics': 'res_data',
  'Resource PMO&BA': 'res_pmo',
  'Assign to team': 'teams',
  Space: 'space_url',
};

// for mapping unix
export const unix_fields = ['created_date', 'start_date', 'end_date'];
